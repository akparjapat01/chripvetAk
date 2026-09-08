import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  ToastAndroid,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {Input} from 'react-native-elements';
import {IonIcon, FontAwesome5} from '../../component/Icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import CountryPicker from 'react-native-country-picker-modal';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {CREATE_ACCOUNT_FAILURE, CREATE_ACCOUNT_SUCCESS, createAccount, login} from '../../redux/authaction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PostAPIRequest } from '../../API/Axios';
import { register_Mentee, sendOTP_Mentee } from "../../API/endpoints";
import styles from './index.style';
import { black_1, color_6, green } from '../../constants/colors';
import { show } from '../../utils/toast';

const CreateAccount = props => {
  const navigation = useNavigation();
  const {email, userType} = props.route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [seePassword, setSeePassword] = useState(true);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(true);
  const [profilePic, setProfilePic] = useState(null);
  const [checkProfilePic, setCheckProfilePic] = useState(null);
  const [name, setName] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dob, setDob] = useState('');
  // const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);
  const [countryCode, setCountryCode] = useState('+1');
  const [country, setCountry] = useState(null);
  const [hospitalName, setHospitalName] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [error, setError] = useState('');
  const [year, setYear] = useState(null);
  const [button, setButton] = useState(false);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [experience, setExperience] = useState("");
  const [bio, setBio] = useState("");
  const dispatch = useDispatch();
  const createUserAccount = useSelector(state => state.createAccount);
  const user = useSelector(state => state.auth);

  const setToastMsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  const checkStoragePermission = async () => {
    if (Platform.OS === 'ios') {
      uploadImage();
    } else {
      try {
        const accessAllowed = await PermissionsAndroid.check(
          'READ_EXTERNAL_STORAGE',
        );

        if (accessAllowed) {
          uploadImage();
        } else {
          requestStoragePermission();
        }
      } catch (err) {
        console.log(err);
        ToastAndroid.showWithGravityAndOffset(
          err,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      }
    }
  };

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Allow Access',
          message: 'ChirpVet needs access to read storage',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can access the Storage');
        uploadImage();
      } else {
        console.log('Storage permission denied');
        ToastAndroid.showWithGravityAndOffset(
          'Please allow access to your stroage to upload image!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      }
    } catch (err) {
      // console.warn(err);
      ToastAndroid.showWithGravityAndOffset(
        err,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  };

  //  For uploading image
  const uploadImage = () => {
    // setProfilePic(null);
    const options = {
      noData: true,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        setToastMsg('Canceled image selection');
      } else if (response.errorCode === 'permission') {
        setToastMsg('permission not satisfied');
      } else if (response.errorCode === 'others') {
        setToastMsg(response.errorMessage);
      } else {
        const newImage = {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
        };
        setProfilePic(newImage);
        setToastMsg('Upload Successfully');
      }
    });
  };

  // for removing the image
  const removeImage = () => {
    setProfilePic(null);
    setToastMsg('Image Removed');
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    hideDatePicker();
    setDob(date.toISOString().split('T')[0]);
  };
  const onSelectCountry = selectedCountry => {
    setCountryCode(selectedCountry.callingCode[0]);
    setCountry(selectedCountry);
    setCountryPickerVisible(false);
  };

  const validatePassword = () => {
    const regex = /^(?=.*[0-9].*[0-9])(?=\S+$).{8,}$/;
    return regex.test(password) && password === confirmPassword;
  };

  const handleSubmit = async () => {
    if (!name) {
      show('Please enter name', 'warning');
      return;
    }
    if (!dob) {
      show('Please enter dob', 'waring');
      return;
    }
    if (!phoneNumber) {
      show('Please enter phone Number', "warning");
      return;
    }
    if (!hospitalName) {
      show('Please enter animal Hospital', "warning");
      return;
    }
    if (!collegeName) {
      show('Please enter vet School attended', "warning");
      return;
    }
    if (!year) {
      show('Please enter graduation year', "warning");
      return;
    }
    if (!password) {
      show('Please enter password', "warning");
      return;
    }
    if (!confirmPassword) {
      show('Please enter confirm password', "warning");
      return;
    }
    if (password !== confirmPassword) {
      show('Password should be match with confirm password', "warning");
    }
    if (!validatePassword()) {
      show('Password should have a minimum length of 8 characters and must have at least 2 digits and No Blank space', "warning");
      return;
    };
    const formData = new FormData();
    if(profilePic?.uri){
      formData.append('fileUpload', {
            uri: profilePic.uri,
            type: profilePic.type,
            name: profilePic.name,
          });
    };

    formData.append('name', name);
    formData.append('dob', dob);
    formData.append('email_id', email);
    formData.append('ph_code', countryCode);
    formData.append('phNo', phoneNumber);
    formData.append('experience', experience);
    formData.append('bio', bio);
    formData.append('animal_hospital', hospitalName);
    formData.append('vet_school_attendent', collegeName);
    formData.append('graduation_year', year);
    formData.append('password', password);
    formData.append('confirm_Password', confirmPassword);

    console.log("formData", formData);
    setButton(true);
    setSignUpLoading(true);
    dispatch(createAccount(formData));
    // const res = await PostAPIRequest({formData: formData, endpoint:register_Mentee});
    // console.log("create account ",res);
    // if(res.status == 200){
    //   dispatch({type: CREATE_ACCOUNT_SUCCESS, payload: res.data});
    // }else{
    //   dispatch({type: CREATE_ACCOUNT_FAILURE, payload: res});
    // };
  };
  const handleLogin = () => {
    dispatch(login(email, password));
  };
  useEffect(() => {
    if (user && user?.user && user?.user?.code === 200) {
      if (
        user?.user?.data &&
        user?.user?.data?.tokens &&
        user?.user?.data?.tokens?.refresh &&
        user?.user?.data?.tokens?.refresh?.token !== undefined && button
      ) {
        const token = user?.user?.data?.tokens?.refresh?.token;
        AsyncStorage.setItem('tokens', token);
        console.log('login', token);
        if (userType === 'MENTEE') {
          navigation.navigate('BottomTab');
          setButton(false);
        }
      }
    }
  }, [user]);
  useEffect(() => {
    if (
      createUserAccount &&
      createUserAccount?.success &&
      createUserAccount?.success?.data &&
      createUserAccount?.success?.data?.message === 'New Mentee Created' &&
      button
    ) {
      console.log("password",password);
      handleLogin();
    } else if (
      createUserAccount &&
      createUserAccount?.error &&
      createUserAccount?.error?.code === 400 &&
      button
    ) {
      console.log("error", createUserAccount)
      setError(createUserAccount?.error?.message);
      setButton(false);
    }
    setSignUpLoading(false);
  }, [createUserAccount]);


  if (signUpLoading === true)
    return (
      <View style={styles.loadingStyle}>
        <Text>Please wait ..</Text>
        <ActivityIndicator />
      </View>
    );
  else
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        style={styles.profileContainer}>
        <ImageBackground
          source={require('../../assets/backgroundImage.png')}
          style={styles.background}
          resizeMode="contain">
          <View style={styles.uploadMain}>
            <View style={styles.signUpHeading}>
              <Text style={styles.detailsYourself}>Create Account</Text>
            </View>
            <Text style={styles.uploadText}>PROOF PICTURE</Text>
            <View style={styles.uploadBox}>
              <View style={styles.uploadRemoveSection}>
                <TouchableOpacity
                  style={styles.uploadArrow}
                  onPress={checkStoragePermission}
                  activeOpacity={0.8}
                  underlayColor={color_6}>
                  {profilePic === 'https://admins.beautybook.io/storage' ||
                  profilePic === null ||
                  profilePic === '' ? (
                    <FontAwesome5
                      name="user-circle"
                      size={65}
                      style={styles.appLogo}
                      color={black_1}
                    />
                  ) : (
                    <Image
                      source={{
                        uri:
                          typeof profilePic === 'string'
                            ? profilePic
                            : profilePic.uri,
                      }}
                      style={styles.appLogo}
                    />
                  )}
                </TouchableOpacity>
                <View style={styles.profileRightSection}>
                  <View style={styles.uploadAndRemove}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.uploadFile}
                      onPress={uploadImage}>
                      <Text style={styles.uploadSection}>Upload image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.removeFile}
                      onPress={removeImage}>
                      <Text style={styles.removeSection}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.uploadImg}>
                    <Text style={styles.uploadImgText}>
                      You can upload jpg, gif or png image files. Max size of
                      3MB.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.personalContainer}>
              <Text style={styles.labelName}>NAME</Text>
              <TextInput
                style={styles.inputContainer}
                value={name}
                onChangeText={text => setName(text.replace(/[^a-zA-Z\s]/g, ''))}
                placeholder="Enter Your Name"
                placeholderTextColor={black_1}
              />
            </View>

            <View style={styles.personalContainer}>
              <Text style={styles.labelName}>DATE OF BIRTH</Text>

              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 15,
                  justifyContent: 'space-between',
                  alignContent: 'center',
                  marginTop: 12,
                  paddingVertical: 12,
                  borderBottomColor: black_1,
                  borderBottomWidth: 1,
                }}>
                <TouchableOpacity onPress={showDatePicker}>
                  <Text style={{color: black_1}}>
                    {dob ? dob : 'Select your date of birth'}
                  </Text>
                </TouchableOpacity>
              </View>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </View>

            <View style={styles.personalContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.labelName}>EMAIL</Text>
                {email !== '' ? (
                  <Text
                    style={{
                      color: green,
                      fontSize: 9,
                      marginTop: 16,
                      marginLeft: '1%',
                    }}>
                    (Verified)
                  </Text>
                ) : null}
              </View>
              <TextInput
                style={styles.inputEmailContainer}
                value={email}
                placeholder="Enter Your Email"
                placeholderTextColor={black_1}
                disabled
                editable={false}
                caretHidden={false}
              />
            </View>
            <View style={styles.personalContainer}>
              <Text style={styles.labelName}>PHONE NUMBER</Text>
              <View
                style={{
                  flexDirection: 'row',
                  borderBottomColor: black_1,
                  borderBottomWidth: 1,
                }}>
                {/* {countryPickerVisible && (
                  <CountryPicker
                    withFilter={{ countryCodes: ['US'] }}
                    filter={{ countryCodes: ['US'] }}
                    withFlag
                    withCallingCode
                    onSelect={onSelectCountry}
                    visible={countryPickerVisible}
                    containerButtonStyle={{
                      marginTop: 15,
                      borderBottomColor: black_1,
                      borderBottomWidth: 1,
                      width: '100%',
                      paddingVertical: 12,
                    }}
                  />
                )} */}
                <TouchableOpacity
                  onPress={() => {}}
                  style={styles.SignInCountryContainer}
                  activeOpacity={0.8}>
                  <TextInput
                    placeholder="Code"
                    keyboardType="numeric"
                    value={"+1"}
                    editable={false}
                    caretHidden={false}
                    placeholderTextColor={black_1}
                    style={{color: black_1}}
                  />
                </TouchableOpacity>

                <TextInput
                  placeholder="Mobile number"
                  keyboardType="numeric"
                  value={phoneNumber}
                  onChangeText={(text) => {setPhoneNumber(text)}}
                  style={styles.SignInInputContainer}
                  placeholderTextColor={black_1}
                />
              </View>
            </View>
            <View style={styles.personalContainer}>
              <Text style={styles.labelName}>ANIMAL HOSPITAL</Text>
              <TextInput
                style={styles.inputContainer}
                value={hospitalName}
                onChangeText={setHospitalName}
                placeholder="Hospital Name"
                placeholderTextColor={black_1}
              />
            </View>
            <View style={styles.personalContainer}>
              <Text style={styles.labelName}>EXPERIENCE</Text>
              <TextInput
                style={styles.inputContainer}
                value={experience}
                onChangeText={setExperience}
                placeholder="Experience (year)"
                placeholderTextColor={black_1}
              />
            </View>
            <View style={styles.personalContainer}>
              <Text style={styles.labelName}>BIO</Text>
              <TextInput
                style={styles.inputContainer}
                value={bio}
                onChangeText={setBio}
                placeholder="Bio"
                placeholderTextColor={black_1}
              />
            </View>
            <View style={styles.personalContainer}>
              <Text style={styles.labelName}>VET SCHOOL ATTENDED</Text>
              <TextInput
                style={styles.inputContainer}
                value={collegeName}
                onChangeText={setCollegeName}
                placeholder="College Name"
                placeholderTextColor={black_1}
              />
            </View>
            <View>
              <Text style={styles.signInLabel}>GRADUATION YEAR</Text>
              <TextInput
                style={styles.inputContainer}
                value={year}
                onChangeText={(value) => {setYear(value)}}
                placeholder="Ex: 2020"
                placeholderTextColor={black_1}
                keyboardType='numeric'
                maxLength={4}
              />
            </View>
            <View>
              <Text style={styles.signInLabel}>CREATE PASSWORD</Text>
              <View style={styles.wrapperInput}>
                <TextInput
                  secureTextEntry={seePassword}
                  style={styles.SignInPasswordContainer}
                  value={password}
                  placeholder="Password"
                  placeholderTextColor={black_1}
                  onChangeText={text => setPassword(text)}
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
                  style={styles.SignInPasswordContainer}
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
            {error && <Text style={styles.errorText}>{error}</Text>}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.signUpButton}
              onPress={handleSubmit}>
              <Text style={styles.signText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    );
};
export default CreateAccount;


