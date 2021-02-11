const { TransactionDetail, TransaccionCompleta, InstallmentDetail } = require('./dist/es5');
const utils = require('./try-utils');

const go = async () => {
  TransaccionCompleta.configureTransaccionCompletaNoCvvForTesting();
  const createResponse = await TransaccionCompleta.Transaction.create(
    utils.buyOrder(),
    utils.sessionId(),
    1000,
    null,
    utils.cardNumber,
    utils.cardExpirationDate
  );
  console.log('Create');
  console.log(createResponse);

  const installmentsResponse = await TransaccionCompleta.Transaction.installments(
    createResponse.token,
    3
  );
  console.log('Installments');
  console.log(installmentsResponse);

  const commitResponse = await TransaccionCompleta.Transaction.commit(
    createResponse.token,
    installmentsResponse.id_query_installments
  );
  console.log('Commit');
  console.log(commitResponse);

  const statusResponse = await TransaccionCompleta.Transaction.status(createResponse.token);
  console.log('Status');
  console.log(statusResponse);

  const refundResponse = await TransaccionCompleta.Transaction.refund(createResponse.token, 1000);
  console.log('Refund');
  console.log(refundResponse);
};

go().catch((e) => console.log(e));
