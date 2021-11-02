import TransaccionCompleta from '.';
import Options from '../../common/options';
import BaseTransaction from '../../common/base_transaction';
import CompleteTransactionUtil from '../common/complete_transaction_util';

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
    return CompleteTransactionUtil.create(buyOrder,
      sessionId,
      amount,
      cvv,
      cardNumber,
      cardExpirationDate,
      this.options);
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
    return CompleteTransactionUtil.installments(token, installmentsNumber, this.options);
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
    return CompleteTransactionUtil.commit(token,
      idQueryInstallments,
      deferredPeriodIndex,
      gracePeriod,
      this.options);
  }

  /**
   * Obtain the status of a specific transaction
   * @param token Unique transaction identifier
   */
  async status(token: string){
    return CompleteTransactionUtil.status(token, this.options);
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
    return CompleteTransactionUtil.refund(token, amount, this.options);
  }
};

export default Transaction;
