import Oneclick from '.';
import Options from '../../common/options';
import RequestService from '../../common/request_service';
import MallTransaction from './mall_transaction';
import { CaptureRequest } from './requests/capture_request';

const MallDeferredTransaction = {
  ...MallTransaction,
  capture: async (
    commerceCode: string,
    buyOrder: string,
    amount: number,
    authorizationCode: string,
    options: Options = Oneclick.getDefaultOptions()
  ) => {
    let captureRequest = new CaptureRequest(commerceCode, buyOrder, amount, authorizationCode);
    return RequestService.perform(captureRequest, options);
  },
};

export default MallDeferredTransaction;
