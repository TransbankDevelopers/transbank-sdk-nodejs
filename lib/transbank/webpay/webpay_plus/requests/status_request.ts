import Constants from '../../../common/constants';
import RequestBase from '../../../common/request_base';

class StatusRequest extends RequestBase {
  constructor(token: string) {
    super(`${Constants.WEBPAY_METHOD}/transactions/${token}`, 'GET');
  }

  toJson() {
    return undefined;
  }
}

export { StatusRequest };
