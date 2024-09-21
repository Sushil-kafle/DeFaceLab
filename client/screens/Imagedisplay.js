import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Colors } from '../components/styles';

const ImageDisplay = ({ selectedImage }) => {
  return (
    <View style={styles.shadowContainer}>
      <Image source={{ uri: selectedImage }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    paddingTop:50,
    marginTop: 20,
    borderRadius: 35,
    // borderWidth:1,
    // borderColor: Colors.brand,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 35,
    overflow: 'hidden', // Ensure the image stays within the bounds of the shadow container
  },
});

export default ImageDisplay;
