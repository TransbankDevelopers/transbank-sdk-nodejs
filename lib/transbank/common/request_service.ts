import axios from 'axios';
import RequestBase from './request_base';
import Options from './options';
import TransbankError from '../common/transbank_error';

const CONTENT_TYPE: string = 'application/json';

const getHeaders = (
  options: Options,
  commerceCodeHeader: string = 'Tbk-Api-Key-Id',
  apiKeyHeader: string = 'Tbk-Api-Key-Secret'
) => {
  return {
    [commerceCodeHeader]: options.commerceCode,
    [apiKeyHeader]: options.apiKey,
    'Content-Type': CONTENT_TYPE
  };
};

const getPatpassHeaders = (
  options: Options,
  commerceCodeHeader: string = 'commercecode',
  apiKeyHeader: string = 'Authorization'
) => {
  return {
    [commerceCodeHeader]: options.commerceCode,
    [apiKeyHeader]: options.apiKey,
    'Content-Type': CONTENT_TYPE
  };
};

const RequestService = {
  perform: async (request: RequestBase, options: Options) => {
    let requestHeaders = getHeaders(options);
    return axios({
      method: request.method,
      url: options.environment + request.endpoint,
      headers: requestHeaders,
      timeout: options.timeout,
      data: request.toJson()
    })
      .then((response) => {
        if (response.status == 204) {
          return true;
        }
        return response.data;
      })
      .catch((error) => {
        let response = error.response;
        let msg = response?.data?.error_message || 'Unexpected error';
        throw new TransbankError(error, msg);
      });
  },
  performPatpass: async (request: RequestBase, options: Options) => {
    let requestHeaders = getPatpassHeaders(options);
    return axios({
      method: request.method,
      url: options.environment + request.endpoint,
      headers: requestHeaders,
      timeout: options.timeout,
      data: request.toJson()
    })
      .then((response) => {
        if (response.status == 204) {
          return true;
        }
        return response.data;
      })
      .catch((error) => {
        let response = error.response;
        let msg =
          response?.data?.code || response?.data?.description
            ? `${response.data.code} - ${response.data.description}`
            : 'Unexpected error';
        throw new TransbankError(error, msg);
      });
  }
};

export default RequestService;
