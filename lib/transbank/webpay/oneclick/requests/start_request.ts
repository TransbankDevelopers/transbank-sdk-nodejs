import ApiConstants from '../../../common/ApiConstants';
import RequestBase from '../../../common/request_base';

class StartRequest extends RequestBase {
  userName: string;
  email: string;
  responseUrl: string;

  constructor(userName: string, email: string, responseUrl: string) {
    super(`${ApiConstants.ONECLICK_METHOD}/inscriptions`, 'POST');

    this.userName = userName;
    this.email = email;
    this.responseUrl = responseUrl;
  }

  toJson(): string {
    return JSON.stringify({
      username: this.userName,
      email: this.email,
      response_url: this.responseUrl,
    });
  }
}

export { StartRequest };
