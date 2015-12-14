'use strict';

const _ = require('lodash');

const React = require('react-native');
const {
  PropTypes,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  CameraRoll,
  TouchableOpacity,
} = React;

const TimerMixin = require('react-timer-mixin/TimerMixin');

const DeviceInfo = require("./device-info");

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      flex: 1,
      width: DeviceInfo.width - 20 * DeviceInfo.pixel,
      height: DeviceInfo.height - 100 * DeviceInfo.pixel,
      resizeMode: Image.resizeMode.contain,
    }
});

const IMAGES_PER_LOAD = 5;

const ImageViewer = React.createClass({

  mixins: [TimerMixin],

  propTypes: {
    speed: PropTypes.number,
    onPress: PropTypes.function,
  },

  getDefaultProps() {
    return {
      speed: 0,
      onPress: _.noop
    }
  },
  
  getInitialState() {
    return {
      images: [],
      imageIdx: 0,
      lastCursor: undefined,
      timeElapsed: 0,
      endOfRoll: false,
    };
  },

  componentDidMount() {
    this._fetchImages();
    this.setInterval(()=> {
      var timeElapsed = this.state.timeElapsed;
      var forward = this.props.speed > 0;
      if (timeElapsed > Math.abs(1000 / this.props.speed)) {
        this._selectNextImage(forward);
        timeElapsed = 0;
      }
      this.setState({
        timeElapsed: timeElapsed + 20
      });
    }, 20);
  },

  _fetchImages() {
    if (this.state.endOfRoll) {
      return;
    }
    const fetchParams = {
      first: IMAGES_PER_LOAD,
      after: this.state.lastCursor,
    };
    CameraRoll.getPhotos(fetchParams, this.storeImages, this.logImageError);
  },

  storeImages(data) {
    const assets = data.edges;
    const images = assets.map((asset) => asset.node.image);
    this.setState({
      images: this.state.images.concat(images),
      lastCursor: data.page_info.end_cursor,
      endOfRoll: assets.length === 0,
    });
  },

  logImageError(err) {
    console.log(err);
  },

  _selectNextImage(forward) {
    const {images, imageIdx} = this.state;
    if (images.length <= imageIdx + IMAGES_PER_LOAD) {
      this._fetchImages();
    }
    if (forward && images.length > this.state.imageIdx) {
      this.setState({
        imageIdx: this.state.imageIdx + 1
      });
    }
    if (!forward && this.state.imageIdx >= 0) {
      this.setState({
        imageIdx: this.state.imageIdx - 1
      });
    }
  },

  _onPressButton() {
    this.props.onPress();
  },

  render() {
    const {images, imageIdx} = this.state;
    const currentImage = images[imageIdx]; // undefined if imageIdx out of bound
    return (
      <View style={styles.container}>
        { currentImage ? (
          <TouchableOpacity onPress={this._onPressButton} activeOpacity={0.7}>
            <Image style={styles.image} source={{ uri: currentImage.uri }} />
          </TouchableOpacity>
        ): (
        <Text>
          {imageIdx > 0 ? "No more photos to show."
            : "You have reached the very beginning."}
        </Text>) }
      </View>
    );
  }
});

module.exports = ImageViewer;
