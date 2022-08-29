import ApiConstants from '../../common/api_constants';
import RequestBase from '../../common/request_base';

class StatusRequest extends RequestBase {
  token: string;

  constructor(token: string) {
    super(`${ApiConstants.PATPASS_COMERCIO_ENDPOINT}/status`, 'POST');
    this.token = token;
  }

  toJson(): string {
    return JSON.stringify({
      token: this.token
    });
  }
}

export { StatusRequest };
