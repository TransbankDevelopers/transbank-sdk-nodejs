import TransaccionCompleta from '.';
import Options from '../../common/options';
import InstallmentDetail from '../common/installments_detail';
import TransaccionCompletaCommitDetail from './common/commit_detail';
import TransactionDetail from '../common/transaction_detail';
import BaseTransaction from '../../common/base_transaction';
import { InstallmentsRequest, MallCommitRequest, MallCreateRequest, MallRefundRequest, StatusRequest } from './requests';
import RequestService from '../../common/request_service';

class MallTransaction extends BaseTransaction {

  /**
   * Constructor class MallTransaction.
   * @param options (Optional) You can pass options to use a custom configuration.
   */
   constructor(options: Options = TransaccionCompleta.getDefaultOptions()) { 
    super(options);
  }

  /**
   * Create Transaccion Completa Mall transaction
   * @param buyOrder Commerce buy order, make sure this is unique.
   * @param sessionId You can use this field to pass session data if needed.
   * @param cvv Card verification value
   * @param cardNumber Card's fron number
   * @param cardExpirationDate Card's expiration date
   * @param details Child transactions details, see {@link TransactionDetail} for more information.
   */
  async create(
    buyOrder: string,
    sessionId: string,
    cvv: number | undefined,
    cardNumber: string,
    cardExpirationDate: string,
    details: Array<TransactionDetail>
  ){
    let createRequest = new MallCreateRequest(
      buyOrder,
      sessionId,
      cvv,
      cardNumber.replace(/\s/g, ''),
      cardExpirationDate.replace(/\s/g, ''),
      details
    );
    return RequestService.perform(createRequest, this.options);  
  }

  /**
   * Ask for installment conditions and price of each child transaction
   * @param token Unique transaction identifier
   * @param details Child transactions details, see {@link InstallmentDetail} for more information.
   */
   async installments(
    token: string,
    details: Array<InstallmentDetail>
  ){
    let response = [];
    for (let detail of details) {
      let installmentsRequest = new InstallmentsRequest(
        token,
        detail.installmentsNumber,
        detail.commerceCode,
        detail.buyOrder
      );
      response.push(await RequestService.perform(installmentsRequest, this.options));
    }
    return response;
  }

  /**
   * Commit a transaction
   * @param token Unique transaction identifier
   * @param details Child transactions details, see {@link CommitDetail} for more information.
   */
  async commit(
    token: string,
    details: Array<TransaccionCompletaCommitDetail>
  ){
    return RequestService.perform(new MallCommitRequest(token, details), this.options);
  }

  /**
   * Request a refund of a specific transaction, if you refund for the full amount and you're within
   * the time window the transaction will be reversed. If you're past that window or refund for less
   * than the total amount the transaction will be void.
   * @param token Unique transaction identifier
   * @param buyOrder Child buy order, used to identify the correct child transaction.
   * @param commerceCode Child commerce code, used to indetify the correct child transaction
   * @param amount Amount to be refunded
   */
  async refund(
    token: string,
    buyOrder: string,
    commerceCode: string,
    amount: number
  ){
    let refundRequest = new MallRefundRequest(token, buyOrder, commerceCode, amount);
    return RequestService.perform(refundRequest, this.options);
  }

  /**
   * Obtain the status of a specific transaction
   * @param token Unique transaction identifier
   */
   async status(token: string){
    return RequestService.perform(new StatusRequest(token), this.options);
  }
};

export default MallTransaction;
