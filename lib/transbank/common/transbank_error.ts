export default class TransbankError extends Error {
  constructor(title: string, message: string, status: number, statusText: string) {
    super(`${title}\n${message}\nStatus: ${status}, ${statusText}`);
    this.name = 'TransbankError';
  }
}
