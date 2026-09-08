import {legacy_createStore as createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import authReducer, { verifyOTPReducer, createAccountReducer, MentorVerifyReducer, MentorCreateAccountReducer, MentorVerifyOTPReducer, MentorAuthReducer, profileReducer, mentorProfileReducer, changePasswordReducer, mentorChangePasswordReducer, faqReducer, contactReducer, starColour, updateToken, getFavorite  } from '../redux/authreducer';
import { verifyReducer } from '../redux/authreducer';
const rootReducer = combineReducers({
  auth : authReducer,
  verifyEmail: verifyReducer,
  verifyOTP: verifyOTPReducer,
  createAccount: createAccountReducer,
  mentorVerifyEmail: MentorVerifyReducer,
  mentorCreateAccount: MentorCreateAccountReducer,
  mentorVerifyOtp: MentorVerifyOTPReducer,
  mentorAuth: MentorAuthReducer,
  profileData: profileReducer,
  mentorProfileData: mentorProfileReducer,
  menteeChangePassword: changePasswordReducer,
  mentorChangePassword:  mentorChangePasswordReducer,
  bothFaqData: faqReducer,
  bothContactData: contactReducer,
  starColor: starColour,
  getToken: updateToken,
  getFavorite: getFavorite
});
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;