import ApiConstants from '../../../common/api_constants';
import RequestBase from '../../../common/request_base';

class FinishRequest extends RequestBase {
  constructor(token: string) {
    super(`${ApiConstants.ONECLICK_ENDPOINT}/inscriptions/${token}`, 'PUT');
  }

  tooJson(): undefined {
    return undefined;
  }
}

export { FinishRequest };
