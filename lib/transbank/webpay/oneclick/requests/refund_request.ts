import ApiConstants from '../../../common/api_constants';
import RequestBase from '../../../common/request_base';

class RefundRequest extends RequestBase {
  commerceCode: string;
  childBuyOrder: string;
  amount: number;

  constructor(buyOrder: string, commerceCode: string, childBuyOrder: string, amount: number) {
    super(`${ApiConstants.ONECLICK_ENDPOINT}/transactions/${buyOrder}/refunds`, 'POST');

    this.commerceCode = commerceCode;
    this.childBuyOrder = childBuyOrder;
    this.amount = amount;
  }

  toJson(): string {
    return JSON.stringify({
      commerce_code: this.commerceCode,
      detail_buy_order: this.childBuyOrder,
      amount: this.amount
    });
  }
}

export { RefundRequest };
