import RequestBase from '../../../common/request_base';

class CreateRequest extends RequestBase {
  buyOrder: string;
  sessionId: string;
  amount: number;
  cvv: number | undefined;
  cardNumber: string;
  cardExprationDate: string;

  constructor(
    buyOrder: string,
    sessionId: string,
    amount: number,
    cvv: number | undefined,
    cardNumber: string,
    cardExpirationDate: string
  ) {
    super('/rswebpaytransaction/api/webpay/v1.0/transactions', 'POST');

    this.buyOrder = buyOrder;
    this.sessionId = sessionId;
    this.amount = amount;
    this.cvv = cvv;
    this.cardNumber = cardNumber;
    this.cardExprationDate = cardExpirationDate;
  }

  toJson(): string {
    return JSON.stringify({
      buy_order: this.buyOrder,
      session_id: this.sessionId,
      amount: this.amount,
      cvv: this.cvv,
      card_number: this.cardNumber,
      card_expiration_date: this.cardExprationDate,
    });
  }
}

export { CreateRequest };
