import axios from 'axios';
import RequestService from '../../lib/transbank/common/request_service';
import { CreateRequest } from '../../lib/transbank/webpay/webpay_plus/requests';
import { Options, Environment } from '../../lib';

test('creates Options object', () => {
  let options = new Options('123456', 'asdfg', Environment.Integration);
  expect(options.commerceCode).toBe('123456');
  expect(options.apiKey).toBe('asdfg');
  expect(options.environment).toBe(Environment.Integration);
});

test('creates Options object with default timeout', () => {
  let options = new Options('123456', 'asdfg', Environment.Integration);
  expect(options.timeout).toBe(600000);
});

test('the timeout parameter is set successfully', async () => {
  const request = new CreateRequest(
    'ordenCompra12345678',
    'sesion1234557545',
    10000,
    'https://return.url'
  );
  const options = new Options(
    '597055555532',
    '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C',
    Environment.Integration,
    20
  );

  const handleTimeout = (
    reject: (reason?: any) => void
  ): void => {
    setTimeout(() => {
      reject({ code: 'ECONNABORTED', message: 'timeout of 20ms exceeded' });
    }, 2000);
  };

  jest.spyOn(axios, 'request').mockImplementation(() => {
    return new Promise(handleTimeout);
  });

  await expect(RequestService.perform(request, options)).rejects.toThrow(
    'AxiosError: timeout of 20ms exceeded'
  );

  (axios.request as jest.Mock).mockRestore();
});
