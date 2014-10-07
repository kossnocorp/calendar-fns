var startOfWeek = require('date-fns/src/start_of_week');
var startOfMonth = require('date-fns/src/start_of_month');
var endOfWeek = require('date-fns/src/end_of_week');
var addDays = require('date-fns/src/add_days');
var eachDay = require('date-fns/src/each_day');
var weekObj = require('./week_obj');
var isSameMonth = require('date-fns/src/is_same_month');

var NUMBER_OF_WEEKS = 6;

/**
 * @param {string|date} dirtyDate
 * @param {number} [weekStartsAt=0]
 * @returns {Object}
 */
var monthObj = function(dirtyDate, weekStartsAt) {
  var date = new Date(dirtyDate);
  var startDate = startOfWeek(startOfMonth(date), weekStartsAt);
  var monthData = [];
  var weekIndex, weekData, startOfWeekDate;

  for (weekIndex = 0; weekIndex < NUMBER_OF_WEEKS; weekIndex++) {
    startOfWeekDate = addDays(startDate, weekIndex * 7);
    weekData = weekObj(startOfWeekDate, weekStartsAt).map(
      function(dayData) {
        dayData.isDummy = !isSameMonth(date, dayData.date);
        return dayData;
      }
    );

    monthData.push(weekData);
  }

  return monthData;
};

module.exports = monthObj;

