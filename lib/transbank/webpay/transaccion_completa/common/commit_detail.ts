class CommitDetail {
  commerceCode: string;
  buyOrder: string;
  idQueryInstallments: number | undefined;
  deferredPeriodIndex: number | undefined;
  gracePeriod: boolean | undefined;

  constructor(
    commerceCode: string,
    buyOrder: string,
    idQueryInstallments: number | undefined,
    deferredPeriodIndex: number | undefined,
    gracePeriod: boolean | undefined
  ) {
    this.commerceCode = commerceCode;
    this.buyOrder = buyOrder;
    this.idQueryInstallments = idQueryInstallments;
    this.deferredPeriodIndex = deferredPeriodIndex;
    this.gracePeriod = gracePeriod;
  }

  toPlainObject() {
    return {
      commerce_code: this.commerceCode,
      buy_order: this.buyOrder,
      id_query_installments: this.idQueryInstallments,
      deferred_period_index: this.deferredPeriodIndex,
      grace_period: this.gracePeriod,
    };
  }
}

export default CommitDetail;
