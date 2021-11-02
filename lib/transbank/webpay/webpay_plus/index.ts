import Environment from '../common/environment';
import Options from '../../common/options';
import _Transaction from './transaction';
import _DeferredTransaction from './deferred_transaction';
import _MallTransaction from './mall_transaction';
import _MallDeferredTransaction from './mall_deferred_transaction';
import CommerceCodeIntegrationConstants from '../../common/commerce_code_integration_constants';
import ApiKeyIntegrationConstants from '../../common/api_key_integration_constants';

module WebpayPlus {
  const DEFAULT_API_KEY = ApiKeyIntegrationConstants.WEBPAY;

  /**
   * Contains methods used to create, commit, refund and capture Transactions.
   */
  export const Transaction: typeof _Transaction = _Transaction;

  /**
   * Contains methods used to create, commit, refund and capture deferred Transactions.
   */
  export const DeferredTransaction: typeof _DeferredTransaction = _DeferredTransaction;
  /**
   * Contains methods used to create, commit, refund and capture Mall Transactions.
   */
  export const MallTransaction: typeof _MallTransaction = _MallTransaction;
  /**
   * Contains methods used to create, commit, refund and capture Mall deferred Transactions.
   */
  export const MallDeferredTransaction: typeof _MallDeferredTransaction = _MallDeferredTransaction;

  /**
   * Used to authenticate against the API, currently configured Commerce Code.
   */
  export let commerceCode: string = CommerceCodeIntegrationConstants.WEBPAY_PLUS;
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
    return new Options(WebpayPlus.commerceCode, WebpayPlus.apiKey, WebpayPlus.environment);
  };

  /**
   * This methods configures the module to point to the Production Environment with the given params.
   * @param _commerceCode Commerce Code given by Transbank when contracting the product
   * @param _apiKey Api Key given by Transbank when you sucessfuly validate your integration
   */
  export const configureForProduction = (_commerceCode: string, _apiKey: string) => {
    WebpayPlus.commerceCode = _commerceCode;
    WebpayPlus.apiKey = _apiKey;
    WebpayPlus.environment = Environment.Production;
  };

  /**
   * This methods configures the module to point to the Integration Environment with the given params.
   * You can check use the credentials provided in the official docs.
   * https://transbankdevelopers.cl/documentacion/como_empezar#codigos-de-comercio
   * @param _commerceCode Commerce Code given by Transbank.
   * @param _apiKey Api Key given by Transbank.
   */
  export const configureForIntegration = (_commerceCode: string, _apiKey: string) => {
    WebpayPlus.commerceCode = _commerceCode;
    WebpayPlus.apiKey = _apiKey;
    WebpayPlus.environment = Environment.Integration;
  };

  /**
   * This methods configures the module to point to the Production Environment with the given params.
   * @param _commerceCode Commerce Code given by Transbank when contracting the product
   * @param _apiKey Api Key given by Transbank when you sucessfuly validate your integration
   *
   * @deprecated Use the new {@link configureForProduction} method instead
   */
  export const configureWebpayPlusForProduction = (_commerceCode: string, _apiKey: string) => {
    configureForProduction(_commerceCode, _apiKey);
  };

  /**
   * This method configures the module to use Webpay Plus in the Integration environment.
   */
  export const configureWebpayPlusForTesting = () => {
    WebpayPlus.commerceCode = CommerceCodeIntegrationConstants.WEBPAY_PLUS;
    WebpayPlus.apiKey = DEFAULT_API_KEY;
    WebpayPlus.environment = Environment.Integration;
  };

  /**
   * This method configures the module to use Webpay Plus Deferred in the Integration environment.
   */
  export const configureWebpayPlusDeferredForTesting = () => {
    WebpayPlus.commerceCode = CommerceCodeIntegrationConstants.WEBPAY_PLUS_DEFERRED;
    WebpayPlus.apiKey = DEFAULT_API_KEY;
    WebpayPlus.environment = Environment.Integration;
  };

  /**
   * This method configures the module to use Webpay Plus Mall in the Integration environment.
   */
  export const configureWebpayPlusMallForTesting = () => {
    WebpayPlus.commerceCode = CommerceCodeIntegrationConstants.WEBPAY_PLUS_MALL;
    WebpayPlus.apiKey = DEFAULT_API_KEY;
    WebpayPlus.environment = Environment.Integration;
  };

  /**
   * This method configures the module to use Webpay Plus Mall Deferred in the Integration environment.
   */
  export const configureWebpayPlusMallDeferredForTesting = () => {
    WebpayPlus.commerceCode = CommerceCodeIntegrationConstants.WEBPAY_PLUS_MALL_DEFERRED;
    WebpayPlus.apiKey = DEFAULT_API_KEY;
    WebpayPlus.environment = Environment.Integration;
  };
}

export default WebpayPlus;
