import Options from '../../common/options';
import RequestService from '../../common/request_service';
import { MallCreateRequest, MallRefundRequest, MallCaptureRequest } from '../webpay_plus/requests';
import TransactionDetail from '../common/transaction_detail';

class MallTransactionUtil {

  /**
   * Create a Webpay Plus Mall transaction.
   * @param buyOrder Commerce buy order, make sure this is unique.
   * @param sessionId You can use this field to pass session data if needed.
   * @param returnUrl URL to which Transbank will redirect after card holder pays
   * @param details Child transactions details, see {@link TransactionDetail} for more information.
   * @param options You can pass options to use a custom configuration for this request.
   */
   static async create(
    buyOrder: string,
    sessionId: string,
    returnUrl: string,
    details: Array<TransactionDetail>,
    options: Options
  ){
    return RequestService.perform(
      new MallCreateRequest(buyOrder, sessionId, returnUrl, details),
      options
    );
  }

  /**
   * Request a refund of a specific transaction, if you refund for the full amount and you're within
   * the time window the transaction will be reversed. If you're past that window or refund for less
   * than the total amount the transaction will be void.
   * @param token Unique transaction identifier
   * @param buyOrder Child buy order, used to identify the correct child transaction.
   * @param commerceCode Child commerce code, used to indetify the correct child transaction
   * @param amount Amount to be refunded
   * @param options You can pass options to use a custom configuration for this request.
   */
   static async refund(
    token: string,
    buyOrder: string,
    commerceCode: string,
    amount: number,
    options: Options
  ){
    return RequestService.perform(
      new MallRefundRequest(token, buyOrder, commerceCode, amount),
      options
    );
  }

  /**
   * Capture a deferred transaction.
   * Your commerce code must be configured to support deferred capture.
   * @param token Unique transaction identifier
   * @param commerceCode Child commerce code, used to indetify the correct child transaction
   * @param buyOrder Child buy order, used to identify the correct child transaction.
   * @param authorizationCode Child transaction's authorization code
   * @param amount Amount to be captured
   * @param options You can pass options to use a custom configuration for this request.
   */
   static async capture(
    token: string,
    commerceCode: string,
    buyOrder: string,
    authorizationCode: string,
    amount: number,
    options: Options
  ){
    return RequestService.perform(
      new MallCaptureRequest(token, commerceCode, buyOrder, authorizationCode, amount),
      options
    );
  }

}

export default MallTransactionUtil;