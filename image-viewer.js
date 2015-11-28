'use strict';

const React = require('react-native');
const {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  CameraRoll,
  TouchableHighlight,
} = React;
var DeviceInfo = require("./device-info");

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

const ImageViewer = React.createClass({
  
  getInitialState() {
    return {
      images: [],
      imageIdx: 0,
      lastCursor: undefined,
      selected: '',
    };
  },

  componentDidMount() {
    this._fetchImages();
  },

  _fetchImages(callback) {
    const fetchParams = {
      first: 2,
      after: this.state.lastCursor,
    };
    CameraRoll.getPhotos(fetchParams, this.storeImages, this.logImageError);
    if(callback) {
      callback();
    }
  },

  storeImages(data) {
    const assets = data.edges;
    const images = assets.map((asset) => asset.node.image);
    this.setState({
      images: this.state.images.concat(images),
      lastCursor: data.page_info.end_cursor,
    });
  },

  logImageError(err) {
    console.log(err);
  },

  onTapImage() {
    const {images, imageIdx} = this.state;
    if (images.length > imageIdx + 1) {
      this._selectNextImage();
    } else {
      this._fetchImages(this._selectNextImage);
    }
  },

  _selectNextImage() {
    this.setState({
      imageIdx: this.state.imageIdx + 1
    });
  },

  render() {
    const {images, imageIdx} = this.state;
    const currentImage = images[imageIdx]; // undefined if imageIdx out of bound
    return (
      <View style={styles.container}>
        { currentImage ? (
          <TouchableHighlight activeOpacity={0.5} onPress={this.onTapImage}>
            <Image style={styles.image} source={{ uri: currentImage.uri }} />
          </TouchableHighlight>
        ): (
        <Text>
          No more photos to show.
        </Text>) }
      </View>
    );
  }
});

module.exports = ImageViewer;
