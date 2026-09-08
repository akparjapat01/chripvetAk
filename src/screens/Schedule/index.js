import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ScheduleTopTab from '../../navigator/ScheduleTopTab';
import { porcelain } from '../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PostAPIRequest } from '../../API/Axios';
import CallNowMentorComp from '../MentorHome/CallNowMentorComp';
import moment from 'moment';

const Schedule = props => {

  const [upcomingMeeting, setUpComingMeeting] = useState([]);

  const getUpcomingMeeting = async () => {
    const token = await AsyncStorage.getItem('tokens');
    const formData = new FormData();
    let today = moment();
    let nextDate = today.toISOString().slice(0, 10);
    formData.append('date', nextDate);
    formData.append('booking_type', 'new');
    console.log(formData, token);
    let res = await PostAPIRequest({
      formData: formData,
      endpoint: '/mentor/getUpcomingMeeting',
      token: token,
    });

    if (res?.status == 200) {
      res = res?.data?.data;
      console.log('__________________', res);
      setUpComingMeeting(res);
    } else {
      console.log('Error', res?.response?.data);
    }
  };

  useEffect(() => {
    getUpcomingMeeting();
  },[])

  return (
    <View style={styles.transactionsContainer}>
      { upcomingMeeting?.length > 0 && <CallNowMentorComp list={upcomingMeeting} />}
      <ScheduleTopTab />
    </View>
  );
};
export default Schedule;
const styles = StyleSheet.create({
  transactionsContainer: {
    backgroundColor: porcelain,
    paddingTop: 15,
    paddingHorizontal: 12,
    width: '100%',
    height: '100%',
  },
});
