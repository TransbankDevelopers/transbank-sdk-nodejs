import Options from '../../common/options';
import Environment from '../common/environment';
import _Transaction from './transaction';
import _DeferredTransaction from './deferred_transaction';
import _MallTransaction from './mall_transaction';
import _MallDeferredTransaction from './mall_deferred_transaction';

module TransaccionCompleta {
  const DEFAULT_API_KEY = '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C';
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
  export let commerceCode: string = '597055555530';
  /**
   * Used to authenticate against the API, currently configured Api Key.
   */
  export let apiKey: string = DEFAULT_API_KEY;
  /**
   * Used to select the corresponding API URL, currently configured Environment
   */
  export let environment: string = Environment.Integration;

  /**
   * @returns Configured Commerce Code and Api Key
   */
  export const getDefaultOptions = () => {
    return new Options(
      TransaccionCompleta.commerceCode,
      TransaccionCompleta.apiKey,
      TransaccionCompleta.environment
    );
  };

  /**
   * This methods configures the module to point to the Production Environment with the given params.
   * @param _commerceCode Commerce Code given by Transbank when contracting the product
   * @param _apiKey Api Key given by Transbank when you sucessfuly validate your integration
   */
  export const configureForProduction = (_commerceCode: string, _apiKey: string) => {
    TransaccionCompleta.commerceCode = _commerceCode;
    TransaccionCompleta.apiKey = _apiKey;
    TransaccionCompleta.environment = Environment.Production;
  };

  /**
   * This methods configures the module to point to the Integration Environment with the given params.
   * You can check use the credentials provided in the official docs.
   * https://transbankdevelopers.cl/documentacion/como_empezar#codigos-de-comercio
   * @param _commerceCode Commerce Code given by Transbank.
   * @param _apiKey Api Key given by Transbank.
   */
  export const configureForIntegration = (_commerceCode: string, _apiKey: string) => {
    TransaccionCompleta.commerceCode = _commerceCode;
    TransaccionCompleta.apiKey = _apiKey;
    TransaccionCompleta.environment = Environment.Integration;
  };

  /**
   * This method configures the module to use Transaccion Completa in the Integration environment.
   */
  export const configureTransaccionCompletaForTesting = () => {
    TransaccionCompleta.commerceCode = '597055555530';
    TransaccionCompleta.apiKey = DEFAULT_API_KEY;
    TransaccionCompleta.environment = Environment.Integration;
  };

  /**
   * This method configures the module to use Transaccion Completa without CVV in the Integration environment.
   */
  export const configureTransaccionCompletaNoCvvForTesting = () => {
    TransaccionCompleta.commerceCode = '597055555557';
    TransaccionCompleta.apiKey = DEFAULT_API_KEY;
    TransaccionCompleta.environment = Environment.Integration;
  };

  /**
   * This method configures the module to use Transaccion Completa deferred in the Integration environment.
   */
  export const configureTransaccionCompletaDeferredForTesting = () => {
    TransaccionCompleta.commerceCode = '597055555531';
    TransaccionCompleta.apiKey = DEFAULT_API_KEY;
    TransaccionCompleta.environment = Environment.Integration;
  };

  /**
   * This method configures the module to use Transaccion Completa deferred without CVV in the Integration environment.
   */
  export const configureTransaccionCompletaDeferredNoCvvForTesting = () => {
    TransaccionCompleta.commerceCode = '597055555556';
    TransaccionCompleta.apiKey = DEFAULT_API_KEY;
    TransaccionCompleta.environment = Environment.Integration;
  };

  /**
   * This method configures the module to use Transaccion Completa Mall in the Integration environment.
   */
  export const configureTransaccionCompletaMallForTesting = () => {
    TransaccionCompleta.commerceCode = '597055555573';
    TransaccionCompleta.apiKey = DEFAULT_API_KEY;
    TransaccionCompleta.environment = Environment.Integration;
  };

  /**
   * This method configures the module to use Transaccion Completa Mall without CVV in the Integration environment.
   */
  export const configureTransaccionCompletaMallNoCvvForTesting = () => {
    TransaccionCompleta.commerceCode = '597055555551';
    TransaccionCompleta.apiKey = DEFAULT_API_KEY;
    TransaccionCompleta.environment = Environment.Integration;
  };

  /**
   * This method configures the module to use Transaccion Completa Mall deferred in the Integration environment.
   */
  export const configureTransaccionCompletaMallDeferredForTesting = () => {
    TransaccionCompleta.commerceCode = '597055555576';
    TransaccionCompleta.apiKey = DEFAULT_API_KEY;
    TransaccionCompleta.environment = Environment.Integration;
  };

  /**
   * This method configures the module to use Transaccion Completa Mall deferred without CVV in the Integration environment.
   */
  export const configureTransaccionCompletaMallDeferredNoCvvForTesting = () => {
    TransaccionCompleta.commerceCode = '597055555561';
    TransaccionCompleta.apiKey = DEFAULT_API_KEY;
    TransaccionCompleta.environment = Environment.Integration;
  };
}

export default TransaccionCompleta;
