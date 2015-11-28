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
var ImageViewer = require("./image-viewer");
var DeviceInfo = require("./device-info");

var rapid = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageViewer />
        </View>
        <View style={styles.instructions}>
          <Text style={styles.instructionsText}>
            Press Cmd+R to reload,{'\n'}
            Cmd+D or shake for dev menu
          </Text>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  imageContainer: {
    flex: 1,
    marginTop: 50 * DeviceInfo.pixel
  },
  instructions: {
    justifyContent: 'center', // vertical align
    height: 100 * DeviceInfo.pixel
  },
  instructionsText: {
    textAlign: 'center',
    color: '#333333',
  },
});

AppRegistry.registerComponent('rapid', () => rapid);
