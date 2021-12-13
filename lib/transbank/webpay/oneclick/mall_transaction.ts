import Oneclick from '.';
import Options from '../../common/options';
import TransactionDetail from '../common/transaction_detail';
import BaseTransaction from '../../common/base_transaction';
import RequestService from '../../common/request_service';
import { AuthorizeRequest, CaptureRequest, RefundRequest, StatusRequest } from './requests';
import ValidationUtil from '../../common/validation_util';
import ApiConstants from '../../common/api_constants';
import CommerceCodeIntegrationConstants from '../../common/integration_commerce_codes';
import ApiKeyIntegrationConstants from '../../common/integration_api_keys';
import Environment from '../common/environment';

class MallTransaction extends BaseTransaction {
  
  /**
   * Constructor class MallTransaction Oneclick.
   * @param options (Optional) You can pass options to use a custom configuration.
   */
  constructor(options: Options) { 
    options = options || Oneclick.getDefaultOptions() || new Options(CommerceCodeIntegrationConstants.ONECLICK_MALL, ApiKeyIntegrationConstants.WEBPAY, Environment.Integration);
    super(options);
  }

  /**
   * Authorizes a payment to be charde onto the cardholder's card
   * @param username Cardholder's username
   * @param tbkUser Cardholder's card TBK user assigned by Transbank and returned in
   * Inscription.finish
   * @param parentBuyOrder Commerce buy order, make sure this is unique.
   * @param details Child transactions details, see {@link TransactionDetail} for more information.
   */
   async authorize(
    username: string,
    tbkUser: string,
    parentBuyOrder: string,
    details: Array<TransactionDetail>
  ){
    ValidationUtil.hasTextWithMaxLength(username, ApiConstants.USER_NAME_LENGTH, "username");
    ValidationUtil.hasTextWithMaxLength(tbkUser, ApiConstants.TBK_USER_LENGTH, "tbkUser");
    ValidationUtil.hasTextWithMaxLength(parentBuyOrder, ApiConstants.BUY_ORDER_LENGTH, "parentBuyOrder");
    ValidationUtil.hasElements(details, "details");

    for(let i=0; i<details.length; i++){
      let item = details[i];
      ValidationUtil.hasTextWithMaxLength(item.commerceCode, ApiConstants.COMMERCE_CODE_LENGTH, "details.commerceCode");
      ValidationUtil.hasTextWithMaxLength(item.buyOrder, ApiConstants.BUY_ORDER_LENGTH, "details.buyOrder");
    }

    let authorizeRequest = new AuthorizeRequest(username, tbkUser, parentBuyOrder, details);
    return RequestService.perform(authorizeRequest, this.options);
  }

  /**
   * Obtain the status of a specific transaction
   * @param buyOrder Child transaction buy order
   */
   async status(buyOrder: string){
    ValidationUtil.hasTextWithMaxLength(buyOrder, ApiConstants.BUY_ORDER_LENGTH, "buyOrder");
    return RequestService.perform(new StatusRequest(buyOrder), this.options);
  }

  /**
   * Request a refund of a specific transaction, if you refund for the full amount and you're within
   * the time window the transaction will be reversed. If you're past that window or refund for less
   * than the total amount the transaction will be void.
   * @param buyOrder Child transaction buy order
   * @param childCommerceCode Child commerce code, used to indetify the correct child transaction
   * @param childBuyOrder Child buy order, used to identify the correct child transaction.
   * @param amount Amount to be refunded
   */
  async  refund(
    buyOrder: string,
    childCommerceCode: string,
    childBuyOrder: string,
    amount: number
  ){
    ValidationUtil.hasTextWithMaxLength(childCommerceCode, ApiConstants.COMMERCE_CODE_LENGTH, "childCommerceCode");
    ValidationUtil.hasTextWithMaxLength(buyOrder, ApiConstants.BUY_ORDER_LENGTH, "buyOrder");
    ValidationUtil.hasTextWithMaxLength(childBuyOrder, ApiConstants.BUY_ORDER_LENGTH, "childBuyOrder");

    let refundRequest = new RefundRequest(buyOrder, childCommerceCode, childBuyOrder, amount);
    return RequestService.perform(refundRequest, this.options);
  }

  /**
   * Capture a deferred transaction.
   * Your commerce code must be configured to support deferred capture.
   * @param childCommerceCode Child commerce code, used to indetify the correct child transaction
   * @param childBuyOrder Child buy order, used to identify the correct child transaction.
   * @param authorizationCode Child transaction's authorization code
   * @param captureAmount Amount to be captured
   */
   async capture(
    childCommerceCode: string,
    childBuyOrder: string,
    authorizationCode: string,
    captureAmount: number
  ){
    ValidationUtil.hasTextWithMaxLength(childCommerceCode, ApiConstants.COMMERCE_CODE_LENGTH, "childCommerceCode");
    ValidationUtil.hasTextWithMaxLength(childBuyOrder, ApiConstants.BUY_ORDER_LENGTH, "childBuyOrder");
    ValidationUtil.hasTextWithMaxLength(authorizationCode, ApiConstants.AUTHORIZATION_CODE_LENGTH, "authorizationCode");

    let captureRequest = new CaptureRequest(childCommerceCode, childBuyOrder, captureAmount, authorizationCode);
    return RequestService.perform(captureRequest, this.options);
  }
};

export default MallTransaction;
