import TransaccionCompleta from '.';
import Options from '../../common/options';
import RequestService from '../../common/request_service';
import { CaptureRequest } from './requests';
import Transaction from './transaction';

const DeferredTransaction = {
  ...Transaction,
  capture: async (
    token: string,
    buyOrder: string,
    sessionId: string,
    amount: number,
    options: Options = TransaccionCompleta.getDefaultOptions()
  ) => {
    let captureRequest = new CaptureRequest(token, buyOrder, sessionId, amount);
    return RequestService.perform(captureRequest, options);
  },
};

export default DeferredTransaction;
