import ApiKeyIntegrationConstants from '../../common/integration_api_keys';
import CommerceCodeIntegrationConstants from '../../common/integration_commerce_codes';
import Environment from '../common/environment';
import Options from '../../common/options';
import _Transaction from './transaction';

module WebpayPlusModal {
  const DEFAULT_API_KEY = ApiKeyIntegrationConstants.WEBPAY;


  /**
   * Contains methods used to create, commit, refund and capture Transactions.
   */
   export const Transaction: typeof _Transaction = _Transaction;  

  /**
   * Used to authenticate against the API, currently configured Commerce Code.
   */
  export let commerceCode: string = CommerceCodeIntegrationConstants.WEBPAY_PLUS_MODAL;
  /**
   * Used to authenticate against the API, currently configured Api Key.
   */
  export let apiKey: string = DEFAULT_API_KEY;
  /**
   * Used to select the corresponding API URL, currently configured Environment
   */
  export let environment: string = Environment.Integration;

  /**
   * @returns currently configured Commerce Code and Api Key
   */
  export const getDefaultOptions = () => {
    return new Options(WebpayPlusModal.commerceCode, WebpayPlusModal.apiKey, WebpayPlusModal.environment);
  };

  /**
   * This methods configures the module to point to the Production Environment with the given params.
   * @param _commerceCode Commerce Code given by Transbank when contracting the product
   * @param _apiKey Api Key given by Transbank when you sucessfuly validate your integration
   */
   export const configureForProduction = (_commerceCode: string, _apiKey: string) => {
    WebpayPlusModal.commerceCode = _commerceCode;
    WebpayPlusModal.apiKey = _apiKey;
    WebpayPlusModal.environment = Environment.Production;
  };

  /**
   * This methods configures the module to point to the Integration Environment with the given params.
   * You can check use the credentials provided in the official docs.
   * https://transbankdevelopers.cl/documentacion/como_empezar#codigos-de-comercio
   * @param _commerceCode Commerce Code given by Transbank.
   * @param _apiKey Api Key given by Transbank.
   */
  export const configureForIntegration = (_commerceCode: string, _apiKey: string) => {
    WebpayPlusModal.commerceCode = _commerceCode;
    WebpayPlusModal.apiKey = _apiKey;
    WebpayPlusModal.environment = Environment.Integration;
  };


  /**
   * This method configures the module to use Webpay Plus in the Integration environment.
   */
   export const configureWebpayPlusForTesting = () => {
    WebpayPlusModal.commerceCode = CommerceCodeIntegrationConstants.WEBPAY_PLUS;
    WebpayPlusModal.apiKey = DEFAULT_API_KEY;
    WebpayPlusModal.environment = Environment.Integration;
  };


}

export default WebpayPlusModal;