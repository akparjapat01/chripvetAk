import React, { useEffect, useRef } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { PermissionsAndroid, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { AGORA_APP_ID } from '@env';

import AgoraUIKit from 'agora-rn-uikit';
import { PostAPIRequest } from '../../API/Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auto_debit_Mentee, end_call_Mentee } from '../../API/endpoints';
import { countdown } from '../../helper/coutdown';
import { Icon } from 'react-native-elements';
import { DateTimeFormat_Both } from '../../helper/TimeFormat';
import { show } from '../../utils/toast';

let appId = 'AGORA_APP_ID';
let channelName = 'beautybook';
let token =
  '007eJxTYPgefu6j8g8Xuw613vmeDyryuDdp612cFJ/7QFpngrmh9loFBssUU4NUIyMTC2NjE5MUY0sLU1OzZMs0Y+M0Y8MkE/OkohdmKQ2BjAxXpVtYGBkgEMTnYkhKTSwtqUzKz89mYAAAvgogcQ==';
const uid = 1;

// Pass the call info in data and user details in userInfo from parent screen.
const VideoCall = props => {
  const navigation = useNavigation();

  const receiverId = props?.route?.params?.receiverId;
  const goToHome = props?.route?.params?.goToHome;
  let prevData = props?.route?.params?.data;
  let upcomingMeeting = props?.route?.params?.upcomingMeeting;

  let currentUser = props?.route?.params?.userInfo;
  let senderId = props?.route?.params?.senderId;
  channelName = prevData?.channelName;
  token = prevData?.rtcToken;
  appId = prevData?.appId;
  const meeting_id = prevData?.meeting_id;
  let endTime = DateTimeFormat_Both(prevData?.endTime)?.split(" ")?.[1]?.split(":");

  let currentTime = new Date();
  let currentTime2 = new Date();
  currentTime = DateTimeFormat_Both(currentTime)?.split(" ")?.[1]?.split(":");

  let difference = 0;
  if (currentTime[0] == endTime[0] && endTime[1] != '00') {
    difference = parseInt(endTime[1]) - parseInt(currentTime[1]);
  } else if (currentTime[0] == endTime[0] && endTime[1] == '00') {
    difference = 60 - currentTime[1];
  } else {
    difference = (60 - currentTime[1]) + endTime[1];
  };
  console.log("difference", difference);
  console.log(prevData?.endTime);
  console.log(prevData?.startTime);

  const getPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
  };

  let startTime = new Date(prevData?.startTime);
  let endTime2 = new Date(prevData?.endTime);

  useEffect(() => {
    console.log("prevData?.endTime", prevData?.endTime);
    if (startTime.getTime() > currentTime2.getTime() || endTime2?.getTime() < currentTime2?.getTime() || startTime.getMonth() != currentTime2?.getMonth()) {
      show("This is not your booked slot ", "warning");
      navigation.goBack();
    }
    getPermission();
  }, []);

  const handleEndCall = async () => {

    const token = await AsyncStorage.getItem('tokens');
    const user_type = await AsyncStorage.getItem('user_type');
    const formData = new FormData();
    formData.append('meeting_id', meeting_id);
    let res = await PostAPIRequest({
      formData: formData,
      endpoint: end_call_Mentee,
      token: token,
    });

    if (res?.status == 200 || res?.status == 201) {
      res = res?.data;
      console.log('CALL ENDED SUCCESSFULLY !', res);
      show(res?.data?.message, "success");
      
      const customerId  = res?.data?.customerId;
      const token = await AsyncStorage.getItem("tokens");
      const formData = new FormData();
      formData.append("customer_id", "cus_OPBxOjwlhU8AYD");
      formData.append("paymentDescription", "test description");

      if (user_type == "MENTEE") {
        let autoDebitResponse = await PostAPIRequest({ formData: formData, endpoint: auto_debit_Mentee, token: null });
        console.log("autoDebitResponse", autoDebitResponse?.data);
      }

      if (user_type == 'MENTEE') {
        if (res?.data?.is_form_filled == "PENDING") {
          navigation.navigate('SurveyForm', {
            mentor_id: receiverId,
            meeting_id: meeting_id,
            token: token,
          });
        } else {
          navigation.navigate('Home');
        }

      } else if (goToHome) {
        navigation.navigate('Home');
      } else {
        // navigation.navigate("Inbox");
        navigation.goBack();
      }
    } else {
      console.log('ERROR WHILE ENDING THE CALL ', res?.response?.data);
    }

  };

  const myCountdown = countdown(difference, handleEndCall);

  const connectionData = {
    appId: appId,
    channel: channelName,
    token: null, // enter your channel token as a string
  };

  const rtcCallbacks = {
    EndCall: () => {
      myCountdown.stop();
      handleEndCall();
    },
    JoinChannelSuccess: () => {
      myCountdown.start();
    },
    UserOffline: e => {
      myCountdown.stop();
      handleEndCall();
    },
  };

  return (
    <>
      <AgoraUIKit
        connectionData={connectionData}
        rtcCallbacks={rtcCallbacks}
        rtmCallbacks={{
          ConnectionStateChanged: e => {
            console.log(e, 'status');
          },
          ChannelMemberLeft: e => {
            console.log(e.channelId, e.userId, 'member datils');
          },
          PeersOnlineStatusChanged: e => {
            console.log(e, 'onstatus');
          },
          RemoteInvitationCanceled: e => {
            console.log('callcut', e);
          },
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default VideoCall;
