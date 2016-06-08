'use strict';

global._ = require('lodash');
global.sinon = require('sinon');
global.chai = require('chai');
global.expect = chai.expect;
global.assert = chai.assert;


global.window = {
  XMLHttpRequest: sinon.useFakeXMLHttpRequest()
};

global.xhrRequests = [];

global.window.XMLHttpRequest.onCreate = function(req) {
  console.log('pouit')
  global.xhrRequests.push(req);
};

global.lastRequest = function() {
  return global.xhrRequests[global.xhrRequests.length - 1];
};
