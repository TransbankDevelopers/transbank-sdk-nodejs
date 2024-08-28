import nock from 'nock';
import { Environment, IntegrationApiKeys, IntegrationCommerceCodes, WebpayPlus } from '../../../lib';
import ApiConstants from '../../../lib/transbank/common/api_constants';

describe('WebpayPlusTest', () => {
    const apiUrl = `${Environment.Integration}${ApiConstants.WEBPAY_ENDPOINT}`;
    const testToken = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    
    afterAll(() => {
        nock.cleanAll();
    });
    
    test('create', async () => {
        const urlResponse = "https://webpay3gint.transbank.cl/webpayserver/initTransaction";
        const mockResponse = {
            token: testToken,
            url: urlResponse
        };
    
        nock(apiUrl)
            .post('/transactions')
            .reply(200, mockResponse);
    
        const buyOrder = 'order_123';
        const sessionId = 'session_123';
        const amount = 1000;
        const returnUrl = "http://www.google.com";
    
        const response = await WebpayPlus.Transaction
            .buildForIntegration(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY)
            .create(buyOrder, sessionId, amount, returnUrl);
        expect(response.token).toBe(testToken);
        expect(response.url).toBe(urlResponse);
    });
    
    
    test('commit', async () => {
        const expectedResponse = generateJsonResponse();  
        nock(apiUrl)
            .put(`/transactions/${testToken}`)
            .reply(200, expectedResponse);
    
        const response = await WebpayPlus.Transaction
            .buildForIntegration(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY)
            .commit(testToken);
        expect(response.vci).toBe(expectedResponse.vci);
        expect(response.amount).toBe(expectedResponse.amount);
        expect(response.status).toBe(expectedResponse.status);
        expect(response.buy_order).toBe(expectedResponse.buy_order);
        expect(response.session_id).toBe(expectedResponse.session_id);
        expect(response.card_detail.card_number).toBe(expectedResponse.card_detail.card_number);
        expect(response.accounting_date).toBe(expectedResponse.accounting_date);
        expect(response.transaction_date).toBe(expectedResponse.transaction_date);
        expect(response.authorization_code).toBe(expectedResponse.authorization_code);
        expect(response.payment_type_code).toBe(expectedResponse.payment_type_code);
        expect(response.response_code).toBe(expectedResponse.response_code);
        expect(response.installments_number).toBe(expectedResponse.installments_number);
    });
    
    test('refund', async () => {
        const amount = 1000;
        const type = "REVERSED";
    
        const mockResponse = { type };
    
        nock(apiUrl)
            .post(`/transactions/${testToken}/refunds`)
            .reply(200, mockResponse);
    
        const response = await WebpayPlus.Transaction
            .buildForIntegration(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY)
            .refund(testToken, amount);
        expect(response.type).toBe(type);
    });
    
    test('status', async () => {
        const expectedResponse = generateJsonResponse(); 
        nock(apiUrl)
            .get(`/transactions/${testToken}`)
            .reply(200, expectedResponse);
    
        const response = await WebpayPlus.Transaction
            .buildForIntegration(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY)
            .status(testToken);
        expect(response.vci).toBe(expectedResponse.vci);
        expect(response.amount).toBe(expectedResponse.amount);
        expect(response.status).toBe(expectedResponse.status);
        expect(response.buy_order).toBe(expectedResponse.buy_order);
        expect(response.session_id).toBe(expectedResponse.session_id);
        expect(response.card_detail.card_number).toBe(expectedResponse.card_detail.card_number);
        expect(response.accounting_date).toBe(expectedResponse.accounting_date);
        expect(response.transaction_date).toBe(expectedResponse.transaction_date);
        expect(response.authorization_code).toBe(expectedResponse.authorization_code);
        expect(response.payment_type_code).toBe(expectedResponse.payment_type_code);
        expect(response.response_code).toBe(expectedResponse.response_code);
        expect(response.installments_number).toBe(expectedResponse.installments_number);
    });

    test('capture', async () => {
        const expectedResponse = {
            authorization_code: "1213",
            authorization_date: "2021-07-31T23:31:14.249Z",
            captured_amount: 1000,
            response_code: 0
        };

        nock(apiUrl)
            .put(`/transactions/${testToken}/capture`)
            .reply(200, expectedResponse);
    

        const buyOrder = 'order_123';
        const authorization = '1213';
        const amount = 1000;
    
        const response = await WebpayPlus.Transaction
            .buildForIntegration(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY)
            .capture(testToken, buyOrder, authorization, amount);
    
        expect(response.authorization_code).toBe(expectedResponse.authorization_code);
        expect(response.authorization_date).toBe(expectedResponse.authorization_date);
        expect(response.captured_amount).toBe(expectedResponse.captured_amount);
        expect(response.response_code).toBe(expectedResponse.response_code);
    });
    

    function generateJsonResponse(): any {
        return {
            vci: "TSY",
            amount: 1000.0,
            status: "AUTHORIZED",
            buy_order: "1643997337",
            session_id: "1134425622",
            card_detail: { card_number: "6623" },  // Asegúrate de que mapResponseDetail esté definido previamente
            accounting_date: "0731",
            transaction_date: "2021-07-31T23:31:14.249Z",
            authorization_code: "1213",
            payment_type_code: "VD",
            response_code: 0,
            installments_number: 0
        };
    }
});


