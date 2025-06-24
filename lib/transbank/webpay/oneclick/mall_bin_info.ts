import BaseTransaction from '../../common/base_transaction';
import Options from '../../common/options';
import ValidationUtil from '../../common/validation_util';
import ApiConstants from '../../common/api_constants';
import { QueryBinRequest } from './requests';
import RequestService from '../../common/request_service';
import Environment from '../common/environment';

class MallBinInfo extends BaseTransaction {
  /**
   * Constructor class MallBinInfo.
   * @param options You can pass options to use a custom configuration.
   */
  constructor(options: Options) {
    super(options);
  }

  /**
   * Creates and returns an instance of `MallBinInfo` configured for the integration environment.
   *
   * @param commerceCode The commerce code.
   * @param apiKey The API key used for authentication.
   * @return A new instance of `MallBinInfo` configured for the test environment (Environment.Integration).
   */
  static buildForIntegration(commerceCode: string, apiKey: string): MallBinInfo {
    return new MallBinInfo(new Options(commerceCode, apiKey, Environment.Integration));
  }

  /**
   * Creates and returns an instance of `MallBinInfo` configured for the production environment.
   *
   * @param commerceCode The commerce code.
   * @param apiKey The API key used for authentication.
   * @return A new instance of `MallBinInfo` configured for the production environment (Environment.Production).
   */
  static buildForProduction(commerceCode: string, apiKey: string): MallBinInfo {
    return new MallBinInfo(new Options(commerceCode, apiKey, Environment.Production));
  }

  /**
   * Get BIN information for a given tbkUser.
   * @param tbkUser tbkUser about which the information is obtained.
   */
  async queryBin(tbkUser: string) {
    ValidationUtil.hasTextWithMaxLength(tbkUser, ApiConstants.TBK_USER_LENGTH, 'tbkUser');
    let queryBinRequest = new QueryBinRequest(tbkUser);
    return await RequestService.perform(queryBinRequest, this.options);
  }
}

export default MallBinInfo;
