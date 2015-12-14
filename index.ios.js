/**
 * The Rapid Project. Based on React Native.
 */
'use strict';

const React = require('react-native');
const {
  AppRegistry,
  StyleSheet,
  // basic components
  Text,
  View,
} = React;

const DeviceInfo = require("./device-info");
const ImageViewer = require("./image-viewer");
const SliderControl = require("./slider");

const Statistics = require("./statistics");

const rapid = React.createClass({
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
    Statistics.updateSpeed(Math.ceil(value));
  },
  pressImage() {
    Statistics.print();
  },
  render() {
    let detailText = "Paused";
    if (this.state.speed !== 0) {
      let direction = this.state.speed > 0 ? 'forward' : 'backwards';
      detailText = `Images playing ${direction} at ${Math.abs(this.state.speed)} photos per second`;
    }
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageViewer speed={this.state.speed}
            onPress={this.pressImage} />
        </View>
        <View style={styles.statusContainer}>
          <View style={styles.status}>
            <Text style={styles.statusIcon}>
              {this.state.speed < 0 ? "<" : ""}
            </Text>
            <Text style={styles.statusIcon}>
              {Math.abs(this.state.speed)}
            </Text>
            <Text style={styles.statusIcon}>
              {this.state.speed > 0 ? ">" : ""}
            </Text>
          </View>
          <Text style={styles.statusDetailText}>
            {detailText}
          </Text>
        </View>
        <View style={styles.sliderContainer}>
          <SliderControl value={0} maximumValue={15} minimumValue={-7}
            onValueChange={this._updateSpeed} />
        </View>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  imageContainer: {
    flex: 1,
    marginTop: 20 * DeviceInfo.pixel,
  },
  statusContainer: {
    height: 30 * DeviceInfo.pixel,
    marginTop: 10 * DeviceInfo.pixel,
  },
  status: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  statusIcon: {
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
  },
  statusDetailText: {
    fontSize: 12,
    textAlign: 'center',
  },
  statusTextBig: {
    textAlign: 'center',
    fontSize: 20
  },
  sliderContainer: {
    height: 65 * DeviceInfo.pixel,
  },
});

AppRegistry.registerComponent('rapid', () => rapid);
