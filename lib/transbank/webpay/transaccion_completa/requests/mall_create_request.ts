import ApiConstants from '../../../common/ApiConstants';
import RequestBase from '../../../common/request_base';
import TransactionDetail from '../../common/transaction_detail';

class MallCreateRequest extends RequestBase {
  buyOrder: string;
  sessionId: string;
  cvv: number | undefined;
  cardNumber: string;
  cardExpirationDate: string;
  details: Array<TransactionDetail>;

  constructor(
    buyOrder: string,
    sessionId: string,
    cvv: number | undefined,
    cardNumber: string,
    cardExpirationDate: string,
    details: Array<TransactionDetail>
  ) {
    super(`${ApiConstants.WEBPAY_METHOD}/transactions`, 'POST');

    this.buyOrder = buyOrder;
    this.sessionId = sessionId;
    this.cvv = cvv;
    this.cardNumber = cardNumber.replace(/\s/g, '');
    this.cardExpirationDate = cardExpirationDate.replace(/\s/g, '');
    this.details = details;
  }

  toJson(): string {
    return JSON.stringify({
      buy_order: this.buyOrder,
      session_id: this.sessionId,
      cvv: this.cvv,
      card_number: this.cardNumber,
      card_expiration_date: this.cardExpirationDate,
      details: this.details.map((detail) => detail.toPlainObject()),
    });
  }
}

export { MallCreateRequest };
