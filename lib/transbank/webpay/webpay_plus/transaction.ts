import Options from '../../common/options';
import WebpayPlus from './';
import BaseTransaction from '../../common/base_transaction';
import { CaptureRequest, CommitRequest, CreateRequest, RefundRequest, StatusRequest } from './requests';
import RequestService from '../../common/request_service';
import IntegrationCommerceCodes from '../../common/integration_commerce_codes';
import IntegrationApiKeys from '../../common/integration_api_keys';
import Environment from '../common/environment';
import ValidationUtil from '../../common/validation_util';
import ApiConstants from '../../common/api_constants';
import { DeferredCaptureHistoryRequest, GetDeferredCaptureHistoryRequest, IncreaseAmountRequest, IncreaseAuthorizationDateRequest, ReversePreAuthorizedAmountRequest } from '../requests';

/**
 * Contains methods to interact with WebpayPlus API
 */
class Transaction extends BaseTransaction {

  /**
   * Constructor class Webpay Plus transaction.
   * @param options (Optional) You can pass options to use a custom configuration.
   */
  constructor(options: Options) { 
    options = options || WebpayPlus.getDefaultOptions() || new Options(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY, Environment.Integration);
    super(options);
  }

  /**
   * Create a Webpay Plus transaction.
   * @param buyOrder Commerce buy order, make sure this is unique.
   * @param sessionId You can use this field to pass session data if needed.
   * @param amount Transaction amount
   * @param returnUrl URL to which Transbank will redirect after card holder pays
   */
   async create(
    buyOrder: string,
    sessionId: string,
    amount: number,
    returnUrl: string
   ){
    ValidationUtil.hasTextWithMaxLength(buyOrder, ApiConstants.BUY_ORDER_LENGTH, "buyOrder");
    ValidationUtil.hasTextWithMaxLength(sessionId, ApiConstants.SESSION_ID_LENGTH, "sessionId");
    ValidationUtil.hasTextWithMaxLength(returnUrl, ApiConstants.RETURN_URL_LENGTH, "returnUrl");

    let createRequest = new CreateRequest(buyOrder, sessionId, amount, returnUrl);
    return RequestService.perform(createRequest, this.options);
  }
  
  /**
   * Commit a transaction, this should be invoked after the card holder pays
   * @param token Unique transaction identifier
   */
   async commit(token: string){
    ValidationUtil.hasTextWithMaxLength(token, ApiConstants.TOKEN_LENGTH, "token");
    return RequestService.perform(new CommitRequest(token), this.options);
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
    return RequestService.perform(new RefundRequest(token, amount), this.options);
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
    return RequestService.perform(
      new CaptureRequest(token, buyOrder, authorizationCode, captureAmount), this.options);
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
}

export default Transaction;
