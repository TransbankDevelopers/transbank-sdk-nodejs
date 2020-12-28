import Environment from '../common/environment';

abstract class Transaction {
  commerceCode: string = '597055555532';
  apiKey: string = '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C';
  integrationType: string = Environment.Integration;

  create(buyOrder: string, sessionId: string, amount: number, returnUrl: string) {
    console.log('Hello World');
  }
}

export default Transaction;
