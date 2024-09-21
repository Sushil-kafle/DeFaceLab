import styled from 'styled-components/native';
import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { Colors } from './styles';
import Constants from 'expo-constants';
const StatusBarHeight = Constants.statusBarHeight;

export const HistoryContainer = styled.View`
  width: 100%;
`;
export const HistoryList = styled.View`
  width: 100%;
  border-width: 1px;
  border-radius: 20px;
  margin-top: 25px;
  background-color: ${Colors.card};
`;
export const HistoryOuterContainer = styled.View`
  flex: 1;
  padding-bottom: 2px;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: ${StatusBarHeight + 20}px;
  background-color: ${Colors.primary};
`;

export const HistoryInnerContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
  margin-left: 15px;
  padding: 10px;
  align-items: center;
`;
export const HistoryTextContainer = styled.View`
  flex-direction: column;
`;

export const HistoryTitle = styled.Text`
  font-size: 20px;
  margin-top: 40px;
  margin-bottom: 29px;
  letter-spacing: 1px;
  font-weight: bold;
  text-align: center;
  color: ${Colors.darkLight};
`;

export const HistoryText = styled.Text`
  padding: 10px;
  color: ${Colors.darkLight};
`;
export const HistoryResultText = styled.Text`
  padding: 10px;
  text-align: center;
  font-size: 18px;
`;

export const HistoryImage = styled.Image`
  width: 100px;
  height: 100px;
  margin-right: 10px;
  border-radius: 20px;
`;
