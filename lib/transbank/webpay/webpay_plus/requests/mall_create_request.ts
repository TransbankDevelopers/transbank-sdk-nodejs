import RequestBase from '../../../common/request_base';
import TransactionDetail from '../../common/transaction_detail';

class MallCreateRequest extends RequestBase {
  buyOrder: string;
  sessionId: string;
  details: Array<TransactionDetail>;
  returnUrl: string;

  constructor(
    buyOrder: string,
    sessionId: string,
    returnUrl: string,
    details: Array<TransactionDetail>
  ) {
    super('/rswebpaytransaction/api/webpay/v1.0/transactions', 'POST');

    this.buyOrder = buyOrder;
    this.sessionId = sessionId;
    this.returnUrl = returnUrl;
    this.details = details;
  }

  toJson(): string {
    return JSON.stringify({
      buy_order: this.buyOrder,
      session_id: this.sessionId,
      details: this.details.map((detail) => detail.toPlainObject()),
      return_url: this.returnUrl,
    });
  }
}

export { MallCreateRequest };
