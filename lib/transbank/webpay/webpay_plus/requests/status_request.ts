import ApiConstants from '../../../common/ApiConstants';
import RequestBase from '../../../common/request_base';

class StatusRequest extends RequestBase {
  constructor(token: string) {
    super(`${ApiConstants.WEBPAY_METHOD}/transactions/${token}`, 'GET');
  }

  toJson() {
    return undefined;
  }
}

export { StatusRequest };
