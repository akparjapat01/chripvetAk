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
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {verifyOTP, verifyEmail} from '../../redux/authaction';
import {
  black_1,
  color_1,
  color_2,
  color_7,
  havlockBlue,
  whiteHex,
} from '../../constants/colors';
import {show} from '../../utils/toast';

const EnterOtp = props => {
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

  console.log(email, userType);

  const handleSubmit = async () => {
    const otp =
      firstDigit +
      secondDigit +
      thirdDigit +
      fourthDigit +
      fifthDigit +
      SixthDigit;
    console.log(otp, email);
    const formData = new FormData();
    formData.append('email_id', email);
    formData.append('otp', otp);
    if (otp.length != 6) {
      show('Please enter otp!', "warning");
      return;
    }
    navigation.navigate('ResetPassword', {
      email: email,
      otp: otp,
      userType: userType,
    });
  };

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
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={isButtonDisabled}
          onPress={() => {}}>
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
          onPress={() => {
            handleSubmit();
          }}>
          {otpLoading ? (
            <View style={styles.signInLoading}>
              <ActivityIndicator />
            </View>
          ) : (
            <Text style={styles.signInTextButton}>Verify OTP</Text>
          )}
        </TouchableOpacity>
      </ImageBackground>
    </ScrollView>
  );
};
export default EnterOtp;

const styles = StyleSheet.create({
  signInPage: {
    backgroundColor: whiteHex,
    paddingHorizontal: 16,
  },
  signInText: {
    color: black_1,
    fontSize: 22,
    lineHeight: 28,
    marginBottom: 10,
    fontWeight: 'bold',
    marginTop: 15,
  },
  sentData: {
    color: color_2,
    fontSize: 13,
    lineHeight: 17,
  },
  mailIdText: {
    color: black_1,
    fontSize: 15,
    lineHeight: 19,
    fontWeight: 'bold',
  },
  signInLabel: {
    color: color_1,
    fontSize: 12,
    marginTop: 30,
  },
  signInButton: {
    width: '100%',
    marginTop: 370,
    borderRadius: 9,
    marginBottom: 20,
    backgroundColor: havlockBlue,
  },
  signInTextButton: {
    textAlign: 'center',
    color: whiteHex,
    fontSize: 18,
    lineHeight: 24,
    paddingVertical: 15,
    fontWeight: 'bold',
  },
  otpText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  otpInput: {
    width: 56,
    textAlign: 'center',
    color: black_1,
    paddingVertical: 15,
    borderBottomColor: black_1,
    borderBottomWidth: 1,
    marginHorizontal: 2,
  },
  resendText: {
    marginTop: 12,
    color: color_7,
    fontSize: 12,
    lineHeight: 18,
  },
  background: {
    flex: 1,
    width: '100%',
  },
  errorText: {
    fontSize: 9,
    color: 'red',
  },
  signInLoading: {
    textAlign: 'center',
    paddingVertical: 14,
  },
  secondText: {
    color: black_1,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: 'bold',
    marginTop: 12,
  },
});
