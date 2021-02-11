const {
  TransactionDetail,
  TransaccionCompleta,
  InstallmentDetail,
  CommitDetail,
} = require('./dist/es5');
const utils = require('./try-utils');

const go = async () => {
  TransaccionCompleta.configureTransaccionCompletaMallDeferredForTesting();

  let details = [new TransactionDetail(1000, 597055555577, utils.buyOrder())];

  const createResponse = await TransaccionCompleta.MallDeferredTransaction.create(
    utils.buyOrder(),
    utils.sessionId(),
    123,
    utils.cardNumber,
    utils.cardExpirationDate,
    details
  );
  console.log('Create', createResponse);

  let installmentDetails = [new InstallmentDetail(597055555577, details[0].buyOrder, 3)];
  const installmentsResponse = await TransaccionCompleta.MallDeferredTransaction.installments(
    createResponse.token,
    installmentDetails
  );
  console.log('Installments', installmentsResponse);

  let commitDetails = [new CommitDetail(597055555577, details[0].buyOrder)];
  let commitResponse = await TransaccionCompleta.MallDeferredTransaction.commit(
    createResponse.token,
    commitDetails
  );
  console.log('Commit', commitResponse);

  let statusResponse = await TransaccionCompleta.MallDeferredTransaction.status(
    createResponse.token
  );
  console.log('Status', statusResponse);

  const refundResponse = await TransaccionCompleta.MallDeferredTransaction.refund(
    createResponse.token,
    details[0].buyOrder,
    597055555577,
    1000
  );
  console.log('Refund', refundResponse);
};

go().catch((e) => console.log(e));
