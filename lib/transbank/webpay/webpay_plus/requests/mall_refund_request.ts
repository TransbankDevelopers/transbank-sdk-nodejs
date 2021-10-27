import Constants from '../../../common/constants';
import RequestBase from '../../../common/request_base';

class MallRefundRequest extends RequestBase {
  buyOrder: string;
  commerceCode: string;
  amount: number;

  constructor(token: string, buyOrder: string, commerceCode: string, amount: number) {
    super(`${Constants.WEBPAY_METHOD}/transactions/${token}/refunds`, 'POST');

    this.buyOrder = buyOrder;
    this.commerceCode = commerceCode;
    this.amount = amount;
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
