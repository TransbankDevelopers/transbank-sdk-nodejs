const { TransactionDetail, TransaccionCompleta, InstallmentDetail } = require('./dist/es5');
const utils = require('./try-utils');

const go = async () => {
  TransaccionCompleta.configureTransaccionCompletaDeferredForTesting();

  const createResponse = await TransaccionCompleta.DeferredTransaction.create(
    utils.buyOrder(),
    utils.sessionId(),
    1000,
    123,
    utils.cardNumber,
    utils.cardExpirationDate
  );
  console.log('Create');
  console.log(createResponse);

  const installmentsResponse = await TransaccionCompleta.DeferredTransaction.installments(
    createResponse.token,
    3
  );
  console.log('Installments');
  console.log(installmentsResponse);

  const commitResponse = await TransaccionCompleta.DeferredTransaction.commit(
    createResponse.token,
    installmentsResponse.id_query_installments
  );
  console.log('Commit');
  console.log(commitResponse);

  const captureResponse = await TransaccionCompleta.DeferredTransaction.capture(
    createResponse.token,
    commitResponse.buy_order,
    commitResponse.authorization_code,
    1000
  );
  console.log('Capture');
  console.log(captureResponse);

  const statusResponse = await TransaccionCompleta.DeferredTransaction.status(createResponse.token);
  console.log('Status');
  console.log(statusResponse);

  const refundResponse = await TransaccionCompleta.DeferredTransaction.refund(
    createResponse.token,
    1000
  );
  console.log('Refund');
  console.log(refundResponse);
};

go().catch((e) => console.log(e));
