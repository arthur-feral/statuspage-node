'use strict';

const _ = require('lodash');
const when = require('when');
const superagent = require('superagent');

module.exports = (properties) => {
  const BASE_URL = 'https://{id}.statuspage.io/api/{apiVersion}/{report}.{format}';

  if (_.isUndefined(properties)) {
    throw new Error('Your statuspage ID is required.');
  }

  if (!_.isString(properties) && !_.has(properties, 'id')) {
    throw new Error('Your statuspage ID is required.');
  }

  const defaults = {
    format: 'json',
    apiVersion: 'v2',
    report: 'status'
  };

  let params = {};

  if (_.isString(properties)) {
    params = _.assign(defaults, {id: properties});
  } else {
    params = _.assign(defaults, properties);
  }


  const buildUrl = (name) => {
    return BASE_URL
      .replace('{id}', params.id)
      .replace('{apiVersion}', params.apiVersion)
      .replace('{report}', name)
      .replace('{format}', params.format);
  };

  
  const getReport = (name) => {
    name = name || defaults.report;
    return when.promise((resolve, reject) => {
      superagent.get(buildUrl(name))
        .end((error, response) => {
          if (error) {
            reject(error);
          }

          resolve(response.body);
        });
    });
  };

  return {
    getReport
  };
};
