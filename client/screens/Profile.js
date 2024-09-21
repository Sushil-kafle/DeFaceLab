import React, { useState, useEffect } from "react";
import { View, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  ResultTitle,
  Colors,
  StyledButton,
  ButtonText,
  StyledProfileContainer,
} from "../components/styles";

import axios from "axios";

import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";
import { StyledProfileTextTitle } from "../components/Profile.Styles";
import * as SecureStore from "expo-secure-store";
import { customAxios } from "../App";
import { useFocusEffect } from '@react-navigation/native';
const { brand, darkLight, primary, tertiary } = Colors;



const Profile = () => {
  const [profile, setProfile] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      const get_profile = async () => {
        const token = await SecureStore.getItemAsync("token");
  
        console.log(token);
        headers = {
          Bearer: token,
          accept: "application/json",
        };
  
        const response = await customAxios.get('/user/profile', { headers });
        console.log(response.data);
        setProfile(response.data);
      };
  
      get_profile(); // Call get_profile function every time the screen comes into focus
  
    }, [])
  );
  

  const navigation = useNavigation(); 


  const handleLogout = () => {
    SecureStore.setItemAsync("token", "");
    setProfile({});
    navigation.navigate("Login");
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <StyledContainer>
        <PageTitle>DeFaceLab</PageTitle>
        <StatusBar/>
        <StyledProfileContainer>
          <InnerContainer>
            {/* Profile Icon */}
            <Ionicons name="person-circle-outline" size={100} color={darkLight} />

            {/* Profile Information */}
            <PageTitle>Profile</PageTitle>
            <StyledProfileTextTitle title={true}>
              <Ionicons name="person-outline" size={20} color={brand} /> Username:
              <StyledProfileTextTitle> {profile.name}</StyledProfileTextTitle>
            </StyledProfileTextTitle>
            <StyledProfileTextTitle title={true}>
              <Ionicons name="mail-outline" size={20} color={brand} /> Email: 
              <StyledProfileTextTitle> {profile.email}</StyledProfileTextTitle>
            </StyledProfileTextTitle>
            <StyledButton logout={true} onPress={handleLogout}>
              <ButtonText>Logout</ButtonText>
            </StyledButton>
          </InnerContainer>
        </StyledProfileContainer>
      </StyledContainer>
    </ScrollView>
  );
};

export default Profile;
