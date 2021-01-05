import Transaction from './transaction';
import Environment from '../common/environment';
import Options from '../../common/options';

module WebpayPlus {
  export let Transaction: any;
  export let commerceCode: string = '597055555532';
  export let apiKey: string = '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C';
  export let environment: string = Environment.Integration;

  export const getDefaultOptions = () => {
    return new Options(WebpayPlus.commerceCode, WebpayPlus.apiKey, WebpayPlus.environment);
  };

  export const configureWebpayPlusForTesting = () => {
    WebpayPlus.commerceCode = '597055555532';
    WebpayPlus.apiKey = '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C';
    WebpayPlus.environment = Environment.Integration;
  };

  export const configureWebpayPlusMallForTesting = () => {
    WebpayPlus.commerceCode = '597055555540';
    WebpayPlus.apiKey = '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C';
    WebpayPlus.environment = Environment.Integration;
  };
}

WebpayPlus.Transaction = Transaction;

export default WebpayPlus;
