import Options from '../../common/options';
import RequestService from '../../common/request_service';
import TransaccionCompletaCommitDetail from '../transaccion_completa/common/commit_detail';
import TransactionDetail from './transaction_detail';
import InstallmentDetail from './installments_detail';
import {
  MallCreateRequest,
  MallCaptureRequest,
  InstallmentsRequest,
  MallCommitRequest,
  MallRefundRequest,
} from '../transaccion_completa/requests';

class CompleteMallTransactionUtil {

 /**
   * Create Transaccion Completa Mall transaction
   * @param buyOrder Commerce buy order, make sure this is unique.
   * @param sessionId You can use this field to pass session data if needed.
   * @param cvv Card verification value
   * @param cardNumber Card's fron number
   * @param cardExpirationDate Card's expiration date
   * @param details Child transactions details, see {@link TransactionDetail} for more information.
   * @param options You can pass options to use a custom configuration for this request.
   */
  static async create(
    buyOrder: string,
    sessionId: string,
    cvv: number | undefined,
    cardNumber: string,
    cardExpirationDate: string,
    details: Array<TransactionDetail>,
    options: Options
  ){
    let createRequest = new MallCreateRequest(
      buyOrder,
      sessionId,
      cvv,
      cardNumber.replace(/\s/g, ''),
      cardExpirationDate.replace(/\s/g, ''),
      details
    );
    return RequestService.perform(createRequest, options);
  }

  /**
   * Ask for installment conditions and price of each child transaction
   * @param token Unique transaction identifier
   * @param details Child transactions details, see {@link InstallmentDetail} for more information.
   * @param options You can pass options to use a custom configuration for this request.
   */
   static async installments(
    token: string,
    details: Array<InstallmentDetail>,
    options: Options
  ){
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
  }

  /**
   * Commit a transaction
   * @param token Unique transaction identifier
   * @param details Child transactions details, see {@link CommitDetail} for more information.
   * @param options You can pass options to use a custom configuration for this request.
   */
  static async commit(
    token: string,
    details: Array<TransaccionCompletaCommitDetail>,
    options: Options
  ){
    let commitResponse = new MallCommitRequest(token, details);
    return RequestService.perform(commitResponse, options);
  }

  /**
   * Request a refund of a specific transaction, if you refund for the full amount and you're within
   * the time window the transaction will be reversed. If you're past that window or refund for less
   * than the total amount the transaction will be void.
   * @param token Unique transaction identifier
   * @param buyOrder Child buy order, used to identify the correct child transaction.
   * @param commerceCode Child commerce code, used to indetify the correct child transaction
   * @param amount Amount to be refunded
   * @param options You can pass options to use a custom configuration for this request.
   */
  static async refund(
    token: string,
    buyOrder: string,
    commerceCode: string,
    amount: number,
    options: Options
  ){
    let refundRequest = new MallRefundRequest(token, buyOrder, commerceCode, amount);
    return RequestService.perform(refundRequest, options);
  }

  /**
   * Capture a deferred transaction.
   * Your commerce code must be configured to support deferred capture.
   * @param token Unique transaction identifier
   * @param commerceCode Child commerce code, used to indetify the correct child transaction
   * @param buyOrder Child buy order, used to identify the correct child transaction.
   * @param authorizationCode Child transaction's authorization code
   * @param amount Amount to be captured
   * @param options You can pass options to use a custom configuration for this request.
   */
   static async capture(
    token: string,
    commerceCode: string,
    buyOrder: string,
    authorizationCode: string,
    amount: number,
    options: Options
  ){
    let captureRequest = new MallCaptureRequest(
      token,
      commerceCode,
      buyOrder,
      authorizationCode,
      amount
    );
    return RequestService.perform(captureRequest, options);
  }
}

export default CompleteMallTransactionUtil;