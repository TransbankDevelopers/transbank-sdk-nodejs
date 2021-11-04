import { CaptureRequest } from './requests';
import Transaction from './transaction';
import RequestService from '../../common/request_service';

class DeferredTransaction extends Transaction {

  /** Capture a deferred transaction.
   *
   * Your commerce code must be configured to support deferred capture.
   *
   * @param token Unique transaction identifier
   * @param buyOrder Transaction's buy order
   * @param authorizationCode Transaction's authorization code
   * @param amount Amount to be captured
   */
  async capture(
    token: string,
    buyOrder: string,
    authorizationCode: string,
    amount: number
    ){
      let captureRequest = new CaptureRequest(token, buyOrder, authorizationCode, amount);
      return RequestService.perform(captureRequest, this.options);
  }
}

export default DeferredTransaction;
