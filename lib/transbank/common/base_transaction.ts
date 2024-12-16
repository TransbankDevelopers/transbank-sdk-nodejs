import Options from './options';

class BaseTransaction {
  options: Options;

  /**
   * Constructor class Webpay Plus transaction.
   * @param options You can pass options to use a custom configuration.
   */
  constructor(options: Options) { 
    if (options === null)
      throw new Error("Options can't be null.");
    this.options = options;
  }

}

export default BaseTransaction;
