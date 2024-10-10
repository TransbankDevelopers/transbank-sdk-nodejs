import { IntegrationApiKeys, IntegrationCommerceCodes, PatpassComercio } from "../../lib";
import ApiConstants from "../../lib/transbank/common/api_constants";
import Environment from "../../lib/transbank/patpass/common/environment";
import nock from 'nock';

describe('PatpassComercioTest', () => {
    const apiUrl = `${Environment.Integration}${ApiConstants.PATPASS_COMERCIO_ENDPOINT}`;
    const testToken = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

    afterAll(() => {
        nock.cleanAll();
    });

    it('start', async () => {

        const urlResponse = 'https://pagoautomaticocontarjetasint.transbank.cl/nuevo-ic-rest/tokenComercioLogin';
        const mockResponse = {
            token: testToken,
            url: urlResponse
        };

        nock(apiUrl)
            .post('/patInscription')
            .reply(200, mockResponse);

        const urlRequest = 'https://localhost:8081/patpass-comercio/commit';
        const name = 'nombre';
        const firstLastName = 'apellido';
        const secondLastName = 'sapellido';
        const rut = '14140066-5';
        const serviceId = 'service123';
        const finalUrl = 'https://localhost:8081/patpass-comercio/final';
        const maxAmount = 0;
        const phoneNumber = '123456734';
        const mobileNumber = '123456723';
        const patpassName = 'nombre del patpass';
        const personEmail = 'alba.cardenas@continuum.cl';
        const commerceEmail = 'alba.cardenas@continuum.cl';
        const address = 'huerfanos 101';
        const city = 'Santiago';

        const response = await PatpassComercio.Inscription
            .buildForIntegration(IntegrationCommerceCodes.PATPASS_COMERCIO, IntegrationApiKeys.PATPASS_COMERCIO)
            .start(
                urlRequest,
                name,
                firstLastName,
                secondLastName,
                rut,
                serviceId,
                finalUrl,
                maxAmount,
                phoneNumber,
                mobileNumber,
                patpassName,
                personEmail,
                commerceEmail,
                address,
                city
        );

        expect(response.token).toBe(testToken);
        expect(response.url).toBe(urlResponse);
    });

    it('status', async () => {

        const urlResponse = 'https://pagoautomaticocontarjetasint.transbank.cl/nuevo-ic-rest/tokenVoucherLogin';
        const mockResponse = {
            authorized: true,
            voucherUrl: urlResponse
        };

        nock(apiUrl)
            .post('/status')
            .reply(200, mockResponse);

        const response = await PatpassComercio.Inscription
            .buildForIntegration(IntegrationCommerceCodes.PATPASS_COMERCIO, IntegrationApiKeys.PATPASS_COMERCIO)
            .status(testToken)

        expect(response.authorized).toBeTruthy();
        expect(response.voucherUrl).toBe(urlResponse);
    });
});
