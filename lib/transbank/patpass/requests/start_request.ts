import ApiConstants from '../../common/api_constants';
import RequestBase from '../../common/request_base';

class StartRequest extends RequestBase {
  url: string;
  name: string;
  lastName: string;
  secondLastName: string;
  rut: string;
  serviceId: string;
  finalUrl: string;
  maxAmount: number;
  phone: string;
  cellPhone: string;
  patpassName: string;
  personEmail: string;
  commerceEmail: string;
  address: string;
  city: string;
  commerceCode: string;

  constructor(
    url: string, 
    name: string, 
    lastName: string, 
    secondLastName: string, 
    rut: string, 
    serviceId: string, 
    finalUrl: string, 
    commerceCode: string, 
    maxAmount: number, 
    phone: string, 
    cellPhone: string, 
    patpassName: string, 
    personEmail: string, 
    commerceEmail: string, 
    address: string, 
    city: string
    ) {
    super(`${ApiConstants.PATPASS_COMERCIO_ENDPOINT}/patInscription`, 'POST');

    this.url = url;
    this.name = name;
    this.lastName = lastName;
    this.secondLastName = secondLastName;
    this.rut = rut;
    this.serviceId = serviceId;
    this.finalUrl = finalUrl;
    this.maxAmount = maxAmount;
    this.phone = phone;
    this.cellPhone = cellPhone;
    this.patpassName = patpassName;
    this.personEmail = personEmail;
    this.commerceEmail = commerceEmail;
    this.address = address;
    this.city = city;
    this.commerceCode = commerceCode;

  }

  toJson(): string {
    return JSON.stringify({
      url: this.url,
      nombre: this.name,
      pApellido: this.lastName,
      sApellido: this.secondLastName,
      rut: this.rut,
      serviceId: this.serviceId,
      finalUrl: this.finalUrl,
      montoMaximo: this.maxAmount,
      telefonoFijo: this.phone,
      telefonoCelular: this.cellPhone,
      nombrePatPass: this.patpassName,
      correoPersona: this.personEmail,
      correoComercio: this.commerceEmail,
      direccion: this.address,
      ciudad: this.city,
      commerceCode: this.commerceCode
    });
  }
}

export { StartRequest };
