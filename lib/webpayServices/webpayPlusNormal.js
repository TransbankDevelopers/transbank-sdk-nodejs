const { services } = require('../config');

module.exports = (webpayRef, Webpay) => {
  const transactionObject = {};
  const transactionConfig = webpayRef.configuration.clone().forService(services.normal);
  const transactionWebpay = new Webpay()
    .withConfiguration(transactionConfig);

  transactionObject.initTransaction = (
    amount,
    buyOrder,
    sessionId,
    returnURL,
    finalURL,
  ) => transactionWebpay.generalInitTransaction({
    sessionId,
    returnURL,
    finalURL,
    buyOrder,
    transactionDetails: {
      commerceCode: transactionWebpay.configuration.commerceCode,
      amount,
      buyOrder,
    },
  });

  transactionObject.getTransactionResult = (token) => transactionWebpay
    .generalGetTransactionResult(token)
    .then((response) => transactionWebpay.generalAcknowledgeTransaction(token)
      .then(() => response.return));

  return transactionObject;
};
