import Options from '../../common/options';
import Environment from '../common/environment';
import _MallInscription from './mall_inscription';
import _MallTransaction from './mall_transaction';
import IntegrationApiKeys from '../../common/integration_api_keys';
import IntegrationCommerceCodes from '../../common/integration_commerce_codes';

module Oneclick {

  /**
   * Contains methods used to start, finish and delete Inscriptions.
   */
  export const MallInscription: typeof _MallInscription = _MallInscription;
  /**
   * Contains methods used to authorize, commit, refund and capture mall Transactions.
   */
  export const MallTransaction: typeof _MallTransaction = _MallTransaction;

  /**
   * Contains currently configured Commerce Code, Api Key and Environment
   */
   export let options: Options;

   /**
    * @returns currently configured Commerce Code and Api Key
    */
   export const getDefaultOptions = () => {
     return Oneclick.options;
   };

  /**
   * This methods configures the module to point to the Production Environment with the given params.
   * @param _commerceCode Commerce Code given by Transbank when contracting the product
   * @param _apiKey Api Key given by Transbank when you sucessfuly validate your integration
   */
  export const configureForProduction = (_commerceCode: string, _apiKey: string) => {
    Oneclick.options = new Options(_commerceCode, _apiKey, Environment.Production);
  };

  /**
   * This methods configures the module to point to the Integration Environment with the given params.
   * You can check use the credentials provided in the official docs.
   * https://transbankdevelopers.cl/documentacion/como_empezar#codigos-de-comercio
   * @param _commerceCode Commerce Code given by Transbank.
   * @param _apiKey Api Key given by Transbank.
   */
  export const configureForIntegration = (_commerceCode: string, _apiKey: string) => {
    Oneclick.options = new Options(_commerceCode, _apiKey, Environment.Integration);
  };

  /**
   * This method configures the module to use Oneclick Mall in the Integration environment.
   */
  export const configureOneclickMallForTesting = () => {
    Oneclick.options = new Options(IntegrationCommerceCodes.ONECLICK_MALL, IntegrationApiKeys.WEBPAY, Environment.Integration);
  };

  /**
   * This method configures the module to use Oneclick Mall deferred in the Integration environment.
   */
  export const configureOneclickMallDeferredForTesting = () => {
    Oneclick.options = new Options(IntegrationCommerceCodes.ONECLICK_MALL_DEFERRED, IntegrationApiKeys.WEBPAY, Environment.Integration);
  };
}

export default Oneclick;
