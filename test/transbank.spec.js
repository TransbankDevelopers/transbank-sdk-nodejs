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
        .withEnvironment(Transbank.Environment
          .forIntegration()
          .forService(Transbank.services.normal));
      tbk.initTransaction({
        wSTransactionType: 'TR_NORMAL_WS',
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
