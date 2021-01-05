import Options from '../../common/options';
import WebpayPlus from './';
import RequestService from '../../common/request_service';

import { CreateRequest, CommitRequest, StatusRequest, RefundRequest } from './requests';

const Transaction = {
  create: async (
    buyOrder: string,
    sessionId: string,
    amount: number,
    returnUrl: string,
    options: Options = WebpayPlus.getDefaultOptions()
  ) => {
    let createRequest = new CreateRequest(buyOrder, sessionId, amount, returnUrl);
    return RequestService.perform(createRequest, options);
  },
  commit: async (token: string, options: Options = WebpayPlus.getDefaultOptions()) => {
    return RequestService.perform(new CommitRequest(token), options);
  },
  status: async (token: string, options: Options = WebpayPlus.getDefaultOptions()) => {
    return RequestService.perform(new StatusRequest(token), options);
  },
  refund: async (
    token: string,
    amount: number,
    options: Options = WebpayPlus.getDefaultOptions()
  ) => {
    return RequestService.perform(new RefundRequest(token, amount), options);
  },
};

export default Transaction;
