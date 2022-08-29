import BaseTransaction from '../common/base_transaction';
import Options from '../common/options';
import PatpassComercio from '.';
import { StatusRequest, StartRequest } from './requests';
import RequestService from '../common/request_service';
import IntegrationCommerceCodes from '../common/integration_commerce_codes';
import IntegrationApiKeys from '../common/integration_api_keys';
import Environment from './common/environment';

class Inscription extends BaseTransaction {

  /**
   * Constructor class Inscription PatpassComercio.
   * @param options (Optional) You can pass options to use a custom configuration.
   */
   constructor(options: Options) { 
    options = options || PatpassComercio.getDefaultOptions() || new Options(IntegrationCommerceCodes.PATPASS_COMERCIO, IntegrationApiKeys.PATPASS_COMERCIO, Environment.Integration);
    super(options);
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
