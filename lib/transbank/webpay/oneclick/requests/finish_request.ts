import ApiConstants from '../../../common/ApiConstants';
import RequestBase from '../../../common/request_base';

class FinishRequest extends RequestBase {
  constructor(token: string) {
    super(`${ApiConstants.ONECLICK_METHOD}/inscriptions/${token}`, 'PUT');
  }

  tooJson(): undefined {
    return undefined;
  }
}

export { FinishRequest };
