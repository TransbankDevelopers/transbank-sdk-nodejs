import _Transaction from './transaction';
import _MallTransaction from './mall_transaction';

module WebpayPlus {

  /**
   * Contains methods used to create, commit, refund and capture Transactions.
   */
  export const Transaction: typeof _Transaction = _Transaction;

  /**
   * Contains methods used to create, commit, refund and capture Mall Transactions.
   */
  export const MallTransaction: typeof _MallTransaction = _MallTransaction;

}

export default WebpayPlus;
