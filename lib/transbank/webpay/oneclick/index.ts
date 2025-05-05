import _MallInscription from './mall_inscription';
import _MallTransaction from './mall_transaction';

module Oneclick {

  /**
   * Contains methods used to start, finish and delete Inscriptions.
   */
  export const MallInscription: typeof _MallInscription = _MallInscription;
  /**
   * Contains methods used to authorize, commit, refund and capture mall Transactions.
   */
  export const MallTransaction: typeof _MallTransaction = _MallTransaction;

}

export default Oneclick;
