import nock from 'nock';
import { Environment, IntegrationApiKeys, IntegrationCommerceCodes, Options, TransaccionCompleta } from '../../../lib';
import { randomInt } from 'crypto';
import ApiConstants from '../../../lib/transbank/common/api_constants';
import { FULL_TX_TRANSACTION_CAPTURE_RESPONSE_MOCK, FULL_TX_TRANSACTION_STATUS_RESPONSE_MOCK } from '../../mocks/transaccion_completa_data';

describe('FullTransactionTest', () => {
    const apiUrl = `${Environment.Integration}${ApiConstants.WEBPAY_ENDPOINT}`;
    const testToken = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    const option = new Options(IntegrationCommerceCodes.TRANSACCION_COMPLETA, IntegrationApiKeys.WEBPAY, Environment.Integration);
    
    afterAll(() => {
        nock.cleanAll();
    });
    
    test('create', async () => {
        const token = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
        const buyOrder = "O-" + randomInt(0, 1000).toString();
        const sessionId = "S-" + randomInt(0, 1000).toString();
        const amount = 1000;
        const cvv = 123;
        const cardNumber = 'XXXXXXXXXXXX6623';
        const month = '12';
        const year = '28';
        nock(apiUrl).post('/transactions').reply(200, { token });
        const response = await new TransaccionCompleta.Transaction(option).create(
            buyOrder,
            sessionId,
            amount,
            cvv,
            cardNumber,
            year + "/" + month
          );
        expect(response.token).toBe(testToken);
    });
    
    
    test('commit', async () => {
        const expectedResponse = FULL_TX_TRANSACTION_STATUS_RESPONSE_MOCK;  
        nock(apiUrl).put(`/transactions/${testToken}`).reply(200, expectedResponse);
        const response = await new TransaccionCompleta.Transaction(option).commit(testToken);
        testResponse(response, expectedResponse);
    });
    
    test('refund', async () => {
        const amount = 1000;
        const type = "REVERSED";
        const expectedResponse = { type };
        nock(apiUrl).post(`/transactions/${testToken}/refunds`).reply(200, expectedResponse);
        const response = await new TransaccionCompleta.Transaction(option).refund(testToken, amount);
        expect(response.type).toBe(type);
    });
    
    test('status', async () => {
        const expectedResponse = FULL_TX_TRANSACTION_STATUS_RESPONSE_MOCK; 
        nock(apiUrl).get(`/transactions/${testToken}`).reply(200, expectedResponse);
        const response = await new TransaccionCompleta.Transaction(option).status(testToken);
        testResponse(response, expectedResponse);
    });

    test('capture', async () => {
        const expectedResponse = FULL_TX_TRANSACTION_CAPTURE_RESPONSE_MOCK;
        nock(apiUrl).put(`/transactions/${testToken}/capture`).reply(200, expectedResponse);
        const buyOrder = 'order_123';
        const authorization = '1213';
        const amount = 1000;
        const response = await new TransaccionCompleta.Transaction(option).capture(testToken, buyOrder, authorization, amount);
        expect(response.authorization_code).toBe(expectedResponse.authorization_code);
        expect(response.authorization_date).toBe(expectedResponse.authorization_date);
        expect(response.captured_amount).toBe(expectedResponse.captured_amount);
        expect(response.response_code).toBe(expectedResponse.response_code);
    });

    test('installments', async () => {
        const installmentsNumber = 2;
        const expectedResponse = { installments_amount: 615, id_query_installments: 55114821};
        nock(apiUrl).post(`/transactions/${testToken}/installments`).reply(200, expectedResponse);
        const response = await new TransaccionCompleta.Transaction(option).installments(testToken, installmentsNumber);
        expect(response.installments_amount).toBe(expectedResponse.installments_amount);
        expect(response.id_query_installments).toBe(expectedResponse.id_query_installments);
    });

    function testResponse(response: any, expectedResponse: any) {
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
    }
});


