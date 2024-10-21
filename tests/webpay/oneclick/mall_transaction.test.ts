import nock from 'nock';
import { randomInt } from 'crypto';
import { Environment, IntegrationApiKeys, IntegrationCommerceCodes, Oneclick, Options, TransactionDetail } from '../../../lib';
import ApiConstants from '../../../lib/transbank/common/api_constants';
import { ONECLICK_MALL_TRANSACTION_CAPTURE_RESPONSE_MOCK, ONECLICK_MALL_TRANSACTION_STATUS_RESPONSE_MOCK } from '../../mocks/oneclick_data';

describe('OneclickMallTest', () => {
    const apiUrl = `${Environment.Integration}${ApiConstants.ONECLICK_ENDPOINT}`;
    const option = new Options(IntegrationCommerceCodes.ONECLICK_MALL, IntegrationApiKeys.WEBPAY, Environment.Integration);

    afterAll(() => {
        nock.cleanAll();
    });

    test('authorize', async () => {
        const expectedResponse = ONECLICK_MALL_TRANSACTION_STATUS_RESPONSE_MOCK;
        const username = "goncafa";
        const tbkUser = "aaaaaaaaaaaaa-bbbbbbbb-cccccc";
        const buyOrder = randomInt(0, 1000).toString();
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

        nock(apiUrl).post(`/transactions`).reply(200, expectedResponse);
        const response = await new Oneclick.MallTransaction(option)
            .authorize(username, tbkUser, buyOrder, mallDetails);
        testResponse(response, expectedResponse);
    });

    test('refund', async () => {
        const type = 'REVERSED';
        const buyOrder = '500894028';
        nock(apiUrl).post(`/transactions/${buyOrder}/refunds`).reply(200, { type });
        const childBuyOrder = '500894028';
        const childCommerceCode = '597055555536';
        const amount = 1000;

        const response = await new Oneclick.MallTransaction(option)
            .refund(buyOrder, childCommerceCode, childBuyOrder, amount);
        expect(response.type).toBe(type);
    });

    test('status', async () => {
        const expectedResponse = ONECLICK_MALL_TRANSACTION_STATUS_RESPONSE_MOCK;
        nock(apiUrl).get(`/transactions/${expectedResponse.buy_order}`).reply(200, expectedResponse);

        const response = await new Oneclick.MallTransaction(option)
            .status(expectedResponse.buy_order);
        testResponse(response, expectedResponse);
    });

    test('capture', async () => {
        const expectedResponse = ONECLICK_MALL_TRANSACTION_CAPTURE_RESPONSE_MOCK;
        nock(apiUrl).put(`/transactions/capture`).reply(200, expectedResponse);
        const commerceCode = "597055555537";
        const childBuyOrder = '500894028-1';
        const authorization = '1213';
        const amount = 1000;
        const response = await new Oneclick.MallTransaction(option)
            .capture(commerceCode, childBuyOrder, authorization, amount);

        expect(response.authorization_code).toBe(expectedResponse.authorization_code);
        expect(response.authorization_date).toBe(expectedResponse.authorization_date);
        expect(response.captured_amount).toBe(expectedResponse.captured_amount);
        expect(response.response_code).toBe(expectedResponse.response_code);
    });

    function testResponse(response: any, expectedResponse: any) {
        expect(response.buy_order).toBe(expectedResponse.buy_order);
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
