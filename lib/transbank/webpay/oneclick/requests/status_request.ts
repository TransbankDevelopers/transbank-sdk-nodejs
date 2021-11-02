import ApiConstants from '../../../common/api_constants';
import RequestBase from '../../../common/request_base';

class StatusRequest extends RequestBase {
  constructor(buyOrder: string) {
    super(`${ApiConstants.ONECLICK_ENDPOINT}/transactions/${buyOrder}`, 'GET');
  }

  toJson(): undefined {
    return undefined;
  }
}

export { StatusRequest };
