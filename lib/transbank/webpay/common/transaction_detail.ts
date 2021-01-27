class TransactionDetail {
  amount: number;
  commerceCode: string;
  buyOrder: string;

  constructor(amount: number, commerceCode: string, buyOrder: string) {
    this.amount = amount;
    this.commerceCode = commerceCode;
    this.buyOrder = buyOrder;
  }

  toPlainObject() {
    return {
      amount: this.amount,
      commerce_code: this.commerceCode,
      buy_order: this.buyOrder,
    };
  }
}

export default TransactionDetail;
