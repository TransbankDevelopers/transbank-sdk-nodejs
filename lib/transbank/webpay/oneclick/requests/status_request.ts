import Constants from '../../../common/constants';
import RequestBase from '../../../common/request_base';

class StatusRequest extends RequestBase {
  constructor(buyOrder: string) {
    super(`${Constants.ONECLICK_METHOD}/transactions/${buyOrder}`, 'GET');
  }

  toJson(): undefined {
    return undefined;
  }
}

export { StatusRequest };
