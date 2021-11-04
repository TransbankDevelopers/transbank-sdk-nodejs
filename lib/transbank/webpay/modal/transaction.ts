import Options from '../../common/options';
import BaseTransaction from '../../common/base_transaction';
import WebpayPlusModal from './';
import { ModalCreateRequest } from './requests';
import RequestService from '../../common/request_service';
import { CommitRequest, RefundRequest, StatusRequest } from '../webpay_plus/requests';


/**
 * Contains methods to interact with WebpayPlus API
 */
class Transaction extends BaseTransaction {

  /**
   * Constructor class Webpay Plus transaction.
   * @param options (Optional) You can pass options to use a custom configuration.
   */
  constructor(options: Options = WebpayPlusModal.getDefaultOptions()) { 
    super(options);
  }

  /**
   * Create a Webpay Plus transaction.
   * @param buyOrder Commerce buy order, make sure this is unique.
   * @param sessionId You can use this field to pass session data if needed.
   * @param amount Transaction amount
   */
   async create(
    buyOrder: string,
    sessionId: string,
    amount: number
   ){
    let createRequest = new ModalCreateRequest(buyOrder, sessionId, amount);
    return RequestService.perform(createRequest, this.options);
  }
  
  /**
   * Commit a transaction, this should be invoked after the card holder pays
   * @param token Unique transaction identifier
   */
   async commit(token: string){
    return RequestService.perform(new CommitRequest(token), this.options);
  }
  /**
   * Obtain the status of a specific transaction
   * @param token Unique transaction identifier
   */
   async status(token: string){
    return RequestService.perform(new StatusRequest(token), this.options);
   }

  /**
   * Request a refund of a specific transaction, if you refund for the full amount and you're within
   * the time window the transaction will be reversed. If you're past that window or refund for less
   * than the total amount the transaction will be void.
   * @param token Unique transaction identifier
   * @param amount Amount to be refunded
   */
  async refund(
    token: string,
    amount: number
  ){
    return RequestService.perform(new RefundRequest(token, amount), this.options);
  }
}

export default Transaction;
