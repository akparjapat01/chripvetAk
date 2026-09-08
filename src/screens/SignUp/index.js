import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmail } from '../../redux/authaction';
import styles from './index.style';
import { black, black_1, color_2, white } from '../../constants/colors';
import { show } from '../../utils/toast';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignUp = props => {

  const { userType } = props.route.params;
  const navigation = useNavigation();
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [button, setButton] = useState(false);
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const verification = useSelector(state => state.verifyEmail);

  const handleVerifyEmail = () => {
    setError("")
    if (!email) {
      show('Please enter email', "warning");
      return;
    }
    if (!emailRegex.test(email)) {
      show('Invalid email format', "warning");
      return;
    }
    setButton(true);
    setSignUpLoading(true);
    dispatch(verifyEmail(email));
  };

  useEffect(() => {
    if (
      verification &&
      verification.verificationStatus &&
      verification.verificationStatus.data.message ===
      'Please Verify Your Email' && button
    ) {
      navigation.navigate('Otp', { email, userType });
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

        {/* <View>
          <Text style={styles.signInLabel}>SELECT TYPE</Text>
          <View
            style={{
              overflow: 'hidden',
              borderBottomColor: black_1,
              borderBottomWidth: 1,
            }}>
            <Picker
              style={styles.dropGender}
              dropdownIconColor={color_2}
              selectedValue={gender}
              onValueChange={itemValue => {
                setGender(itemValue);
              }}>
              <Picker.Item label="Individual" style={{backgroundColor:white}} value="Individual" color={black} />
              <Picker.Item label="Corporate" style={{backgroundColor:white}} value="Corporate" color={black} />
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
export default SignUp;
