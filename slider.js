'use strict';

const React = require('react-native');

const {
  PropTypes,
  StyleSheet,
  // basic components
  Text,
  View,
} = React;

const TimerMixin = require('react-timer-mixin/TimerMixin');

const Slider = require('react-native-slider');

const DeviceInfo = require("./device-info");


const SliderControl = React.createClass({

  mixins: [TimerMixin],

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

  onSlidingStart() {
    this.clearInterval(this._timerID);
  },

  onSlidingComplete() {
    this._timerID = this.setInterval(()=> {
      let absValue = Math.abs(this.state.value);
      const sign = this.state.value > 0 ? 1 : -1;
      if (absValue < 0.51) {
        this.onValueChange(0);
        this.clearInterval(this._timerID);
        return;
      }
      absValue -= 0.5 * Math.max(1, Math.log(absValue));
      this.onValueChange(sign * absValue);
    }, 10);
  },

  render() {
    return (
      <View style={styles.container}>
        <Slider {...this.props}
          value={this.state.value}
          onValueChange={this.onValueChange}
          onSlidingStart={this.onSlidingStart}
          onSlidingComplete={this.onSlidingComplete} />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5 * DeviceInfo.pixel,
    marginLeft: 10 * DeviceInfo.pixel,
    marginRight: 10 * DeviceInfo.pixel,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});

module.exports = SliderControl;
