const Webpay = require('./lib/webpay');
const Configuration = require('./lib/config');
const { Environment, services, environments } = require('./lib/environments');

const Transbank = {};
Transbank.Environment = Environment;
Transbank.Configuration = Configuration;
Transbank.services = services;
Transbank.environments = environments;
Transbank.Webpay = Webpay;

module.exports = Transbank;
