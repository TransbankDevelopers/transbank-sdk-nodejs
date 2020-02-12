const Transbank = require('../index');

jest.setTimeout(10000);

describe('Transbank API', () => {
  describe('Creación y configuración de objeto principal', () => {
    it('Debe crear correctamente el objeto', () => {
      const tbk = new Transbank();
      expect(tbk).toBeDefined();
    });
    it('Debe poder hacer una transacción de prueba usando configuración webpay normal', (done) => {
      const tbk = new Transbank()
        .withConfiguration(Transbank.Configuration.forTestingWebpayPlusNormal())
        .withEnvironment(new Transbank.Environment()
          .forService(Transbank.services.normal)
          .usingEnvironment(Transbank.environments.integration));
      tbk.initTransaction({
        buyOrder: 'testOrder',
        sessionId: 1,
        returnURL: 'http://aTestUrl.com',
        finalURL: 'http://aFinalTestUrl.com',
        transactionDetails: {
          amount: 1000,
          commerceCode: tbk.configuration.commerceCode,
          buyOrder: 1,
        },
      })
        .then((response) => {
          expect(response)
            .toEqual(expect.objectContaining({
              token: expect.any(String),
            }));
          done();
        })
        .catch((tbkError) => expect(tbkError).toBeUndefined());
    });
  });
});

describe('Test de servicios de Transbank | initTransaction de cada uno de ellos', () => {
  describe('Transacción Normal', () => {
    it('Ambiente Integración', (done) => {
      const tbk = new Transbank()
        .withConfiguration(Transbank.Configuration
          .forTestingWebpayPlusNormal())
        .withEnvironment(new Transbank.Environment()
          .forService(Transbank.services.normal)
          .usingEnvironment(Transbank.environments.integration));
      tbk.initTransaction({
        buyOrder: 'testOrder',
        sessionId: 1,
        returnURL: 'http://aTestUrl.com',
        finalURL: 'http://aFinalTestUrl.com',
        transactionDetails: {
          amount: 1000,
          commerceCode: tbk.configuration.commerceCode,
          buyOrder: 1,
        },
      })
        .then((response) => {
          expect(response)
            .toEqual(expect.objectContaining({
              token: expect.any(String),
            }));
          done();
        })
        .catch((tbkError) => expect(tbkError).toBeUndefined());
    });
  });

  describe('Transacción Mall', () => {
    it('Ambiente integración', (done) => {
      const tbk = new Transbank()
        .withConfiguration(Transbank.Configuration
          .forTestingWebpayPlusMall())
        .withEnvironment(new Transbank.Environment()
          .forService(Transbank.services.mallNormal)
          .usingEnvironment(Transbank.environments.integration));
      tbk.initTransaction({
        buyOrder: 'testOrder',
        sessionId: 1,
        commerceId: tbk.configuration.commerceCode,
        returnURL: 'http://aTestUrl.com',
        finalURL: 'http://aFinalTestUrl.com',
        transactionDetails: [
          {
            sessionId: 1,
            amount: 1000,
            commerceCode: 597044444402,
            buyOrder: 'testCommerceOrder',
          },
        ],
      })
        .then((response) => {
          expect(response)
            .toEqual(expect.objectContaining({
              token: expect.any(String),
            }));
          done();
        })
        .catch((tbkError) => expect(tbkError).toBeUndefined());
    });
  });
});
