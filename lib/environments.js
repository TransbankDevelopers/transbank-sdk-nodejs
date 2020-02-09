import transbankIntegrationCert from './certs/transbankIntegrationPublicCert';
import transbankCert from './certs/transbankPublicCert';

export const environments = {
  integration: 'integration',
  certification: 'certification',
  test: 'test',
  live: 'live',
  production: 'production',
};

export const services = {
  normal: 'normal',
  mallNormal: 'mallNormal',
  capture: 'capture',
  nullify: 'nullify',
  oneClick: 'oneClick',
};

export const wsdlUrls = {
  normal: 'WSWebpayService',
  mallNormal: 'WSWebpayService',
  capture: 'WSCommerceIntegrationService',
  nullify: 'WSCommerceIntegrationService',
  oneClick: 'OneClickPaymentService',
};

export class TBKEnvironment {
  constructor() {
    this.service = services.normal;
    this.environment = environments.integration;
    this.buildWsdlUrl();
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

  static forIntegration() {
    return new TBKEnvironment();
  }
}
