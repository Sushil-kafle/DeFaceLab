import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable, FlatList, StatusBar, Image } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { StyledContainer, InnerContainer, Colors, PageTitle, SubTitle } from "../components/styles";
import {
  HistoryContainer,
  HistoryImage,
  HistoryList,
  HistoryResultText,
  HistoryText,
  HistoryTitle,
  HistoryInnerContainer,
  HistoryTextContainer,
  HistoryOuterContainer,
} from "../components/historyStyles";
import { customAxios } from "../App";
import { useFocusEffect } from '@react-navigation/native';


import * as SecureStore from "expo-secure-store";




const History = () => {
  const [history, setHistory] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      const getHistory = async () => {
        const token = await SecureStore.getItemAsync("token");
        headers = {
          Bearer: token,
          accept: "application/json",
        };
        const response = await customAxios.get('/file/history', { headers });
        console.log(response.data);
        setHistory(response.data);
      };
  
      getHistory(); // Call the getHistory function every time the screen comes into focus

    }, [])
  );
  

  return (
      <HistoryOuterContainer>

      <ScrollView>
        <StatusBar style="dark" />
        <HistoryContainer>
          <PageTitle>DeFaceLab</PageTitle>
          <HistoryTitle>Recent Task</HistoryTitle>

    <FlatList
      data={history.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))}
      renderItem={({ item }) => (
      <HistoryList>
      {/* <Pressable android_ripple={{ color: Colors.red }}> */}
      <HistoryInnerContainer>
        <HistoryImage resizeMode="cover" source={{ uri: item.url }} />
        <HistoryTextContainer>
          <HistoryText>Date: {item.created_at.substring(0, 10)}</HistoryText>
          <HistoryText>Size: {item.size > 1024 ? (item.size / 1024).toFixed(2) + " MB" : item.size + " KB"}</HistoryText>
        </HistoryTextContainer>
      </HistoryInnerContainer>

      <HistoryResultText
        style={{ color: item.result === "real" ? Colors.green : Colors.red }}
        >
        Result: {item.result}
      </HistoryResultText>
          {/* </Pressable> */}
    </HistoryList>
  )}
/>

        </HistoryContainer>
      </ScrollView>
                </HistoryOuterContainer>
  );
};

export default History;
