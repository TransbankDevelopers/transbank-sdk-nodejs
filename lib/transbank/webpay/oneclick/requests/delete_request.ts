import RequestBase from '../../../common/request_base';

class DeleteRequest extends RequestBase {
  tbkUser: string;
  userName: string;

  constructor(tbkUser: string, userName: string) {
    super('/rswebpaytransaction/api/oneclick/v1.0/inscriptions', 'DELETE');
    this.tbkUser = tbkUser;
    this.userName = userName;
  }

  toJson(): string {
    return JSON.stringify({
      tbk_user: this.tbkUser,
      username: this.userName,
    });
  }
}

export { DeleteRequest };
