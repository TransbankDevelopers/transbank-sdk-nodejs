import TransaccionCompleta from '.';
import Options from '../../common/options';
import RequestService from '../../common/request_service';
import InstallmentDetail from '../common/installments_detail';
import TransaccionCompletaCommitDetail from './common/commit_detail';
import TransactionDetail from '../common/transaction_detail';
import { InstallmentsRequest, MallCreateRequest } from './requests';
import { MallRefundRequest } from './requests/mall_refund_request';
import Transaction from './transaction';
import MallCommitRequest from './requests/mall_commit_request';

const MallTransaction = {
  ...Transaction,
  /**
   * Create Transaccion Completa Mall transaction
   * @param buyOrder Commerce buy order, make sure this is unique.
   * @param sessionId You can use this field to pass session data if needed.
   * @param cvv Card verification value
   * @param cardNumber Card's fron number
   * @param cardExpirationDate Card's expiration date
   * @param details Child transactions details, see {@link TransactionDetail} for more information.
   * @param options (Optional) You can pass options to use a custom configuration for this request.
   */
  create: async (
    buyOrder: string,
    sessionId: string,
    cvv: number | undefined,
    cardNumber: string,
    cardExpirationDate: string,
    details: Array<TransactionDetail>,
    options: Options = TransaccionCompleta.getDefaultOptions()
  ) => {
    let createRequest = new MallCreateRequest(
      buyOrder,
      sessionId,
      cvv,
      cardNumber.replace(/\s/g, ''),
      cardExpirationDate.replace(/\s/g, ''),
      details
    );
    return RequestService.perform(createRequest, options);
  },
  /**
   * Ask for installment conditions and price of each child transaction
   * @param token Unique transaction identifier
   * @param details Child transactions details, see {@link InstallmentDetail} for more information.
   * @param options (Optional) You can pass options to use a custom configuration for this request.
   */
  installments: async (
    token: string,
    details: Array<InstallmentDetail>,
    options: Options = TransaccionCompleta.getDefaultOptions()
  ) => {
    let response = [];
    for (let detail of details) {
      let installmentsRequest = new InstallmentsRequest(
        token,
        detail.installmentsNumber,
        detail.commerceCode,
        detail.buyOrder
      );
      response.push(await RequestService.perform(installmentsRequest, options));
    }
    return response;
  },
  /**
   * Commit a transaction
   * @param token Unique transaction identifier
   * @param details Child transactions details, see {@link CommitDetail} for more information.
   * @param options (Optional) You can pass options to use a custom configuration for this request.
   */
  commit: async (
    token: string,
    details: Array<TransaccionCompletaCommitDetail>,
    options: Options = TransaccionCompleta.getDefaultOptions()
  ) => {
    let commitResponse = new MallCommitRequest(token, details);
    return RequestService.perform(commitResponse, options);
  },
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
  refund: async (
    token: string,
    buyOrder: string,
    commerceCode: string,
    amount: number,
    options: Options = TransaccionCompleta.getDefaultOptions()
  ) => {
    let refundRequest = new MallRefundRequest(token, buyOrder, commerceCode, amount);
    return RequestService.perform(refundRequest, options);
  },
};

export default MallTransaction;
