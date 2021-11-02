import Options from '../../common/options';
import Environment from '../common/environment';
import _MallDeferredInscription from './mall_deferred_inscription';
import _MallDeferredTransaction from './mall_deferred_transaction';
import _MallInscription from './mall_inscription';
import _MallTransaction from './mall_transaction';
import ApiKeyIntegrationConstants from '../../common/api_key_integration_constants';
import CommerceCodeIntegrationConstants from '../../common/commerce_code_integration_constants';

module Oneclick {
  const DEFAULT_API_KEY = ApiKeyIntegrationConstants.WEBPAY;

  /**
   * Contains methods used to start, finish and delete Inscriptions.
   */
  export const MallInscription: typeof _MallInscription = _MallInscription;
  /**
   * Contains methods used to authorize, commit, refund and capture mall Transactions.
   */
  export const MallTransaction: typeof _MallTransaction = _MallTransaction;
  /**
   * Contains methods used to start, finish and delete Inscriptions.
   * This is freely interchangeable with {@link MallInscription}
   */
  export const MallDeferredInscription: typeof _MallDeferredInscription = _MallDeferredInscription;
  /**
   * Contains methods used to authorize, commit, refund and capture deferred mall Transactions.
   */
  export const MallDeferredTransaction: typeof _MallDeferredTransaction = _MallDeferredTransaction;

  /**
   * Used to authenticate against the API, currently configured Commerce Code.
   */
  export let commerceCode: string = CommerceCodeIntegrationConstants.ONECLICK_MALL;
  /**
   * Used to authenticate against the API, currently configured Api Key.
   */
  export let apiKey: string = DEFAULT_API_KEY;
  /**
   * Used to select the corresponding API URL, currently configured Environment
   */
  export let environment: string = Environment.Integration;

  /**
   * @returns Currently configured Commerce Code and Api Key
   */
  export const getDefaultOptions = () => {
    return new Options(Oneclick.commerceCode, Oneclick.apiKey, Oneclick.environment);
  };

  /**
   * This methods configures the module to point to the Production Environment with the given params.
   * @param _commerceCode Commerce Code given by Transbank when contracting the product
   * @param _apiKey Api Key given by Transbank when you sucessfuly validate your integration
   */
  export const configureForProduction = (_commerceCode: string, _apiKey: string) => {
    Oneclick.commerceCode = _commerceCode;
    Oneclick.apiKey = _apiKey;
    Oneclick.environment = Environment.Production;
  };

  /**
   * This methods configures the module to point to the Integration Environment with the given params.
   * You can check use the credentials provided in the official docs.
   * https://transbankdevelopers.cl/documentacion/como_empezar#codigos-de-comercio
   * @param _commerceCode Commerce Code given by Transbank.
   * @param _apiKey Api Key given by Transbank.
   */
  export const configureForIntegration = (_commerceCode: string, _apiKey: string) => {
    Oneclick.commerceCode = _commerceCode;
    Oneclick.apiKey = _apiKey;
    Oneclick.environment = Environment.Integration;
  };

  /**
   * This method configures the module to use Oneclick Mall in the Integration environment.
   */
  export const configureOneclickMallForTesting = () => {
    Oneclick.commerceCode = CommerceCodeIntegrationConstants.ONECLICK_MALL;
    Oneclick.apiKey = DEFAULT_API_KEY;
    Oneclick.environment = Environment.Integration;
  };

  /**
   * This method configures the module to use Oneclick Mall deferred in the Integration environment.
   */
  export const configureOneclickMallDeferredForTesting = () => {
    Oneclick.commerceCode = CommerceCodeIntegrationConstants.ONECLICK_MALL_DEFERRED;
    Oneclick.apiKey = DEFAULT_API_KEY;
    Oneclick.environment = Environment.Integration;
  };
}

export default Oneclick;
