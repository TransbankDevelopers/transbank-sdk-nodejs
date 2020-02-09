const Transbank = require('../lib/transbank');

jest.setTimeout(10000);

describe('Transbank API', () => {
  describe('Creación y configuración de objeto principal', () => {
    it('Debe crear correctamente el objeto', () => {
      const tbk = new Transbank();
      expect(tbk).toBeDefined();
    });
  });
});
