import Options from '../../common/options';
import RequestService from '../../common/request_service';
import { ModalCreateRequest } from '../modal/requests';

class ModalTransactionUtil {

  /**
   * Create a Webpay Plus Modal transaction.
   * @param buyOrder Commerce buy order, make sure this is unique.
   * @param sessionId You can use this field to pass session data if needed.
   * @param amount Transaction amount
   * @param options You can pass options to use a custom configuration for this request.
   */
     static  async create(
      buyOrder: string,
      sessionId: string,
      amount: number,
      options: Options
  ){
      let createRequest = new ModalCreateRequest(buyOrder, sessionId, amount);
      return RequestService.perform(createRequest, options);
  }

}

export default ModalTransactionUtil;