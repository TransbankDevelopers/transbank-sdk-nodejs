import ApiConstants from '../../../common/ApiConstants';
import RequestBase from '../../../common/request_base';

class CommitRequest extends RequestBase {
  constructor(token: string) {
    super(`${ApiConstants.WEBPAY_METHOD}/transactions/${token}`, 'PUT');
  }
}

export { CommitRequest };
