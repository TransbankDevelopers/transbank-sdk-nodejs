import RequestBase from '../../common/request_base';

class DeferredCaptureHistoryRequest extends RequestBase {
  commerceCode: string;
  buyOrder: string;
  authorizationCode: string;

  constructor(endpoint: string, commerceCode: string, buyOrder: string, authorizationCode: string) {
    super(endpoint, 'POST');

    this.commerceCode = commerceCode;
    this.buyOrder = buyOrder;
    this.authorizationCode = authorizationCode;
  }

  toJson(): string {
    let r:any = {
      commerce_code: this.commerceCode,
      buy_order: this.buyOrder,
    };
    if (this.authorizationCode)
      r['authorization_code'] = this.authorizationCode;
    return JSON.stringify(r);
  }
}

export { DeferredCaptureHistoryRequest };
