import Options from '../../common/options';
import WebpayPlus from './';
import RequestService from '../../common/request_service';
import { CreateRequest, CommitRequest, StatusRequest, RefundRequest } from './requests';

const Transaction = {
  /**
   * Create a Webpay Plus transaction.
   * @param buyOrder Commerce buy order, make sure this is unique.
   * @param sessionId You can use this field to pass session data if needed.
   * @param amount Transaction amount
   * @param returnUrl URL to which Transbank will redirect after card holder pays
   * @param options (Optional) You can pass options to use a custom configuration for this request.
   */
  create: async (
    buyOrder: string,
    sessionId: string,
    amount: number,
    returnUrl: string,
    options: Options = WebpayPlus.getDefaultOptions()
  ) => {
    let createRequest = new CreateRequest(buyOrder, sessionId, amount, returnUrl);
    return RequestService.perform(createRequest, options);
  },
  /**
   * Commit a transaction, this should be invoked after the card holder pays
   * @param token Unique transaction identifier
   * @param options (Optional) You can pass options to use a custom configuration for this request.
   */
  commit: async (token: string, options: Options = WebpayPlus.getDefaultOptions()) => {
    return RequestService.perform(new CommitRequest(token), options);
  },
  /**
   * Obtain the status of a specific transaction
   * @param token Unique transaction identifier
   * @param options (Optional) You can pass options to use a custom configuration for this request.
   */
  status: async (token: string, options: Options = WebpayPlus.getDefaultOptions()) => {
    return RequestService.perform(new StatusRequest(token), options);
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
    options: Options = WebpayPlus.getDefaultOptions()
  ) => {
    return RequestService.perform(new RefundRequest(token, amount), options);
  },
};

export default Transaction;
