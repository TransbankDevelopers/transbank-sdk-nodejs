const { services } = require('../config');

module.exports = (webpayRef, Webpay) => {
  const transactionObject = {};
  const transactionConfig = webpayRef.configuration.clone().forService(services.capture);
  const transactionWebpay = new Webpay()
    .withConfiguration(transactionConfig);

  transactionObject.capture = (
    authorizationCode,
    captureAmount,
    buyOrder,
  ) => transactionWebpay.soapClient
    .then((client) => transactionWebpay.promisifySoapFunction(
      client.WSCommerceIntegrationServiceImplService.WSCommerceIntegrationServiceImplPort.capture,
    )({
      captureInput: {
        authorizationCode,
        captureAmount,
        buyOrder,
        commerceId: transactionWebpay.configuration.commerceCode,
      },
    }))
    .then((response) => response.return);

  return transactionObject;
};
