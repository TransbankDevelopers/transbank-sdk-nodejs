import ApiConstants from '../../../common/api_constants';
import RequestBase from '../../../common/request_base';
import TransactionDetail from '../../common/transaction_detail';

class AuthorizeRequest extends RequestBase {
  userName: string;
  tbkUser: string;
  buyOrder: string;
  details: Array<TransactionDetail>;

  constructor(
    userName: string,
    tbkUser: string,
    buyOrder: string,
    details: Array<TransactionDetail>
  ) {
    super(`${ApiConstants.ONECLICK_ENDPOINT}/transactions`, 'POST'); 

    this.userName = userName;
    this.tbkUser = tbkUser;
    this.buyOrder = buyOrder;
    this.details = details;
  }

  toJson(): string {
    return JSON.stringify({
      username: this.userName,
      tbk_user: this.tbkUser,
      buy_order: this.buyOrder,
      details: this.details.map((detail) => detail.toPlainObject()),
    });
  }
}

export { AuthorizeRequest };
