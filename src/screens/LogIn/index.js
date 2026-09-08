/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {IonIcon} from '../../component/Icons';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  login,
  updateTokenValue,
} from '../../redux/authaction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './index.style';
import {BASE_URL} from '../../constants/Host';
import messaging from '@react-native-firebase/messaging';
import {black, black_1, color_2, white} from '../../constants/colors';
import ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { show } from '../../utils/toast';
// import FastImage from 'react-native-fast-image';
const LogIn = props => {
  const navigation = useNavigation();

  const {userType} = props.route.params;

  const [signInLoading, setSignInLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [seePassword, setSeePassword] = useState(true);
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');
  const [button, setButton] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth);
  
  const handleLogin = async () => {
    setError('');
    // perform validation
    if (!email || !password) {
      show('Please enter email and password', "warning");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      show('Invalid email format', "warning");
      return;
    }
    setSignInLoading(true);
    setButton(true);
    const fcmToken = await messaging().getToken();
    console.log('fcmToken login', fcmToken);
    dispatch(login(email, password, fcmToken));
  };

  useEffect(() => {
    if (
      user &&
      user.user &&
      user.user.data.user.user_type === 'MENTEE' &&
      button
    ) {
      if (user.user.data.tokens.refresh.token !== undefined) {
        const token = user.user.data.tokens.refresh.token;
        AsyncStorage.setItem('tokens', token);
        console.log('----------', token);
        dispatch(updateTokenValue(token));
        navigation.navigate('BottomTab');
      }
    } else if (user && user.error && user.error.code === 401 && button) {
      setError(user.error.message);
    } else if (user && user.error && user.error.code === 404 && button) {
      setError(user.error.message);
    }
    setSignInLoading(false);
  }, [user]);
  return (
    <ScrollView
      style={styles.signInPage}
      keyboardShouldPersistTaps={'handled'}
      showsHorizontalScrollIndicator={false}>
      <ImageBackground
        source={require('../../assets/backgroundImage.png')}
        style={styles.background}
        resizeMode="contain">
        <Text style={styles.signInText}>Login</Text>
        <Text style={styles.signInPara}>
          We are so happy to see you again. You can continue logging in to your
          account.
        </Text>
        {/* <View>
          <Text style={styles.signInLabel}>SELECT TYPE</Text>
          <View
            style={{
              overflow: "hidden", borderBottomColor: black_1,
              borderBottomWidth: 1
            }}
          >
            <Picker
              style={styles.dropGender}
              dropdownIconColor={color_2}
              selectedValue={gender}
              onValueChange={(itemValue) => {
                setGender(itemValue);
              }}
            >
              <Picker.Item label="Individual" style={{backgroundColor:white, fontSize:15}} value="Individual" color={black}/>
              <Picker.Item label="Corporate" style={{backgroundColor:white, fontSize:15}} value="Corporate" color={black}/>
            </Picker>
          </View>
        </View> */}
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
        {error && <Text style={styles.errorText}>{error}</Text>}
        <TouchableOpacity
          style={styles.forgetLink}
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('ForgetPassword', {userType: userType});
          }}>
          <Text style={styles.forgetText}>forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.signInButton}
          onPress={handleLogin}>
          {signInLoading ? (
            <View style={styles.signInLoading}>
              <ActivityIndicator />
            </View>
          ) : (
            <Text style={styles.signInTextButton}>Sign in</Text>
          )}
        </TouchableOpacity>
        <View style={styles.newSignText}>
          <Text style={styles.newText}>New here?</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('SignUp', {userType});
            }}>
            <Text style={styles.upText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};
export default LogIn;
