import BaseTransaction from '../../common/base_transaction';
import OneclickUtil from '../common/oneclick_util';
import Options from '../../common/options';
import Oneclick from '.';

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
    return OneclickUtil.start(userName, email, responseUrl, this.options);
  }

  /**
   * This finalizes the card enrolling process
   * @param token Unique inscription identifier
   */
  finish(token: string){
    return OneclickUtil.finish(token, this.options);
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
    return OneclickUtil.delete(tbkUser, userName, this.options);
  }
};

export default MallInscription;
