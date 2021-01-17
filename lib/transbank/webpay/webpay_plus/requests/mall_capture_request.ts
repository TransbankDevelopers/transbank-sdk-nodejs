import RequestBase from '../../../common/request_base';

class MallCaptureRequest extends RequestBase {
  commerceCode: string;
  buyOrder: string;
  authorizationCode: string;
  amount: number;

  constructor(
    token: string,
    commerceCode: string,
    buyOrder: string,
    authorizationCode: string,
    amount: number
  ) {
    super(`/rswebpaytransaction/api/webpay/v1.0/transactions/${token}/capture`, 'PUT');

    this.commerceCode = commerceCode;
    this.buyOrder = buyOrder;
    this.authorizationCode = authorizationCode;
    this.amount = amount;
  }

  toJson(): string {
    return JSON.stringify({
      commerce_code: this.commerceCode,
      buy_order: this.buyOrder,
      authorization_code: this.authorizationCode,
      capture_amount: this.amount,
    });
  }
}

export { MallCaptureRequest };
