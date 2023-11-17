/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1697361418050_583';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    security: {
      csrf: {
        enable: false,
        ignoreJSON: true
      },
    },
    cors: {
      origin:'*',
      credentials: true,
      allowMethods: 'POST,GET,OPTIONS'
    },
    mysql: {
      client: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '2323232Asd',
        database: 'education',
      }
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
