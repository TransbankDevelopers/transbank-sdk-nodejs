import { Options } from '../../lib/';
import { Environment } from '../../lib/';

test('creates Options object', () => {
  let options = new Options('123456', 'asdfg', Environment.Integration);
  expect(options.commerceCode).toBe('123456');
  expect(options.apiKey).toBe('asdfg');
  expect(options.environment).toBe(Environment.Integration);
});

test('correct integration environment url', () => {
  expect(Environment.Integration).toBe('https://webpay3gint.transbank.cl');
});

test('correct production environment url', () => {
  expect(Environment.Production).toBe('https://webpay3g.transbank.cl');
});
