// This file is created by egg-ts-helper@1.35.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportCalendar = require('../../../app/controller/calendar');
import ExportHome = require('../../../app/controller/home');

declare module 'egg' {
  interface IController {
    calendar: ExportCalendar;
    home: ExportHome;
  }
}
