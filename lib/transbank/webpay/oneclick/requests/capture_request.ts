import ApiConstants from '../../../common/api_constants';
import RequestBase from '../../../common/request_base';

class CaptureRequest extends RequestBase {
  commerceCode: string;
  buyOrder: string;
  amount: number;
  authorizationCode: string;

  constructor(commercerCode: string, buyOrder: string, amount: number, authorizationCode: string) {
    super(`${ApiConstants.ONECLICK_ENDPOINT}/transactions/capture`, 'PUT');

    this.commerceCode = commercerCode;
    this.buyOrder = buyOrder;
    this.amount = amount;
    this.authorizationCode = authorizationCode;
  }

  toJson(): string {
    return JSON.stringify({
      commerce_code: this.commerceCode,
      buy_order: this.buyOrder,
      capture_amount: this.amount,
      authorization_code: this.authorizationCode,
    });
  }
}

export { CaptureRequest };
