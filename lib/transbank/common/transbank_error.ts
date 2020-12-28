class TransbankError extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'TransbankError';
  }
}
