import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  ActivityIndicator
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {mentorVerifyEmail} from '../../redux/authaction';
import { black_1 } from '../../constants/colors';
import styles from './index.style';
import { show } from '../../utils/toast';

const MentorSignUp = props => {
  const {userType} = props.route.params;
  const navigation = useNavigation();
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [button, setButton] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const verification = useSelector(state => state.mentorVerifyEmail);

  const handleVerifyEmail = () => {
    setError("")
    if (!email) {
      show('Please enter email', "warning");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      show('Invalid email format', "warning");
      return;
    }
    setButton(true);
    setSignUpLoading(true);
    dispatch(mentorVerifyEmail(email));
  };

  useEffect(() => {
    if (
      verification &&
      verification.verificationStatus &&
      verification.verificationStatus.data.message ===
        'Please Verify Your Email' && button
    ) {
     
        navigation.navigate('MentorOtp', {email, userType});
    } else if (
      verification &&
      verification.verificationError &&
      verification.verificationError.code === 400 && button
    ) {
      setError(verification.verificationError.message);
    }
    setSignUpLoading(false);
  }, [verification]);
  return (
    <ScrollView
      style={styles.signInPage}
      keyboardShouldPersistTaps={'handled'}
      showsHorizontalScrollIndicator={false}>
      <ImageBackground
        source={require('../../assets/backgroundImage.png')}
        style={styles.background}
        resizeMode="contain">
        <Text style={styles.signInText}>Signup</Text>
        <Text style={styles.signInPara}>
          Let’s create an account and get started with Chirp Vet!
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
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.signInButton}
          onPress={handleVerifyEmail}>
             {signUpLoading ? (
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
export default MentorSignUp;


