import Options from '../../common/options';
import RequestService from '../../common/request_service';
import { CreateRequest, CommitRequest, StatusRequest, RefundRequest, CaptureRequest } from '../webpay_plus/requests';

class TransactionUtil {

   /**
   * Create a Webpay Plus transaction.
   * @param buyOrder Commerce buy order, make sure this is unique.
   * @param sessionId You can use this field to pass session data if needed.
   * @param amount Transaction amount
   * @param returnUrl URL to which Transbank will redirect after card holder pays
   * @param options You can pass options to use a custom configuration for this request.
   */
    static  async create(
        buyOrder: string,
        sessionId: string,
        amount: number,
        returnUrl: string,
        options: Options
    ){
        let createRequest = new CreateRequest(buyOrder, sessionId, amount, returnUrl);
        return RequestService.perform(createRequest, options);
    }

  /**
   * Commit a transaction, this should be invoked after the card holder pays
   * @param token Unique transaction identifier
   * @param options You can pass options to use a custom configuration for this request.
   */
   static async commit(token: string, options: Options){
        return RequestService.perform(new CommitRequest(token), options);
    }

  /**
   * Obtain the status of a specific transaction
   * @param token Unique transaction identifier
   * @param options You can pass options to use a custom configuration for this request.
   */
   static async status(token: string, options: Options){
    return RequestService.perform(new StatusRequest(token), options);
  }
  
  /**
   * Request a refund of a specific transaction, if you refund for the full amount and you're within
   * the time window the transaction will be reversed. If you're past that window or refund for less
   * than the total amount the transaction will be void.
   * @param token Unique transaction identifier
   * @param amount Amount to be refunded
   * @param options You can pass options to use a custom configuration for this request.
   */

   static async refund(
    token: string,
    amount: number,
    options: Options
  ){
    return RequestService.perform(new RefundRequest(token, amount), options);
  }

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
   static async capture(
    token: string,
    buyOrder: string,
    authorizationCode: string,
    amount: number,
    options: Options
    ){
    return RequestService.perform(
      new CaptureRequest(token, buyOrder, authorizationCode, amount), options);
  }
}

export default TransactionUtil;