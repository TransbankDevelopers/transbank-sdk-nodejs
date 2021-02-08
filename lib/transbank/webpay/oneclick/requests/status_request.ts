import RequestBase from '../../../common/request_base';

class StatusRequest extends RequestBase {
  constructor(buyOrder: string) {
    super(`/rswebpaytransaction/api/oneclick/v1.0/transactions/${buyOrder}`, 'GET');
  }

  toJson(): undefined {
    return undefined;
  }
}

export { StatusRequest };
