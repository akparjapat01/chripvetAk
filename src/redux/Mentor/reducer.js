GET_UPCOMMING_BOOKINGRECENT;

import {GET_UPCOMMING_BOOKINGNEW, GET_UPCOMMING_BOOKINGRECENT} from './type';

// loginreducer
const initialState = {
  upcommingbooking: null,
  recentbooking: null,
};

export default function mentorBooking(state = initialState, action) {
  switch (action.type) {
    case GET_UPCOMMING_BOOKINGNEW:
      return {
        ...state,
        upcommingbooking: action.payload,
        error: null,
      };
    case GET_UPCOMMING_BOOKINGRECENT:
      return {
        ...state,
        recentbooking: action.payload,
        error: null,
      };
    default:
      return state;
  }
}
