import Constants from '../../../common/constants';
import RequestBase from '../../../common/request_base';

class CommitRequest extends RequestBase {
  constructor(token: string) {
    super(`${Constants.WEBPAY_METHOD}/transactions/${token}`, 'PUT');
  }
}

export { CommitRequest };
