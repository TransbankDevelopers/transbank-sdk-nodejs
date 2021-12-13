import ApiConstants from '../../../common/api_constants';
import RequestBase from '../../../common/request_base';

class CommitRequest extends RequestBase {
  constructor(token: string) {
    super(`${ApiConstants.WEBPAY_ENDPOINT}/transactions/${token}`, 'PUT');
  }
}

export { CommitRequest };
