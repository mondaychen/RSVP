'use strict';

var React = require('react-native');
var {
  Dimensions,
  PixelRatio,
} = React;

const DeviceInfo = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  pixel: PixelRatio.get()
}

module.exports = DeviceInfo;