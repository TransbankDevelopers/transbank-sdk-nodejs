const Transbank = require('./lib/transbank');
const Configuration = require('./lib/config');
const { Environment, services, environments } = require('./lib/environments');

Transbank.Environment = Environment;
Transbank.Configuration = Configuration;
Transbank.services = services;
Transbank.environments = environments;
module.exports = Transbank;
