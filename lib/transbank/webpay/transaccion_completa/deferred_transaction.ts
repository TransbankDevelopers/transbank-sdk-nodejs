import CompleteTransactionUtil from '../common/complete_transaction_util';
import Transaction from './transaction';

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
      return CompleteTransactionUtil.capture(token, buyOrder, authorizationCode, amount, this.options);
  }
}

export default DeferredTransaction;
