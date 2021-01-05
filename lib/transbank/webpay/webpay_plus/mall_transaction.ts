import WebpayPlus from '.';
import Options from '../../common/options';
import RequestService from '../../common/request_service';
import Transaction from './transaction';
import { MallCreateRequest, MallRefundRequest } from './requests';
import TransactionDetail from '../common/transaction_detail';

const MallTransaction = {
  ...Transaction,
  create: async (
    buyOrder: string,
    sessionId: string,
    returnUrl: string,
    details: Array<TransactionDetail>,
    options: Options = WebpayPlus.getDefaultOptions()
  ) => {
    return RequestService.perform(
      new MallCreateRequest(buyOrder, sessionId, returnUrl, details),
      options
    );
  },
  refund: async (
    token: string,
    buyOrder: string,
    commerceCode: string,
    amount: number,
    options: Options = WebpayPlus.getDefaultOptions()
  ) => {
    return RequestService.perform(
      new MallRefundRequest(token, buyOrder, commerceCode, amount),
      options
    );
  },
};

export default MallTransaction;
