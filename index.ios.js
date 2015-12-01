/**
 * The Rapid Project. Based on React Native.
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  // basic components
  Text,
  View,
} = React;

var DeviceInfo = require("./device-info");
var ImageViewer = require("./image-viewer");
var SliderControl = require("./slider");


var rapid = React.createClass({
  getInitialState() {
    return {
      imageIdx: 0,
      speed: 0,
    };
  },
  _updateSpeed(value) {
    this.setState({
      speed: Math.ceil(value)
    });
  },
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageViewer speed={this.state.speed} />
        </View>
        <View style={styles.sliderContainer}>
          <SliderControl value={0} maximumValue={15} minimumValue={-5}
            onValueChange={this._updateSpeed} />
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  imageContainer: {
    flex: 1,
    marginTop: 20 * DeviceInfo.pixel,
  },
  sliderContainer: {
    height: 65 * DeviceInfo.pixel,
  },
});

AppRegistry.registerComponent('rapid', () => rapid);
