import Options from '../common/options';
import Environment from './common/environment';
import _Inscription from './inscription';
import IntegrationApiKeys from '../common/integration_api_keys';
import IntegrationCommerceCodes from '../common/integration_commerce_codes';

module PatpassComercio {

  /**
   * Contains methods used to start and status Inscriptions.
   */
  export const Inscription: typeof _Inscription = _Inscription;

  /**
   * Contains currently configured Commerce Code, Api Key and Environment
   */
   export let options: Options;

   /**
    * @returns currently configured Commerce Code and Api Key
    */
   export const getDefaultOptions = () => {
     return PatpassComercio.options;
   };

  /**
   * This methods configures the module to point to the Production Environment with the given params.
   * @param _commerceCode Commerce Code given by Transbank when contracting the product
   * @param _apiKey Api Key given by Transbank when you sucessfuly validate your integration
   */
  export const configureForProduction = (_commerceCode: string, _apiKey: string) => {
    PatpassComercio.options = new Options(_commerceCode, _apiKey, Environment.Production);
  };

  /**
   * This methods configures the module to point to the Integration Environment with the given params.
   * You can check use the credentials provided in the official docs.
   * https://transbankdevelopers.cl/documentacion/como_empezar#codigos-de-comercio
   * @param _commerceCode Commerce Code given by Transbank.
   * @param _apiKey Api Key given by Transbank.
   */
  export const configureForIntegration = (_commerceCode: string, _apiKey: string) => {
    PatpassComercio.options = new Options(_commerceCode, _apiKey, Environment.Integration);
  };

  /**
   * This method configures the module to use Patpass Comercio in the Integration environment.
   */
   export const configureForTesting = () => {
    PatpassComercio.options = new Options(IntegrationCommerceCodes.PATPASS_COMERCIO, IntegrationApiKeys.PATPASS_COMERCIO, Environment.Integration);
  };


}

export default PatpassComercio;
