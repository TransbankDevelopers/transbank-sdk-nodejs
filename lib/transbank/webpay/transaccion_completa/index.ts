import Options from '../../common/options';
import Environment from '../common/environment';
import _Transaction from './transaction';
import _DeferredTransaction from './deferred_transaction';

module TransaccionCompleta {
  const DEFAULT_API_KEY = '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C';

  export let Transaction: typeof _Transaction;
  export let DeferredTransaction: typeof _DeferredTransaction;
  export let MallTransaction: any;

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

  export const configureTransaccionCompletaDeferredForTesting = () => {
    TransaccionCompleta.commerceCode = '597055555531';
    TransaccionCompleta.apiKey = DEFAULT_API_KEY;
    TransaccionCompleta.environment = Environment.Integration;
  };

  export const configureTransaccionCompletaMallForTesting = () => {
    TransaccionCompleta.commerceCode = '597055555573';
    TransaccionCompleta.apiKey = DEFAULT_API_KEY;
    TransaccionCompleta.environment = Environment.Integration;
  };

  export const configureTransaccionCompletaMallDeferredForTesting = () => {
    TransaccionCompleta.commerceCode = '597055555576';
    TransaccionCompleta.apiKey = DEFAULT_API_KEY;
    TransaccionCompleta.environment = Environment.Integration;
  };
}

TransaccionCompleta.Transaction = _Transaction;
TransaccionCompleta.DeferredTransaction = _DeferredTransaction;

export default TransaccionCompleta;
