import ApiConstants from '../../../common/ApiConstants';
import RequestBase from '../../../common/request_base';

class MallRefundRequest extends RequestBase {
  buyOrder: string;
  commerceCode: string;
  amount: number;

  constructor(token: string, buyOrder: string, commerceCode: string, amount: number) {
    super(`${ApiConstants.WEBPAY_METHOD}/transactions/${token}/refunds`, 'POST');

    this.amount = amount;
    this.buyOrder = buyOrder;
    this.commerceCode = commerceCode;
  }

  toJson() {
    return JSON.stringify({
      buy_order: this.buyOrder,
      commerce_code: this.commerceCode,
      amount: this.amount,
    });
  }
}

export { MallRefundRequest };
