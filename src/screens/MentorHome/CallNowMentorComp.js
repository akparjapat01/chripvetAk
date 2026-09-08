import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import styles from './index.style';
import { BASE_URL_IMAGE } from '../../constants/Host';
import { FontAwesome5 } from '../../component/Icons';
import { black_1, cobalt, redish, white } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PostAPIRequest } from '../../API/Axios';
import { DateTimeFormat } from '../../helper/TimeFormat';
import { agoraCallStart, delete_Appointment_Mentor } from '../../API/endpoints';
import Mute from 'react-native-vector-icons/Ionicons';
import { notificationSound } from '../../..';
import { show } from '../../utils/toast';

const CallNowMentorComp = ({ list }) => {
  const data = list?.[0];
  console.log('callnowmentorcomp', data);
  const channelName = data?.channel_name;
  const mentorId = data?.mentor_id;
  const menteeId = data?.mentee_id;
  const startTime = DateTimeFormat(data?.start_time, true);
  const endTime = DateTimeFormat(data?.end_time, true);
  const bookingId = data?.id;
  const navigation = useNavigation();

  const getChannel = async () => {
    const formData = new FormData();
    formData.append('call_type', 'VideoCall,0');
    formData.append('receiver_user_id', menteeId);
    formData.append('sender_user_id', mentorId);
    formData.append('receiver_type', 'MENTEE');
    // console.log('GET CHANNEL formdata', formData);
    let res = await PostAPIRequest({
      formData: formData,
      endpoint: `${agoraCallStart}/${bookingId}/publisher/uid/1`,
    });
    if (res?.status == 200) {
      res = res?.data?.data;
      console.log(res);
      navigation.navigate('VideoCall', { data: res, receiverId: mentorId });
    } else {
      console.log(res?.response?.data);
      show('Please try again', 'danger');
    }
  };

  const handleDismiss = async () => {
    const token = await AsyncStorage.getItem("tokens");
    const formData = new FormData();
    formData.append("booking_id", bookingId)
    let res = await PostAPIRequest({ formData: formData, endpoint: delete_Appointment_Mentor, token: token });
    if (res?.status == 200) {
      console.log("Delete slot successfully", res?.data);
      show("Deleted Successfully", "success");
    } else {
      console.log("Error while deleting slot successfully", res?.data);
      show("Error", "warning");
    }
    notificationSound.stop();
  }

  return (
    <>
      <View style={[styles.mainContainer, { marginBottom: 15 }]}>
        <View style={styles.availableHeading}>
          <Text style={styles.availableText}>Ongoing Appointments</Text>
        </View>
        <TouchableOpacity
          style={styles.beautyFirstContainer}
          activeOpacity={0.8}
          onPress={() => { }}>
          <View style={styles.beautyFirstContainerBox}>
            <TouchableOpacity
              style={styles.beautyImgProfile}
              activeOpacity={0.8}>
              {data?.mentee_details[0]?.profile_pic ? (
                <>
                  <Image
                    source={{
                      uri: `${BASE_URL_IMAGE}${data?.mentee_details[0]?.profile_pic}`,
                    }}
                    style={{ width: 80, height: 80 }}
                  />
                </>
              ) : (
                <>
                  <FontAwesome5
                    name="user-circle"
                    size={55}
                    style={styles.appLogo}
                    color={black_1}
                  />
                </>
              )}
            </TouchableOpacity>
            <View style={{ width: '68%', marginLeft: 10 }}>
              <View style={{ flexDirection: 'row' }} activeOpacity={0.8}>
                <Text style={styles.beautyName}>
                  {data?.mentee_details[0]?.name}
                </Text>
              </View>
              <Text style={styles.beautySixteen}>
                {startTime + ' - ' + endTime}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={() => {
                    getChannel();
                  }}
                  style={[
                    styles.callBox,
                    {
                      backgroundColor: cobalt,
                      marginTop: 10,
                      width: 70,
                      justifyContent: 'center',
                      height: 28,
                      borderRadius: 6,
                    },
                  ]}>
                  <Text style={styles.callText}>Join Now</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => { handleDismiss(); }}
                  style={[
                    styles.callBox,
                    {
                      backgroundColor: redish,
                      marginTop: 10,
                      width: 70,
                      marginLeft: 10,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      height: 28,
                      borderRadius: 6,
                      alignItems: 'center',
                    },
                  ]}>
                  <Mute name="volume-mute-outline" size={18} color={white} />
                  <Text style={[styles.callText, { marginLeft: 2 }]}>Dismiss</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CallNowMentorComp;
