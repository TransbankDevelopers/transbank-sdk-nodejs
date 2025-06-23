/**
 * Class used to represent "child" transactions in Webpay Plus Mall and Oneclick Mall
 */
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
      installments_number: this.installmentsNumber
    };
  }
}

export default TransactionDetail;
