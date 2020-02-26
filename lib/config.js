const Certs = require('./certs/transbankIntegrationCerts');

const transbankIntegrationCert = require.resolve('./certs/transbankIntegrationPublicCert.PEM');
const transbankCert = require.resolve('./certs/transbankPublicCert.PEM');

module.exports = {};

const environments = {
  integration: 'integration',
  certification: 'certification',
  test: 'test',
  live: 'live',
  production: 'production',
};
module.exports.environments = environments;

const services = {
  normal: 'normal',
  mallNormal: 'mallNormal',
  capture: 'capture',
  nullify: 'nullify',
  oneClick: 'oneClick',
  oneClickMall: 'oneClickMall',
};

module.exports.services = services;

const wsdlUrls = {
  normal: 'WSWebpayService',
  mallNormal: 'WSWebpayService',
  capture: 'WSCommerceIntegrationService',
  nullify: 'WSCommerceIntegrationService',
  oneClick: 'OneClickPaymentService',
  oneClickMall: 'WSOneClickMulticodeService',
};

module.exports.wsdlUrls = wsdlUrls;

module.exports.Configuration = class Configuration {
  constructor() {
    this.privateCert = '';
    this.publicCert = '';
    this.commerceCode = 0;
    this.commerceEmail = '';
    this.service = services.normal;
    this.environment = environments.integration;
    this.buildWsdlUrl();
  }

  // Setters
  withPrivateCert(privateCert) {
    this.privateCert = privateCert;
    return this;
  }

  withPublicCert(publicCert) {
    this.publicCert = publicCert;
    return this;
  }

  withCommerceCode(commerceCode) {
    this.commerceCode = commerceCode;
    return this;
  }

  withCommerceEmail(commerceEmail) {
    this.commerceEmail = commerceEmail;
    return this;
  }

  clone() {
    return new Configuration()
      .withPublicCert(this.publicCert)
      .withPrivateCert(this.privateCert)
      .withCommerceCode(this.commerceCode)
      .withCommerceEmail(this.commerceEmail)
      .usingEnvironment(this.environment)
      .forService(this.service);
  }

  usingEnvironment(environment) {
    this.environment = environment;
    this.buildWsdlUrl();
    return this;
  }

  forService(service) {
    this.service = service;
    this.buildWsdlUrl();
    return this;
  }

  getTransbankCert() {
    return this.environment === environments.integration
    || this.environment === environments.test
    || this.environment === environments.certification
      ? transbankIntegrationCert : transbankCert;
  }

  buildWsdlUrl() {
    this.wsdlUrl = `https://webpay3g${
      this.environment === environments.integration
      || this.environment === environments.test
      || this.environment === environments.certification
        ? 'int' : ''}.transbank.cl/${
      this.service === services.oneClick
        ? 'webpayserver/wswebpay' : 'WSWebpayTransaction/cxf'}/${wsdlUrls[this.service]}?wsdl`;
  }

  // Factory functions
  static forTestingWebpayPlusNormal() {
    return new Configuration()
      .withPrivateCert(Certs.webpayPlusNormal.privateKey)
      .withPublicCert(Certs.webpayPlusNormal.publicKey)
      .withCommerceCode(Certs.webpayPlusNormal.commerceCode);
  }

  static forTestingWebpayPlusMall() {
    return new Configuration()
      .withPrivateCert(Certs.webpayPlusMall.privateKey)
      .withPublicCert(Certs.webpayPlusMall.publicKey)
      .withCommerceCode(Certs.webpayPlusMall.commerceCode);
  }

  static forTestingWebpayPlusCapture() {
    return new Configuration()
      .withPrivateCert(Certs.webpayPlusCapture.privateKey)
      .withPublicCert(Certs.webpayPlusCapture.publicKey)
      .withCommerceCode(Certs.webpayPlusCapture.commerceCode);
  }

  static forTestingWebpayOneClickNormal() {
    return new Configuration()
      .withPrivateCert(Certs.webpayOneClickNormal.privateKey)
      .withPublicCert(Certs.webpayOneClickNormal.publicKey)
      .withCommerceCode(Certs.webpayOneClickNormal.commerceCode);
  }

  static forTestingPatPassByWebpayNormal() {
    return new Configuration()
      .withPrivateCert(Certs.patpassByWebpayNormal.privateKey)
      .withPublicCert(Certs.patpassByWebpayNormal.publicKey)
      .withCommerceCode(Certs.patpassByWebpayNormal.commerceCode);
  }
};
