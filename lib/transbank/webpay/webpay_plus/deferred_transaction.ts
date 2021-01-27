import Options from '../../common/options';
import WebpayPlus from '.';
import RequestService from '../../common/request_service';
import Transaction from './transaction';
import { CaptureRequest } from './requests';

const DeferredTransaction = {
  ...Transaction,
  capture: async (
    token: string,
    buyOrder: string,
    authorizationCode: string,
    amount: number,
    options: Options = WebpayPlus.getDefaultOptions()
  ) => {
    return RequestService.perform(
      new CaptureRequest(token, buyOrder, authorizationCode, amount),
      options
    );
  },
};

export default DeferredTransaction;
