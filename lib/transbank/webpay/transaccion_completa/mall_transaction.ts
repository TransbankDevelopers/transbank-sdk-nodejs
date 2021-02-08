import TransaccionCompleta from '.';
import Options from '../../common/options';
import RequestService from '../../common/request_service';
import InstallmentDetail from '../common/installments_detail';
import TransaccionCompletaCommitDetail from './common/commit_detail';
import TransactionDetail from '../common/transaction_detail';
import { InstallmentsRequest, MallCreateRequest } from './requests';
import { MallRefundRequest } from './requests/mall_refund_request';
import Transaction from './transaction';
import MallCommitRequest from './requests/mall_commit_request';

const MallTransaction = {
  ...Transaction,
  create: async (
    buyOrder: string,
    sessionId: string,
    cvv: number | undefined,
    cardNumber: string,
    cardExpirationDate: string,
    details: Array<TransactionDetail>,
    options: Options = TransaccionCompleta.getDefaultOptions()
  ) => {
    let createRequest = new MallCreateRequest(
      buyOrder,
      sessionId,
      cvv,
      cardNumber.replace(/\s/g, ''),
      cardExpirationDate.replace(/\s/g, ''),
      details
    );
    return RequestService.perform(createRequest, options);
  },
  installments: async (
    token: string,
    details: Array<InstallmentDetail>,
    options: Options = TransaccionCompleta.getDefaultOptions()
  ) => {
    let response = [];
    for (let detail of details) {
      let installmentsRequest = new InstallmentsRequest(
        token,
        detail.installmentsNumber,
        detail.commerceCode,
        detail.buyOrder
      );
      response.push(await RequestService.perform(installmentsRequest, options));
    }
    return response;
  },
  commit: async (
    token: string,
    details: Array<TransaccionCompletaCommitDetail>,
    options: Options = TransaccionCompleta.getDefaultOptions()
  ) => {
    let commitResponse = new MallCommitRequest(token, details);
    return RequestService.perform(commitResponse, options);
  },
  refund: async (
    token: string,
    buyOrder: string,
    commerceCode: string,
    amount: number,
    options: Options = TransaccionCompleta.getDefaultOptions()
  ) => {
    let refundRequest = new MallRefundRequest(token, buyOrder, commerceCode, amount);
    return RequestService.perform(refundRequest, options);
  },
};

export default MallTransaction;
