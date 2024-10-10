import nock from 'nock';
import { randomInt } from 'crypto';
import { CommitDetail, Environment, InstallmentDetail, IntegrationApiKeys, IntegrationCommerceCodes, Options, TransaccionCompleta, TransactionDetail } from '../../../lib';
import ApiConstants from '../../../lib/transbank/common/api_constants';

describe('MallFullTransactionTest', () => {
    const apiUrl = `${Environment.Integration}${ApiConstants.WEBPAY_ENDPOINT}`;
    const option = new Options(IntegrationCommerceCodes.TRANSACCION_COMPLETA_MALL, IntegrationApiKeys.WEBPAY, Environment.Integration);
    const testToken = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

    afterAll(() => {
        nock.cleanAll();
    });

    test('create', async () => {
        const token = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
        const buyOrder = "O-" + randomInt(0, 1000).toString();
        const sessionId = "S-" + randomInt(0, 1000).toString();
        const cvv = 123;
        const cardNumber = 'XXXXXXXXXXXX6623';
        const month = '12';
        const year = '28';

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
            )
          ];
    
        nock(apiUrl)
            .post('/transactions')
            .reply(200, { token });
    
        const response = await new TransaccionCompleta.MallTransaction(option).create(
            buyOrder,
            sessionId,
            cardNumber,
            year + "/" + month,
            mallDetails,
            cvv
          );
          
        expect(response.token).toBe(testToken);
    });

    test('commit', async () => {
        const buyOrderMallOne = randomInt(0, 1000).toString();
        const mallOneCommerceCode = '597055555536';
        const idQueryInstallmentsOne = 1;
        const deferredPeriodIndexOne = 0;

        const buyOrderMallTwo = randomInt(0, 1000).toString();
        const mallTwoCommerceCode = '597055555537';
        const idQueryInstallmentsTwo = 1;
        const deferredPeriodIndexTwo = 0;

        let mallDetails = [
            new CommitDetail(
                mallOneCommerceCode,
                buyOrderMallOne,
                idQueryInstallmentsOne,
                deferredPeriodIndexOne,
                false
            ),
            new CommitDetail(
                buyOrderMallTwo,
                mallTwoCommerceCode,
                idQueryInstallmentsTwo,
                deferredPeriodIndexTwo,
                false
            )
          ];
        const expectedResponse = generateJsonResponse();

        nock(apiUrl)
            .put(`/transactions/${testToken}`)
            .reply(200, expectedResponse);

        const response = await new TransaccionCompleta.MallTransaction(option)
            .commit(testToken, mallDetails);

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

    test('status', async () => {
        const expectedResponse = generateJsonResponse();

        nock(apiUrl)
            .get(`/transactions/${testToken}`)
            .reply(200, expectedResponse);

        const response = await new TransaccionCompleta.MallTransaction(option)
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

    test('refund', async () => {
        const type = 'REVERSED';

        nock(apiUrl)
            .post(`/transactions/${testToken}/refunds`)
            .reply(200, { type });

        const childBuyOrder = '500894028';
        const childCommerceCode = '597055555536';
        const amount = 1000;

        const response = await new TransaccionCompleta.MallTransaction(option)
            .refund(testToken, childBuyOrder, childCommerceCode, amount);

        expect(response.type).toBe(type);
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
        const buyOrder = 'order_123';
        const authorization = '1213';
        const amount = 1000;
    
        const response = await new TransaccionCompleta.MallTransaction(option)
            .capture(testToken, commerceCode, buyOrder, authorization, amount);
    
        expect(response.authorization_code).toBe(expectedResponse.authorization_code);
        expect(response.authorization_date).toBe(expectedResponse.authorization_date);
        expect(response.captured_amount).toBe(expectedResponse.captured_amount);
        expect(response.response_code).toBe(expectedResponse.response_code);
    });

    function generateJsonResponse(): any {
        return {
            details: [
             {
                amount: 1922,
                status: "AUTHORIZED",
                authorization_code: "1213",
                payment_type_code: "VN",
                response_code: 0,
                installments_number: 0,
                commerce_code: "597055555574",
                buy_order: "O-36681"
             },
             {
                amount: 1922,
                status: "AUTHORIZED",
                authorization_code: "1213",
                payment_type_code: "VN",
                response_code: 0,
                installments_number: 0,
                commerce_code: "597055555575",
                buy_order: "O-36682"
               }
            ],
            buy_order: "O-99701",
            session_id: "S-23531",
            card_detail: {
             card_number: "6623"
            },
            accounting_date: "0822",
            transaction_date: "2024-08-23T00:15:56.920Z"
        };
    }
});
