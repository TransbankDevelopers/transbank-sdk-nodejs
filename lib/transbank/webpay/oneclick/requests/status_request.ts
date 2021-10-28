import ApiConstants from '../../../common/ApiConstants';
import RequestBase from '../../../common/request_base';

class StatusRequest extends RequestBase {
  constructor(buyOrder: string) {
    super(`${ApiConstants.ONECLICK_METHOD}/transactions/${buyOrder}`, 'GET');
  }

  toJson(): undefined {
    return undefined;
  }
}

export { StatusRequest };
