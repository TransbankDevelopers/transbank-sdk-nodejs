const { services } = require('../config');

module.exports = (webpayRef, Webpay) => {
  const transactionObject = {};
  const transactionConfig = webpayRef.configuration.clone().forService(services.oneClick);
  const transactionWebpay = new Webpay()
    .withConfiguration(transactionConfig);

  transactionObject.initInscription = (
    username,
    email,
    responseURL,
  ) => transactionWebpay.soapClient
    .then((client) => transactionWebpay.promisifySoapFunction(
      client.initInscription,
    )({
      arg0: {
        username,
        email,
        responseURL,
      },
    }))
    .then((response) => response.return);

  transactionObject.finishInscription = (
    token,
  ) => transactionWebpay.soapClient
    .then((client) => transactionWebpay.promisifySoapFunction(
      client.finishInscription,
    )({
      arg0: {
        token,
      },
    }))
    .then((response) => response.return);

  transactionObject.authorize = (
    buyOrder,
    tbkUser,
    username,
    amount,
  ) => transactionWebpay.soapClient
    .then((client) => transactionWebpay.promisifySoapFunction(
      client.authorize,
    )({
      arg0: {
        buyOrder,
        tbkUser,
        username,
        amount,
      },
    }))
    .then((response) => response.return);

  transactionObject.reverseTransaction = (
    buyorder,
  ) => transactionWebpay.soapClient
    .then((client) => transactionWebpay.promisifySoapFunction(
      client.codeReverseOneClick,
    )({
      arg0: {
        buyorder,
      },
    }))
    .then((response) => response.return);

  transactionObject.removeUser = (
    tbkUser,
    username,
  ) => transactionWebpay.soapClient
    .then((client) => transactionWebpay.promisifySoapFunction(
      client.removeUser,
    )({
      arg0: {
        tbkUser,
        username,
      },
    }))
    .then((response) => response.return);

  return transactionObject;
};
