const { services } = require('../config');

module.exports = (webpayRef, Webpay) => {
  const transactionObject = {};
  const transactionConfig = webpayRef.configuration.clone().forService(services.nullify);
  const transactionWebpay = new Webpay()
    .withConfiguration(transactionConfig);

  transactionObject.nullify = (
    authorizationCode,
    authorizedAmount,
    buyOrder,
    nullifyAmount,
    commerceId = transactionWebpay.configuration.commerceCode,
  ) => transactionWebpay.soapClient
    .then((client) => transactionWebpay.promisifySoapFunction(
      client.WSCommerceIntegrationServiceImplService.WSCommerceIntegrationServiceImplPort.nullify,
    )({
      nullificationInput: {
        authorizationCode,
        authorizedAmount,
        buyOrder,
        commerceId,
        nullifyAmount,
      },
    }))
    .then((response) => response.return);

  return transactionObject;
};
