import {LOGIN_SUCCESS, LOGIN_FAIL, FAV_SUCCESS} from '../redux/authaction';
import {Mentor_LOGIN_SUCCESS, Mentor_LOGIN_FAIL} from '../redux/authaction';
import {VERIFY_OTP_SUCCESS, VERIFY_OTP_FAILURE} from '../redux/authaction';
import {
  CREATE_ACCOUNT_FAILURE,
  CREATE_ACCOUNT_SUCCESS,
} from '../redux/authaction';
import {
  Mentor_CREATE_ACCOUNT_FAILURE,
  Mentor_CREATE_ACCOUNT_SUCCESS,
} from '../redux/authaction';
import {
  Mentor_VERIFY_OTP_FAILURE,
  Mentor_VERIFY_OTP_SUCCESS,
} from '../redux/authaction';

// loginreducer
const initialState = {
  user: null,
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
}
// end loginreducer

// mentorloginreducer
const MentorLogInInitialState = {
  user: null,
  error: null,
};

export function MentorAuthReducer(state = MentorLogInInitialState, action) {
  switch (action.type) {
    case Mentor_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case Mentor_LOGIN_FAIL:
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
}
// end Mentorloginreducer

// verifyEmailReducer
const verifyInitialState = {
  verificationStatus: null,
  verificationError: null,
};

export function verifyReducer(state = verifyInitialState, action) {
  switch (action.type) {
    case 'VERIFY_EMAIL_SUCCESS':
      return {
        ...state,
        verificationStatus: action.payload,
        verificationError: null,
      };
    case 'VERIFY_EMAIL_ERROR':
      return {
        ...state,
        verificationStatus: null,
        verificationError: action.payload,
      };
    default:
      return state;
  }
}
// end verifyEmailReducer

// MentorVerifyEmailReducer
const MentorVerifyInitialState = {
  verificationStatus: null,
  verificationError: null,
};

export function MentorVerifyReducer(state = MentorVerifyInitialState, action) {
  switch (action.type) {
    case 'Mentor_VERIFY_EMAIL_SUCCESS':
      return {
        ...state,
        verificationStatus: action.payload,
        verificationError: null,
      };
    case 'Mentor_VERIFY_EMAIL_ERROR':
      return {
        ...state,
        verificationStatus: null,
        verificationError: action.payload,
      };
    default:
      return state;
  }
}
// end MentorVerifyEmailReducer

// reducers/verifyOTPReducer.js

const verifyOtpState = {
  success: null,
  error: null,
};

export const verifyOTPReducer = (state = verifyOtpState, action) => {
  switch (action.type) {
    case VERIFY_OTP_SUCCESS:
      return {...state, success: action.payload, error: null};
    case VERIFY_OTP_FAILURE:
      return {...state, success: null, error: action.payload};
    default:
      return state;
  }
};

// reducers/createAccount.js

const createAccountState = {
  success: null,
  error: null,
};

export const createAccountReducer = (state = createAccountState, action) => {
  switch (action.type) {
    case CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        success: action.payload,
        error: null,
      };
    case CREATE_ACCOUNT_FAILURE:
      return {...state, success: null, error: action.payload};
    default:
      return state;
  }
};

// MentorCreateAccount

const MentorCreateAccountState = {
  success: null,
  error: null,
};

export const MentorCreateAccountReducer = (
  state = MentorCreateAccountState,
  action,
) => {
  switch (action.type) {
    case Mentor_CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        success: action.payload,
        error: null,
      };
    case Mentor_CREATE_ACCOUNT_FAILURE:
      return {...state, success: null, error: action.payload};
    default:
      return state;
  }
};

// reducers/vMentorVerifyOTPReducer.js

const mentorVerifyOtpState = {
  success: null,
  error: null,
};

export const MentorVerifyOTPReducer = (
  state = mentorVerifyOtpState,
  action,
) => {
  switch (action.type) {
    case Mentor_VERIFY_OTP_SUCCESS:
      return {...state, success: action.payload, error: null};
    case Mentor_VERIFY_OTP_FAILURE:
      return {...state, success: null, error: action.payload};
    default:
      return state;
  }
};
// reducers.js

const profileState = {
  data: null,
  error: null,
};

export const profileReducer = (state = profileState, action) => {
  switch (action.type) {
    case 'FETCH_PROFILEDATA_SUCCESS':
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case 'FETCH_PROFILEDATA_FAILURE':
      return {
        ...state,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

const mentorProfileState = {
  data: null,
  error: null,
};

export const mentorProfileReducer = (state = mentorProfileState, action) => {
  switch (action.type) {
    case 'FETCH_MENTOTRDATA_SUCCESS':
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case 'FETCH_MENTORDATA_FAILURE':
      return {
        ...state,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

const changePasswordState = {
  data: null,
  error: null,
};

export const changePasswordReducer = (state = changePasswordState, action) => {
  switch (action.type) {
    case 'CHANGE_PASSWORD_SUCCESS':
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case 'CHANGE_PASSWORD_FAILURE':
      return {
        ...state,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

const mentorChangePasswordState = {
  data: null,
  error: null,
};

export const mentorChangePasswordReducer = (
  state = mentorChangePasswordState,
  action,
) => {
  switch (action.type) {
    case 'MENTOR_CHANGE_PASSWORD_SUCCESS':
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case 'MENTOR_CHANGE_PASSWORD_FAILURE':
      return {
        ...state,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

const faqState = {
  data: null,
  error: null,
};

export const faqReducer = (state = faqState, action) => {
  switch (action.type) {
    case 'FETCH_FAQDATA_SUCCESS':
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case 'FETCH_FAQDATA_FAILURE':
      return {
        ...state,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

const contactState = {
  data: null,
  error: null,
};

export const contactReducer = (state = contactState, action) => {
  switch (action.type) {
    case 'FETCH_CONTACTDATA_SUCCESS':
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case 'FETCH_CONTACTDATA_FAILURE':
      return {
        ...state,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

const starColor = {
  data: 'gray',
};

export const starColour = (state = starColor, action) => {
  switch (action.type) {
    case 'STAR_COLOUR_GOLD':
      return {...state, data: '#F2C94C'};

    case 'STAR_COLOUR_GRAY':
      return {...state, data: action.payload};

    default:
      return state;
  }
};

const token = {
  data: '',
};

export const updateToken = (state = token, action) => {
  switch (action.type) {
    case 'TOKEN':
      return {...state, data: action.payload};

    default:
      return state;
  }
};

const favorite = {
  data: [],
};

export const getFavorite = (state = favorite, action) => {
  switch (action.type) {
    case FAV_SUCCESS:
      return {...state, data: action.payload};

    default:
      return state;
  }
};
