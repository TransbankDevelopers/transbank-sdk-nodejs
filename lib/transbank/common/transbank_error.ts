export default class TransbankError extends Error {
  constructor(title: string, message: string) {
    super(`${title}\n${message}\n`);
    this.name = 'TransbankError';
  }
}
