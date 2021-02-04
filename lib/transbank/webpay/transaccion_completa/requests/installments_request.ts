import RequestBase from '../../../common/request_base';

class InstallmentsRequest extends RequestBase {
  installmentsNumber: number;

  constructor(token: string, installmentsNumber: number) {
    super(`/rswebpaytransaction/api/webpay/v1.0/transactions/${token}/installments`, 'POST');

    this.installmentsNumber = installmentsNumber;
  }

  toJson(): string {
    return JSON.stringify({
      installments_number: this.installmentsNumber,
    });
  }
}

export { InstallmentsRequest };
