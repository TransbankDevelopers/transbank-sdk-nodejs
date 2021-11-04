import TransaccionCompleta from '.';
import Options from '../../common/options';
import BaseTransaction from '../../common/base_transaction';
import { CommitRequest, CreateRequest, InstallmentsRequest, RefundRequest, StatusRequest } from './requests';
import RequestService from '../../common/request_service';

class Transaction extends BaseTransaction {

  /**
   * Constructor class transaction.
   * @param options (Optional) You can pass options to use a custom configuration.
   */
  constructor(options: Options = TransaccionCompleta.getDefaultOptions()) { 
    super(options);
  }

  /**
   * Create a new Transaccion Completa transaction
   * @param buyOrder Commerce buy order, make sure this is unique.
   * @param sessionId You can use this field to pass session data if needed.
   * @param amount Transaction amount
   * @param cvv Card verification value
   * @param cardNumber Card's fron number
   * @param cardExpirationDate Card's expiration date
   */
  async create(
    buyOrder: string,
    sessionId: string,
    amount: number,
    cvv: number | undefined,
    cardNumber: string,
    cardExpirationDate: string
  ){
    let createRequest = new CreateRequest(
      buyOrder,
      sessionId,
      amount,
      cvv,
      cardNumber.replace(/\s/g, ''),
      cardExpirationDate.replace(/\s/g, '')
      );
      return RequestService.perform(createRequest, this.options);
  }

  /**
   * Ask for installment conditions and price
   * @param token Unique transaction identifier
   * @param installmentsNumber Number of installments to ask for
   */
  async installments(
    token: string,
    installmentsNumber: number
  ){
      return RequestService.perform(new InstallmentsRequest(token, installmentsNumber), this.options);
  }

  /**
   * Commit a transaction
   * @param token Unique transaction identifier
   * @param idQueryInstallments (Optional) Use this when paying with installments, get it from
   * installments method.
   * @param deferredPeriodIndex (Optional) Use this when paying with installments, you can use this
   * if the commerce is configured to offer deferred payment
   * @param gracePeriod (Optional) Use this when paying with installments, this indicates if there's
   * a grace period.
   */
  async commit(
    token: string,
    idQueryInstallments: number | undefined = undefined,
    deferredPeriodIndex: number | undefined = undefined,
    gracePeriod: boolean | undefined = undefined
  ){
    let commitRequest = new CommitRequest(
      token,
      idQueryInstallments,
      deferredPeriodIndex,
      gracePeriod
    );
    return RequestService.perform(commitRequest, this.options);  
  }

  /**
   * Obtain the status of a specific transaction
   * @param token Unique transaction identifier
   */
  async status(token: string){
    return RequestService.perform(new StatusRequest(token), this.options);
  }

  /**
   * Request a refund of a specific transaction, if you refund for the full amount and you're within
   * the time window the transaction will be reversed. If you're past that window or refund for less
   * than the total amount the transaction will be void.
   * @param token Unique transaction identifier
   * @param amount Amount to be refunded
   */
  refund(
    token: string,
    amount: number
  ){
    let refundRequest = new RefundRequest(token, amount);
    return RequestService.perform(refundRequest, this.options);
  }
};

export default Transaction;
