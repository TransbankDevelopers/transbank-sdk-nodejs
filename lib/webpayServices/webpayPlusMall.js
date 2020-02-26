const { services } = require('../config');

module.exports = (webpayRef, Webpay) => {
  const transactionObject = {};
  const transactionConfig = webpayRef.configuration.clone().forService(services.mallNormal);
  const transactionWebpay = new Webpay()
    .withConfiguration(transactionConfig);

  transactionObject.initTransaction = (
    buyOrder,
    sessionId,
    returnURL,
    finalURL,
    stores,
  ) => transactionWebpay.generalInitTransaction({
    sessionId,
    returnURL,
    finalURL,
    buyOrder,
    commerceId: transactionWebpay.configuration.commerceCode,
    transactionDetails: stores.map(
      (store) => ({
        commerceCode: store.storeCode,
        amount: store.amount,
        buyOrder: store.buyOrder,
      }),
    ),
  });

  transactionObject.getTransactionResult = (token) => transactionWebpay
    .generalGetTransactionResult(token)
    .then((response) => transactionWebpay.generalAcknowledgeTransaction(token)
      .then(() => response.return));

  return transactionObject;
};
