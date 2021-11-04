import BaseTransaction from '../../common/base_transaction';
import Options from '../../common/options';
import Oneclick from '.';
import { DeleteRequest, FinishRequest, StartRequest } from './requests';
import RequestService from '../../common/request_service';

class MallInscription extends BaseTransaction {

  /**
   * Constructor class MallInscription Oneclick.
   * @param options (Optional) You can pass options to use a custom configuration.
   */
   constructor(options: Options = Oneclick.getDefaultOptions()) { 
    super(options);
  }

  /**
   * Starts a card inscription process
   * @param userName Cardholder's username
   * @param email Cardholder's email
   * @param responseUrl URL to which Transbank will redirect after cardholder finish enrolling
   * their card
   */
  start(
    userName: string,
    email: string,
    responseUrl: string
  ){
    let startRequest = new StartRequest(userName, email, responseUrl);
    return RequestService.perform(startRequest, this.options);
  }

  /**
   * This finalizes the card enrolling process
   * @param token Unique inscription identifier
   */
  finish(token: string){
    return RequestService.perform(new FinishRequest(token), this.options);
  }

  /**
   * This deletes an inscription
   * @param tbkUser Cardholder's card TBK user assigned by Transbank and returned in
   * Inscription.finish
   * @param userName Cardholder's username
   */
  delete(
    tbkUser: string,
    userName: string
  ){
    return RequestService.perform(new DeleteRequest(tbkUser, userName), this.options);
  }
};

export default MallInscription;
