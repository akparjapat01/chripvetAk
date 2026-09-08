import React from 'react';
// import { NavigationContainer } from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';
import OnBoarding from '../screens/OnBoarding';
import LogIn from '../screens/LogIn';
import LogInAs from '../screens/LogInAs';
import SignUp from '../screens/SignUp';
import Otp from '../screens/Otp';
import CreateAccount from '../screens/CreateAccount';
import BottomTab from './BottomTab';
import Help from '../screens/Help';
import Transaction from '../screens/Transaction';
import Settings from '../screens/Settings';
import ForgetPassword from '../screens/ForgetPassword';
import EnterOtp from '../screens/EnterOtp';
import ResetPassword from '../screens/ResetPassword';
import ChangePassword from '../screens/ChangePassword';
import Chat from '../screens/Chat';
import VideoCall from '../screens/VideoCall';
import Inbox from '../screens/Inbox';
import VetProfile from '../screens/VetProfile';
import PatientForm from '../screens/PatientForm';
import CaseDetails from '../screens/CaseDetails';
import PatientFormSecond from '../screens/PatientFormSecond';
import GeneralPractice from '../screens/GeneralPractice';
import MentorCreateAccount from '../screens/MentorCreateAccount';
import MentorSignUp from '../screens/MentorSignUp';
import MentorOtp from '../screens/MentorOtp';
import MentorLogIn from '../screens/MentorLogIn';
import PatientDetails from '../screens/MentorHome/PatientDetails';
import PatientEditForm from '../screens/Scheduled/PatientEditForm/PatientEditForm';
import PatientIDDetails from '../screens/PatientId/PatientDetails/PatientIDDetails';
import VideoCallPrevComp from '../screens/VideoCall/PrevComp/VideoCallPrevComp';
import AllMentorListComp from '../screens/Home/MentorList/MentorListComp';
import SurveyForm from '../screens/SurveyForm/SurveyForm';
import MentorUpdateProfile from '../screens/MentorProfile/MentorUpdateProfile';
import MenteeUpdateProfile from '../screens/Profile/MenteeUpdateProfile';
import PaymentMethod from '../screens/Stripe/stripe';
import FilePreview from '../screens/PatientId/PatientDetails/FilePreview';
import MasterMentorList from '../screens/Avalability/MasterMentorList/MasterMentorList';
import ACHSetupScreen from '../screens/Stripe/Component/ACHSetupScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="LogInAs">
      <Stack.Screen
        name="OnBoarding"
        component={OnBoarding}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="LogIn" component={LogIn} options={{title: false}} />
      <Stack.Screen
        name="MentorLogIn"
        component={MentorLogIn}
        options={{title: false}}
      />
      <Stack.Screen
        name="ACHSetupScreen"
        component={ACHSetupScreen}
        options={{title: false}}
      />
      <Stack.Screen
        name="LogInAs"
        component={LogInAs}
        options={{title: false}}
      />
      <Stack.Screen name="SignUp" component={SignUp} options={{title: false}} />
      <Stack.Screen
        name="MentorSignUp"
        component={MentorSignUp}
        options={{title: false}}
      />
      <Stack.Screen name="Otp" component={Otp} options={{title: false}} />
      <Stack.Screen
        name="MentorOtp"
        component={MentorOtp}
        options={{title: false}}
      />
      <Stack.Screen
        name="PaymentMethod"
        component={PaymentMethod}
        options={{title: false}}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{title: false}}
      />
      <Stack.Screen
        name="MentorCreateAccount"
        component={MentorCreateAccount}
        options={{title: false}}
      />
      <Stack.Screen
        name="BottomTab"
        component={BottomTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Help"
        component={Help}
        options={{headerShown: true, headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="Transactions"
        component={Transaction}
        options={{headerShown: true, headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: true, headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{
          title: 'Forget Password',
          headerShown: true,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="EnterOtp"
        component={EnterOtp}
        options={{
          title: 'Enter OTP',
          headerShown: true,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          title: 'Reset Password',
          headerShown: true,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          title: 'Change Password',
          headerShown: true,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Inbox"
        component={Inbox}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          // headerLeft: () => (
          //   <TouchableOpacity onPress={()=>{ }} style={{marginLeft:15}} >
          //     <AntIcon name="arrowleft" color={black} size={25} />
          //   </TouchableOpacity>
          // )
        }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PatientDetails"
        component={PatientDetails}
        options={{
          title: 'Booking Information',
          headerShown: true,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="VideoCall"
        component={VideoCall}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VetProfile"
        component={VetProfile}
        options={{
          title: 'Vet Profile',
          headerShown: true,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="PatientForm"
        component={PatientForm}
        options={{
          title: 'Patient Form',
          headerShown: true,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="CaseDetails"
        component={CaseDetails}
        options={{
          title: 'Case Details',
          headerShown: true,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="AllMentorListComp"
        component={AllMentorListComp}
        options={{
          title: 'Mentors List',
          headerShown: true,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="VideoCallPrevComp"
        component={VideoCallPrevComp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PatientFormSecond"
        component={PatientFormSecond}
        options={{
          title: 'Patient form',
          headerShown: true,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="GeneralPractice"
        component={GeneralPractice}
        options={{
          title: 'General Practice',
          headerShown: true,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="PatientEditForm"
        component={PatientEditForm}
        options={{
          title: 'Patient Edit Form',
          headerShown: true,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="MasterMentorList"
        component={MasterMentorList}
        options={{
          title: 'Mentor List',
          headerShown: true,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="PatientIDDetails"
        component={PatientIDDetails}
        options={{
          title: 'Case Details',
          headerShown: true,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="FilePreview"
        component={FilePreview}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SurveyForm"
        component={SurveyForm}
        options={{
          title: 'Survey Form',
          headerShown: false,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="MentorUpdateProfile"
        component={MentorUpdateProfile}
        options={{
          title: 'Update Profile',
          headerShown: true,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="MenteeUpdateProfile"
        component={MenteeUpdateProfile}
        options={{
          title: 'Update Profile',
          headerShown: true,
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
    // <NavigationContainer>
    // </NavigationContainer>
  );
};
export default AppNavigator;
