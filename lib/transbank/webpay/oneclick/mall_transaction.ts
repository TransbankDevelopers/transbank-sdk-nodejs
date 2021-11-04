import Oneclick from '.';
import Options from '../../common/options';
import TransactionDetail from '../common/transaction_detail';
import BaseTransaction from '../../common/base_transaction';
import RequestService from '../../common/request_service';
import { AuthorizeRequest, RefundRequest, StatusRequest } from './requests';

class MallTransaction extends BaseTransaction {
  
  /**
   * Constructor class MallTransaction Oneclick.
   * @param options (Optional) You can pass options to use a custom configuration.
   */
  constructor(options: Options = Oneclick.getDefaultOptions()) { 
    super(options);
  }

  /**
   * Authorizes a payment to be charde onto the cardholder's card
   * @param userName Cardholder's username
   * @param tbkUser Cardholder's card TBK user assigned by Transbank and returned in
   * Inscription.finish
   * @param buyOrder Commerce buy order, make sure this is unique.
   * @param details Child transactions details, see {@link TransactionDetail} for more information.
   */
   async authorize(
    userName: string,
    tbkUser: string,
    buyOrder: string,
    details: Array<TransactionDetail>
  ){
    let authorizeRequest = new AuthorizeRequest(userName, tbkUser, buyOrder, details);
    return RequestService.perform(authorizeRequest, this.options);
  }

  /**
   * Obtain the status of a specific transaction
   * @param buyOrder Child transaction buy order
   */
   async status(buyOrder: string){
    return RequestService.perform(new StatusRequest(buyOrder), this.options);
  }

  /**
   * Request a refund of a specific transaction, if you refund for the full amount and you're within
   * the time window the transaction will be reversed. If you're past that window or refund for less
   * than the total amount the transaction will be void.
   * @param buyOrder Child transaction buy order
   * @param commerceCode Child commerce code, used to indetify the correct child transaction
   * @param childBuyOrder Child buy order, used to identify the correct child transaction.
   * @param amount Amount to be refunded
   */
  async  refund(
    buyOrder: string,
    commerceCode: string,
    childBuyOrder: string,
    amount: number
  ){
    let refundRequest = new RefundRequest(buyOrder, commerceCode, childBuyOrder, amount);
    return RequestService.perform(refundRequest, this.options);
  }
};

export default MallTransaction;
