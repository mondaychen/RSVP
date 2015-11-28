'use strict';

var React = require('react-native');

var React = require('react-native');
var {
  PropTypes,
  StyleSheet,
  // basic components
  Text,
  View,
} = React;

var Slider = require('react-native-slider');

var DeviceInfo = require("./device-info");


var SliderControl = React.createClass({

  propTypes: {
    value: PropTypes.number,
    minimumValue: PropTypes.number,
    maximumValue: PropTypes.number,
    onValueChange: PropTypes.func,
  },

  getDefaultProps: () => ({
    value: 0,
    minimumValue: 0,
    maximumValue: 1,
  }),

  getInitialState() {
    return {
      value: this.props.value,
    };
  },

  onValueChange(value) {
    this.setState({value: value});
    if (this.props.onValueChange) {
      this.props.onValueChange(value);
    }
  },

  render() {
    return (
      <View style={styles.container}>
        <Slider {...this.props}
          value={this.state.value}
          onValueChange={this.onValueChange} />
        <Text>Value: {this.state.value}</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10 * DeviceInfo.pixel,
    marginRight: 10 * DeviceInfo.pixel,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});

module.exports = SliderControl;
