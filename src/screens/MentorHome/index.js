/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, BackHandler, Alert, RefreshControl, Platform, PermissionsAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './index.style';
import UpcomingBooking from './UpcomingBooking';
import {PostAPIRequest} from '../../API/Axios';
import {booking_Mentor} from '../../API/endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import RecentBookings from './RecentBookings';
import CallNowMentorComp from './CallNowMentorComp';
import VirtualizedListComp from '../../component/VirtualizedComp/VirtualizedComp';

const MentorHome = props => {
  const navigation = useNavigation();

  const [upComingBookings, setUpComingBookings] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [upcomingMeeting, setUpComingMeeting] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.searchContainer}>
          {/* <TextInput
          style={styles.inputStyle}
          placeholder="Search here"
          placeholderTextColor={gray}
          /> */}
          {/* <TouchableOpacity style={{position:"absolute", right:0}} >
            <AntIcon name="search1" size={20} />
          </TouchableOpacity> */}
        </View>
      ),
    });
  }, []);

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

  const getUpcomingBookings = async type => {
    const token = await AsyncStorage.getItem('tokens');
    const formData = new FormData();
    let today = moment();
    let nextDate = today.toISOString().slice(0, 10);
    formData.append('date', nextDate);
    formData.append('booking_type', type);
    console.log(formData, token);
    let res = await PostAPIRequest({
      formData: formData,
      endpoint: booking_Mentor,
      token: token,
    });

    if (res?.status == 200) {
      console.log(res?.data);
      res = res?.data?.data;
      if (type == 'new') {
        setUpComingBookings(res);
      } else {
        setRecentBookings(res);
      }
    } else {
      console.log('Error');
    }
  };

  const getPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
  };

  useEffect(() => {
    getPermission();
    getUpcomingMeeting();
    getUpcomingBookings('new');
    getUpcomingBookings('recent');
  }, []);

  const backAction = () => {
    // If on the Home screen, exit the app
    if (navigation.isFocused()) {
      Alert.alert('Confirm', 'Are you sure want to exit?', [
        {
          text: 'Yes',
          onPress: () => BackHandler.exitApp(),
        },
        {
          text: 'No',
          onPress: () => console.log('No clicked'),
          style: 'cancel',
        },
      ]);
      return true;
    }
    // Otherwise, navigate to the previous screen
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getUpcomingMeeting();
    getUpcomingBookings('new');
    getUpcomingBookings('recent');
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <VirtualizedListComp
      // showsVerticalScrollIndicator={false}
      // keyboardShouldPersistTaps={'handled'}
      style={styles.transactionsContainer}
      onRefresh={() => onRefresh()}>
      {upcomingMeeting?.length ? (
        <CallNowMentorComp list={upcomingMeeting} />
      ) : (
        <></>
      )}

      <UpcomingBooking list={upComingBookings} />

      <RecentBookings list={recentBookings} />
    </VirtualizedListComp>
  );
};
export default MentorHome;
