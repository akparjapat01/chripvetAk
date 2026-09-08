import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ImageBackground,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {verifyOTP, verifyEmail} from '../../redux/authaction';
import { black_1 } from '../../constants/colors';
import styles from './index.style';

const Otp = props => {
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const fifthInput = useRef();
  const SixInput = useRef();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpButton, setOtpButton] = useState(false);
  const [error, setError] = useState('');
  const [firstDigit, setFirstDigit] = useState();
  const [secondDigit, setSecondDigit] = useState();
  const [thirdDigit, setThirdDigit] = useState();
  const [fourthDigit, setFourthDigit] = useState();
  const [fifthDigit, setFifthDigit] = useState();
  const [SixthDigit, setSixthDigit] = useState();
  const [isOtpEntered, setIsOtpEntered] = useState(false);
  const [otpMessage, setOtpMessage] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [remainingTime, setRemainingTime] = useState(30);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const verifyOtp = useSelector(state => state.verifyOTP);  

  const allDigit = Number(
    firstDigit +
      secondDigit +
      thirdDigit +
      fourthDigit +
      fifthDigit +
      SixthDigit,
  );
  const {email, userType} = props.route.params;

  const handleVerifyOtp = () => {
    setError('');
    setOtpButton(true)
    setOtpLoading(true);
    setIsOtpEntered(true);
    dispatch(verifyOTP(email, allDigit));
  };

  const handleResendAPI = () => {
    if (isButtonDisabled === false){
      setRemainingTime(30);
      dispatch(verifyEmail(email));
    }
    
  };

  const resendOtp = isButtonDisabled ? 
  null : 
  () => useSelector(state => state.verifyEmail);

  

  useEffect(() => {
    if (
      verifyOtp &&
      verifyOtp.success &&
      verifyOtp.success.data.message ===
        'Your OTP is Verified Please Create Your Profile' && otpButton
    ) {
      if (userType === 'MENTEE') {
        navigation.navigate('CreateAccount', {email, userType});
      }
    } else if (verifyOtp && verifyOtp.error && verifyOtp.error.code === 400 && otpButton) {
      setError(verifyOtp.error.message);
    }
    setOtpLoading(false);
  }, [verifyOtp]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (!isOtpEntered) {
          setError('Please Enter Otp');
          return true;
        }
      },
    );

    return () => backHandler.remove();
  }, [isOtpEntered]);

  useEffect(() => {
    let time;
    if (remainingTime > 0) {
      time = setInterval(() => {
        setRemainingTime(prev => prev - 1);
      }, 1000);
    } else {
      setIsButtonDisabled(false);
      clearInterval(time);
    }
    return () => {
      clearInterval(time);
    };
  }, [remainingTime]);
  return (
    <ScrollView
      style={styles.signInPage}
      keyboardShouldPersistTaps={'handled'}
      showsHorizontalScrollIndicator={false}>
      <ImageBackground
        source={require('../../assets/backgroundImage.png')}
        style={styles.background}
        resizeMode="contain">
        <Text style={styles.signInText}>Enter OTP</Text>
        <Text style={styles.sentData}>A 6 digit code has been sent to</Text>
        <Text style={styles.mailIdText}>{email}</Text>
        <View style={styles.signInContainer}>
          <Text style={styles.signInLabel}>OTP</Text>
          <View style={styles.otpText}>
            <TextInput
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={text => {
                text && secondInput.current.focus(), setFirstDigit(text);
              }}
              ref={firstInput}
              placeholderTextColor={black_1}
              value={firstDigit}
            />
            <TextInput
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={text => {
                text ? thirdInput.current.focus() : firstInput.current.focus(),
                  setSecondDigit(text);
              }}
              ref={secondInput}
              placeholderTextColor={black_1}
              value={secondDigit}
            />
            <TextInput
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={text => {
                text
                  ? fourthInput.current.focus()
                  : secondInput.current.focus(),
                  setThirdDigit(text);
              }}
              ref={thirdInput}
              placeholderTextColor={black_1}
              value={thirdDigit}
            />
            <TextInput
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={text => {
                text ? fifthInput.current.focus() : thirdInput.current.focus(),
                  setFourthDigit(text);
              }}
              ref={fourthInput}
              placeholderTextColor={black_1}
              value={fourthDigit}
            />
            <TextInput
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={text => {
                text ? SixInput.current.focus() : fourthInput.current.focus(),
                  setFifthDigit(text);
              }}
              ref={fifthInput}
              placeholderTextColor={black_1}
              value={fifthDigit}
            />
            <TextInput
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={text => {
                text ? SixInput.current.focus() : fourthInput.current.focus();
                !text && fifthInput.current.focus(),
                  setSixthDigit(text),
                  setButtonDisabled(false);
              }}
              ref={SixInput}
              placeholderTextColor={black_1}
              value={SixthDigit}
            />
          </View>
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <TouchableOpacity activeOpacity={0.8} disabled={isButtonDisabled} onPress={handleResendAPI}>
          <Text
            style={remainingTime === 0 ? styles.secondText : styles.resendText}>
            {remainingTime === 0
              ? 'Resend the OTP Again'
              : `Resend the OTP in ${remainingTime} sec`}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={buttonDisabled === true ? 0.6 : 1}
          disabled={buttonDisabled}
          style={styles.signInButton}
          onPress={handleVerifyOtp}>
          {otpLoading ? (
            <View style={styles.signInLoading}>
              <ActivityIndicator />
            </View>
          ) : (
            <Text style={styles.signInTextButton}>Continue</Text>
          )}
        </TouchableOpacity>
      </ImageBackground>
    </ScrollView>
  );
};
export default Otp;


