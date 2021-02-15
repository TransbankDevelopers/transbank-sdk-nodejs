import Oneclick from '.';
import Options from '../../common/options';
import RequestService from '../../common/request_service';
import MallTransaction from './mall_transaction';
import { CaptureRequest } from './requests/capture_request';

const MallDeferredTransaction = {
  ...MallTransaction,
  /**
   * Capture a deferred transaction.
   * Your commerce code must be configured to support deferred capture.
   * @param commerceCode Child commerce code, used to indetify the correct child transaction
   * @param buyOrder Child buy order, used to identify the correct child transaction.
   * @param amount Amount to be captured
   * @param authorizationCode Child transaction's authorization code
   * @param options (Optional) You can pass options to use a custom configuration for this request.
   */
  capture: async (
    commerceCode: string,
    buyOrder: string,
    amount: number,
    authorizationCode: string,
    options: Options = Oneclick.getDefaultOptions()
  ) => {
    let captureRequest = new CaptureRequest(commerceCode, buyOrder, amount, authorizationCode);
    return RequestService.perform(captureRequest, options);
  },
};

export default MallDeferredTransaction;
