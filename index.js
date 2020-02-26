const Webpay = require('./lib/webpay');
const { Configuration, services, environments } = require('./lib/config');

const Transbank = {};
Transbank.Configuration = Configuration;
Transbank.services = services;
Transbank.environments = environments;
Transbank.Webpay = Webpay;

module.exports = Transbank;
