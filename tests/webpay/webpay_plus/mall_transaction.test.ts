import nock from 'nock';
import { randomInt } from 'crypto';
import { Environment, IntegrationApiKeys, IntegrationCommerceCodes, Options, TransactionDetail, WebpayPlus } from '../../../lib';
import ApiConstants from '../../../lib/transbank/common/api_constants';

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

        const returnUrl = 'http://www.google.com';

        const buyOrder = randomInt(0, 1000).toString();
        const sessionId = randomInt(0, 1000).toString();

        const buyOrderMallOne = randomInt(0, 1000).toString();
        const amountMallOne = 1000;
        const mallOneCommerceCode = '597055555536';

        const buyOrderMallTwo = randomInt(0, 1000).toString();
        const amountMallTwo = 1000;
        const mallTwoCommerceCode = '597055555537';

        let mallDetails = [
            new TransactionDetail(
              amountMallOne,
              mallOneCommerceCode,
              buyOrderMallOne
            ),
            new TransactionDetail(
              amountMallTwo,
              mallTwoCommerceCode,
              buyOrderMallTwo
            ),
          ];

        const response = await new WebpayPlus.MallTransaction(option)
            .create(buyOrder, sessionId, returnUrl, mallDetails);

        expect(response.token).toBe(testToken);
        expect(response.url).toBe(urlResponse);
    });

    test('commit', async () => {
        const expectedResponse = generateJsonResponse();

        nock(apiUrl)
            .put(`/transactions/${testToken}`)
            .reply(200, expectedResponse);

        const response = await new WebpayPlus.MallTransaction(option)
            .commit(testToken);

        expect(response.vci).toBe(expectedResponse.vci);
        expect(response.buy_order).toBe(expectedResponse.buy_order);
        expect(response.session_id).toBe(expectedResponse.session_id);
        expect(response.card_detail.card_number).toBe(expectedResponse.card_detail.card_number);
        expect(response.accounting_date).toBe(expectedResponse.accounting_date);
        expect(response.accounting_date).toBe(expectedResponse.accounting_date);

        let expectedDetail = expectedResponse.details[0];
        let detail = response.details[0];
        expect(detail.amount).toBe(expectedDetail.amount);
        expect(detail.status).toBe(expectedDetail.status);
        expect(detail.authorization_code).toBe(expectedDetail.authorization_code);
        expect(detail.payment_type_code).toBe(expectedDetail.payment_type_code);
        expect(detail.response_code).toBe(expectedDetail.response_code);
        expect(detail.installments_number).toBe(expectedDetail.installments_number);
        expect(detail.commerce_code).toBe(expectedDetail.commerce_code);
        expect(detail.buy_order).toBe(expectedDetail.buy_order);

        expectedDetail = expectedResponse.details[1];
        detail = response.details[1];
        expect(detail.amount).toBe(expectedDetail.amount);
        expect(detail.status).toBe(expectedDetail.status);
        expect(detail.authorization_code).toBe(expectedDetail.authorization_code);
        expect(detail.payment_type_code).toBe(expectedDetail.payment_type_code);
        expect(detail.response_code).toBe(expectedDetail.response_code);
        expect(detail.installments_number).toBe(expectedDetail.installments_number);
        expect(detail.commerce_code).toBe(expectedDetail.commerce_code);
        expect(detail.buy_order).toBe(expectedDetail.buy_order);
    });

    test('refund', async () => {
        const url = `/${apiUrl}/transactions/${testToken}/refunds`;
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

    test('status', async () => {
        const expectedResponse = generateJsonResponse();

        nock(apiUrl)
            .get(`/transactions/${testToken}`)
            .reply(200, expectedResponse);

        const response = await new WebpayPlus.MallTransaction(option)
            .status(testToken);

        expect(response.vci).toBe(expectedResponse.vci);
        expect(response.buy_order).toBe(expectedResponse.buy_order);
        expect(response.session_id).toBe(expectedResponse.session_id);
        expect(response.card_detail.card_number).toBe(expectedResponse.card_detail.card_number);
        expect(response.accounting_date).toBe(expectedResponse.accounting_date);
        expect(response.accounting_date).toBe(expectedResponse.accounting_date);

        let expectedDetail = expectedResponse.details[0];
        let detail = response.details[0];
        expect(detail.amount).toBe(expectedDetail.amount);
        expect(detail.status).toBe(expectedDetail.status);
        expect(detail.authorization_code).toBe(expectedDetail.authorization_code);
        expect(detail.payment_type_code).toBe(expectedDetail.payment_type_code);
        expect(detail.response_code).toBe(expectedDetail.response_code);
        expect(detail.installments_number).toBe(expectedDetail.installments_number);
        expect(detail.commerce_code).toBe(expectedDetail.commerce_code);
        expect(detail.buy_order).toBe(expectedDetail.buy_order);

        expectedDetail = expectedResponse.details[1];
        detail = response.details[1];
        expect(detail.amount).toBe(expectedDetail.amount);
        expect(detail.status).toBe(expectedDetail.status);
        expect(detail.authorization_code).toBe(expectedDetail.authorization_code);
        expect(detail.payment_type_code).toBe(expectedDetail.payment_type_code);
        expect(detail.response_code).toBe(expectedDetail.response_code);
        expect(detail.installments_number).toBe(expectedDetail.installments_number);
        expect(detail.commerce_code).toBe(expectedDetail.commerce_code);
        expect(detail.buy_order).toBe(expectedDetail.buy_order);
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
    
        const commerceCode = "597055555537";
        const buyOrder = Math.floor(Math.random() * 1000).toString();
        const authorization = '1213';
        const amount = 1000;
    
        const response = await new WebpayPlus.MallTransaction(option)
            .capture(commerceCode, testToken, buyOrder, authorization, amount);
    
        expect(response.authorization_code).toBe(expectedResponse.authorization_code);
        expect(response.authorization_date).toBe(expectedResponse.authorization_date);
        expect(response.captured_amount).toBe(expectedResponse.captured_amount);
        expect(response.response_code).toBe(expectedResponse.response_code);
    });

    function generateJsonResponse(): any {
        return {
            vci: "TSY",
            buy_order: "1643997337",
            session_id: "1134425622",
            card_detail: {
                card_number: "6623"
            },
            accounting_date: "0731",
            transaction_date: "2021-07-31T23:31:14.249Z",
            details: [
                {
                    amount: 1000,
                    status: "AUTHORIZED",
                    authorization_code: "1213",
                    payment_type_code: "VN",
                    response_code: 0,
                    installments_number: 0,
                    commerce_code: "597055555536",
                    buy_order: "500894028"
                },
                {
                    amount: 2000,
                    status: "AUTHORIZED",
                    authorization_code: "1213",
                    payment_type_code: "VN",
                    response_code: 0,
                    installments_number: 0,
                    commerce_code: "597055555537",
                    buy_order: "1936357040"
                }
            ]
        };
    }
});
