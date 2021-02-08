import TransaccionCompleta from '.';
import Options from '../../common/options';
import RequestService from '../../common/request_service';
import {
  CommitRequest,
  CreateRequest,
  InstallmentsRequest,
  RefundRequest,
  StatusRequest,
} from './requests';

const Transaction = {
  create: async (
    buyOrder: string,
    sessionId: string,
    amount: number,
    cvv: number | undefined,
    cardNumber: string,
    cardExpirationDate: string,
    options: Options = TransaccionCompleta.getDefaultOptions()
  ) => {
    let createRequest = new CreateRequest(
      buyOrder,
      sessionId,
      amount,
      cvv,
      cardNumber.replace(/\s/g, ''),
      cardExpirationDate.replace(/\s/g, '')
    );
    return RequestService.perform(createRequest, options);
  },
  installments: async (
    token: string,
    installmentsNumber: number,
    options: Options = TransaccionCompleta.getDefaultOptions()
  ) => {
    let installmentsRequest = new InstallmentsRequest(token, installmentsNumber);
    return RequestService.perform(installmentsRequest, options);
  },
  commit: async (
    token: string,
    idQueryInstallments: number | undefined = undefined,
    deferredPeriodIndex: number | undefined = undefined,
    gracePeriod: boolean | undefined = undefined,
    options: Options = TransaccionCompleta.getDefaultOptions()
  ) => {
    let commitRequest = new CommitRequest(
      token,
      idQueryInstallments,
      deferredPeriodIndex,
      gracePeriod
    );
    return RequestService.perform(commitRequest, options);
  },
  status: async (token: string, options: Options = TransaccionCompleta.getDefaultOptions()) => {
    let statusRequest = new StatusRequest(token);
    return RequestService.perform(statusRequest, options);
  },
  refund: async (
    token: string,
    amount: number,
    options: Options = TransaccionCompleta.getDefaultOptions()
  ) => {
    let refundRequest = new RefundRequest(token, amount);
    return RequestService.perform(refundRequest, options);
  },
};

export default Transaction;
