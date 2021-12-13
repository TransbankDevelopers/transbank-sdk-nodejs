import ApiConstants from '../../../common/api_constants';
import RequestBase from '../../../common/request_base';

class StatusRequest extends RequestBase {
  constructor(token: string) {
    super(`${ApiConstants.WEBPAY_ENDPOINT}/transactions/${token}`, 'GET');
  }

  toJson() {
    return undefined;
  }
}

export { StatusRequest };
