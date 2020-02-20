const Transbank = require('../index');

jest.setTimeout(10000);

describe('Transbank API', () => {
  describe('Creación y configuración de objeto principal', () => {
    it('Debe crear correctamente el objeto', () => {
      const tbk = new Transbank.Webpay();
      expect(tbk).toBeDefined();
    });
    it('Debe poder hacer una transacción de prueba usando configuración webpay normal', (done) => {
      const tbk = new Transbank.Webpay()
        .withConfiguration(Transbank.Configuration.forTestingWebpayPlusNormal())
        .getNormalTransaction();

      tbk.initTransaction(1000, 1, 1, 'http://aTestUrl.com', 'http://aFinalTestUrl.com')
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
      const tbk = new Transbank.Webpay()
        .withConfiguration(Transbank.Configuration.forTestingWebpayPlusNormal())
        .getNormalTransaction();

      tbk.initTransaction(1000, 1, 1, 'http://aTestUrl.com', 'http://aFinalTestUrl.com')
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
      const tbk = new Transbank.Webpay()
        .withConfiguration(Transbank.Configuration.forTestingWebpayPlusMall())
        .getMallNormalTransaction();

      tbk.initTransaction(1, 1, 'http://aTestUrl.com', 'http://aFinalTestUrl.com',
        [
          {
            amount: 1000,
            storeCode: 597044444402,
            buyOrder: 1,
          },
        ])
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

  describe('Transacción nullify', () => {
    it('Ambiente integración | solo testeo de llamada', (done) => {
      const tbk = new Transbank.Webpay()
        .withConfiguration(Transbank.Configuration.forTestingWebpayPlusNormal())
        .getNullifyTransaction();

      tbk.nullify(1, 1000, 1, 1000, 597020000540)
        .then(done)
        .catch((tbkError) => expect(tbkError).toMatchSnapshot())
        .finally(done);
    });
  });

  describe('Transacción capture', () => {
    it('Ambiente integración | solo testeo de llamada', (done) => {
      const tbk = new Transbank.Webpay()
        .withConfiguration(Transbank.Configuration.forTestingWebpayPlusNormal())
        .getCaptureTransaction();

      tbk.capture(1, 1000, 1)
        .then(done)
        .catch((tbkError) => expect(tbkError).toMatchSnapshot())
        .finally(done);
    });
  });

  describe('Transacción OneClick', () => {
    it('Ambiente integración | solo testeo de llamada', (done) => {
      const tbk = new Transbank.Webpay()
        .withConfiguration(Transbank.Configuration.forTestingWebpayOneClickNormal())
        .getOneClickTransaction();

      tbk.initInscription('aUserName', 'atest@email.com', 'https://a.test.url')
        .then((response) => {
          expect(response)
            .toEqual(expect.objectContaining({
              token: expect.any(String),
            }));
          done();
        })
        .catch((tbkError) => expect(tbkError).toMatchSnapshot())
        .finally(done);
    });
  });
});
