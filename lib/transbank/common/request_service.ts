import axios from 'axios';
import RequestBase from './request_base';
import Options from './options';

abstract class RequestService {
  private contentType: string = 'application/json';

  async perform(request: RequestBase, options: Options) {
    let requestHeaders = this.getHeaders(options);
    axios({
      method: request.method,
      url: options.environment + request.endpoint,
      headers: requestHeaders,
    });
  }

  private getHeaders(
    options: Options,
    commerceCodeHeader: string = 'Tbk-Api-Key-Id',
    apiKeyHeader: string = 'Tbk-Api-Key-Secret'
  ) {
    return {
      [commerceCodeHeader]: options.commerceCode,
      [apiKeyHeader]: options.apiKey,
    };
  }
}
