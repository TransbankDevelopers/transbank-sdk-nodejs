const Webpay = require('./lib/webpay');
const Configuration = require('./lib/config');
const { Environment, services, environments } = require('./lib/environments');

Webpay.Environment = Environment;
Webpay.Configuration = Configuration;
Webpay.services = services;
Webpay.environments = environments;
module.exports = Webpay;
