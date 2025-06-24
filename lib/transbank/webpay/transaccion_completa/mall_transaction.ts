import Options from '../../common/options';
import InstallmentDetail from '../common/installments_detail';
import TransaccionCompletaCommitDetail from './common/commit_detail';
import TransactionDetail from '../common/transaction_detail';
import BaseTransaction from '../../common/base_transaction';
import { InstallmentsRequest, MallCommitRequest, MallCreateRequest, MallRefundRequest, StatusRequest } from './requests';
import RequestService from '../../common/request_service';
import MallCaptureRequest from './requests/mall_capture_request';
import Environment from '../common/environment';
import ValidationUtil from '../../common/validation_util';
import ApiConstants from '../../common/api_constants';

class MallTransaction extends BaseTransaction {

  /**
   * Constructor class MallTransaction.
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
   * Create Transaccion Completa Mall transaction
   * @param buyOrder Commerce buy order, make sure this is unique.
   * @param sessionId You can use this field to pass session data if needed.
   * @param cardNumber Card's fron number
   * @param cardExpirationDate Card's expiration date
   * @param details Child transactions details, see {@link TransactionDetail} for more information.
   * @param cvv Card verification value
   */
  async create(
    buyOrder: string,
    sessionId: string,
    cardNumber: string,
    cardExpirationDate: string,
    details: Array<TransactionDetail>,
    cvv: number | undefined
  ){
    ValidationUtil.hasTextWithMaxLength(buyOrder, ApiConstants.BUY_ORDER_LENGTH, "buyOrder");
    ValidationUtil.hasTextWithMaxLength(sessionId, ApiConstants.SESSION_ID_LENGTH, "sessionId");
    ValidationUtil.hasTextWithMaxLength(cardNumber, ApiConstants.CARD_NUMBER_LENGTH, "cardNumber");
    ValidationUtil.hasTextWithMaxLength(cardExpirationDate, ApiConstants.CARD_EXPIRATION_DATE_LENGTH, "cardExpirationDate");
    ValidationUtil.hasElements(details, "details");

    for(let i=0; i<details.length; i++){
      let item = details[i];
      ValidationUtil.hasTextWithMaxLength(item.commerceCode, ApiConstants.COMMERCE_CODE_LENGTH, "details.commerceCode");
      ValidationUtil.hasTextWithMaxLength(item.buyOrder, ApiConstants.BUY_ORDER_LENGTH, "details.buyOrder");
    }

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
    ValidationUtil.hasTextWithMaxLength(token, ApiConstants.TOKEN_LENGTH, "token");
    let response = [];
    for (let detail of details) {
      response.push(await RequestService.perform(new InstallmentsRequest(
        token,
        detail.installmentsNumber,
        detail.commerceCode,
        detail.buyOrder
      ), this.options));
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
    ValidationUtil.hasTextWithMaxLength(token, ApiConstants.TOKEN_LENGTH, "token");
    return RequestService.perform(new MallCommitRequest(token, details), this.options);
  }

  /**
   * Request a refund of a specific transaction, if you refund for the full amount and you're within
   * the time window the transaction will be reversed. If you're past that window or refund for less
   * than the total amount the transaction will be void.
   * @param token Unique transaction identifier
   * @param buyOrder Child buy order, used to identify the correct child transaction.
   * @param childCommerceCode Child commerce code, used to indetify the correct child transaction
   * @param amount Amount to be refunded
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
    let refundRequest = new MallRefundRequest(token, buyOrder, childCommerceCode, amount);
    return RequestService.perform(refundRequest, this.options);
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
   * Capture a deferred transaction.
   * Your commerce code must be configured to support deferred capture.
   * @param token Unique transaction identifier
   * @param commerceCode Child commerce code, used to indetify the correct child transaction
   * @param buyOrder Child buy order, used to identify the correct child transaction.
   * @param authorizationCode Child transaction's authorization code
   * @param captureAmount Amount to be captured
   */
   async capture(
    token: string,
    commerceCode: string,
    buyOrder: string,
    authorizationCode: string,
    captureAmount: number
  ){
    ValidationUtil.hasTextWithMaxLength(token, ApiConstants.TOKEN_LENGTH, "token");
    ValidationUtil.hasTextWithMaxLength(commerceCode, ApiConstants.COMMERCE_CODE_LENGTH, "commerceCode");
    ValidationUtil.hasTextWithMaxLength(buyOrder, ApiConstants.BUY_ORDER_LENGTH, "buyOrder");
    ValidationUtil.hasTextWithMaxLength(authorizationCode, ApiConstants.AUTHORIZATION_CODE_LENGTH, "authorizationCode");
    let captureRequest = new MallCaptureRequest(
      token,
      commerceCode,
      buyOrder,
      authorizationCode,
      captureAmount
    );
    return RequestService.perform(captureRequest, this.options);  
  }
};

export default MallTransaction;
