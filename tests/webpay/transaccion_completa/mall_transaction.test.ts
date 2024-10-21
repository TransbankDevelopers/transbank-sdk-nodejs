import nock from 'nock';
import { randomInt } from 'crypto';
import { CommitDetail, Environment, IntegrationApiKeys, IntegrationCommerceCodes, Options, TransaccionCompleta, TransactionDetail } from '../../../lib';
import ApiConstants from '../../../lib/transbank/common/api_constants';
import { FULL_TX_MALL_TRANSACTION_STATUS_RESPONSE_MOCK } from '../../mocks/transaccion_completa_data';

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
            new TransactionDetail(amountMallOne, mallOneCommerceCode, buyOrderMallOne),
            new TransactionDetail(amountMallTwo, mallTwoCommerceCode, buyOrderMallTwo)
          ];
        nock(apiUrl).post('/transactions').reply(200, { token });
    
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
            new CommitDetail(mallOneCommerceCode,
                buyOrderMallOne,
                idQueryInstallmentsOne,
                deferredPeriodIndexOne,
                false
            ),
            new CommitDetail(buyOrderMallTwo,
                mallTwoCommerceCode,
                idQueryInstallmentsTwo,
                deferredPeriodIndexTwo,
                false
            )
          ];
        const expectedResponse = FULL_TX_MALL_TRANSACTION_STATUS_RESPONSE_MOCK;
        nock(apiUrl).put(`/transactions/${testToken}`).reply(200, expectedResponse);
        const response = await new TransaccionCompleta.MallTransaction(option)
            .commit(testToken, mallDetails);
        testResponse(response, expectedResponse);
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
