import BaseTransaction from '../common/base_transaction';
import Options from '../common/options';
import { StatusRequest, StartRequest } from './requests';
import RequestService from '../common/request_service';
import Environment from './common/environment';

class Inscription extends BaseTransaction {

  /**
   * Constructor class Inscription PatpassComercio.
   * @param options You can pass options to use a custom configuration.
   */
   constructor(options: Options) { 
    super(options);
  }

  /**
   * Creates and returns an instance of `Inscription` configured for the integration environment.
   *
   * @param commerceCode The commerce code.
   * @param apiKey The API key used for authentication.
   * @return A new instance of `Inscription` configured for the test environment (Environment.Integration).
   */
  static buildForIntegration(commerceCode: string, apiKey: string): Inscription
  {
    return new Inscription(new Options(commerceCode, apiKey, Environment.Integration));
  }

  /**
   * Creates and returns an instance of `Inscription` configured for the production environment.
   *
   * @param commerceCode The commerce code.
   * @param apiKey The API key used for authentication.
   * @return A new instance of `Inscription` configured for the production environment (Environment.Production).
   */
  static buildForProduction(commerceCode: string, apiKey: string): Inscription
  {
    return new Inscription(new Options(commerceCode, apiKey, Environment.Production));
  }

  /**
   * Starts a card inscription process
   * @param url URL to which Transbank will redirect after cardholder finish enrolling their card
   * @param name Client's name
   * @param lastName Client's lastName
   * @param secondLastName Client's second lastName
   * @param rut Commerce's Rut
   * @param serviceId Service Id
   * @param finalUrl URL to which Transbank will redirect after showing the receipt
   * @param maxAmount Max amount
   * @param phone Contact's phone
   * @param cellPhone Contact's cellphone
   * @param patpassName Patpass name
   * @param personEmail Contact's email
   * @param commerceEmail Commerce's email
   * @param address Contact's city
   * @param city Contact's city
   */
  start(
    url: string, 
    name: string, 
    lastName: string, 
    secondLastName: string, 
    rut: string, 
    serviceId: string, 
    finalUrl: string, 
    maxAmount: number, 
    phone: string, 
    cellPhone: string, 
    patpassName: string, 
    personEmail: string, 
    commerceEmail: string, 
    address: string, 
    city: string
  ){
    let startRequest = new StartRequest(
      url, 
      name, 
      lastName, 
      secondLastName, 
      rut, 
      serviceId, 
      finalUrl, 
      this.options.commerceCode,
      maxAmount, 
      phone, 
      cellPhone, 
      patpassName, 
      personEmail, 
      commerceEmail, 
      address, 
      city);
    return RequestService.performPatpass(startRequest, this.options);
  }

  /**
   * This finalizes the card enrolling process
   * @param token Unique inscription identifier
   */
  status(token: string){
    return RequestService.performPatpass(new StatusRequest(token), this.options);
  }

};

export default Inscription;
