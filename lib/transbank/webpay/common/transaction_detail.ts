class TransactionDetail {
  amount: number;
  commerceCode: string;
  buyOrder: string;

  constructor(amount: number, commerceCode: string, buyOrder: string) {
    this.amount = amount;
    this.commerceCode = commerceCode;
    this.buyOrder = buyOrder;
  }
}

export default TransactionDetail;
