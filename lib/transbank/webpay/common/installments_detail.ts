/**
 * Class used to represent installments request information for child
 * transactions in Transacción Completa
 */
class InstallmentDetail {
  commerceCode: string | undefined;
  buyOrder: string | undefined;
  installmentsNumber: number;

  constructor(commerceCode: string, buyOrder: string, installmentsNumber: number) {
    this.commerceCode = commerceCode;
    this.buyOrder = buyOrder;
    this.installmentsNumber = installmentsNumber;
  }

  toPlainObject() {
    let object: any = {
      commerce_code: this.commerceCode,
      buy_order: this.buyOrder,
      installments_number: this.installmentsNumber
    };

    if (this.installmentsNumber != undefined) {
      object['installments_number'] = this.installmentsNumber;
    }

    return object;
  }
}

export default InstallmentDetail;
