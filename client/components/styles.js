import styled from 'styled-components/native'; 
import { View, Image, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;
const screenHeight = Dimensions.get('window').height;

export const Colors = {
  primary: '#030023',
  secondary: '#E5E7EB',
  tertiary: '#ffffff',
  darkLight: '#9CA3AF',
  brand: '#6D28D9',
  green: '#1eB981',
  real: '#228B22',
  fake: '#DC143C',
  red: '#EF4444',
  card: '#0b0640',
};

const { primary, secondary, tertiary, darkLight, brand, green, red, fake, real, card } = Colors;

export const StyledContainer = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: ${StatusBarHeight + 20}px;
  padding-bottom: ${screenHeight * 0.1}px;
  background-color: ${primary};
  `;
export const LoginStyledContainer = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: ${StatusBarHeight + 20}px;
  padding-bottom: ${screenHeight * 0.16}px;
  background-color: ${primary};
  `;
  
export const StyledProfileContainer = styled.View`
  margin-top: 70px;
  background-color: ${card};
  border-radius: 35px;
  padding: 15px;
  `;
  
  export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  margin-top: 20px;
`;

export const StyledResultContainer = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 20px;
  padding-top: 20px;
`;

export const PageLogo = styled.Image`
  width: 250px;
  height: 220px;
`;

export const PageTitle = styled.Text`
  font-size: 35px;
  text-align: center;
  font-weight: bold;
  color: ${tertiary};
  padding: 10px;
`;

export const SubTitle = styled.Text`
  font-size: 18px;
  margin-top: 40px;
  margin-bottom: 29px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${tertiary};
`;

export const StyledFormArea = styled.View`
  width: 90%;
`;

export const StyledTextInput = styled.TextInput`
  background-color: ${secondary};
  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  border-radius: 5px;
  font-size: 16px;
  height: 60px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${primary};
`;

export const StyledInputLabel = styled.Text`
  color: ${tertiary};
  font-size: 13px;
  text-align: left;
`;

export const LeftIcon = styled.View`
  left: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${brand};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-vertical: 5px;
  height: 60px;
  ${(props) =>
    props.google == true &&
    `
  background-color: ${green};
  flex-direction: row;
  gap: 20px;
  justify-content: center;
  `}
  ${(props) =>
    props.logout == true &&
    `
  background-color: ${red};
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-vertical: 20px;
  height: 60px;
  width: 90%;
  gap: 20px;
  `}
`;

export const ButtonText = styled.Text`
  color: ${primary};
  font-size: 16px;
`;

export const MsgBox = styled.Text`
  text-align: center;
  font-size: 13px;
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${darkLight};
  margin-vertical: 10px;
`;

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  padding-bottom: 40px;
`;

export const ExtraText = styled.Text`
  color: ${tertiary};
  font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-content: center;
`;

export const TextLinkContent = styled.Text`
  color: ${brand};
  font-size: 15px;
`;

// Home Page
export const StyledMediaButton = styled.TouchableOpacity`
  padding: 18px;
  background-color: ${brand};
  justify-content: center;
  align-items: center;
  border-radius: 18px;
  margin-vertical: 5px;
  height: 60px;
`;

export const MediaContainer = styled.View`
  width: 60%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: 20px;
`;

export const ResultTitle = styled.Text`
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  color: ${darkLight};
  padding: 20px;
  padding-bottom: 20px;
  ${(props) =>
    props.real == true &&
    `
    color: ${Colors.green};
    `}
  ${(props) =>
    props.fake == true &&
    `
    color: ${Colors.red};
  `}
`;

export const HomepageTitle = styled.Text`
  font-size: 35px;
  text-align: center;
  font-weight: bold;
  color: ${tertiary};
  padding-bottom: 50px;
`;

export const HomePageLogo = styled.Image`
  width: 200px;
  height: 100px;
`;

export const HeroImageContainer = styled.View`
  width: 300px;
  height: 400px;
  border-radius: 20px;
  shadow-color: #000;
  shadow-offset: 0 7px;
  shadow-opacity: 0.43;
  shadow-radius: 25px;
  elevation: 15;
  overflow: hidden;
`;

export const HeroImage = styled.Image`
  width: 300px;
  height: 400px;
  border-radius: 20px;
`;

export const ProgessBar = styled.View`
  height: 20px;
  width: 80%;
  border-radius: 20px;
  background-color: ${darkLight};
  margin-vertical: 10px;
  overflow: hidden;
`;

export const ProgressBarText = styled.Text`
  color: white;
  text-align: center;
  ${(props) =>
    props.real == true &&
    `
color: ${Colors.green};
  `}
  ${(props) =>
    props.fake == true &&
    `
  color: ${Colors.red};
  `}
`;
export const ProgressBarVideoText = styled.Text`
  color: white;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  ${(props) =>
    props.real == true &&
    `
color: ${Colors.green};
  `}
  ${(props) =>
    props.fake == true &&
    `
  color: ${Colors.red};
  `}
`;

export const Progress = styled.View`
  height: 100%;
  width: ${({ percentage }) => (percentage ? percentage + '%' : '0%')};
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.real == true &&
    `
  background-color: ${Colors.green};
  `}
  ${(props) =>
    props.fake == true &&
    `
  background-color: ${Colors.red};
  `}
`;
