import Environment from '../common/environment';
import Options from '../../common/options';
import _Transaction from './transaction';
import _MallTransaction from './mall_transaction';
import CommerceCodeIntegrationConstants from '../../common/integration_commerce_codes';
import ApiKeyIntegrationConstants from '../../common/integration_api_keys';

module WebpayPlus {

  /**
   * Contains methods used to create, commit, refund and capture Transactions.
   */
  export const Transaction: typeof _Transaction = _Transaction;

  /**
   * Contains methods used to create, commit, refund and capture Mall Transactions.
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
    return WebpayPlus.options;
  };

  /**
   * This methods configures the module to point to the Production Environment with the given params.
   * @param _commerceCode Commerce Code given by Transbank when contracting the product
   * @param _apiKey Api Key given by Transbank when you sucessfuly validate your integration
   */
  export const configureForProduction = (_commerceCode: string, _apiKey: string) => {
    WebpayPlus.options = new Options(_commerceCode, _apiKey, Environment.Production);
  };

  /**
   * This methods configures the module to point to the Integration Environment with the given params.
   * You can check use the credentials provided in the official docs.
   * https://transbankdevelopers.cl/documentacion/como_empezar#codigos-de-comercio
   * @param _commerceCode Commerce Code given by Transbank.
   * @param _apiKey Api Key given by Transbank.
   */
  export const configureForIntegration = (_commerceCode: string, _apiKey: string) => {
    WebpayPlus.options = new Options(_commerceCode, _apiKey, Environment.Integration);
  };

  /**
   * This method configures the module to use Webpay Plus in the Integration environment.
   */          
  export const configureForTesting = () => {
    WebpayPlus.options = new Options(CommerceCodeIntegrationConstants.WEBPAY_PLUS, ApiKeyIntegrationConstants.WEBPAY, Environment.Integration);
  };

  /**
   * This method configures the module to use Webpay Plus Deferred in the Integration environment.
   */
  export const configureForTestingDeferred = () => {
    WebpayPlus.options = new Options(CommerceCodeIntegrationConstants.WEBPAY_PLUS_DEFERRED, ApiKeyIntegrationConstants.WEBPAY, Environment.Integration);
  };

  /**
   * This method configures the module to use Webpay Plus Mall in the Integration environment.
   */
  export const configureForTestingMall = () => {
    WebpayPlus.options = new Options(CommerceCodeIntegrationConstants.WEBPAY_PLUS_MALL, ApiKeyIntegrationConstants.WEBPAY, Environment.Integration);
  };

  /**
   * This method configures the module to use Webpay Plus Mall Deferred in the Integration environment.
   */
  export const configureForTestingMallDeferred = () => {
    WebpayPlus.options = new Options(CommerceCodeIntegrationConstants.WEBPAY_PLUS_MALL_DEFERRED, ApiKeyIntegrationConstants.WEBPAY, Environment.Integration);
  };
}

export default WebpayPlus;
