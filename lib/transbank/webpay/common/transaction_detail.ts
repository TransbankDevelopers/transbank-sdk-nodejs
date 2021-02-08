class TransactionDetail {
  amount: number;
  commerceCode: string;
  buyOrder: string;
  installmentsNumber: number | undefined;

  constructor(
    amount: number,
    commerceCode: string,
    buyOrder: string,
    installmentsNumber: number | undefined = undefined
  ) {
    this.amount = amount;
    this.commerceCode = commerceCode;
    this.buyOrder = buyOrder;
    this.installmentsNumber = installmentsNumber;
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
