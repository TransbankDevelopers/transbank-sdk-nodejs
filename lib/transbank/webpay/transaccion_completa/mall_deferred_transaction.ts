import TransaccionCompleta from '.';
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
    options: Options = TransaccionCompleta.getDefaultOptions()
  ) => {
    let captureRequest = new MallCaptureRequest(
      token,
      commerceCode,
      buyOrder,
      authorizationCode,
      amount
    );
    return RequestService.perform(captureRequest, options);
  },
};

export default MallDeferredTransaction;
