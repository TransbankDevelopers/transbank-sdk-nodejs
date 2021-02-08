import Options from '../../common/options';
import Environment from '../common/environment';
import _MallDeferredInscription from './mall_deferred_inscription';
import _MallDeferredTransaction from './mall_deferred_transaction';
import _MallInscription from './mall_inscription';
import _MallTransaction from './mall_transaction';

module Oneclick {
  const DEFAULT_API_KEY = '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C';

  export let MallInscription: typeof _MallInscription;
  export let MallTransaction: typeof _MallTransaction;
  export let MallDeferredInscription: typeof _MallDeferredInscription;
  export let MallDeferredTransaction: typeof _MallDeferredTransaction;

  export let commerceCode: string = '597055555541';
  export let apiKey: string = DEFAULT_API_KEY;
  export let environment: string = Environment.Integration;

  export const getDefaultOptions = () => {
    return new Options(Oneclick.commerceCode, Oneclick.apiKey, Oneclick.environment);
  };

  export const configureForProduction = (_commerceCode: string, _apiKey: string) => {
    Oneclick.commerceCode = _commerceCode;
    Oneclick.apiKey = _apiKey;
    Oneclick.environment = Environment.Production;
  };

  export const configureForIntegration = (_commerceCode: string, _apiKey: string) => {
    Oneclick.commerceCode = _commerceCode;
    Oneclick.apiKey = _apiKey;
    Oneclick.environment = Environment.Integration;
  };

  export const configureOneclickMallForTesting = () => {
    Oneclick.commerceCode = '597055555541';
    Oneclick.apiKey = DEFAULT_API_KEY;
    Oneclick.environment = Environment.Integration;
  };

  export const configureOneclickMallDeferredForTesting = () => {
    Oneclick.commerceCode = '597055555547';
    Oneclick.apiKey = DEFAULT_API_KEY;
    Oneclick.environment = Environment.Integration;
  };
}

Oneclick.MallInscription = _MallInscription;
Oneclick.MallTransaction = _MallTransaction;
Oneclick.MallDeferredInscription = _MallDeferredInscription;
Oneclick.MallDeferredTransaction = _MallDeferredTransaction;

export default Oneclick;
