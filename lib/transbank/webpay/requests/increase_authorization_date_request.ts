import RequestBase from '../../common/request_base';


class IncreaseAuthorizationDateRequest extends RequestBase {
  commerceCode: string;
  buyOrder: string;
  authorizationCode: string;

  constructor(endpoint: string, commerceCode: string, buyOrder: string, authorizationCode: string) {
    super(endpoint, 'PUT');

    this.commerceCode = commerceCode;
    this.buyOrder = buyOrder;
    this.authorizationCode = authorizationCode;
  }

  toJson(): string {
    return JSON.stringify({
      commerce_code: this.commerceCode,
      buy_order: this.buyOrder,
      authorization_code: this.authorizationCode,
    });
  }
}

export { IncreaseAuthorizationDateRequest };
