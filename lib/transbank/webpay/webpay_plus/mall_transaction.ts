import Options from '../../common/options';
import TransactionDetail from '../common/transaction_detail';
import BaseTransaction from '../../common/base_transaction';
import { CommitRequest, MallCreateRequest, MallRefundRequest, StatusRequest } from './requests';
import RequestService from '../../common/request_service';
import MallCaptureRequest from '../transaccion_completa/requests/mall_capture_request';
import Environment from '../common/environment';
import ValidationUtil from '../../common/validation_util';
import ApiConstants from '../../common/api_constants';

class MallTransaction extends BaseTransaction {

  /**
   * Constructor class Webpay Plus transaction.
   * @param options You can pass options to use a custom configuration.
   */
   constructor(options: Options) { 
    super(options);
  }

  /**
   * Creates and returns an instance of `MallTransaction` configured for the integration environment.
   *
   * @param commerceCode The commerce code.
   * @param apiKey The API key used for authentication.
   * @return A new instance of `MallTransaction` configured for the test environment (Environment.Integration).
   */
  static buildForIntegration(commerceCode: string, apiKey: string): MallTransaction
  {
    return new MallTransaction(new Options(commerceCode, apiKey, Environment.Integration));
  }

  /**
   * Creates and returns an instance of `MallTransaction` configured for the production environment.
   *
   * @param commerceCode The commerce code.
   * @param apiKey The API key used for authentication.
   * @return A new instance of `MallTransaction` configured for the production environment (Environment.Production).
   */
  static buildForProduction(commerceCode: string, apiKey: string): MallTransaction
  {
    return new MallTransaction(new Options(commerceCode, apiKey, Environment.Production));
  }

  /**
   * Create a Webpay Plus Mall transaction.
   * @param buyOrder Commerce buy order, make sure this is unique.
   * @param sessionId You can use this field to pass session data if needed.
   * @param returnUrl URL to which Transbank will redirect after card holder pays
   * @param details Child transactions details, see {@link TransactionDetail} for more information.
   */
  async create(
    buyOrder: string,
    sessionId: string,
    returnUrl: string,
    details: Array<TransactionDetail>
  ){
    ValidationUtil.hasTextWithMaxLength(buyOrder, ApiConstants.BUY_ORDER_LENGTH, "buyOrder");
    ValidationUtil.hasTextWithMaxLength(sessionId, ApiConstants.SESSION_ID_LENGTH, "sessionId");
    ValidationUtil.hasTextWithMaxLength(returnUrl, ApiConstants.RETURN_URL_LENGTH, "returnUrl");
    ValidationUtil.hasElements(details, "details");

    for(let i=0; i<details.length; i++){
      let item = details[i];
      ValidationUtil.hasTextWithMaxLength(item.commerceCode, ApiConstants.COMMERCE_CODE_LENGTH, "details.commerceCode");
      ValidationUtil.hasTextWithMaxLength(item.buyOrder, ApiConstants.BUY_ORDER_LENGTH, "details.buyOrder");
    }

    return RequestService.perform(
      new MallCreateRequest(buyOrder, sessionId, returnUrl, details),
      this.options
    );
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
   * @param buyOrder Child buy order, used to identify the correct child transaction.
   * @param childCommerceCode Child commerce code, used to indetify the correct child transaction
   * @param amount Amount to be refunded
   * @param options (Optional) You can pass options to use a custom configuration for this request.
   */
   async refund(
    token: string,
    buyOrder: string,
    childCommerceCode: string,
    amount: number
  ){
    ValidationUtil.hasTextWithMaxLength(token, ApiConstants.TOKEN_LENGTH, "token");
    ValidationUtil.hasTextWithMaxLength(childCommerceCode, ApiConstants.COMMERCE_CODE_LENGTH, "childCommerceCode");
    ValidationUtil.hasTextWithMaxLength(buyOrder, ApiConstants.BUY_ORDER_LENGTH, "buyOrder");
    return RequestService.perform(
      new MallRefundRequest(token, buyOrder, childCommerceCode, amount),
      this.options
    );
  }

  /**
   * Capture a deferred transaction.
   * Your commerce code must be configured to support deferred capture.
   * @param childCommerceCode Child commerce code, used to indetify the correct child transaction
   * @param token Unique transaction identifier
   * @param buyOrder Child buy order, used to identify the correct child transaction.
   * @param authorizationCode Child transaction's authorization code
   * @param captureAmount Amount to be captured
   */
   async capture(
    childCommerceCode: string,
    token: string,
    buyOrder: string,
    authorizationCode: string,
    captureAmount: number
  ){
    ValidationUtil.hasTextWithMaxLength(token, ApiConstants.TOKEN_LENGTH, "token");
    ValidationUtil.hasTextWithMaxLength(childCommerceCode, ApiConstants.COMMERCE_CODE_LENGTH, "childCommerceCode");
    ValidationUtil.hasTextWithMaxLength(buyOrder, ApiConstants.BUY_ORDER_LENGTH, "buyOrder");
    ValidationUtil.hasTextWithMaxLength(authorizationCode, ApiConstants.AUTHORIZATION_CODE_LENGTH, "authorizationCode");
    return RequestService.perform(
      new MallCaptureRequest(token, childCommerceCode, buyOrder, authorizationCode, captureAmount),
      this.options
    );
  }
};

export default MallTransaction;
