class TransactionDetail {
  amount: number;
  commerceCode: string;
  buyOrder: string;
  installmentsNumber: string | undefined;

  constructor(
    amount: number,
    commerceCode: string,
    buyOrder: string,
    installmentsNumber: string | undefined = undefined
  ) {
    this.amount = amount;
    this.commerceCode = commerceCode;
    this.buyOrder = buyOrder;
    this.installmentsNumber = installmentsNumber;
  }

  toPlainObject() {
    let object: any = {
      amount: this.amount,
      commerce_code: this.commerceCode,
      buy_order: this.buyOrder,
    };

    if (this.installmentsNumber != undefined) {
      object['installments_number'] = this.installmentsNumber;
    }

    return object;
  }
}

export default TransactionDetail;
