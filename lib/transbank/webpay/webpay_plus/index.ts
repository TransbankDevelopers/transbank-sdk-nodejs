import Transaction from './transaction';
import DeferredTransaction from './deferred_transaction';
import Environment from '../common/environment';
import Options from '../../common/options';
import MallTransaction from './mall_transaction';
import MallDeferredTransaction from './mall_deferred_transaction';

module WebpayPlus {
  const DEFAULT_API_KEY = '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C';

  export let Transaction: any;
  export let DeferredTransaction: any;
  export let MallTransaction: any;
  export let MallDeferredTransaction: any;

  export let commerceCode: string = '597055555532';
  export let apiKey: string = DEFAULT_API_KEY;
  export let environment: string = Environment.Integration;

  export const getDefaultOptions = () => {
    return new Options(WebpayPlus.commerceCode, WebpayPlus.apiKey, WebpayPlus.environment);
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

WebpayPlus.Transaction = Transaction;
WebpayPlus.DeferredTransaction = DeferredTransaction;
WebpayPlus.MallTransaction = MallTransaction;
WebpayPlus.MallDeferredTransaction = MallDeferredTransaction;

export default WebpayPlus;
