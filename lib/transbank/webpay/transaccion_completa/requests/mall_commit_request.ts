import ApiConstants from '../../../common/ApiConstants';
import RequestBase from '../../../common/request_base';
import CommitDetail from '../common/commit_detail';

class MallCommitRequest extends RequestBase {
  details: Array<CommitDetail>;

  constructor(token: string, details: Array<CommitDetail>) {
    super(`${ApiConstants.WEBPAY_METHOD}/transactions/${token}`, 'PUT');
    this.details = details;
  }

  toJson(): string {
    return JSON.stringify({
      details: this.details.map((detail) => detail.toPlainObject()),
    });
  }
}

export default MallCommitRequest;
