import RequestBase from '../../../common/request_base';

class RefundRequest extends RequestBase {
  amount: number;

  constructor(token: string, amount: number) {
    super(`/rswebpaytransaction/api/webpay/v1.0/transactions/${token}/refunds`, 'POST');

    this.amount = amount;
  }

  toJson() {
    return JSON.stringify({ amount: this.amount });
  }
}

export { RefundRequest };
