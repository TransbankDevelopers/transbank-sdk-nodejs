import * as Certs from './certs/transbankIntegrationCerts';
import transbankCert from './certs/transbankPublicCert';

export default class TBKConfiguration {
  constructor() {
    this.privateCert = '';
    this.publicCert = '';
    this.commerceCode = 0;
    this.commerceEmail = '';
    this.transbankPublicCert = transbankCert;
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

  // Factory functions
  static forTestingWebpayPlusNormal() {
    return new TBKConfiguration()
      .withPrivateCert(Certs.webpayPlusNormal.privateKey)
      .withPublicCert(Certs.webpayPlusNormal.publicKey)
      .withCommerceCode(Certs.webpayPlusNormal.commerceCode);
  }

  static forTestingWebpayPlusMall() {
    return new TBKConfiguration()
      .withPrivateCert(Certs.webpayPlusMall.privateKey)
      .withPublicCert(Certs.webpayPlusMall.publicKey)
      .withCommerceCode(Certs.webpayPlusMall.commerceCode);
  }

  static forTestingWebpayPlusCapture() {
    return new TBKConfiguration()
      .withPrivateCert(Certs.webpayPlusCapture.privateKey)
      .withPublicCert(Certs.webpayPlusCapture.publicKey)
      .withCommerceCode(Certs.webpayPlusCapture.commerceCode);
  }

  static forTestingWebpayOneClickNormal() {
    return new TBKConfiguration()
      .withPrivateCert(Certs.webpayOneClickNormal.privateKey)
      .withPublicCert(Certs.webpayOneClickNormal.publicKey)
      .withCommerceCode(Certs.webpayOneClickNormal.commerceCode);
  }

  static forTestingPatPassByWebpayNormal() {
    return new TBKConfiguration()
      .withPrivateCert(Certs.patpassByWebpayNormal.privateKey)
      .withPublicCert(Certs.patpassByWebpayNormal.publicKey)
      .commerceCode(Certs.patpassByWebpayNormal.commerceCode);
  }
}
