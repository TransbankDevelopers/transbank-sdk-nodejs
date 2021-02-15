import Oneclick from '.';
import Options from '../../common/options';
import RequestService from '../../common/request_service';
import { StartRequest, FinishRequest, DeleteRequest } from './requests';

const MallInscription = {
  /**
   * Starts a card inscription process
   * @param userName Cardholder's username
   * @param email Cardholder's email
   * @param responseUrl URL to which Transbank will redirect after cardholder finish enrolling
   * their card
   * @param options (Optional) You can pass options to use a custom configuration for this request.
   */
  start: async (
    userName: string,
    email: string,
    responseUrl: string,
    options: Options = Oneclick.getDefaultOptions()
  ) => {
    let startRequest = new StartRequest(userName, email, responseUrl);
    return RequestService.perform(startRequest, options);
  },
  /**
   * This finalizes the card enrolling process
   * @param token Unique inscription identifier
   * @param options (Optional) You can pass options to use a custom configuration for this request.
   */
  finish: async (token: string, options: Options = Oneclick.getDefaultOptions()) => {
    let finishRequest = new FinishRequest(token);
    return RequestService.perform(finishRequest, options);
  },
  /**
   * This deletes an inscription
   * @param tbkUser Cardholder's card TBK user assigned by Transbank and returned in
   * Inscription.finish
   * @param userName Cardholder's username
   * @param options (Optional) You can pass options to use a custom configuration for this request.
   */
  delete: async (
    tbkUser: string,
    userName: string,
    options: Options = Oneclick.getDefaultOptions()
  ) => {
    let deleteRequest = new DeleteRequest(tbkUser, userName);
    return RequestService.perform(deleteRequest, options);
  },
};

export default MallInscription;
