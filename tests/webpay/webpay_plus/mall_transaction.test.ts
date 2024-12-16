import nock from 'nock';
import { randomInt } from 'crypto';
import { Environment, IntegrationApiKeys, IntegrationCommerceCodes, Options, TransactionDetail, WebpayPlus } from '../../../lib';
import ApiConstants from '../../../lib/transbank/common/api_constants';
import { WEBPAY_MALL_TRANSACTION_CAPTURE_RESPONSE_MOCK, WEBPAY_MALL_TRANSACTION_STATUS_RESPONSE_MOCK } from '../../mocks/webpay_data';

describe('WebpayPlusMallTest', () => {
    const apiUrl = `${Environment.Integration}${ApiConstants.WEBPAY_ENDPOINT}`;
    const option = new Options(IntegrationCommerceCodes.WEBPAY_PLUS_MALL, IntegrationApiKeys.WEBPAY, Environment.Integration);
    const testToken = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

    afterAll(() => {
        nock.cleanAll();
    });

    test('create', async () => {
        const urlResponse = 'https://webpay3gint.transbank.cl/webpayserver/initTransaction';
        nock(apiUrl)
            .post('/transactions')
            .reply(200, {
                token: testToken,
                url: urlResponse
            });

        const returnUrl = 'https://www.google.com';
        const buyOrder = randomInt(0, 1000).toString();
        const sessionId = randomInt(0, 1000).toString();
        const buyOrderMallOne = randomInt(0, 1000).toString();
        const amountMallOne = 1000;
        const mallOneCommerceCode = '597055555536';
        const buyOrderMallTwo = randomInt(0, 1000).toString();
        const amountMallTwo = 1000;
        const mallTwoCommerceCode = '597055555537';

        let mallDetails = [
            new TransactionDetail(amountMallOne, mallOneCommerceCode, buyOrderMallOne),
            new TransactionDetail(amountMallTwo, mallTwoCommerceCode, buyOrderMallTwo)
          ];

        const response = await new WebpayPlus.MallTransaction(option)
            .create(buyOrder, sessionId, returnUrl, mallDetails);

        expect(response.token).toBe(testToken);
        expect(response.url).toBe(urlResponse);
    });

    test('commit', async () => {
        const expectedResponse = WEBPAY_MALL_TRANSACTION_STATUS_RESPONSE_MOCK;
        nock(apiUrl)
            .put(`/transactions/${testToken}`)
            .reply(200, expectedResponse);

        const response = await new WebpayPlus.MallTransaction(option)
            .commit(testToken);
        testResponse(response, expectedResponse);
    });

    test('refund', async () => {
        const type = 'REVERSED';

        nock(apiUrl)
            .post(`/transactions/${testToken}/refunds`)
            .reply(200, { type });

        const childBuyOrder = '500894028';
        const childCommerceCode = '597055555536';
        const amount = 1000;

        const response = await new WebpayPlus.MallTransaction(option)
            .refund(testToken, childBuyOrder, childCommerceCode, amount);

        expect(response.type).toBe(type);
    });

    function testResponse(response: any, expectedResponse: any) {
        expect(response.vci).toBe(expectedResponse.vci);
        expect(response.buy_order).toBe(expectedResponse.buy_order);
        expect(response.session_id).toBe(expectedResponse.session_id);
        expect(response.card_detail.card_number).toBe(expectedResponse.card_detail.card_number);
        expect(response.accounting_date).toBe(expectedResponse.accounting_date);
        expect(response.accounting_date).toBe(expectedResponse.accounting_date);
        testDetailResponse(response.details[0], expectedResponse.details[0]);
        testDetailResponse(response.details[1], expectedResponse.details[1]);
    }

    function testDetailResponse(detailResponse: any, expectedDetailResponse: any) {
        expect(detailResponse.amount).toBe(expectedDetailResponse.amount);
        expect(detailResponse.status).toBe(expectedDetailResponse.status);
        expect(detailResponse.authorization_code).toBe(expectedDetailResponse.authorization_code);
        expect(detailResponse.payment_type_code).toBe(expectedDetailResponse.payment_type_code);
        expect(detailResponse.response_code).toBe(expectedDetailResponse.response_code);
        expect(detailResponse.installments_number).toBe(expectedDetailResponse.installments_number);
        expect(detailResponse.commerce_code).toBe(expectedDetailResponse.commerce_code);
        expect(detailResponse.buy_order).toBe(expectedDetailResponse.buy_order);
    }

});
