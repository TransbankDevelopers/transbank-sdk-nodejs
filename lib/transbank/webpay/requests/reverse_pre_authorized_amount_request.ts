import RequestBase from '../../common/request_base';

class ReversePreAuthorizedAmountRequest extends RequestBase {
  commerceCode: string;
  buyOrder: string;
  authorizationCode: string;
  amount: number;

  constructor(endpoint: string, commerceCode: string, buyOrder: string, authorizationCode: string, amount: number) {
    super(endpoint, 'PUT');

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
      amount: this.amount,
    });
  }
}

export { ReversePreAuthorizedAmountRequest };
