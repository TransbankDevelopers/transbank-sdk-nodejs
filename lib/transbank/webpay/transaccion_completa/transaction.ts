import TransaccionCompleta from '.';
import Options from '../../common/options';
import RequestService from '../../common/request_service';
import {
  CommitRequest,
  CreateRequest,
  InstallmentsRequest,
  RefundRequest,
  StatusRequest,
} from './requests';

const Transaction = {
  /**
   * Create a new Transaccion Completa transaction
   * @param buyOrder Commerce buy order, make sure this is unique.
   * @param sessionId You can use this field to pass session data if needed.
   * @param amount Transaction amount
   * @param cvv Card verification value
   * @param cardNumber Card's fron number
   * @param cardExpirationDate Card's expiration date
   * @param options (Optional) You can pass options to use a custom configuration for this request.
   */
  create: async (
    buyOrder: string,
    sessionId: string,
    amount: number,
    cvv: number | undefined,
    cardNumber: string,
    cardExpirationDate: string,
    options: Options = TransaccionCompleta.getDefaultOptions()
  ) => {
    let createRequest = new CreateRequest(
      buyOrder,
      sessionId,
      amount,
      cvv,
      cardNumber.replace(/\s/g, ''),
      cardExpirationDate.replace(/\s/g, '')
    );
    return RequestService.perform(createRequest, options);
  },
  /**
   * Ask for installment conditions and price
   * @param token Unique transaction identifier
   * @param installmentsNumber Number of installments to ask for
   * @param options (Optional) You can pass options to use a custom configuration for this request.
   */
  installments: async (
    token: string,
    installmentsNumber: number,
    options: Options = TransaccionCompleta.getDefaultOptions()
  ) => {
    let installmentsRequest = new InstallmentsRequest(token, installmentsNumber);
    return RequestService.perform(installmentsRequest, options);
  },
  /**
   * Commit a transaction
   * @param token Unique transaction identifier
   * @param idQueryInstallments (Optional) Use this when paying with installments, get it from
   * installments method.
   * @param deferredPeriodIndex (Optional) Use this when paying with installments, you can use this
   * if the commerce is configured to offer deferred payment
   * @param gracePeriod (Optional) Use this when paying with installments, this indicates if there's
   * a grace period.
   * @param options (Optional) You can pass options to use a custom configuration for this request.
   */
  commit: async (
    token: string,
    idQueryInstallments: number | undefined = undefined,
    deferredPeriodIndex: number | undefined = undefined,
    gracePeriod: boolean | undefined = undefined,
    options: Options = TransaccionCompleta.getDefaultOptions()
  ) => {
    let commitRequest = new CommitRequest(
      token,
      idQueryInstallments,
      deferredPeriodIndex,
      gracePeriod
    );
    return RequestService.perform(commitRequest, options);
  },
  /**
   * Obtain the status of a specific transaction
   * @param token Unique transaction identifier
   * @param options (Optional) You can pass options to use a custom configuration for this request.
   */
  status: async (token: string, options: Options = TransaccionCompleta.getDefaultOptions()) => {
    let statusRequest = new StatusRequest(token);
    return RequestService.perform(statusRequest, options);
  },
  /**
   * Request a refund of a specific transaction, if you refund for the full amount and you're within
   * the time window the transaction will be reversed. If you're past that window or refund for less
   * than the total amount the transaction will be void.
   * @param token Unique transaction identifier
   * @param amount Amount to be refunded
   * @param options (Optional) You can pass options to use a custom configuration for this request.
   */
  refund: async (
    token: string,
    amount: number,
    options: Options = TransaccionCompleta.getDefaultOptions()
  ) => {
    let refundRequest = new RefundRequest(token, amount);
    return RequestService.perform(refundRequest, options);
  },
};

export default Transaction;
