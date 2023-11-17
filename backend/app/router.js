'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/calendar/queryAll',controller.calendar.queryAll);
  router.post('/calendar/updateRecords',controller.calendar.updateRecords);
};
