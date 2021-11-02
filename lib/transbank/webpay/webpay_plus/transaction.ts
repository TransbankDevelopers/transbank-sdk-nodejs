import Options from '../../common/options';
import WebpayPlus from './';
import TransactionUtil from '../common/transaction_util';
import BaseTransaction from '../../common/base_transaction';

/**
 * Contains methods to interact with WebpayPlus API
 */
class Transaction extends BaseTransaction {

  /**
   * Constructor class Webpay Plus transaction.
   * @param options (Optional) You can pass options to use a custom configuration.
   */
  constructor(options: Options = WebpayPlus.getDefaultOptions()) { 
    super(options);
  }

  /**
   * Create a Webpay Plus transaction.
   * @param buyOrder Commerce buy order, make sure this is unique.
   * @param sessionId You can use this field to pass session data if needed.
   * @param amount Transaction amount
   * @param returnUrl URL to which Transbank will redirect after card holder pays
   */
   async create(
    buyOrder: string,
    sessionId: string,
    amount: number,
    returnUrl: string
   ){
    return TransactionUtil.create(buyOrder, sessionId, amount, returnUrl, this.options);
  }
  
  /**
   * Commit a transaction, this should be invoked after the card holder pays
   * @param token Unique transaction identifier
   */
   async commit(token: string){
    return TransactionUtil.commit(token, this.options);
  }
  /**
   * Obtain the status of a specific transaction
   * @param token Unique transaction identifier
   */
   async status(token: string){
    return TransactionUtil.status(token, this.options);
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
    return TransactionUtil.refund(token, amount, this.options);
  }
}

export default Transaction;
