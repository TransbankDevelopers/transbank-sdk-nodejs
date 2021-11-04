import MallTransaction from './mall_transaction';
import MallCaptureRequest from '../transaccion_completa/requests/mall_capture_request';
import RequestService from '../../common/request_service';

class MallDeferredTransaction extends MallTransaction {

  /**
   * Capture a deferred transaction.
   * Your commerce code must be configured to support deferred capture.
   * @param token Unique transaction identifier
   * @param commerceCode Child commerce code, used to indetify the correct child transaction
   * @param buyOrder Child buy order, used to identify the correct child transaction.
   * @param authorizationCode Child transaction's authorization code
   * @param amount Amount to be captured
   */
   async capture(
    token: string,
    commerceCode: string,
    buyOrder: string,
    authorizationCode: string,
    amount: number
  ){
    return RequestService.perform(
      new MallCaptureRequest(token, commerceCode, buyOrder, authorizationCode, amount),
      this.options
    );
  }
};

export default MallDeferredTransaction;
