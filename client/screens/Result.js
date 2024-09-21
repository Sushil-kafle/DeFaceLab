import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {
  HomepageTitle,
  StyledResultContainer,
  Colors,
  ResultTitle,
  ProgessBar,
  Progress,
  ProgressBarText,
  ProgressBarVideoText,
} from '../components/styles';
import { ScrollView } from 'react-native';

const { brand, darkLight, primary } = Colors;

const Result = ({ predictedResult }) => {
  return (
    <ScrollView>
      <StyledResultContainer>
        <HomepageTitle>Result</HomepageTitle>
        {/* Conditionally render the ProgressBarText */}
        {predictedResult[2] === 'video' && (
          <ProgressBarVideoText real={predictedResult[3] === 'real'} fake={predictedResult[3] === 'fake'}>
            {/* The predicted Video is {predictedResult[3]=="real"?"fake":"real"} */}
            The predicted Video is {predictedResult[3]}
          </ProgressBarVideoText>
        )}

        {/* If predictedResult is not a string and loading is false, render the progress bar */}
        {predictedResult[2] == 'image' && (
          <>
            <ResultTitle>Predicted Content Authenticity</ResultTitle>
            <ResultTitle real={true}>Real</ResultTitle>
            <ProgressBarText real={true}>
              {predictedResult[0]}%
            </ProgressBarText>
            <ProgessBar>
              <Progress real={true} percentage={predictedResult[0]} />
            </ProgessBar>
            <ResultTitle fake={true}>Fake</ResultTitle>
            <ProgressBarText fake={true} >
              {predictedResult[1]}%
            </ProgressBarText>
            <ProgessBar>
              <Progress fake={true} percentage={predictedResult[1]} />
            </ProgessBar>
          </>
        )}
      </StyledResultContainer>
    </ScrollView>
  );
};

export default Result;
