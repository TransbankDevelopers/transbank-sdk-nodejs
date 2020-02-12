const { createClient } = require('soap');
const { promisify } = require('util');
const { tbkSecurityGenerator, verifySignature } = require('tbk_signer');

const Config = require('./config');
const { Environment, services } = require('./environments');

const createClientPromise = promisify(createClient);

module.exports = class Transbank {
  constructor() {
    this.configuration = Config.forTestingWebpayPlusNormal();
    this.environment = new Environment();
    this.prepareClient();
  }

  prepareClient() {
    this.soapClient = createClientPromise(
      this.environment.wsdlUrl,
      {
        ignoredNamespaces: {
          namespaces: [],
          override: true,
        },
      },
    )
      .then((client) => Promise.all([
        client,
        tbkSecurityGenerator(
          this.configuration.privateCert,
          this.configuration.publicCert,
        ),
      ]))
      .then(([client, tbkSecurity]) => {
        client.setSecurity(tbkSecurity);
        return client;
      })
      .catch((error) => {
        throw new Error(`Cannot load Soap Client, check your PEM certificates | ${error.message}`);
      });
  }

  /* if for any reason you change the configuration object, call this method
   * again. Treat the configuration as a non-mutable object in practice
   */
  withConfiguration(configuration) {
    this.configuration = configuration;
    this.prepareClient();
    return this;
  }

  /* if for any reason you change the environment object, call this method
   * again. Treat the environment as a non-mutable object in practice
   */
  withEnvironment(environment) {
    this.environment = environment;
    this.prepareClient();
    return this;
  }

  initTransaction(requestData) {
    return this.soapClient
      .then((client) => this.promisifySoapFunction(
        client.WSWebpayServiceImplService.WSWebpayServiceImplPort.initTransaction,
      )(
        {
          wsInitTransactionInput: {
            ...requestData,
            wSTransactionType: this.environment.service === services.normal
              ? 'TR_NORMAL_WS' : 'TR_MALL_WS',
          },
        },
      ))
      .then((response) => response.return)
      .catch((trxError) => {
        throw new Error(`Cannot init transaction > ${trxError.message}`);
      });
  }

  acknowledgeTransaction(token) {
    return this.soapClient
      .then((client) => this.promisifySoapFunction(
        client.WSWebpayServiceImplService.WSWebpayServiceImplPort.acknowledgeTransaction,
      )({
        tokenInput: token,
      }));
  }

  getTransactionResult(token) {
    return this.soapClient
      .then((client) => this.promisifySoapFunction(
        client.WSWebpayServiceImplService.WSWebpayServiceImplPort.getTransactionResult,
      )({
        tokenInput: token,
      }));
  }

  promisifySoapFunction(soapFunction) {
    return (...args) => new Promise((resolve, reject) => {
      soapFunction(...args, (soapError, response, raw) => {
        if (soapError) return reject(soapError);
        if (!verifySignature(this.environment.getTransbankCert(), raw)) return reject(new Error('Invalid response signature'));
        return resolve(response);
      });
    });
  }
};
