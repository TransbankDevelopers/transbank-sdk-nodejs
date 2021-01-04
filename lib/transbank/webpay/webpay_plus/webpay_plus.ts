import Environment from '../common/environment';
import Options from '../../common/options';

export module WebpayPlus {
  export let commerceCode: string = '597055555532';
  export let apiKey: string = '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C';
  export let environment: string = Environment.Integration;

  export const getDefaultOptions = () => {
    return new Options(WebpayPlus.commerceCode, WebpayPlus.apiKey, WebpayPlus.environment);
  };
}
