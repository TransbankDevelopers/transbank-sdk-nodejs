import { Environment } from '../../../lib';

test('correct integration environment url', () => {
  expect(Environment.Integration).toBe('https://webpay3gint.transbank.cl');
});

test('correct production environment url', () => {
  expect(Environment.Production).toBe('https://webpay3g.transbank.cl');
});
