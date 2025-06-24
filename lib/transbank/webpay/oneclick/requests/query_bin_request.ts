import ApiConstants from '../../../common/api_constants';
import RequestBase from '../../../common/request_base';

class QueryBinRequest extends RequestBase {
  tbkUser: string;

  constructor(tbkUser: string) {
    super(`${ApiConstants.ONECLICK_ENDPOINT}/bin_info`, 'POST');
    this.tbkUser = tbkUser;
  }

  toJson(): string {
    return JSON.stringify({
      tbk_user: this.tbkUser
    });
  }
}

export { QueryBinRequest };
