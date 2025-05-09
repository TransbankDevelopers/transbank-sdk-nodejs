import Options from '../../common/options';
import BaseTransaction from '../../common/base_transaction';
import { CaptureRequest, CommitRequest, CreateRequest, RefundRequest, StatusRequest } from './requests';
import RequestService from '../../common/request_service';
import Environment from '../common/environment';
import ValidationUtil from '../../common/validation_util';
import ApiConstants from '../../common/api_constants';

/**
 * Contains methods to interact with WebpayPlus API
 */
class Transaction extends BaseTransaction {

  /**
   * Constructor class Webpay Plus transaction.
   * @param options You can pass options to use a custom configuration.
   */
  constructor(options: Options) { 
    super(options);
  }

  /**
   * Creates and returns an instance of `Transaction` configured for the integration environment.
   *
   * @param commerceCode The commerce code.
   * @param apiKey The API key used for authentication.
   * @return A new instance of `Transaction` configured for the test environment (Environment.Integration).
   */
  static buildForIntegration(commerceCode: string, apiKey: string): Transaction
  {
    return new Transaction(new Options(commerceCode, apiKey, Environment.Integration));
  }

  /**
   * Creates and returns an instance of `Transaction` configured for the production environment.
   *
   * @param commerceCode The commerce code.
   * @param apiKey The API key used for authentication.
   * @return A new instance of `Transaction` configured for the production environment (Environment.Production).
   */
  static buildForProduction(commerceCode: string, apiKey: string): Transaction
  {
    return new Transaction(new Options(commerceCode, apiKey, Environment.Production));
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
}

export default Transaction;
