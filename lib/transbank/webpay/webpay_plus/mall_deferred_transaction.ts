import WebpayPlus from '.';
import Options from '../../common/options';
import RequestService from '../../common/request_service';
import MallTransaction from './mall_transaction';
import { MallCaptureRequest } from './requests';

const MallDeferredTransaction = {
  ...MallTransaction,
  capture: async (
    token: string,
    commerceCode: string,
    buyOrder: string,
    authorizationCode: string,
    amount: number,
    options: Options = WebpayPlus.getDefaultOptions()
  ) => {
    return RequestService.perform(
      new MallCaptureRequest(token, commerceCode, buyOrder, authorizationCode, amount),
      options
    );
  },
};

export default MallDeferredTransaction;
