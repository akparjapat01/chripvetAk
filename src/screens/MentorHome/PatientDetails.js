/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Video from "react-native-video";
import Pinchable from 'react-native-pinchable';
import {
  black,
  cobalt,
  darkJungleGreen,
  gray,
  shipGrey,
  whiteHex,
} from '../../constants/colors';
import { BASE_URL_IMAGE } from '../../constants/Host';
import { DateTimeFormat, DateTimeFormat_Both } from '../../helper/TimeFormat';

// const images = [
//   {id: 1, uri: require('../../assets/caraouselImage.png')},
//   {id: 2, uri: require('../../assets/caraouselImage.png')},
//   {id: 3, uri: require('../../assets/caraouselImage.png')},
// ];

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

function PatientDetails(props) {
  const navigation = useNavigation();

  const data = props?.route?.params?.data;
  console.log('data', data);

  const [isLoading, setIsLoading] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.goBack();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [navigation]),
  );
  if (isLoading === true) {
    return (
      <View style={styles.loadingStyle}>
        <ActivityIndicator />
      </View>
    );
  } else {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>

        <Text style={{ color: cobalt, alignSelf: "center", fontSize: 18, fontWeight: "600", marginVertical:15 }} >{data?.booking_date + " at " + DateTimeFormat(data?.start_time)}</Text>
        <View style={styles.textContainer}>
          <Helper title={'Case ID'} value={data?.case_id} />
          <Helper title={'Call Duration'} value={data?.meeting_details?.[0]?.call_duration} />
          <Helper title={'Mentor Name'} value={data?.mentor_name} />
          <Helper title={'Mentee Name'} value={data?.mentee_name} />
          <Helper title={'Booking Type'} value={data?.booking_type} />
          {/* <Helper title={'Sex'} value={data?.patient_sex} /> */}
          {/* <Helper title={"Parent's Name"} value={data?.parent_name} /> */}
          {/* <Helper title={"Parent's Contact"} value={data?.parent_contact} /> */}
          {/* <Helper title={'Problems'} value={data?.problem} /> */}
          {/* <Helper title={"Type"} value={data?.problem_type} /> */}
        </View>
      </ScrollView>
    );
  }
}
export default PatientDetails;

const Helper = ({ title, value }) => {
  return (
    <>
      <View style={styles.smallContainer}>

        <View style={{ width: "50%" }} >
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={{ width: "50%" }} >
          <Text style={styles.value}>{value}</Text>
        </View>

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  loadingStyle: {
    backgroundColor: darkJungleGreen,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 25,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: black,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: cobalt,
    // borderBottomWidth: 0.2,
  },
  smallContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around"
  },
});
