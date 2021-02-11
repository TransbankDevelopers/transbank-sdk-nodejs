import Options from '../../common/options';
import WebpayPlus from '.';
import RequestService from '../../common/request_service';
import Transaction from './transaction';
import { CaptureRequest } from './requests';

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
    options: Options = WebpayPlus.getDefaultOptions()
  ) => {
    return RequestService.perform(
      new CaptureRequest(token, buyOrder, authorizationCode, amount),
      options
    );
  },
};

export default DeferredTransaction;
