import Oneclick from '.';
import Options from '../../common/options';
import RequestService from '../../common/request_service';
import { StartRequest, FinishRequest, DeleteRequest } from './requests';

const MallInscription = {
  start: async (
    userName: string,
    email: string,
    responseUrl: string,
    options: Options = Oneclick.getDefaultOptions()
  ) => {
    let startRequest = new StartRequest(userName, email, responseUrl);
    return RequestService.perform(startRequest, options);
  },
  finish: async (token: string, options: Options = Oneclick.getDefaultOptions()) => {
    let finishRequest = new FinishRequest(token);
    return RequestService.perform(finishRequest, options);
  },
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
