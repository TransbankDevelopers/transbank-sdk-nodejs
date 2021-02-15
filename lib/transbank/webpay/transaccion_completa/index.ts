import Options from '../../common/options';
import Environment from '../common/environment';
import _Transaction from './transaction';
import _DeferredTransaction from './deferred_transaction';
import _MallTransaction from './mall_transaction';
import _MallDeferredTransaction from './mall_deferred_transaction';

module TransaccionCompleta {
  const DEFAULT_API_KEY = '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C';

  export const Transaction: typeof _Transaction = _Transaction;
  export const DeferredTransaction: typeof _DeferredTransaction = _DeferredTransaction;
  export const MallTransaction: typeof _MallTransaction = _MallTransaction;
  export const MallDeferredTransaction: typeof _MallDeferredTransaction = _MallDeferredTransaction;

  export let commerceCode: string = '597055555530';
  export let apiKey: string = DEFAULT_API_KEY;
  export let environment: string = Environment.Integration;

  export const getDefaultOptions = () => {
    return new Options(
      TransaccionCompleta.commerceCode,
      TransaccionCompleta.apiKey,
      TransaccionCompleta.environment
    );
  };

  export const configureForProduction = (_commerceCode: string, _apiKey: string) => {
    TransaccionCompleta.commerceCode = _commerceCode;
    TransaccionCompleta.apiKey = _apiKey;
    TransaccionCompleta.environment = Environment.Production;
  };

  export const configureForIntegration = (_commerceCode: string, _apiKey: string) => {
    TransaccionCompleta.commerceCode = _commerceCode;
    TransaccionCompleta.apiKey = _apiKey;
    TransaccionCompleta.environment = Environment.Integration;
  };

  export const configureTransaccionCompletaForTesting = () => {
    TransaccionCompleta.commerceCode = '597055555530';
    TransaccionCompleta.apiKey = DEFAULT_API_KEY;
    TransaccionCompleta.environment = Environment.Integration;
  };

  export const configureTransaccionCompletaNoCvvForTesting = () => {
    TransaccionCompleta.commerceCode = '597055555557';
    TransaccionCompleta.apiKey = DEFAULT_API_KEY;
    TransaccionCompleta.environment = Environment.Integration;
  };

  export const configureTransaccionCompletaDeferredForTesting = () => {
    TransaccionCompleta.commerceCode = '597055555531';
    TransaccionCompleta.apiKey = DEFAULT_API_KEY;
    TransaccionCompleta.environment = Environment.Integration;
  };

  export const configureTransaccionCompletaDeferredNoCvvForTesting = () => {
    TransaccionCompleta.commerceCode = '597055555556';
    TransaccionCompleta.apiKey = DEFAULT_API_KEY;
    TransaccionCompleta.environment = Environment.Integration;
  };

  export const configureTransaccionCompletaMallForTesting = () => {
    TransaccionCompleta.commerceCode = '597055555573';
    TransaccionCompleta.apiKey = DEFAULT_API_KEY;
    TransaccionCompleta.environment = Environment.Integration;
  };

  export const configureTransaccionCompletaMallNoCvvForTesting = () => {
    TransaccionCompleta.commerceCode = '597055555551';
    TransaccionCompleta.apiKey = DEFAULT_API_KEY;
    TransaccionCompleta.environment = Environment.Integration;
  };

  export const configureTransaccionCompletaMallDeferredForTesting = () => {
    TransaccionCompleta.commerceCode = '597055555576';
    TransaccionCompleta.apiKey = DEFAULT_API_KEY;
    TransaccionCompleta.environment = Environment.Integration;
  };

  export const configureTransaccionCompletaMallDeferredNoCvvForTesting = () => {
    TransaccionCompleta.commerceCode = '597055555561';
    TransaccionCompleta.apiKey = DEFAULT_API_KEY;
    TransaccionCompleta.environment = Environment.Integration;
  };
}

export default TransaccionCompleta;
