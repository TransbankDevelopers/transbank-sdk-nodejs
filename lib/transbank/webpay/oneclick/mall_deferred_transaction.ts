import MallTransaction from './mall_transaction';
import { CaptureRequest } from './requests';
import RequestService from '../../common/request_service';

class MallDeferredTransaction extends MallTransaction {

  /**
   * Capture a deferred transaction.
   * Your commerce code must be configured to support deferred capture.
   * @param commerceCode Child commerce code, used to indetify the correct child transaction
   * @param buyOrder Child buy order, used to identify the correct child transaction.
   * @param amount Amount to be captured
   * @param authorizationCode Child transaction's authorization code
   */
  async capture(
    commerceCode: string,
    buyOrder: string,
    amount: number,
    authorizationCode: string
  ){
    let captureRequest = new CaptureRequest(commerceCode, buyOrder, amount, authorizationCode);
    return RequestService.perform(captureRequest, this.options);
  }
};

export default MallDeferredTransaction;
