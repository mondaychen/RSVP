'use strict';

const _ = require('lodash');

let lastSpeed;
let lastTimeStamp;

const speedDuration = {};
const speedHistory = [];
const durationHistory = [];

const Statistics = {
  updateSpeed: function (speed) {
    if (_.isUndefined(speed)) {
      return;
    }
    const now = +new Date();
    if (_.isUndefined(lastSpeed)) {
      lastSpeed = speed;
      lastTimeStamp = now;
      return;
    }
    // do nothing if speed not changed
    if (lastSpeed === speed) {
      return;
    }
    // count duration
    speedDuration[lastSpeed] = (speedDuration[lastSpeed] || 0) + (now - lastTimeStamp);
    speedHistory.push(lastSpeed);
    durationHistory.push(now - lastTimeStamp);
    lastSpeed = speed;
    lastTimeStamp = now;
  },
  print: function() {
    const timeSum = _.reduce(speedDuration, function(total, n) {
      return total + n;
    }, 0);
    const details = _.sortBy(_.map(speedDuration, function(v, k) {
      return {key: k, duration: v, percentage: (v/timeSum * 100).toFixed(2) + "%"};
    }), function(o) {
      return -o.duration;
    });
    _.each(details, function(o) {
      console.log(o);
    });
    console.log(speedHistory);
    console.log(durationHistory);
  }
}

module.exports = Statistics;
