import axios from 'axios';
import {BASE_URL} from '../constants/Host';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {show} from '../utils/toast';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const login = (email_id, password, fcm_token) => async dispatch => {
  try {
    const res = await axios.post(BASE_URL + '/mentee/login', {
      email_id,
      password,
      fcm_token,
    });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    await AsyncStorage.setItem('user_type', 'MENTEE');
  } catch (error) {
    console.log('MENTEEp LOGIN ERROR -> ', error, error.response);
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data,
    });
  }
};

// mentorLogIn
export const Mentor_LOGIN_SUCCESS = 'Mentor_LOGIN_SUCCESS';
export const Mentor_LOGIN_FAIL = 'Mentor_LOGIN_FAIL';

export const mentorLogin =
  (email_id, password, fcm_token) => async dispatch => {
    try {
      const res = await axios.post(BASE_URL + '/mentor/login', {
        email_id,
        password,
        fcm_token,
      });
      dispatch({
        type: Mentor_LOGIN_SUCCESS,
        payload: res?.data,
      });
      await AsyncStorage.setItem('user_type', 'MENTOR');
    } catch (error) {
      console.log('MENTOR LOGIN ERROR -> ', error, error.response);
      dispatch({
        type: Mentor_LOGIN_FAIL,
        payload: error?.response?.data,
      });
    }
  };

// menteeverifyemail
export const verifyEmail = email_id => {
  return async dispatch => {
    try {
      const response = await axios.post(BASE_URL + '/mentee/otp', {
        email_id,
        request_type: 'Register',
      });
      dispatch({type: 'VERIFY_EMAIL_SUCCESS', payload: response.data});
    } catch (error) {
      show(error?.response?.data?.message, "warning");
      dispatch({type: 'VERIFY_EMAIL_ERROR', payload: error.response.data});
    }
  };
};
// mentorverifyemail
export const mentorVerifyEmail = email_id => {
  return async dispatch => {
    try {
      const response = await axios.post(BASE_URL + '/mentor/otp', {
        email_id,
        request_type: 'Register',
      });
      dispatch({type: 'Mentor_VERIFY_EMAIL_SUCCESS', payload: response.data});
    } catch (error) {
      dispatch({
        type: 'Mentor_VERIFY_EMAIL_ERROR',
        payload: error.response.data,
      });
    }
  };
};
// actions/verifyOTP.js

export const VERIFY_OTP_SUCCESS = 'VERIFY_OTP_SUCCESS';
export const VERIFY_OTP_FAILURE = 'VERIFY_OTP_FAILURE';

export const verifyOTP = (email_id, otp) => {
  return async dispatch => {
    try {
      const response = await axios.post(BASE_URL + '/mentee/otpverify', {
        email_id,
        otp,
      });

      dispatch({type: VERIFY_OTP_SUCCESS, payload: response.data});
    } catch (error) {
      dispatch({type: VERIFY_OTP_FAILURE, payload: error.response.data});
    }
  };
};

// actions/CREATEACCOUNT.js

export const CREATE_ACCOUNT_SUCCESS = 'CREATE_ACCOUNT_SUCCESS';
export const CREATE_ACCOUNT_FAILURE = 'CREATE_ACCOUNT_FAILURE';

export const createAccount = formData => {
  console.log("start")
  return async dispatch => {
    try {
      const response = await axios.post(BASE_URL + '/mentee/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response)
      dispatch({type: CREATE_ACCOUNT_SUCCESS, payload: response.data});
    } catch (error) {
      dispatch({type: CREATE_ACCOUNT_FAILURE, payload: error.response.data});
    }
  };
};

// MentorCreateAccount

export const Mentor_CREATE_ACCOUNT_SUCCESS = 'Mentor_CREATE_ACCOUNT_SUCCESS';
export const Mentor_CREATE_ACCOUNT_FAILURE = 'Mentor_CREATE_ACCOUNT_FAILURE';

export const mentorCreateAccount = formData => {
  return async dispatch => {
    try {
      const response = await axios.post(BASE_URL + '/mentor/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      dispatch({type: Mentor_CREATE_ACCOUNT_SUCCESS, payload: response.data});
    } catch (error) {
      dispatch({
        type: Mentor_CREATE_ACCOUNT_FAILURE,
        payload: error.response.data,
      });
    }
  };
};

// actions/MentorverifyOTP.js

export const Mentor_VERIFY_OTP_SUCCESS = 'Mentor_VERIFY_OTP_SUCCESS';
export const Mentor_VERIFY_OTP_FAILURE = 'Mentor_VERIFY_OTP_FAILURE';

export const mentorVerifyOTP = (email_id, otp) => {
  return async dispatch => {
    try {
      const response = await axios.post(BASE_URL + '/mentor/otpverify', {
        email_id,
        otp,
      });

      dispatch({type: Mentor_VERIFY_OTP_SUCCESS, payload: response.data});
    } catch (error) {
      dispatch({type: Mentor_VERIFY_OTP_FAILURE, payload: error.response.data});
    }
  };
};

// get apiOfProfile
export const fetchMenteeProfile = () => {
  return async dispatch => {
    const token = await AsyncStorage.getItem('tokens');
    axios
      .get(BASE_URL + '/mentee/profile', {
        headers: {
          Accept: '*/*',
          'x-access-token': `${token}`,
        },
      })
      .then(response => {
        dispatch({type: 'FETCH_PROFILEDATA_SUCCESS', payload: response.data});
      })
      .catch(error => {
        dispatch({
          type: 'FETCH_PROFILEDATA_FAILURE',
          payload: error.response.data,
        });
      });
  };
};

// get MentorapiOfProfile
export const fetchMentorProfile = () => {
  return async dispatch => {
    const token = await AsyncStorage.getItem('tokens');
    axios
      .get(BASE_URL + '/mentor/profile', {
        headers: {
          Accept: '*/*',
          'x-access-token': `${token}`,
        },
      })
      .then(response => {
        dispatch({type: 'FETCH_MENTOTRDATA_SUCCESS', payload: response.data});
      })
      .catch(error => {
        dispatch({
          type: 'FETCH_MENTORDATA_FAILURE',
          payload: error.response.data,
        });
      });
  };
};

// Change password
export const changePassword = formData => {
  return async dispatch => {
    const token = await AsyncStorage.getItem('tokens');
    try {
      const response = await axios.post(
        BASE_URL + '/mentee/changePassword',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: '*/*',
            'x-access-token': `${token}`,
          },
        },
      );

      dispatch({type: 'CHANGE_PASSWORD_SUCCESS', payload: response.data});
    } catch (error) {
      dispatch({type: 'CHANGE_PASSWORD_FAILURE', payload: error.response.data});
    }
  };
};

// mentor changePassword
export const mentorChangePassword = formData => {
  return async dispatch => {
    const token = await AsyncStorage.getItem('tokens');
    try {
      const response = await axios.post(
        BASE_URL + '/mentor/changePassword',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: '*/*',
            'x-access-token': `${token}`,
          },
        },
      );

      dispatch({
        type: 'MENTOR_CHANGE_PASSWORD_SUCCESS',
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: 'MENTOR_CHANGE_PASSWORD_FAILURE',
        payload: error.response.data,
      });
    }
  };
};

// get faq
export const fetchFaqData = () => {
  return async dispatch => {
    axios
      .get(BASE_URL + '/admin/getAllFAQs')
      .then(response => {
        console.log(response?.data?.data);
        dispatch({type: 'FETCH_FAQDATA_SUCCESS', payload: response.data});
      })
      .catch(error => {
        dispatch({type: 'FETCH_FAQDATA_FAILURE', payload: error.response.data});
      });
  };
};

// get contact
export const fetchContactData = () => {
  return async dispatch => {
    axios
      .get(BASE_URL + '/admin/getAllContact')
      .then(response => {
        dispatch({type: 'FETCH_CONTACTDATA_SUCCESS', payload: response.data});
      })
      .catch(error => {
        dispatch({
          type: 'FETCH_CONTACTDATA_FAILURE',
          payload: error.response.data,
        });
      });
  };
};

// update color of star
export const favStarColor = (isFav, color) => {
  return async dispatch => {
    if (isFav) {
      dispatch({type: 'STAR_COLOUR_GOLD', payload: color});
    } else {
      dispatch({type: 'STAR_COLOUR_GRAY', payload: color});
    }
  };
};

// update TOKEN
export const updateTokenValue = token => {
  return async dispatch => {
    dispatch({type: 'TOKEN', payload: token});
  };
};

export const FAV_SUCCESS = 'FETCH_FAVDATA_SUCCESS';
export const FAV_ERROR = 'FETCH_FAVDATA_FAILURE';
// get favorite mentors
export const fetchFavoriteMentors = () => {
  return async dispatch => {
    const token = await AsyncStorage.getItem('tokens');
    const fav = await axios.get(
      'https://chirpvet.com:3000/api/v1/mentee/getallFavourites',
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          'x-access-token': `${token}`,
        },
      },
    );
    if (fav?.status == 200) {
      // let list = fav?.data?.data;
      dispatch({type: FAV_SUCCESS, payload: fav?.data});
    } else {
      dispatch({type: FAV_ERROR, payload: error?.response?.data});
    }
  };
};
