import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native';
import {IonIcon} from '../../component/Icons';
import {useNavigation} from '@react-navigation/native';
import styles from './index.style';
import {black_1} from '../../constants/colors';
import {PostAPIRequest} from '../../API/Axios';
import {forgotPassword_Mentee} from '../../API/endpoints';
import {show} from '../../utils/toast';

const ResetPassword = props => {
  const email = props?.route?.params?.email;
  const otp = props?.route?.params?.otp;
  const userType = props?.route?.params?.userType;
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [seePassword, setSeePassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(true);

  const handleSubmit = async () => {
    if (password != confirmPassword) {
      show('Password should match', "danger");
      return;
    }
    if (password.length < 6) {
      show('Password should have atleas 6 character', "danger");
      return;
    }
    const formData = new FormData();
    formData.append('email_id', email);
    formData.append('otp', otp);
    formData.append('password', password);
    formData.append('confirm_Password', confirmPassword);

    let endpoint = forgotPassword_Mentee;
    if (userType == 'MENTOR') {
      endpoint = '/mentor/forgetpassword';
    }
    let res = await PostAPIRequest({formData: formData, endpoint: endpoint});

    if (res?.status == 200) {
      show('Password reset successfully !', 'success');
      navigation.navigate('LogInAs');
    } else {
      console.log(res?.response);
      show(res?.response?.data?.message, "danger");
    }
  };

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
          You can now create a new password for your Estheticians 4 You account.
        </Text>
        <View>
          <Text style={styles.signInLabel}>PASSWORD</Text>
          <View style={styles.wrapperInput}>
            <TextInput
              secureTextEntry={seePassword}
              style={styles.SignInInputContainer}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter Password"
              placeholderTextColor={black_1}
            />
            <TouchableOpacity
              style={styles.wrapperIcon}
              onPress={() => setSeePassword(!seePassword)}>
              {seePassword !== true ? (
                <IonIcon name="eye" size={25} style={styles.eyeIcon} />
              ) : (
                <IonIcon name="eye-off" size={25} style={styles.eyeIcon} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.signInLabel}>CONFIRM PASSWORD</Text>
          <View style={styles.wrapperInput}>
            <TextInput
              secureTextEntry={seeConfirmPassword}
              style={styles.SignInInputContainer}
              value={confirmPassword}
              placeholder="Confirm Password"
              placeholderTextColor={black_1}
              onChangeText={text => setConfirmPassword(text)}
            />
            <TouchableOpacity
              style={styles.wrapperIcon}
              onPress={() => setSeeConfirmPassword(!seeConfirmPassword)}>
              {seeConfirmPassword !== true ? (
                <IonIcon name="eye" size={25} style={styles.eyeIcon} />
              ) : (
                <IonIcon name="eye-off" size={25} style={styles.eyeIcon} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            handleSubmit();
          }}
          activeOpacity={0.8}
          style={styles.signInButton}>
          <Text style={styles.signInTextButton}>Reset Password</Text>
        </TouchableOpacity>
      </ImageBackground>
    </ScrollView>
  );
};
export default ResetPassword;
