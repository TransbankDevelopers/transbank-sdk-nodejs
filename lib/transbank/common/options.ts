class Options {
  commerceCode: string;
  apiKey: string;
  environment: string;

  constructor(commerceCode: string, apiKey: string, environment: string) {
    this.commerceCode = commerceCode;
    this.apiKey = apiKey;
    this.environment = environment;
  }
}

export default Options;
