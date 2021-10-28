import ApiConstants from '../../../common/ApiConstants';
import RequestBase from '../../../common/request_base';

class InstallmentsRequest extends RequestBase {
  installmentsNumber: number;
  commerceCode: string | undefined;
  buyOrder: string | undefined;

  constructor(
    token: string,
    installmentsNumber: number,
    commerceCode: string | undefined = undefined,
    buyOrder: string | undefined = undefined
  ) {
    super(`${ApiConstants.WEBPAY_METHOD}/transactions/${token}/installments`, 'POST');

    this.installmentsNumber = installmentsNumber;
    this.commerceCode = commerceCode;
    this.buyOrder = buyOrder;
  }

  toJson(): string {
    return JSON.stringify({
      installments_number: this.installmentsNumber,
      commerce_code: this.commerceCode,
      buy_order: this.buyOrder,
    });
  }
}

export { InstallmentsRequest };
