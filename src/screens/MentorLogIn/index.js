import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  Linking
} from 'react-native';
import {IonIcon} from '../../component/Icons';
import {useNavigation} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { mentorLogin } from '../../redux/authaction';
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import { black_1 } from '../../constants/colors';
import styles from './index.style';
import { show } from '../../utils/toast';


const MentorLogIn = props => {
  const navigation = useNavigation();

  const {userType} = props.route.params;

  const [signInLoading, setSignInLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [seePassword, setSeePassword] = useState(true);
  const [error, setError] = useState('');
  const [button, setButton] = useState(false)
  const dispatch = useDispatch();
  const user  = useSelector(state => state.mentorAuth);

  const handleLogin = async () => {
    setError("")
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
    setButton(true)
    // dispatch login action
    const fcmToken = await messaging().getToken();
    console.log("mentor fcmtoken",fcmToken)
    dispatch(mentorLogin(email, password, fcmToken));
    
  };
  useEffect(() => {
    if (user && user.user && user.user.data.user.user_type === 'MENTOR' && button) {
      if (user.user.data.tokens.refresh.token !== undefined) {
        const token = user.user.data.tokens.refresh.token;
        AsyncStorage.setItem("tokens", token);
        navigation.navigate('BottomTab')
      }
    }else if (user && user.error && user.error.code === 401 && button){
      setError(user.error.message)
    }else if (user && user.error && user.error.code === 404 && button){
      setError(user.error.message)
    }
    setSignInLoading(false)
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
        <TouchableOpacity style={styles.forgetLink} activeOpacity={0.8} onPress={() => {navigation.navigate('ForgetPassword',{userType: userType})}}>
          <Text style={styles.forgetText}>forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} style={styles.signInButton} onPress={handleLogin}>
        {signInLoading ? (
              <View style={styles.signInLoading}>
                <ActivityIndicator />
              </View>
            ) : (
              <Text style={styles.signInTextButton}>Sign in</Text>
            )}
        </TouchableOpacity>
        <View style={styles.newSignText}>
          <Text style={styles.newText}>To become a mentor</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => {
            // navigation.navigate('MentorSignUp', {userType});
            Linking.openURL("https://www.chirp.vet/")
            }}>
            <Text style={styles.upText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default MentorLogIn;