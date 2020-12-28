import RequestBase from '../../../common/request_base';

class CreateRequest extends RequestBase {
  buyOrder: string;
  sessionId: string;
  amount: number;
  returnUrl: string;

  constructor(buyOrder: string, sessionId: string, amount: number, returnUrl: string) {
    super('/rswebpaytransaction/api/webpay/v1.0/transactions', 'POST');

    this.buyOrder = buyOrder;
    this.sessionId = sessionId;
    this.amount = amount;
    this.returnUrl = returnUrl;
  }
}
