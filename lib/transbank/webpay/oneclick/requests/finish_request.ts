import RequestBase from '../../../common/request_base';

class FinishRequest extends RequestBase {
  constructor(token: string) {
    super(`/rswebpaytransaction/api/oneclick/v1.0/inscriptions/${token}`, 'PUT');
  }

  tooJson(): undefined {
    return undefined;
  }
}

export { FinishRequest };
