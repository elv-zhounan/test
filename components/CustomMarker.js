import React from 'react';
import { StyleSheet, Image } from 'react-native';

class CustomMarker extends React.Component {
  render() {
    return (
      <Image
        style={styles.image}
        source={
          require('../static/images/diamond.png')
        }
        resizeMode="contain"
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 10,
    width: 10,
  },
});

export default CustomMarker
