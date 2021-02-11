import Environment from '../common/environment';
import Options from '../../common/options';
import _Transaction from './transaction';
import _DeferredTransaction from './deferred_transaction';
import _MallTransaction from './mall_transaction';
import _MallDeferredTransaction from './mall_deferred_transaction';

module WebpayPlus {
  const DEFAULT_API_KEY = '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C';

  export const Transaction: typeof _Transaction = _Transaction;
  export const DeferredTransaction: typeof _DeferredTransaction = _DeferredTransaction;
  export const MallTransaction: typeof _MallTransaction = _MallTransaction;
  export const MallDeferredTransaction: typeof _MallDeferredTransaction = _MallDeferredTransaction;

  export let commerceCode: string = '597055555532';
  export let apiKey: string = DEFAULT_API_KEY;
  export let environment: string = Environment.Integration;

  export const getDefaultOptions = () => {
    return new Options(WebpayPlus.commerceCode, WebpayPlus.apiKey, WebpayPlus.environment);
  };

  export const configureWebpayPlusForProduction = (_commerceCode: string, _apiKey: string) => {
    WebpayPlus.commerceCode = _commerceCode;
    WebpayPlus.apiKey = _apiKey;
    WebpayPlus.environment = Environment.Production;
  };

  export const configureWebpayPlusForTesting = () => {
    WebpayPlus.commerceCode = '597055555532';
    WebpayPlus.apiKey = DEFAULT_API_KEY;
    WebpayPlus.environment = Environment.Integration;
  };

  export const configureWebpayPlusDeferredForTesting = () => {
    WebpayPlus.commerceCode = '597055555540';
    WebpayPlus.apiKey = DEFAULT_API_KEY;
    WebpayPlus.environment = Environment.Integration;
  };

  export const configureWebpayPlusMallForTesting = () => {
    WebpayPlus.commerceCode = '597055555535';
    WebpayPlus.apiKey = DEFAULT_API_KEY;
    WebpayPlus.environment = Environment.Integration;
  };

  export const configureWebpayPlusMallDeferredForTesting = () => {
    WebpayPlus.commerceCode = '597055555581';
    WebpayPlus.apiKey = DEFAULT_API_KEY;
    WebpayPlus.environment = Environment.Integration;
  };
}

export default WebpayPlus;
