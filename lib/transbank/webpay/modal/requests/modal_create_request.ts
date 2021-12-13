import ApiConstants from '../../../common/api_constants';
import RequestBase from '../../../common/request_base';

class ModalCreateRequest extends RequestBase {
  buyOrder: string;
  sessionId: string;
  amount: number;

  constructor(buyOrder: string, sessionId: string, amount: number) {
    super(`${ApiConstants.WEBPAY_ENDPOINT}/transactions`, 'POST');

    this.buyOrder = buyOrder;
    this.sessionId = sessionId;
    this.amount = amount;
  }

  toJson(): string {
    return JSON.stringify({
      buy_order: this.buyOrder,
      session_id: this.sessionId,
      amount: this.amount,
    });
  }
}

export { ModalCreateRequest };
