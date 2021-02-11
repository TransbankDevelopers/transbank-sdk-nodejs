/**
 * Class containing needed authenticaction and configuration to interact with the API.
 * Environment correspond to the environment to use, it can be Integration or Production, each has
 * a unique URL.
 */
class Options {
  /** Unique commerce identifier provided by Transbank */
  commerceCode: string;
  /** The secret used to authenticate against the API, it must be kept safe at all times. */
  apiKey: string;
  /** Environment correspond to the environment to use, it can be Integration or
   * Production, each has a unique URL. */
  environment: string;

  /**
   * Create an instance of Options
   * @param commerceCode unique commerce identifier provided by Transbank
   * @param apiKey the secret used to authenticate against the API, it must be kept safe at all times.
   * @param environment Environment correspond to the environment to use, it can be Integration or
   * Production, each has a unique URL.
   */
  constructor(commerceCode: string, apiKey: string, environment: string) {
    this.commerceCode = commerceCode;
    this.apiKey = apiKey;
    this.environment = environment;
  }
}

export default Options;
