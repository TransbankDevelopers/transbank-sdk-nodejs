import TransaccionCompleta from '.';
import Options from '../../common/options';
import InstallmentDetail from '../common/installments_detail';
import TransaccionCompletaCommitDetail from './common/commit_detail';
import TransactionDetail from '../common/transaction_detail';
import BaseTransaction from '../../common/base_transaction';
import { InstallmentsRequest, MallCommitRequest, MallCreateRequest, MallRefundRequest, StatusRequest } from './requests';
import RequestService from '../../common/request_service';
import MallCaptureRequest from './requests/mall_capture_request';
import Environment from '../common/environment';
import IntegrationCommerceCodes from '../../common/integration_commerce_codes';
import IntegrationApiKeys from '../../common/integration_api_keys';
import ValidationUtil from '../../common/validation_util';
import ApiConstants from '../../common/api_constants';
import { DeferredCaptureHistoryRequest, IncreaseAmountRequest, IncreaseAuthorizationDateRequest, ReversePreAuthorizedAmountRequest } from '../requests';

class MallTransaction extends BaseTransaction {

  /**
   * Constructor class MallTransaction.
   * @param options (Optional) You can pass options to use a custom configuration.
   */
   constructor(options: Options) { 
    options = options || TransaccionCompleta.getDefaultOptions() || new Options(IntegrationCommerceCodes.TRANSACCION_COMPLETA_MALL, IntegrationApiKeys.WEBPAY, Environment.Integration);
    super(options);
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

  /** Increase pre-authorizate amount.
   *
   * Your commerce code must be configured to support deferred capture.
   *
   * @param token Unique transaction identifier
   * @param childCommerceCode Child commerce code, used to indetify the correct child transaction
   * @param childBuyOrder Child buy order, used to identify the correct child transaction.
   * @param authorizationCode Transaction's authorization code
   * @param amount Amount to be increase
   */
  async increaseAmount (
    token: string,
    childCommerceCode: string,
    childBuyOrder: string,
    authorizationCode: string,
    amount: number
  ){
    ValidationUtil.hasTextWithMaxLength(token, ApiConstants.TOKEN_LENGTH, "token");
    ValidationUtil.hasTextWithMaxLength(childCommerceCode, ApiConstants.COMMERCE_CODE_LENGTH, "childCommerceCode");
    ValidationUtil.hasTextWithMaxLength(childBuyOrder, ApiConstants.BUY_ORDER_LENGTH, "childBuyOrder");
    ValidationUtil.hasTextWithMaxLength(authorizationCode, ApiConstants.AUTHORIZATION_CODE_LENGTH, "authorizationCode");
    return RequestService.perform(
      new IncreaseAmountRequest(`${ApiConstants.WEBPAY_ENDPOINT}/transactions/${token}/amount`, childCommerceCode, childBuyOrder, authorizationCode, amount),
      this.options
    );
  }

  /** Increase authorization date.
   *
   * Your commerce code must be configured to support deferred capture.
   *
   * @param token Unique transaction identifier
   * @param childCommerceCode Child commerce code, used to indetify the correct child transaction
   * @param childBuyOrder Child buy order, used to identify the correct child transaction.
   * @param authorizationCode Transaction's authorization code
   */
  async increaseAuthorizationDate(
    token: string,
    childCommerceCode: string,
    childBuyOrder: string,
    authorizationCode: string
  ){
    ValidationUtil.hasTextWithMaxLength(token, ApiConstants.TOKEN_LENGTH, "token");
    ValidationUtil.hasTextWithMaxLength(childCommerceCode, ApiConstants.COMMERCE_CODE_LENGTH, "childCommerceCode");
    ValidationUtil.hasTextWithMaxLength(childBuyOrder, ApiConstants.BUY_ORDER_LENGTH, "childBuyOrder");
    ValidationUtil.hasTextWithMaxLength(authorizationCode, ApiConstants.AUTHORIZATION_CODE_LENGTH, "authorizationCode");
    return RequestService.perform(
      new IncreaseAuthorizationDateRequest(`${ApiConstants.WEBPAY_ENDPOINT}/transactions/${token}/authorization_date`, childCommerceCode, childBuyOrder, authorizationCode),
      this.options
    );
  }

  /** Reverse pre-authorizate amount.
   *
   * Your commerce code must be configured to support deferred capture.
   *
   * @param token Unique transaction identifier
   * @param childCommerceCode Child commerce code, used to indetify the correct child transaction
   * @param childBuyOrder Child buy order, used to identify the correct child transaction.
   * @param authorizationCode Transaction's authorization code
   * @param amount Amount to be increase
   */
  async reversePreAuthorizedAmount(
    token: string,
    childCommerceCode: string,
    childBuyOrder: string,
    authorizationCode: string,
    amount: number
  ){
    ValidationUtil.hasTextWithMaxLength(token, ApiConstants.TOKEN_LENGTH, "token");
    ValidationUtil.hasTextWithMaxLength(childCommerceCode, ApiConstants.COMMERCE_CODE_LENGTH, "childCommerceCode");
    ValidationUtil.hasTextWithMaxLength(childBuyOrder, ApiConstants.BUY_ORDER_LENGTH, "childBuyOrder");
    ValidationUtil.hasTextWithMaxLength(authorizationCode, ApiConstants.AUTHORIZATION_CODE_LENGTH, "authorizationCode");
    return RequestService.perform(
      new ReversePreAuthorizedAmountRequest(`${ApiConstants.WEBPAY_ENDPOINT}/transactions/${token}/reverse/amount`, childCommerceCode, childBuyOrder, authorizationCode, amount),
      this.options
    );
  }

  /** List deferred capture history.
   *
   * Your commerce code must be configured to support deferred capture.
   *
   * @param token Unique transaction identifier
   * @param childCommerceCode Child commerce code, used to indetify the correct child transaction
   * @param childBuyOrder Child buy order, used to identify the correct child transaction.
   * @param authorizationCode Transaction's authorization code
   */
  async deferredCaptureHistory(
    token: string,
    childCommerceCode: string,
    childBuyOrder: string,
    authorizationCode: string
  ){
    ValidationUtil.hasTextWithMaxLength(token, ApiConstants.TOKEN_LENGTH, "token");
    ValidationUtil.hasTextWithMaxLength(childCommerceCode, ApiConstants.COMMERCE_CODE_LENGTH, "childCommerceCode");
    ValidationUtil.hasTextWithMaxLength(childBuyOrder, ApiConstants.BUY_ORDER_LENGTH, "childBuyOrder");
    ValidationUtil.hasTextWithMaxLength(authorizationCode, ApiConstants.AUTHORIZATION_CODE_LENGTH, "authorizationCode");
    return RequestService.perform(
      new DeferredCaptureHistoryRequest(`${ApiConstants.WEBPAY_ENDPOINT}/transactions/${token}/details`, childCommerceCode, childBuyOrder, ''),
      this.options
    );
  }
};

export default MallTransaction;
