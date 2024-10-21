import nock from 'nock';
import { Environment, IntegrationApiKeys, IntegrationCommerceCodes, Options, WebpayPlus } from '../../../lib';
import ApiConstants from '../../../lib/transbank/common/api_constants';
import { WEBPAY_MALL_TRANSACTION_CAPTURE_RESPONSE_MOCK, WEBPAY_MALL_TRANSACTION_STATUS_RESPONSE_MOCK } from '../../mocks/webpay_data';

describe('WebpayPlusMallTest', () => {
    const apiUrl = `${Environment.Integration}${ApiConstants.WEBPAY_ENDPOINT}`;
    const option = new Options(IntegrationCommerceCodes.WEBPAY_PLUS_MALL, IntegrationApiKeys.WEBPAY, Environment.Integration);
    const testToken = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

    afterAll(() => {
        nock.cleanAll();
    });

    test('status', async () => {
        const expectedResponse = WEBPAY_MALL_TRANSACTION_STATUS_RESPONSE_MOCK;
        nock(apiUrl)
            .get(`/transactions/${testToken}`)
            .reply(200, expectedResponse);

        const response = await new WebpayPlus.MallTransaction(option)
            .status(testToken);
        testResponse(response, expectedResponse);
    });

    test('capture', async () => {
        const expectedResponse = WEBPAY_MALL_TRANSACTION_CAPTURE_RESPONSE_MOCK;
        nock(apiUrl)
            .put(`/transactions/${testToken}/capture`)
            .reply(200, expectedResponse);
    
        const commerceCode = "597055555537";
        const buyOrder = 'order_123';
        const authorization = '1213';
        const amount = 1000;
    
        const response = await new WebpayPlus.MallTransaction(option)
            .capture(commerceCode, testToken, buyOrder, authorization, amount);
    
        expect(response.authorization_code).toBe(expectedResponse.authorization_code);
        expect(response.authorization_date).toBe(expectedResponse.authorization_date);
        expect(response.captured_amount).toBe(expectedResponse.captured_amount);
        expect(response.response_code).toBe(expectedResponse.response_code);
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
