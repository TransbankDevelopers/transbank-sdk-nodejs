const sleep = (milliseconds) => {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
};

const ask = (query) => {
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
};

const buyOrder = () => {
  return 'O-' + Math.floor(Math.random() * 10000) + 1;
};

const sessionId = () => {
  return 'S-' + Math.floor(Math.random() * 10000) + 1;
};

const cardNumber = '4051 8856 0044 6623';
const cardExpirationDate = '23/10';

exports.sleep = sleep;
exports.ask = ask;
exports.buyOrder = buyOrder;
exports.sessionId = sessionId;
exports.cardNumber = cardNumber;
exports.cardExpirationDate = cardExpirationDate;
