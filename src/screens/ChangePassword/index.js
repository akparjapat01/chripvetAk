import React, {useState, useRef, useLayoutEffect, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {IonIcon} from '../../component/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../../constants/Host';
import {useDispatch, useSelector} from 'react-redux';
import {changePassword, mentorChangePassword} from '../../redux/authaction';
import styles from './index.style';
import {black_1} from '../../constants/colors';
import {PostAPIRequest} from '../../API/Axios';
import {
  changePassword_Mentee,
  changePassword_Mentor,
} from '../../API/endpoints';
import {useNavigation} from '@react-navigation/native';
import {show} from '../../utils/toast';

const ChangePassword = props => {
  const navigation = useNavigation();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [seeOldPassword, setSeeOldPassword] = useState(true);
  const [seeNewPassword, setSeeNewPassword] = useState(true);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(true);
  const [userTypes, setUserTypes] = useState('');
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const dispatch = useDispatch();
  const menteePassword = useSelector(state => state.menteeChangePassword);
  const mentorPassword = useSelector(state => state.mentorChangePassword);
  const [button, setButton] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleText1Submit = () => {
    inputRef2.current.focus();
  };

  const handleText2Submit = () => {
    inputRef3.current.focus();
  };

  const handleUpdatePassword = async () => {
    setError('');
    setMessage('');
    if (oldPassword === '' || newPassword === '' || newPasswordConfirm === '') {
      show('Please Enter Empty fields !', "warning");
    } else {
      const token = await AsyncStorage.getItem('tokens');
      const formData = new FormData();
      formData.append('old_password', oldPassword);
      formData.append('new_password', newPassword);
      formData.append('confirm_Password', newPasswordConfirm);
      setLoading(true);
      setButton(true);

      let res;
      if (userTypes === 'MENTEE') {
        res = await PostAPIRequest({
          formData: formData,
          endpoint: changePassword_Mentee,
          token: token,
        });

        if (res?.status == 200) {
          console.log(res?.data);
          dispatch({type: 'CHANGE_PASSWORD_SUCCESS', payload: res?.data});
          show('Password change successfully !', 'success');
          navigation.goBack();
        } else {
          dispatch({
            type: 'CHANGE_PASSWORD_FAILURE',
            payload: res?.response?.data,
          });
        }
      }
      if (userTypes === 'MENTOR') {
        // dispatch(mentorChangePassword(formData));
        res = await PostAPIRequest({
          formData: formData,
          endpoint: changePassword_Mentor,
          token: token,
        });

        if (res?.status == 200) {
          console.log(res?.data);
          dispatch({
            type: 'MENTOR_CHANGE_PASSWORD_SUCCESS',
            payload: res?.data,
          });
          show('Password change successfully !', 'success');
          navigation.goBack();
        } else {
          dispatch({
            type: 'MENTOR_CHANGE_PASSWORD_FAILURE',
            payload: res?.response?.data,
          });
        }
      }
    }
  };

  useLayoutEffect(() => {
    const fetchUserData = async () => {
      const token = await AsyncStorage.getItem('tokens');
      console.log('mentee bott', token);
      if (token) {
        await axios
          .get(BASE_URL + '/mentee/profile', {
            headers: {
              Accept: '*/*',
              'x-access-token': `${token}`,
            },
          })
          .then(response => {
            setUserTypes(response.data.data.user_type);
          })
          .catch(error => {
            console.log('bottom tab mentee' + error.response.data.message);
          });
      }
    };
    fetchUserData();
  }, []);

  useLayoutEffect(() => {
    const fetchMentorData = async () => {
      const token = await AsyncStorage.getItem('tokens');
      console.log('mentor bott', token);
      if (token) {
        await axios
          .get(BASE_URL + '/mentor/profile', {
            headers: {
              Accept: '*/*',
              'x-access-token': `${token}`,
            },
          })
          .then(response => {
            setUserTypes(response.data.data.user_type);
          })
          .catch(error => {
            console.log('bottom tab mentor' + error.response.data.message);
          });
      }
    };
    fetchMentorData();
  }, []);
  useEffect(() => {
    if (
      button &&
      mentorPassword &&
      mentorPassword.data &&
      mentorPassword.data.message ===
        'Your Password Changed Successfully, Please login to continue'
    ) {
      setMessage(mentorPassword.data.message);
      setButton(false);
      setOldPassword('');
      setNewPassword('');
      setNewPasswordConfirm('');
    } else if (
      mentorPassword &&
      mentorPassword.error &&
      mentorPassword.error.message === 'Invalid Old Password' &&
      button
    ) {
      setError(mentorPassword.error.message);
      setButton(false);
    } else if (
      mentorPassword &&
      mentorPassword.error &&
      mentorPassword.error.message ===
        ' New Password and Confirm Password must be equal' &&
      button
    ) {
      setError(mentorPassword.error.message);
      setButton(false);
    }
    setLoading(false);
  }, [mentorPassword]);

  useEffect(() => {
    if (
      button &&
      menteePassword &&
      menteePassword.data &&
      menteePassword.data.message ===
        'Your Password Changed Successfully, Please login to continue'
    ) {
      setMessage(menteePassword.data.message);
      setButton(false);
      setOldPassword('');
      setNewPassword('');
      setNewPasswordConfirm('');
    } else if (
      menteePassword &&
      menteePassword.error &&
      menteePassword.error.message === 'Invalid Old Password' &&
      button
    ) {
      setError(menteePassword.error.message);
      setButton(false);
    } else if (
      menteePassword &&
      menteePassword.error &&
      menteePassword.error.message ===
        ' New Password and Confirm Password must be equal' &&
      button
    ) {
      setError(menteePassword.error.message);
      setButton(false);
    }
    setLoading(false);
  }, [menteePassword]);
  return (
    <ScrollView
      style={styles.personalMainSection}
      keyboardShouldPersistTaps={'handled'}
      showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={require('../../assets/backgroundImage.png')}
        style={styles.background}
        resizeMode="contain">
        <View style={styles.contains}>
          <View>
            <Text style={styles.signInLabel}>OLD PASSWORD</Text>
            <View style={styles.wrapperInput}>
              <TextInput
                onSubmitEditing={handleText1Submit}
                ref={inputRef1}
                secureTextEntry={seeOldPassword}
                style={styles.SignInInputContainer}
                value={oldPassword}
                onChangeText={setOldPassword}
                placeholder="Enter Your Old Password"
                placeholderTextColor={black_1}
              />
              <TouchableOpacity
                style={styles.wrapperIcon}
                onPress={() => setSeeOldPassword(!seeOldPassword)}>
                {seeOldPassword === false ? (
                  <IonIcon name="eye" size={25} style={styles.eyeIcon} />
                ) : (
                  <IonIcon name="eye-off" size={25} style={styles.eyeIcon} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text style={styles.signInLabel}>NEW PASSWORD</Text>
            <View style={styles.wrapperInput}>
              <TextInput
                onSubmitEditing={handleText2Submit}
                ref={inputRef2}
                secureTextEntry={seeNewPassword}
                style={styles.SignInInputContainer}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter Your New Password"
                placeholderTextColor={black_1}
              />
              <TouchableOpacity
                style={styles.wrapperIcon}
                onPress={() => setSeeNewPassword(!seeNewPassword)}>
                {seeNewPassword === false ? (
                  <IonIcon name="eye" size={25} style={styles.eyeIcon} />
                ) : (
                  <IonIcon name="eye-off" size={25} style={styles.eyeIcon} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text style={styles.signInLabel}>CONFIRM NEW PASSWORD</Text>
            <View style={styles.wrapperInput}>
              <TextInput
                ref={inputRef3}
                secureTextEntry={seeConfirmPassword}
                style={styles.SignInInputContainer}
                value={newPasswordConfirm}
                onChangeText={setNewPasswordConfirm}
                placeholder="Enter Your New Password Again"
                placeholderTextColor={black_1}
              />
              <TouchableOpacity
                style={styles.wrapperIcon}
                onPress={() => setSeeConfirmPassword(!seeConfirmPassword)}>
                {seeConfirmPassword === false ? (
                  <IonIcon name="eye" size={25} style={styles.eyeIcon} />
                ) : (
                  <IonIcon name="eye-off" size={25} style={styles.eyeIcon} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          {error && <Text style={styles.errorText}>{error}</Text>}
          {message && <Text style={styles.messageText}>{message}</Text>}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.signUpButton}
            onPress={handleUpdatePassword}>
            {loading ? (
              <View style={styles.signInLoading}>
                <ActivityIndicator />
              </View>
            ) : (
              <Text style={styles.signText}>Save</Text>
            )}
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};
export default ChangePassword;
