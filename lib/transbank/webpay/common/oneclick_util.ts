import Options from '../../common/options';
import RequestService from '../../common/request_service';
import TransactionDetail from '../common/transaction_detail';
import { StartRequest, FinishRequest, DeleteRequest, AuthorizeRequest, StatusRequest, RefundRequest, CaptureRequest } from '../oneclick/requests';

class OneclickUtil {

    /**
   * Starts a card inscription process
   * @param userName Cardholder's username
   * @param email Cardholder's email
   * @param responseUrl URL to which Transbank will redirect after cardholder finish enrolling
   * their card
   * @param options You can pass options to use a custom configuration for this request.
   */
  static async start(
    userName: string,
    email: string,
    responseUrl: string,
    options: Options
  ){
    let startRequest = new StartRequest(userName, email, responseUrl);
    return RequestService.perform(startRequest, options);
  }

  /**
   * This finalizes the card enrolling process
   * @param token Unique inscription identifier
   * @param options You can pass options to use a custom configuration for this request.
   */
   static async finish(token: string, options: Options){
    let finishRequest = new FinishRequest(token);
    return RequestService.perform(finishRequest, options);
  }
  
  /**
   * This deletes an inscription
   * @param tbkUser Cardholder's card TBK user assigned by Transbank and returned in
   * Inscription.finish
   * @param userName Cardholder's username
   * @param options You can pass options to use a custom configuration for this request.
   */
   static async delete(
    tbkUser: string,
    userName: string,
    options: Options
  ){
    let deleteRequest = new DeleteRequest(tbkUser, userName);
    return RequestService.perform(deleteRequest, options);
  }

  /**
   * Authorizes a payment to be charde onto the cardholder's card
   * @param userName Cardholder's username
   * @param tbkUser Cardholder's card TBK user assigned by Transbank and returned in
   * Inscription.finish
   * @param buyOrder Commerce buy order, make sure this is unique.
   * @param details Child transactions details, see {@link TransactionDetail} for more information.
   * @param options You can pass options to use a custom configuration for this request.
   */
   static async authorize(
    userName: string,
    tbkUser: string,
    buyOrder: string,
    details: Array<TransactionDetail>,
    options: Options
  ){
    let authorizeRequest = new AuthorizeRequest(userName, tbkUser, buyOrder, details);
    return RequestService.perform(authorizeRequest, options);
  }

  /**
   * Obtain the status of a specific transaction
   * @param buyOrder Child transaction buy order
   * @param options You can pass options to use a custom configuration for this request.
   */
   static async status(buyOrder: string, options: Options){
    let statusRequest = new StatusRequest(buyOrder);
    return RequestService.perform(statusRequest, options);
  }

  /**
   * Request a refund of a specific transaction, if you refund for the full amount and you're within
   * the time window the transaction will be reversed. If you're past that window or refund for less
   * than the total amount the transaction will be void.
   * @param buyOrder Child transaction buy order
   * @param commerceCode Child commerce code, used to indetify the correct child transaction
   * @param childBuyOrder Child buy order, used to identify the correct child transaction.
   * @param amount Amount to be refunded
   * @param options You can pass options to use a custom configuration for this request.
   */
   static async refund(
    buyOrder: string,
    commerceCode: string,
    childBuyOrder: string,
    amount: number,
    options: Options
  ){
    let refundRequest = new RefundRequest(buyOrder, commerceCode, childBuyOrder, amount);
    return RequestService.perform(refundRequest, options);
  }

  /**
   * Capture a deferred transaction.
   * Your commerce code must be configured to support deferred capture.
   * @param commerceCode Child commerce code, used to indetify the correct child transaction
   * @param buyOrder Child buy order, used to identify the correct child transaction.
   * @param amount Amount to be captured
   * @param authorizationCode Child transaction's authorization code
   * @param options You can pass options to use a custom configuration for this request.
   */
   static async capture (
    commerceCode: string,
    buyOrder: string,
    amount: number,
    authorizationCode: string,
    options: Options
  ){
    let captureRequest = new CaptureRequest(commerceCode, buyOrder, amount, authorizationCode);
    return RequestService.perform(captureRequest, options);
  }
  
}

export default OneclickUtil;