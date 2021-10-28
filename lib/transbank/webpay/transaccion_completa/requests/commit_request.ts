import ApiConstants from '../../../common/ApiConstants';
import RequestBase from '../../../common/request_base';

class CommitRequest extends RequestBase {
  idQueryInstallments: number | undefined;
  deferredPeriodIndex: number | undefined;
  gracePeriod: boolean | undefined;

  constructor(
    token: string,
    idQueryInstallments: number | undefined = undefined,
    deferredPeriodIndex: number | undefined = undefined,
    gracePeriod: boolean | undefined = undefined
  ) {
    super(`${ApiConstants.WEBPAY_METHOD}/transactions/${token}`, 'PUT');

    this.idQueryInstallments = idQueryInstallments;
    this.deferredPeriodIndex = deferredPeriodIndex;
    this.gracePeriod = gracePeriod;
  }

  toJson(): string {
    return JSON.stringify({
      id_query_installments: this.idQueryInstallments,
      deferred_period_index: this.deferredPeriodIndex,
      grace_period: this.gracePeriod,
    });
  }
}

export { CommitRequest };
