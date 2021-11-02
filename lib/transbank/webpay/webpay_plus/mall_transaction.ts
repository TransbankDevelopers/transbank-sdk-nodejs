import WebpayPlus from '.';
import Options from '../../common/options';
import TransactionDetail from '../common/transaction_detail';
import MallTransactionUtil from '../common/mall_transaction_util';
import TransactionUtil from '../common/transaction_util';
import BaseTransaction from '../../common/base_transaction';

class MallTransaction extends BaseTransaction {

  /**
   * Constructor class Webpay Plus transaction.
   * @param options (Optional) You can pass options to use a custom configuration.
   */
   constructor(options: Options = WebpayPlus.getDefaultOptions()) { 
    super(options);
  }

  /**
   * Create a Webpay Plus Mall transaction.
   * @param buyOrder Commerce buy order, make sure this is unique.
   * @param sessionId You can use this field to pass session data if needed.
   * @param returnUrl URL to which Transbank will redirect after card holder pays
   * @param details Child transactions details, see {@link TransactionDetail} for more information.
   */
  async create(
    buyOrder: string,
    sessionId: string,
    returnUrl: string,
    details: Array<TransactionDetail>
  ){
    return MallTransactionUtil.create(buyOrder, sessionId, returnUrl, details, this.options);
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
   * @param buyOrder Child buy order, used to identify the correct child transaction.
   * @param commerceCode Child commerce code, used to indetify the correct child transaction
   * @param amount Amount to be refunded
   * @param options (Optional) You can pass options to use a custom configuration for this request.
   */
   async refund(
    token: string,
    buyOrder: string,
    commerceCode: string,
    amount: number
  ){
    return MallTransactionUtil.refund(token, buyOrder, commerceCode, amount, this.options);
  }
};

export default MallTransaction;
