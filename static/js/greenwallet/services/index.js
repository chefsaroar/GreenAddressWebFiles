var angular = require('angular');

module.exports = Service;

// these are all the services exposed when this runs
// we would just iterate over the FS and include them all,
// however browserify wont find them automatically if we do that..
// it's easier to just maintain this list manually,
// also you can swap out implementations if you want based on runtime logic
var serviceMap = {
  addressbook: require('./addressbook'),
  autotimeout: require('./autotimeout'),
  bip38: require('./bip38'),
  blind: require('./blind'),
  btchip: require('./btchip'),
  clipboard: require('./clipboard'),
  cordovaReady: require('./cordovaReady'),
  crypto: require('./crypto'),
  device_id: require('./device_id'),
  encode_key: require('./encode_key'),
  focus: require('./focus'),
  gaEvent: require('./gaEvent'),
  hw_wallets: require('./hw_wallets'),
  notices: require('./notices'),
  parseKeyValue: require('./parseKeyValue'),
  parse_bitcoin_uri: require('./parse_bitcoin_uri'),
  sound: require('./sound'),
  storage: require('./storage'),
  user_agent: require('./user_agent'),
  wallets: require('./wallets'),
  qrcode: require('./qrcode'),
  trezor: require('./trezor'),
  tx_sender: require('./tx_sender')
};

// takes in the module and returns all the services
function Service () {
  var module = angular.module('greenWalletServices', []);

  Object.keys(serviceMap).forEach(function (serviceName) {
    var service = serviceMap[serviceName];
    module.factory(
      serviceName,
      (service.dependencies || []).concat(service)
    );
  });
}
