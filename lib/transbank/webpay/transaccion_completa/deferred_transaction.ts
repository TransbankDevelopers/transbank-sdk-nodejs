import TransaccionCompleta from '.';
import Options from '../../common/options';
import RequestService from '../../common/request_service';
import { CaptureRequest } from './requests';
import Transaction from './transaction';

const DeferredTransaction = {
  ...Transaction,
  /** Capture a deferred transaction.
   *
   * Your commerce code must be configured to support deferred capture.
   *
   * @param token Unique transaction identifier
   * @param buyOrder Transaction's buy order
   * @param authorizationCode Transaction's authorization code
   * @param amount Amount to be captured
   * @param options (Optional) You can pass options to use a custom configuration for this request.
   */
  capture: async (
    token: string,
    buyOrder: string,
    authorizationCode: string,
    amount: number,
    options: Options = TransaccionCompleta.getDefaultOptions()
  ) => {
    let captureRequest = new CaptureRequest(token, buyOrder, authorizationCode, amount);
    return RequestService.perform(captureRequest, options);
  },
};

export default DeferredTransaction;
