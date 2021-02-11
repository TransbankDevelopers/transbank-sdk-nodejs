const {
  Oneclick,
  TransactionDetail,
  TransaccionCompleta,
  InstallmentDetail,
} = require('./dist/es5');
const readline = require('readline');

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function ask(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}
let buyOrder = 'O-' + Math.floor(Math.random() * 10000) + 1;

const flow = async () => {
  Oneclick.configureOneclickMallDeferredForTesting();

  let username = 'pepitoasdf';
  let email = 'pepitoasdf@somemail.com';
  let responseUrl = 'http://localhost:3000';

  let response = await Oneclick.MallInscription.start(username, email, responseUrl);

  console.log('response');
  console.log(response);

  await ask('Presiona enter cuando termines de inscribir la tarjeta');

  let finishResponse = await Oneclick.MallInscription.finish(response.token);

  console.log('finishResponse');
  console.log(finishResponse);

  let buyOrderChild = 'O-' + Math.floor(Math.random() * 10000) + 1;
  let authorizeResponse = await Oneclick.MallTransaction.authorize(
    username,
    finishResponse.tbk_user,
    buyOrder,
    [new TransactionDetail(1000, '597055555548', buyOrderChild)]
  ).catch((e) => console.log(e));

  console.log('authorizeResponse');
  console.log(authorizeResponse);
  sleep(1500);

  let captureResponse = await Oneclick.MallDeferredTransaction.capture(
    authorizeResponse.details[0].commerce_code,
    authorizeResponse.details[0].buy_order,
    authorizeResponse.details[0].amount,
    authorizeResponse.details[0].authorization_code
  );

  console.log('captureResponse');
  console.log(captureResponse);

  sleep(1500);

  let statusResponse = await Oneclick.MallTransaction.status(buyOrder);
  console.log('statusResponse');
  console.log(statusResponse);
  sleep(1500);

  let refundResponse = await Oneclick.MallTransaction.refund(
    buyOrder,
    '597055555548',
    buyOrderChild,
    1000
  );

  console.log('refundResponse');
  console.log(refundResponse);

  let deleteResponse = await Oneclick.MallInscription.delete(finishResponse.tbk_user, username);
  console.log('Delete', deleteResponse);
};

flow().catch((e) => console.log(e));
