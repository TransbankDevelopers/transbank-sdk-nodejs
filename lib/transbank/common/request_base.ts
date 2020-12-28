abstract class RequestBase {
  endpoint: string;
  method: any; // This is set to any because axios needs speciific strings for HTTP methods.

  constructor(endpoint: string, method: string) {
    this.endpoint = endpoint;
    this.method = method;
  }
}

export default RequestBase;
