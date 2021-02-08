import Oneclick from '.';
import Options from '../../common/options';
import RequestService from '../../common/request_service';
import TransactionDetail from '../common/transaction_detail';
import { AuthorizeRequest, StatusRequest, RefundRequest } from './requests';

const MallTransaction = {
  authorize: async (
    userName: string,
    tbkUser: string,
    buyOrder: string,
    details: Array<TransactionDetail>,
    options: Options = Oneclick.getDefaultOptions()
  ) => {
    let authorizeRequest = new AuthorizeRequest(userName, tbkUser, buyOrder, details);
    return RequestService.perform(authorizeRequest, options);
  },
  status: async (buyOrder: string, options: Options = Oneclick.getDefaultOptions()) => {
    let statusRequest = new StatusRequest(buyOrder);
    return RequestService.perform(statusRequest, options);
  },
  refund: async (
    buyOrder: string,
    commerceCode: string,
    childBuyOrder: string,
    amount: number,
    options: Options = Oneclick.getDefaultOptions()
  ) => {
    let refundRequest = new RefundRequest(buyOrder, commerceCode, childBuyOrder, amount);
    return RequestService.perform(refundRequest, options);
  },
};

export default MallTransaction;
