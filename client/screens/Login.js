import React, { useState } from "react";
import {
  LoginStyledContainer,
  StyledContainer,
  InnerContainer,
  PageLogo,
  SubTitle,
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  Colors,
  StyledButton,
  ButtonText,
  MsgBox,
  Line,
  ExtraText,
  ExtraView,
  TextLink,
  TextLinkContent,
} from "../components/styles";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { View } from "react-native";
import { Octicons, Ionicons, Fontisto } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";

import * as SecureStore from "expo-secure-store";
import { customAxios } from "../App";
import { ActivityIndicator } from "react-native";
// Colors
const { brand, darkLight, primary } = Colors;


const Login = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const navigation = useNavigation();
  return (
    <ScrollView>
      <LoginStyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageLogo resizeMode="cover" source={require("../assets/img/logowhite.png")} />
          <SubTitle>Account Login</SubTitle>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values) => {
              try {
                new_value = {
                  password: values.password,
                  email: values.email,
                };
                // headers = {
                //   "Content-Type": "application/x-www-form-urlencoded",
                // };

                console.log(new_value);
                const response = await customAxios.post('/auth/login', new_value);
                console.log(response.data.access_token);

                await SecureStore.setItemAsync("token", response.data.access_token);
                navigation.navigate("TabNavigator");
                // Navigate to the desired screen after successful login
              } catch (error) {
                console.error("Error logging in:", error);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Email Address"
                  icon="mail"
                  placeholder="example@gmail.com"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                />
                <MyTextInput
                  label="Password"
                  icon="lock"
                  placeholder="........"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsgBox>...</MsgBox>
              
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Login</ButtonText>
                </StyledButton>
                {/* { isSubmitting && <StyledButton disabled={true}><ActivityIndicator size={"large"} color={Colors.darkLight}/> </StyledButton>  } */}
            
                <Line />
                {/* <StyledButton google={true} onPress={handleSubmit}>
                  <Fontisto name="google" color={primary} size={25} />
                  <ButtonText>Sign in with Google</ButtonText>
                </StyledButton> */}
                <ExtraView>
                  <ExtraText>Don't have an account already?</ExtraText>
                  <TextLink onPress={() => navigation.navigate("Signup")}>
                    <TextLinkContent> Signup</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </LoginStyledContainer>
    </ScrollView>
  );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? "md-eye-off" : "md-eye"} size={30} color={darkLight} />
        </RightIcon>
      )}
    </View>
  );
};

export default Login;
