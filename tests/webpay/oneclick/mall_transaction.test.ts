import nock from 'nock';
import { randomInt } from 'crypto';
import { Environment, IntegrationApiKeys, IntegrationCommerceCodes, Oneclick, Options, TransactionDetail, WebpayPlus } from '../../../lib';
import ApiConstants from '../../../lib/transbank/common/api_constants';

describe('OneclickMallTest', () => {
    const apiUrl = `${Environment.Integration}${ApiConstants.ONECLICK_ENDPOINT}`;
    const option = new Options(IntegrationCommerceCodes.ONECLICK_MALL, IntegrationApiKeys.WEBPAY, Environment.Integration);

    afterAll(() => {
        nock.cleanAll();
    });


    test('authorize', async () => {
        const expectedResponse = generateJsonResponse();
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

        nock(apiUrl)
            .post(`/transactions`)
            .reply(200, expectedResponse);

        const response = await new Oneclick.MallTransaction(option)
            .authorize(username, tbkUser, buyOrder, mallDetails);

        expect(response.buy_order).toBe(expectedResponse.buy_order);
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
        const type = 'REVERSED';
        const buyOrder = '500894028';

        nock(apiUrl)
            .post(`/transactions/${buyOrder}/refunds`)
            .reply(200, { type });

        const childBuyOrder = '500894028';
        const childCommerceCode = '597055555536';
        const amount = 1000;

        const response = await new Oneclick.MallTransaction(option)
            .refund(buyOrder, childCommerceCode, childBuyOrder, amount);

        expect(response.type).toBe(type);
    });

    test('status', async () => {
        const expectedResponse = generateJsonResponse();
        nock(apiUrl)
            .get(`/transactions/${expectedResponse.buy_order}`)
            .reply(200, expectedResponse);

        const response = await new Oneclick.MallTransaction(option)
            .status(expectedResponse.buy_order);

        expect(response.buy_order).toBe(expectedResponse.buy_order);
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
            .put(`/transactions/capture`)
            .reply(200, expectedResponse);
    
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
