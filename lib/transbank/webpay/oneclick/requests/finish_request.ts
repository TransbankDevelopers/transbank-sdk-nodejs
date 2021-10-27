import Constants from '../../../common/constants';
import RequestBase from '../../../common/request_base';

class FinishRequest extends RequestBase {
  constructor(token: string) {
    super(`${Constants.ONECLICK_METHOD}/inscriptions/${token}`, 'PUT');
  }

  tooJson(): undefined {
    return undefined;
  }
}

export { FinishRequest };
