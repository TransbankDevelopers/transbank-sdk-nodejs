import Constants from '../../../common/constants';
import RequestBase from '../../../common/request_base';

class CaptureRequest extends RequestBase {
  buyOrder: string;
  authorizationCode: string;
  amount: number;

  constructor(token: string, buyOrder: string, sessionId: string, amount: number) {
    super(`${Constants.WEBPAY_METHOD}/transactions/${token}/capture`, 'PUT');

    this.buyOrder = buyOrder;
    this.authorizationCode = sessionId;
    this.amount = amount;
  }

  toJson(): string {
    return JSON.stringify({
      buy_order: this.buyOrder,
      authorization_code: this.authorizationCode,
      capture_amount: this.amount,
    });
  }
}

export { CaptureRequest };
