import WebpayPlus from '.';
import Options from '../../common/options';
import RequestService from '../../common/request_service';
import MallTransaction from './mall_transaction';
import { MallCaptureRequest } from './requests';

const MallDeferredTransaction = {
  ...MallTransaction,
  /**
   * Capture a deferred transaction.
   * Your commerce code must be configured to support deferred capture.
   * @param token Unique transaction identifier
   * @param commerceCode Child commerce code, used to indetify the correct child transaction
   * @param buyOrder Child buy order, used to identify the correct child transaction.
   * @param authorizationCode Child transaction's authorization code
   * @param amount Amount to be captured
   * @param options (Optional) You can pass options to use a custom configuration for this request.
   */
  capture: async (
    token: string,
    commerceCode: string,
    buyOrder: string,
    authorizationCode: string,
    amount: number,
    options: Options = WebpayPlus.getDefaultOptions()
  ) => {
    return RequestService.perform(
      new MallCaptureRequest(token, commerceCode, buyOrder, authorizationCode, amount),
      options
    );
  },
};

export default MallDeferredTransaction;
