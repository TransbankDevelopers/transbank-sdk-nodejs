import Environment from '../common/environment';
import Options from '../../common/options';
import _Transaction from './transaction';
import _DeferredTransaction from './deferred_transaction';
import _MallTransaction from './mall_transaction';
import _MallDeferredTransaction from './mall_deferred_transaction';

module WebpayPlus {
  const DEFAULT_API_KEY = '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C';

  /**
   * Contains methods used to create, commit, refund and capture Transactions.
   */
  export let Transaction: typeof _Transaction;
  /**
   * Contains methods used to create, commit, refund and capture deferred Transactions.
   */
  export let DeferredTransaction: typeof _DeferredTransaction;
  /**
   * Contains methods used to create, commit, refund and capture Mall Transactions.
   */
  export let MallTransaction: typeof _MallTransaction;
  /**
   * Contains methods used to create, commit, refund and capture Mall deferred Transactions.
   */
  export let MallDeferredTransaction: typeof _MallDeferredTransaction;

  /**
   * Used to authenticate against the API, currently configured Commerce Code.
   */
  export let commerceCode: string = '597055555532';
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
    WebpayPlus.commerceCode = '597055555532';
    WebpayPlus.apiKey = DEFAULT_API_KEY;
    WebpayPlus.environment = Environment.Integration;
  };

  /**
   * This method configures the module to use Webpay Plus Deferred in the Integration environment.
   */
  export const configureWebpayPlusDeferredForTesting = () => {
    WebpayPlus.commerceCode = '597055555540';
    WebpayPlus.apiKey = DEFAULT_API_KEY;
    WebpayPlus.environment = Environment.Integration;
  };

  /**
   * This method configures the module to use Webpay Plus Mall in the Integration environment.
   */
  export const configureWebpayPlusMallForTesting = () => {
    WebpayPlus.commerceCode = '597055555535';
    WebpayPlus.apiKey = DEFAULT_API_KEY;
    WebpayPlus.environment = Environment.Integration;
  };

  /**
   * This method configures the module to use Webpay Plus Mall Deferred in the Integration environment.
   */
  export const configureWebpayPlusMallDeferredForTesting = () => {
    WebpayPlus.commerceCode = '597055555581';
    WebpayPlus.apiKey = DEFAULT_API_KEY;
    WebpayPlus.environment = Environment.Integration;
  };
}

WebpayPlus.Transaction = _Transaction;
WebpayPlus.DeferredTransaction = _DeferredTransaction;
WebpayPlus.MallTransaction = _MallTransaction;
WebpayPlus.MallDeferredTransaction = _MallDeferredTransaction;

export default WebpayPlus;
