import Transaction from './transaction';
import TransactionUtil from '../common/transaction_util';

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
    return TransactionUtil.capture(token, buyOrder, authorizationCode, amount, this.options);
   }
};

export default DeferredTransaction;
