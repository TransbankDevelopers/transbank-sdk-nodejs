import ApiConstants from '../../../common/api_constants';
import RequestBase from '../../../common/request_base';

class DeleteRequest extends RequestBase {
  tbkUser: string;
  userName: string;

  constructor(tbkUser: string, userName: string) {
    super(`${ApiConstants.ONECLICK_ENDPOINT}/inscriptions`, 'DELETE');
    this.tbkUser = tbkUser;
    this.userName = userName;
  }

  toJson(): string {
    return JSON.stringify({
      tbk_user: this.tbkUser,
      username: this.userName
    });
  }
}

export { DeleteRequest };
