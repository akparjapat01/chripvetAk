/* eslint-disable eqeqeq */
import axios from 'axios';
import {BASE_URL} from '../../constants/Host';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GET_UPCOMMING_BOOKINGNEW, GET_UPCOMMING_BOOKINGRECENT} from './type';
import moment from 'moment';
import {PostAPIRequest} from '../../API/Axios';
import {booking_Mentor} from '../../API/endpoints';



export const getUpcomingBookings = type => async dispatch => {
  const token = await AsyncStorage.getItem('tokens');
  const formData = new FormData();
  let today = moment();
  let nextDate = today.toISOString().slice(0, 10);
  formData.append('date', nextDate);
  formData.append('booking_type', type);
  let res = await PostAPIRequest({
    formData: formData,
    endpoint: booking_Mentor,
    token: token,
  });

  if (res?.status == 200) {
    console.log(res?.data);
    res = res?.data?.data;
    
    if (type == 'new') {
      dispatch({
        type: GET_UPCOMMING_BOOKINGNEW,
        payload: res,
      });
    } else {
      dispatch({
        type: GET_UPCOMMING_BOOKINGRECENT,
        payload: res,
      });
    }
  } else {
    console.log('Error');
  }
};
