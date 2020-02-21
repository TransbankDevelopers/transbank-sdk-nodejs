const { createClient } = require('soap');
const { promisify } = require('util');
const { tbkSecurityGenerator, verifySignature } = require('tbk_signer');

const Config = require('./config');
const { Environment, services } = require('./environments');

const oneClickGen = require('./webpayServices/webpayOneClick');
const normalGen = require('./webpayServices/webpayPlusNormal');
const mallGen = require('./webpayServices/webpayPlusMall');
const nullifyGen = require('./webpayServices/webpayPlusNullify');
const captureGen = require('./webpayServices/webpayPlusCapture');

const createClientPromise = promisify(createClient);

module.exports = class Webpay {
  constructor(configuration = Config.forTestingWebpayPlusNormal()) {
    this.configuration = configuration;
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

  /*
   * To be used when passing to production, set with a key from :
   * Environment.environments
   */
  setEnvironment(environment) {
    this.environment.usingEnvironment(environment);
    this.prepareClient();
    return this;
  }

  /* if for any reason you change the environment object, call this method
   * again. Treat the environment as a non-mutable object in practice
   *
   * Use Webpay.services as a parameter for this method
   * This method should not be used by normal users
   */
  withService(service) {
    this.environment.forService(service);
    this.prepareClient();
    return this;
  }

  /*
   *   General purpose methods, not for normal users
   */
  generalInitTransaction(requestData) {
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

  generalAcknowledgeTransaction(token) {
    return this.soapClient
      .then((client) => this.promisifySoapFunction(
        client.WSWebpayServiceImplService.WSWebpayServiceImplPort.acknowledgeTransaction,
      )({
        tokenInput: token,
      }))
      .then(() => true);
  }

  generalGetTransactionResult(token) {
    return this.soapClient
      .then((client) => this.promisifySoapFunction(
        client.WSWebpayServiceImplService.WSWebpayServiceImplPort.getTransactionResult,
      )({
        tokenInput: token,
      }));
  }

  /*
   * Transbank API
   * Based on the PHP API
   */

  getNormalTransaction() {
    return normalGen(this, Webpay);
  }

  getMallNormalTransaction() {
    return mallGen(this, Webpay);
  }

  getNullifyTransaction() {
    return nullifyGen(this, Webpay);
  }

  getCaptureTransaction() {
    return captureGen(this, Webpay);
  }

  getOneClickTransaction() {
    return oneClickGen(this, Webpay);
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
