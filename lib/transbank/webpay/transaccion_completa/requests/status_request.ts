import RequestBase from '../../../common/request_base';

class StatusRequest extends RequestBase {
  constructor(token: string) {
    super(`/rswebpaytransaction/api/webpay/v1.0/transactions/${token}`, 'GET');
  }

  toJson(): undefined {
    return undefined;
  }
}

export { StatusRequest };
