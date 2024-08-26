import BaseTransaction from '../../common/base_transaction';
import Options from '../../common/options';
import { DeleteRequest, FinishRequest, StartRequest } from './requests';
import RequestService from '../../common/request_service';
import ValidationUtil from '../../common/validation_util';
import ApiConstants from '../../common/api_constants';
import Environment from '../common/environment';

class MallInscription extends BaseTransaction {

  /**
   * Constructor class MallInscription Oneclick.
   * @param options You can pass options to use a custom configuration.
   */
   constructor(options: Options) { 
    super(options);
  }

  /**
   * Creates and returns an instance of `MallInscription` configured for the integration environment.
   *
   * @param commerceCode The commerce code.
   * @param apiKey The API key used for authentication.
   * @return A new instance of `MallInscription` configured for the test environment (Environment.Integration).
   */
  static buildForIntegration(commerceCode: string, apiKey: string): MallInscription
  {
    return new MallInscription(new Options(commerceCode, apiKey, Environment.Integration));
  }

  /**
   * Creates and returns an instance of `MallInscription` configured for the production environment.
   *
   * @param commerceCode The commerce code.
   * @param apiKey The API key used for authentication.
   * @return A new instance of `MallInscription` configured for the production environment (Environment.Production).
   */
  static buildForProduction(commerceCode: string, apiKey: string): MallInscription
  {
    return new MallInscription(new Options(commerceCode, apiKey, Environment.Production));
  }

  /**
   * Starts a card inscription process
   * @param username Cardholder's username
   * @param email Cardholder's email
   * @param responseUrl URL to which Transbank will redirect after cardholder finish enrolling
   * their card
   */
  start(
    username: string,
    email: string,
    responseUrl: string
  ){
    ValidationUtil.hasTextTrimWithMaxLength(username, ApiConstants.USER_NAME_LENGTH, "username");
    ValidationUtil.hasTextTrimWithMaxLength(email, ApiConstants.EMAIL_LENGTH, "email");
    ValidationUtil.hasTextWithMaxLength(responseUrl, ApiConstants.RETURN_URL_LENGTH, "responseUrl");
    let startRequest = new StartRequest(username, email, responseUrl);
    return RequestService.perform(startRequest, this.options);
  }

  /**
   * This finalizes the card enrolling process
   * @param token Unique inscription identifier
   */
  finish(token: string){
    ValidationUtil.hasTextWithMaxLength(token, ApiConstants.TOKEN_LENGTH, "token");
    return RequestService.perform(new FinishRequest(token), this.options);
  }

  /**
   * This deletes an inscription
   * @param tbkUser Cardholder's card TBK user assigned by Transbank and returned in
   * Inscription.finish
   * @param username Cardholder's username
   */
  delete(
    tbkUser: string,
    username: string
  ){
    ValidationUtil.hasTextTrimWithMaxLength(username, ApiConstants.USER_NAME_LENGTH, "username");
    ValidationUtil.hasTextWithMaxLength(tbkUser, ApiConstants.TBK_USER_LENGTH, "tbkUser");
    return RequestService.perform(new DeleteRequest(tbkUser, username), this.options);
  }
};

export default MallInscription;
