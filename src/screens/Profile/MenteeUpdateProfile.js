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
  Alert,
} from 'react-native';
import {FontAwesome5} from '../../component/Icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import CountryPicker from 'react-native-country-picker-modal';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMenteeProfile} from '../../redux/authaction';
import {BASE_URL_IMAGE} from '../../constants/Host';
import styles from './index.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PostAPIRequest} from '../../API/Axios';
import {update_Mentee} from '../../API/endpoints';
import {black_1, color_6} from '../../constants/colors';
import {show} from '../../utils/toast';

const MenteeUpdateProfile = props => {
  const navigation = useNavigation();
  const [profilePic, setProfilePic] = useState(null);
  const [checkProfilePic, setCheckProfilePic] = useState(null);
  const [name, setName] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);
  const [countryCode, setCountryCode] = useState('+1');
  const [country, setCountry] = useState(null);
  const [hospitalName, setHospitalName] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [year, setYear] = useState('');
  const [userdetails, setUserDetails] = useState('');

  const profileData = useSelector(state => state.profileData);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem('tokens');

    const formData = new FormData();
    formData.append('email_id', email);
    if (
      !name ||
      name.length == 0 ||
      !phoneNumber ||
      phoneNumber.length != 10 ||
      !hospitalName ||
      hospitalName.length == 0 ||
      !collegeName ||
      collegeName.length == 0 ||
      !year ||
      year.length != 4
    ) {
      show('Please enter valid inputs', "warning");
      return;
    }
    formData.append('name', name);
    formData.append('dob', dob);
    formData.append('mobile', phoneNumber);
    formData.append('animal_hospital', hospitalName);
    formData.append('vet_school_attendent', collegeName);
    formData.append('graduation_year', year);
    if (profilePic?.uri) {
      formData.append('images', {
        uri: profilePic?.uri,
        type: profilePic?.type,
        name: profilePic?.name,
      });
    } else {
      formData.append('images', '');
    }
    console.log(formData);
    const res = await PostAPIRequest({
      formData: formData,
      endpoint: update_Mentee,
      token: token,
    });
    if (res?.status == 200) {
      show('Updated Successfully', 'success');
      navigation.goBack();
    } else {
      show("Error: "+res?.response?.data?.message, 'danger');
    }
  };

  const onSelectCountry = selectedCountry => {
    setCountryCode(selectedCountry.callingCode[0]);
    setCountry(selectedCountry);
    setCountryPickerVisible(false);
  };

  const setToastMsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  //  For uploading image
  const uploadImage = () => {
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
  useEffect(() => {
    if (profileData && profileData.data && profileData.data.data) {
      setProfilePic(BASE_URL_IMAGE + profileData.data.data.profile_pic);
      setUserDetails(profileData.data.data);
      setName(profileData.data.data.name);
      setDob(profileData.data.data.dob);
      setEmail(profileData.data.data.email_id);
      setCountryCode(profileData.data.data.ph_code);
      setPhoneNumber(profileData.data.data.mobile);
      setHospitalName(profileData.data.data.animal_hospital);
      setCollegeName(profileData.data.data.vet_school_attendent);
      setYear(profileData.data.data.graduation_year);
    } else if (profileData && profileData.error) {
      console.log(profileData.error);
    }
  }, [profileData]);

  useEffect(() => {
    dispatch(fetchMenteeProfile());
  }, [dispatch]);

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
          <Text style={styles.uploadText}>PROFILE PICTURE</Text>
          <View
            style={[
              styles.uploadBox,
              {
                borderWidth: 1,
                paddingVertical: 10,
                paddingHorizontal: 4,
                borderRadius: 5,
              },
            ]}>
            <View
              style={[
                styles.uploadRemoveSection,
                {flexDirection: 'row', alignItems: 'center'},
              ]}>
              <TouchableOpacity
                style={styles.uploadArrow}
                // onPress={uploadImage}
                activeOpacity={0.8}
                underlayColor={color_6}>
                {profilePic === 'http://chirpvet.com/uploads/' ||
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
                    // activeOpacity={0.8}
                    style={styles.uploadFile}
                    onPress={() => {
                      uploadImage();
                    }}>
                    <Text style={styles.uploadSection}>Upload image</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.removeFile}
                    onPress={() => {
                      removeImage();
                    }}>
                    <Text style={styles.removeSection}>Remove</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.uploadImg}>
                  <Text style={styles.uploadImgText}>
                    You can upload jpg, gif or png image files. Max size of 3MB.
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
            </View>
            <TextInput
              style={styles.inputEmailContainer}
              value={email}
              placeholder="Enter Your Email"
              onChangeText={setEmail}
              placeholderTextColor={black_1}
              editable={false}
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
                  withFilter
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
                onPress={() => {
                  // setCountryPickerVisible(!countryPickerVisible);
                }}
                style={styles.SignInCountryContainer}
                activeOpacity={0.8}>
                <TextInput
                  placeholder="Code"
                  keyboardType="numeric"
                  value={'+1'}
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
                onChangeText={text => setPhoneNumber(text)}
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
            <Text style={styles.labelName}>VET SCHOOL ATTENDED</Text>
            <TextInput
              style={styles.inputContainer}
              value={collegeName}
              onChangeText={setCollegeName}
              placeholder="College Name"
              placeholderTextColor={black_1}
            />
          </View>
          <View style={styles.personalContainer}>
            <Text style={styles.labelName}>GRADUATION YEAR</Text>
            <TextInput
              style={styles.inputContainer}
              value={year}
              onChangeText={value => {
                setYear(value);
              }}
              placeholder="Hospital Name"
              placeholderTextColor={black_1}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              handleSubmit();
            }}
            activeOpacity={0.8}
            style={styles.signUpButton}>
            <Text style={styles.signText}>{'Save'}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};
export default MenteeUpdateProfile;
