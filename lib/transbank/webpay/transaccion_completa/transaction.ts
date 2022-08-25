import TransaccionCompleta from '.';
import Options from '../../common/options';
import BaseTransaction from '../../common/base_transaction';
import { CaptureRequest, CommitRequest, CreateRequest, InstallmentsRequest, RefundRequest, StatusRequest } from './requests';
import RequestService from '../../common/request_service';
import Environment from '../common/environment';
import IntegrationCommerceCodes from '../../common/integration_commerce_codes';
import IntegrationApiKeys from '../../common/integration_api_keys';
import ValidationUtil from '../../common/validation_util';
import ApiConstants from '../../common/api_constants';
import { GetDeferredCaptureHistoryRequest, IncreaseAmountRequest, IncreaseAuthorizationDateRequest, ReversePreAuthorizedAmountRequest } from '../requests';

class Transaction extends BaseTransaction {

  /**
   * Constructor class transaction.
   * @param options (Optional) You can pass options to use a custom configuration.
   */
  constructor(options: Options) { 
    options = options || TransaccionCompleta.getDefaultOptions() || new Options(IntegrationCommerceCodes.TRANSACCION_COMPLETA, IntegrationApiKeys.WEBPAY, Environment.Integration);
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
    ValidationUtil.hasTextWithMaxLength(buyOrder, ApiConstants.BUY_ORDER_LENGTH, "buyOrder");
    ValidationUtil.hasTextWithMaxLength(sessionId, ApiConstants.SESSION_ID_LENGTH, "sessionId");
    ValidationUtil.hasTextWithMaxLength(cardNumber, ApiConstants.CARD_NUMBER_LENGTH, "cardNumber");
    ValidationUtil.hasTextWithMaxLength(cardExpirationDate, ApiConstants.CARD_EXPIRATION_DATE_LENGTH, "cardExpirationDate");

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
    ValidationUtil.hasTextWithMaxLength(token, ApiConstants.TOKEN_LENGTH, "token");
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
    ValidationUtil.hasTextWithMaxLength(token, ApiConstants.TOKEN_LENGTH, "token");
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
    ValidationUtil.hasTextWithMaxLength(token, ApiConstants.TOKEN_LENGTH, "token");
    return RequestService.perform(new StatusRequest(token), this.options);
  }

  /**
   * Request a refund of a specific transaction, if you refund for the full amount and you're within
   * the time window the transaction will be reversed. If you're past that window or refund for less
   * than the total amount the transaction will be void.
   * @param token Unique transaction identifier
   * @param amount Amount to be refunded
   */
   async refund(
    token: string,
    amount: number
  ){
    ValidationUtil.hasTextWithMaxLength(token, ApiConstants.TOKEN_LENGTH, "token");
    let refundRequest = new RefundRequest(token, amount);
    return RequestService.perform(refundRequest, this.options);
  }

  /** Capture a deferred transaction.
   *
   * Your commerce code must be configured to support deferred capture.
   *
   * @param token Unique transaction identifier
   * @param buyOrder Transaction's buy order
   * @param authorizationCode Transaction's authorization code
   * @param captureAmount Amount to be captured
   */
   async capture(
    token: string,
    buyOrder: string,
    authorizationCode: string,
    captureAmount: number
    ){
      ValidationUtil.hasTextWithMaxLength(token, ApiConstants.TOKEN_LENGTH, "token");
      ValidationUtil.hasTextWithMaxLength(buyOrder, ApiConstants.BUY_ORDER_LENGTH, "buyOrder");
      ValidationUtil.hasTextWithMaxLength(authorizationCode, ApiConstants.AUTHORIZATION_CODE_LENGTH, "authorizationCode");
      let captureRequest = new CaptureRequest(token, buyOrder, authorizationCode, captureAmount);
      return RequestService.perform(captureRequest, this.options);
  }

  /** Increase pre-authorizate amount.
   *
   * Your commerce code must be configured to support deferred capture.
   *
   * @param token Unique transaction identifier
   * @param buyOrder Transaction's buy order
   * @param authorizationCode Transaction's authorization code
   * @param amount Amount to be increase
   */
  async increaseAmount (
    token: string,
    buyOrder: string,
    authorizationCode: string,
    amount: number
  ){
    ValidationUtil.hasTextWithMaxLength(token, ApiConstants.TOKEN_LENGTH, "token");
    ValidationUtil.hasTextWithMaxLength(buyOrder, ApiConstants.BUY_ORDER_LENGTH, "buyOrder");
    ValidationUtil.hasTextWithMaxLength(authorizationCode, ApiConstants.AUTHORIZATION_CODE_LENGTH, "authorizationCode");
    return RequestService.perform(
      new IncreaseAmountRequest(`${ApiConstants.WEBPAY_ENDPOINT}/transactions/${token}/amount`, this.options.commerceCode, buyOrder, authorizationCode, amount),
      this.options
    );
  }

  /** Increase authorization date.
   *
   * Your commerce code must be configured to support deferred capture.
   *
   * @param token Unique transaction identifier
   * @param buyOrder Transaction's buy order
   * @param authorizationCode Transaction's authorization code
   */
  async increaseAuthorizationDate(
    token: string,
    buyOrder: string,
    authorizationCode: string
  ){
    ValidationUtil.hasTextWithMaxLength(token, ApiConstants.TOKEN_LENGTH, "token");
    ValidationUtil.hasTextWithMaxLength(buyOrder, ApiConstants.BUY_ORDER_LENGTH, "buyOrder");
    ValidationUtil.hasTextWithMaxLength(authorizationCode, ApiConstants.AUTHORIZATION_CODE_LENGTH, "authorizationCode");
    return RequestService.perform(
      new IncreaseAuthorizationDateRequest(`${ApiConstants.WEBPAY_ENDPOINT}/transactions/${token}/authorization_date`, this.options.commerceCode, buyOrder, authorizationCode),
      this.options
    );
  }

  /** Reverse pre-authorizate amount.
   *
   * Your commerce code must be configured to support deferred capture.
   *
   * @param token Unique transaction identifier
   * @param buyOrder Transaction's buy order
   * @param authorizationCode Transaction's authorization code
   * @param amount Amount to be decrease
   */
  async reversePreAuthorizedAmount(
    token: string,
    buyOrder: string,
    authorizationCode: string,
    amount: number
  ){
    ValidationUtil.hasTextWithMaxLength(token, ApiConstants.TOKEN_LENGTH, "token");
    ValidationUtil.hasTextWithMaxLength(buyOrder, ApiConstants.BUY_ORDER_LENGTH, "buyOrder");
    ValidationUtil.hasTextWithMaxLength(authorizationCode, ApiConstants.AUTHORIZATION_CODE_LENGTH, "authorizationCode");
    return RequestService.perform(
      new ReversePreAuthorizedAmountRequest(`${ApiConstants.WEBPAY_ENDPOINT}/transactions/${token}/reverse/amount`, this.options.commerceCode, buyOrder, authorizationCode, amount),
      this.options
    );
  }

  /** List deferred capture history.
   *
   * Your commerce code must be configured to support deferred capture.
   *
   * @param token Unique transaction identifier
   */
  async deferredCaptureHistory(
    token: string
  ){
    ValidationUtil.hasTextWithMaxLength(token, ApiConstants.TOKEN_LENGTH, "token");

    return RequestService.perform(
      new GetDeferredCaptureHistoryRequest(`${ApiConstants.WEBPAY_ENDPOINT}/transactions/${token}/details`),
      this.options
    );
  }
  
};

export default Transaction;
