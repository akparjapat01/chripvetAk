import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './index.style';
import { black_1 } from '../../constants/colors';
import { PostAPIRequest } from '../../API/Axios';
import { sendOTP_Mentee, sendOTP_Mentor } from '../../API/endpoints';

const ForgetPassword = (props) => {

  const userType = props?.route?.params?.userType;

  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const handleSendOTP = async () => {

    if(email.length < 2){
      Alert.alert("Please enter valid mail id");
      return;
    }
    let endpoint = sendOTP_Mentee;
    if(userType == "MENTOR"){
      endpoint = sendOTP_Mentor;
    }
    const formData = new FormData();
    formData.append("email_id", email);
    let res = await PostAPIRequest({ formData: formData, endpoint: endpoint });

    if (res?.status == 200) {
      navigation.navigate('EnterOtp', {email: email, userType: userType});
    } else {

    }
  }

  return (
    <ScrollView
      style={styles.signInPage}
      keyboardShouldPersistTaps={'handled'}
      showsHorizontalScrollIndicator={false}>
      <ImageBackground
        source={require('../../assets/backgroundImage.png')}
        style={styles.background}
        resizeMode="contain">
        <Text style={styles.signInPara}>
          Don’t worry it happens. Please enter your email we will send you a
          OTP.
        </Text>
        <View>
          <Text style={styles.signInLabel}>EMAIL</Text>
          <TextInput
            style={styles.SignInInputContainer}
            value={email}
            placeholder="Enter Email"
            onChangeText={setEmail}
            placeholderTextColor={black_1}
          />
        </View>

        <TouchableOpacity activeOpacity={0.8} style={styles.signInButton} onPress={() => { handleSendOTP() }}>
          <Text style={styles.signInTextButton}>Submit</Text>
        </TouchableOpacity>
      </ImageBackground>
    </ScrollView>
  );
};
export default ForgetPassword;

