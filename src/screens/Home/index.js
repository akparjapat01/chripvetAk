import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  BackHandler,
  Alert,
  VirtualizedList,
  TextInput,
  RefreshControl,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GetAPIRequest, PostAPIRequest } from '../../API/Axios';
import {
  booking_Mentor,
  getAllCategory,
  getAllSpecialist,
  getAvailbility_Mentee,
} from '../../API/endpoints';
import axios from 'axios';
import styles from './index.style';
import moment from 'moment';
import MentorListComp from './MentorList';
import LoadingComp from '../../component/LoadingComp/LoadingComp';
import CategoryComp from './CategoryComp';
import SpecialistComp from './SpecialistComp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { black, gray } from '../../constants/colors';
import VirtualizedListComp from '../../component/VirtualizedComp/VirtualizedComp';
import { SearchBar } from 'react-native-elements';
import { AntIcon } from '../../component/Icons';
import CallNowComp from './CallNowComp';


const Home = (props) => {
  
  const navigation = useNavigation();

  const [mentorList, setMentorList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [specialList, setSpecialList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [upcomingBooking, setUpComingBookings] = useState([]);

  const getAllgetMentorList = async () => {
    const formData = new FormData();
    let newDate = new Date();
    newDate = newDate.toISOString().slice(0, 10);
    formData.append('date', newDate);

    setLoading(true);
    const res = await PostAPIRequest({
      formData: formData,
      endpoint: getAvailbility_Mentee,
    });
    if (res?.status == 200) {
      let res2 = res?.data?.data;
      setMentorList(res2);
    } else {
      console.log("Error in mentor list");
    };
    const catList = await GetAPIRequest({ formData: {}, endpoint: getAllCategory });
    const speList = await GetAPIRequest({ formData: {}, endpoint: getAllSpecialist });
    if (catList?.data?.data) {
      setCategoryList(catList?.data?.data);
    };
    // console.log(speList);
    if (speList?.data?.data) {
      setSpecialList(speList?.data?.data);
    };
    setLoading(false);
  };

  // get current scheduled meeting
  const getUpcomingBookings = async () => {

    const token = await AsyncStorage.getItem("tokens")
    const formData = new FormData();
    let today = moment();
    let nextDate = today.toISOString().slice(0, 10);
    formData.append("date", nextDate);
    formData.append("booking_type", "new");
    console.log(formData, token);
    let res = await PostAPIRequest({ formData: formData, endpoint: "/mentee/getUpcomingMeeting", token: token });

    if (res?.status == 200) {
      res = res?.data?.data;
      setUpComingBookings(res);
    } else {
      console.log("Error", res?.response?.data);
    };
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
    getAllgetMentorList();
    getUpcomingBookings();
    getPermission();
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

  return (
    <VirtualizedListComp
      onRefresh={() => {
        getAllgetMentorList();
        getUpcomingBookings();
      }}
    >
      <>
        {loading ? (
          <>
            <LoadingComp />
          </>) : (<>

            {upcomingBooking?.length ? <CallNowComp list={upcomingBooking} /> : <></>}

            {/* Component for list of mentors */}
            <MentorListComp list={mentorList} onPress={(item) => { navigation.navigate('VetProfile', { data: item }); }} />

            {/* Category List Component */}
            <CategoryComp list={categoryList} onPress={(item) => { navigation.navigate('GeneralPractice', { data: item }); }} />

            {/* Special List Component */}
            <SpecialistComp list={specialList} onPress={(item) => { navigation.navigate('GeneralPractice', { data: item }); }} />

          </>)}
      </>
    </VirtualizedListComp>
  );
};
export default Home;
