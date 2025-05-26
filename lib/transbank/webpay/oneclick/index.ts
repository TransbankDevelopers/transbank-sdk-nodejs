import _MallInscription from './mall_inscription';
import _MallTransaction from './mall_transaction';
import _MallBinInfo from './mall_bin_info';

module Oneclick {
  /**
   * Contains methods used to start, finish and delete Inscriptions.
   */
  export const MallInscription: typeof _MallInscription = _MallInscription;
  /**
   * Contains methods used to authorize, commit, refund and capture mall Transactions.
   */
  export const MallTransaction: typeof _MallTransaction = _MallTransaction;
  /**
   * Contains method used to query bin info.
   */
  export const MallBinInfo: typeof _MallBinInfo = _MallBinInfo;
}

export default Oneclick;
