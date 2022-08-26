import RequestBase from '../../common/request_base';

class GetDeferredCaptureHistoryRequest extends RequestBase {
  constructor(endpoint: string) {
    super(endpoint, 'GET');
  }

  toJson(): undefined {
    return undefined;
  }

}

export { GetDeferredCaptureHistoryRequest };
