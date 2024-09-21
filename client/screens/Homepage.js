import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  StyledContainer,
  StyledButton,
  ButtonText,
  InnerContainer,
  PageLogo,
  SubTitle,
  MediaContainer,
  HeroImage,
  HomePageLogo,
  PageTitle,
  HomepageTitle,
  HeroImageContainer,
  StyledMediaButton,
  Colors,
  Line,
  ResultTitle,
  ProgessBar,
  Progress,
  ProgressBarText,
} from "../components/styles";
import { StatusBar } from "expo-status-bar";
import { Fontisto } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import Result from "./Result";
import ImageDisplay from "./Imagedisplay";
import * as SecureStore from "expo-secure-store";
import { customAxios } from "../App";
import axios from "axios";

const { brand, darkLight, primary } = Colors;

const Homepage = () => {
  const [imgUrl, setimgUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [predictedResult, setPredictedResult] = useState([ ]);
  const [loading, setLoading] = useState(false); // Introduce loading state

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      handleImagePickerResponse(result.assets[0].uri);
    }
  };

  const openImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      handleImagePickerResponse(result.assets[0].uri);
    }
  };

  const handleImagePickerResponse = async (uri) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("file", {
      uri: uri,
      type: uri.endsWith(".mp4") ? "video/mp4" : "image/jpeg", 
      name: uri.split("/").pop(), 
    });

    const token = await SecureStore.getItemAsync("token");

    try {
      let response = await customAxios.post('/file',formData, {
        headers: {
          "content-type": "multipart/form-data",
          Bearer: token,
        },
      });

      let predicted_result = await response.data;
      console.log(predicted_result.confidence);
      const real = predicted_result.result == "real" ? predicted_result.confidence: 1-predicted_result.confidence
      const fake = predicted_result.result == "fake" ? predicted_result.confidence: 1-predicted_result.confidence
      console.log(predicted_result.result);
      setPredictedResult([(real* 100).toFixed(2),(fake* 100).toFixed(2),predicted_result.type,predicted_result.result]);
    } catch (error) {
      console.error("Error processing image:", error);
    } finally {
      setLoading(false); // Set loading state to false whether processing succeeds or fails
    }
  };

  return (
    <ScrollView>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          {/* <HomePageLogo resizeMode="cover" source={require('../assets/img/logoblack.png')} /> */}
          <HomepageTitle>DeFaceLab</HomepageTitle>
          <HeroImageContainer>
            <HeroImage resizeMode="cover" source={require("../assets/img/facerecognization.gif")} />
          </HeroImageContainer>

          <SubTitle>Scan & Detect Deepfake</SubTitle>
          <MediaContainer>
            <StyledMediaButton onPress={openCamera}>
              <Fontisto name="camera" color={primary} size={20} />
            </StyledMediaButton>
            <StyledMediaButton onPress={openImagePicker}>
              <Fontisto name="picture" color={primary} size={20} />
            </StyledMediaButton>
          </MediaContainer>

          {loading ? ( // Show loading indicator when loading is true
              <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.tertiary} />
              <ResultTitle>processing...</ResultTitle>
            </View>
          ) : selectedImage && predictedResult ? ( // Show selected image and predicted result when both are available
            <>
              <ImageDisplay selectedImage={selectedImage} />
              <Result predictedResult={predictedResult} />
            </>
          ) : null}
        </InnerContainer>
      </StyledContainer>
    </ScrollView>
  );
};

export default Homepage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
    borderRadius: 35,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.43,
    shadowRadius: 25,
  },
  loadingContainer: {
    flex: 1,
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
