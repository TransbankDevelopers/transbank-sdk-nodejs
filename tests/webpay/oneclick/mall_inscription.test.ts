import nock from 'nock';
import { Environment, IntegrationApiKeys, IntegrationCommerceCodes, Oneclick, Options, TransactionDetail, WebpayPlus } from '../../../lib';
import ApiConstants from '../../../lib/transbank/common/api_constants';

describe('InscriptionOneclickMallTest', () => {
    const apiUrl = `${Environment.Integration}${ApiConstants.ONECLICK_ENDPOINT}`;
    const option = new Options(IntegrationCommerceCodes.ONECLICK_MALL, IntegrationApiKeys.WEBPAY, Environment.Integration);

    afterAll(() => {
        nock.cleanAll();
    });

    test('start', async () => {
        const expectedResponse = {
            token: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
            url_webpay: 'https://webpay3gint.transbank.cl/webpayserver/bp_multicode_inscription.cgi'
        };
        const username = "steve";
        const email = "steve.rogers@continuum.cl";
        const returnUrl = "https://localhost:8081/oneclick-mall/finish";

        nock(apiUrl)
            .post(`/inscriptions`)
            .reply(200, expectedResponse);

        const response = await new Oneclick.MallInscription(option)
            .start(username, email, returnUrl);

        expect(response.url_webpay).toBe(expectedResponse.url_webpay);
        expect(response.token).toBe(expectedResponse.token);

    });

    test('finish', async () => {
        const expectedResponse = {
            response_code: 0,
            authorization_code: '1213',
            card_type: 'Visa',
            card_number: 'XXXXXXXXXXXX6623',
            tbk_user: 'aaaaaaaaaaaaa-bbbbbbbb-cccccc'
        };
        const testToken = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

        nock(apiUrl)
            .put(`/inscriptions/${testToken}`)
            .reply(200, expectedResponse);

        const response = await new Oneclick.MallInscription(option)
            .finish(testToken);

        expect(response.response_code).toBe(expectedResponse.response_code);
        expect(response.authorization_code).toBe(expectedResponse.authorization_code);
        expect(response.card_type).toBe(expectedResponse.card_type);
        expect(response.card_number).toBe(expectedResponse.card_number);
        expect(response.tbk_user).toBe(expectedResponse.tbk_user);
    });


});
