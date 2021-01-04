import Options from '../../common/options';
import { WebpayPlus } from './webpay_plus';
import RequestService from '../../common/request_service';

import { CreateRequest } from './requests';

const Transaction = {
  create: async (
    buyOrder: string,
    sessionId: string,
    amount: number,
    returnUrl: string,
    options: Options = WebpayPlus.getDefaultOptions()
  ) => {
    let createRequest = new CreateRequest(buyOrder, sessionId, amount, returnUrl);
    let promise = RequestService.perform(createRequest, options);

    return promise;
  },
};

export default Transaction;
