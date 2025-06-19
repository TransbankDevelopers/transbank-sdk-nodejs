import nock from 'nock';
import ApiConstants from '../../../lib/transbank/common/api_constants';
import { Environment, Oneclick } from '../../../lib';
import TransbankError from '../../../lib/transbank/common/transbank_error';

describe('MallBinInfoTest', () => {
  const apiUrl = `${Environment.Integration}${ApiConstants.ONECLICK_ENDPOINT}`;
  test('queryBin', async () => {
    const expectedResponse = {
      bin_issuer: 'TEST COMMERCE BANK',
      bin_payment_type: 'Credito',
      bin_brand: 'Visa',
    };
    const tbkUser = 'tbkUser1234567890';
    nock(apiUrl)
      .post(`/bin_info`, (body) => {
        expect(body).toEqual({ tbk_user: tbkUser });
        return true;
      })
      .reply(200, expectedResponse);
    const binInfo = Oneclick.MallBinInfo.buildForIntegration('testCommerceCode', 'testApiKey');
    const response = await binInfo.queryBin(tbkUser);
    expect(response).toEqual(expectedResponse);
  });

  test('queryBin with invalid tbkUser', async () => {
    const invalidTbkUser =
      'd8239982-cdc9-4f83-9dc9-4f83-9da7-fae63935066bdc9-4f83-9da7-fae63d8239982-cdc9-4f83-9dc9-4f83-9da7-fae63935066bdc9-4f83-9da7-fae6335066b';
    const binInfo = Oneclick.MallBinInfo.buildForIntegration('testCommerceCode', 'testApiKey');
    await expect(binInfo.queryBin(invalidTbkUser)).rejects.toThrow(Error);
  });

  test('Error API Response', async () => {
    nock(apiUrl).post(`/bin_info`).reply(422, {
      error: 'Invalid request',
      message: 'Error processing request',
    });
    const binInfo = Oneclick.MallBinInfo.buildForIntegration('testCommerceCode', 'testApiKey');
    await expect(binInfo.queryBin('tbkUser1234567890')).rejects.toThrow(TransbankError);
  });
});
