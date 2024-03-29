import Options from '../../common/options';
import BaseTransaction from '../../common/base_transaction';
import WebpayPlusModal from './';
import { ModalCreateRequest } from './requests';
import RequestService from '../../common/request_service';
import { CommitRequest, RefundRequest, StatusRequest } from '../webpay_plus/requests';
import ValidationUtil from '../../common/validation_util';
import ApiConstants from '../../common/api_constants';
import IntegrationCommerceCodes from '../../common/integration_commerce_codes';
import IntegrationApiKeys from '../../common/integration_api_keys';
import Environment from '../common/environment';

/**
 * Contains methods to interact with WebpayPlus API
 */
class Transaction extends BaseTransaction {

  /**
   * Constructor class Webpay Plus Modal transaction.
   * @param options (Optional) You can pass options to use a custom configuration.
   */
   constructor(options: Options) { 
    options = options || WebpayPlusModal.getDefaultOptions() || new Options(IntegrationCommerceCodes.WEBPAY_PLUS_MODAL, IntegrationApiKeys.WEBPAY, Environment.Integration);
    super(options);
  }

  /**
   * Create a Webpay Plus transaction.
   * @param buyOrder Commerce buy order, make sure this is unique.
   * @param sessionId You can use this field to pass session data if needed.
   * @param amount Transaction amount
   */
   async create(
    buyOrder: string,
    sessionId: string,
    amount: number
   ){
    ValidationUtil.hasTextWithMaxLength(buyOrder, ApiConstants.BUY_ORDER_LENGTH, "buyOrder");
    ValidationUtil.hasTextWithMaxLength(sessionId, ApiConstants.SESSION_ID_LENGTH, "sessionId");
    let createRequest = new ModalCreateRequest(buyOrder, sessionId, amount);
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
}

export default Transaction;
