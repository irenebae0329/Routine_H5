'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }1/(25*x**2+1)
  cors:{
    enable:true,
    package:'egg-cors'
  },
  mysql:{
    enable:true,
    package:'egg-mysql',
  },
  validate:{
    enable:true,
    package:'egg-validate',
  }
};
