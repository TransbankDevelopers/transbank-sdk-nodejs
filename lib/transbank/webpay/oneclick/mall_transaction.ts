import Oneclick from '.';
import Options from '../../common/options';
import RequestService from '../../common/request_service';
import TransactionDetail from '../common/transaction_detail';
import { AuthorizeRequest, StatusRequest, RefundRequest } from './requests';

const MallTransaction = {
  /**
   * Authorizes a payment to be charde onto the cardholder's card
   * @param userName Cardholder's username
   * @param tbkUser Cardholder's card TBK user assigned by Transbank and returned in
   * Inscription.finish
   * @param buyOrder Commerce buy order, make sure this is unique.
   * @param details Child transactions details, see {@link TransactionDetail} for more information.
   * @param options (Optional) You can pass options to use a custom configuration for this request.
   */
  authorize: async (
    userName: string,
    tbkUser: string,
    buyOrder: string,
    details: Array<TransactionDetail>,
    options: Options = Oneclick.getDefaultOptions()
  ) => {
    let authorizeRequest = new AuthorizeRequest(userName, tbkUser, buyOrder, details);
    return RequestService.perform(authorizeRequest, options);
  },
  /**
   * Obtain the status of a specific transaction
   * @param buyOrder Child transaction buy order
   * @param options (Optional) You can pass options to use a custom configuration for this request.
   */
  status: async (buyOrder: string, options: Options = Oneclick.getDefaultOptions()) => {
    let statusRequest = new StatusRequest(buyOrder);
    return RequestService.perform(statusRequest, options);
  },
  /**
   * Request a refund of a specific transaction, if you refund for the full amount and you're within
   * the time window the transaction will be reversed. If you're past that window or refund for less
   * than the total amount the transaction will be void.
   * @param buyOrder Child transaction buy order
   * @param commerceCode Child commerce code, used to indetify the correct child transaction
   * @param childBuyOrder Child buy order, used to identify the correct child transaction.
   * @param amount Amount to be refunded
   * @param options (Optional) You can pass options to use a custom configuration for this request.
   */
  refund: async (
    buyOrder: string,
    commerceCode: string,
    childBuyOrder: string,
    amount: number,
    options: Options = Oneclick.getDefaultOptions()
  ) => {
    let refundRequest = new RefundRequest(buyOrder, commerceCode, childBuyOrder, amount);
    return RequestService.perform(refundRequest, options);
  },
};

export default MallTransaction;
