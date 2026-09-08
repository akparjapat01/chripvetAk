import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import {BASE_URL} from '../../constants/Host';
import styles from "./index.style";
import { fetchMenteeProfile, fetchMentorProfile, updateTokenValue } from "../../redux/authaction";
import { useDispatch } from "react-redux";

const LogInAs = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [userType, setUserType] = useState("");
  const [optionFirst, setOptionFirst] = useState(true);
  const [optionSecond, setOptionSecond] = useState(false);
  const [loading, setLoading] = useState(false)

  const selectOneFunction = () => {
    setOptionFirst(true);
    setOptionSecond(false);
  };
  const selectTwoFunction = () => {
    setOptionSecond(true);
    setOptionFirst(false);
  };

  useEffect(() => {
    dispatch(fetchMenteeProfile());
    dispatch(fetchMentorProfile());
  }, []);


  const changePerson = () => {
    if(userType === 'MENTEE'){
        navigation.navigate("LogIn", { userType });
    }else if (userType === 'MENTOR'){
      navigation.navigate("MentorLogIn", { userType });
    }
  };

  useEffect(() => {
    setLoading(true)
    const getToken = async () => {
      const token = await AsyncStorage.getItem("tokens");
      dispatch(updateTokenValue(token));
      if (token) {
        setLoading(false)
        console.log('checkToken', token)
        navigation.navigate('BottomTab');
      } else {
        setLoading(false)
        navigation.navigate('LogInAs');
      }
    };
    getToken();
  }, []);
  
  useEffect(() => {
    if (optionFirst === true) {
      setUserType("MENTEE");
    } else {
      setUserType("MENTOR");
    }
  }, [optionFirst]);

 
  if (loading === true)
  return (
    <View style={styles.loadingStyle}>
      <ActivityIndicator />
    </View>
  );
  else
  return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        nestedScrollEnabled={true}
        style={styles.LogInAsContainer}
      >
        <ImageBackground
        source={require('../../assets/backgroundImage.png')}
        style={styles.background}
        resizeMode="contain">
        <View style={styles.continueAsContainer}>
          <Text style={styles.continueAsText}>Continue as?</Text>
        </View>
        <TouchableOpacity style={styles.applicantBox} onPress={selectOneFunction} activeOpacity={0.8}>
        <Text style={styles.applicantText}>Mentee</Text>
          <View style={styles.radios}>
            <TouchableOpacity style={styles.outer} onPress={selectOneFunction}>
              {optionFirst === true ? <View style={styles.inner}></View> : null}
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applicantBox} onPress={selectTwoFunction} activeOpacity={0.8}>
        <Text style={styles.applicantText}>Mentor</Text>
          <View style={styles.radios}>
            <TouchableOpacity
              style={styles.outer}
              onPress={selectTwoFunction}
            >
              {optionSecond === true ? (
                <View style={styles.inner}></View>
              ) : null}
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
          
          <TouchableOpacity activeOpacity={0.8} onPress={changePerson} style={styles.logInContinueBox}>
            <Text style={styles.logInContinueText}>Continue</Text>
          </TouchableOpacity>
          </ImageBackground>
      </ScrollView>
    );
};
export default LogInAs;


