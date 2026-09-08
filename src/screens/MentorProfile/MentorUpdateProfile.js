import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
  Image,
  ToastAndroid,
  ImageBackground,
} from 'react-native';
import { EntypoIcon, FontAwesome5 } from '../../component/Icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';
import CountryPicker from 'react-native-country-picker-modal';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMentorProfile } from '../../redux/authaction';
import { BASE_URL_IMAGE } from '../../constants/Host';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './index.style';
import { GetAPIRequest, PostAPIRequest } from '../../API/Axios';
import { getAllCategory, update_Mentor } from '../../API/endpoints';
import {
  black,
  black_1,
  color_2,
  color_6,
  red,
  white,
} from '../../constants/colors';
import { Picker } from '@react-native-picker/picker';
import { show } from '../../utils/toast';

const MentorUpdateProfile = props => {
  const reduxToken = useSelector(state => state.getToken);
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
  const [specialityName, setSpecialityName] = useState('');
  const [specialityList, setSpecialityList] = useState([]);
  // To store the category from profile section.
  const [categoryList, setCategoryList] = useState('');
  // Will store all selected category from dropdown.
  const [selectedCategoryList, setSelectedCategoryList] = useState([]);
  // Will store all category list coming from API.
  const [allCategoryList, setAllCategoryList] = useState([]);
  const [bio, setBio] = useState('');
  const [userdetails, setUserDetails] = useState('');
  const [experience, setExperience] = useState('0');

  const mentorProfile = useSelector(state => state.mentorProfileData);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem('tokens');
    // const token = reduxToken.data;
    const formData = new FormData();
    formData.append('email_id', email);
    formData.append('name', name);
    formData.append('dob', dob);
    formData.append('mobile', phoneNumber);
    formData.append('bio', bio);
    formData.append('experience', experience);
    if (selectedCategoryList) {
      let list = [...selectedCategoryList];
      list = list.join(', ');
      formData.append('category_name', list);
    }
    if (profilePic?.uri) {
      formData.append('images', {
        uri: profilePic.uri,
        type: profilePic.type,
        name: profilePic.name,
      });
    }
    // console.log("token", token);
    // console.log("images", profilePic);
    console.log('formData', formData);
    const res = await PostAPIRequest({
      formData: formData,
      endpoint: update_Mentor,
      token: token,
    });
    if (res?.status == 200) {
      show('Profile updated successfully !', 'success');
      navigation.goBack();
    } else {
      console.log(res?.response);
      show("Error: " + res?.response?.data?.message, 'danger');
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
    // setDob(date?.toISOString()?.split('T')?.[0]);
  };

  const getCategoryList = async () => {
    // Write your code here
    let res = await GetAPIRequest({ formData: null, endpoint: getAllCategory });
    console.log(res?.status, res?.data?.data, res?.response);
    if (res?.status == 200) {
      setAllCategoryList(res?.data?.data);
    } else {
    }
  };

  useEffect(() => {
    dispatch(fetchMentorProfile());
  }, [dispatch]);

  useEffect(() => {
    getCategoryList();
    if (mentorProfile && mentorProfile.data && mentorProfile.data.data) {
      setProfilePic(BASE_URL_IMAGE + mentorProfile.data.data.profile_pic);
      setUserDetails(mentorProfile.data.data);
      setName(mentorProfile.data.data.name);
      setDob(mentorProfile.data.data.dob);
      setEmail(mentorProfile.data.data.email_id);
      setCountryCode(mentorProfile.data.data.ph_code);
      setPhoneNumber(mentorProfile.data.data.mobile);
      setSpecialityList(mentorProfile.data.data.specialist);
      setExperience(mentorProfile.data.data?.experience);
      if (specialityList?.length === 0) {
        setSpecialityName('Mentor is not a specialist in any field.');
      } else {
        const list = mentorProfile.data.data.specialist;
        const curr = [];
        for (var i in list) {
          curr.push(list[i].specialist_name);
        }
        const curr2 = curr.join(', ');
        setSpecialityName(curr2);
      }

      if (mentorProfile?.data?.data?.category?.length != 0) {
        let currList = mentorProfile?.data?.data?.category;
        const curr = [];
        for (var i in currList) {
          curr.push(currList[i].category_name);
        }
        const curr2 = curr.join(', ');
        setCategoryList(curr2);
      } else {
        setCategoryList('No category added');
      }

      setBio(mentorProfile.data.data.bio);
      console.log(mentorProfile?.data?.data);
    } else if (mentorProfile && mentorProfile.error) {
      console.log(mentorProfile.error);
    }
  }, [mentorProfile]);

  const addCategory = item => {
    if (item == 'Select') {
      return;
    }
    const list = [...selectedCategoryList];
    if (list.includes(item)) {
      return;
    }
    list.push(item);
    setSelectedCategoryList(list);
  };

  const removeCategory = item => {
    let list = [...selectedCategoryList];
    list = list.filter(v => v !== item);
    setSelectedCategoryList(list);
  };

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
          <View style={[styles.uploadBox, { borderWidth: 1, paddingVertical: 10, paddingHorizontal: 4, borderRadius: 5 }]}>
            <View style={[styles.uploadRemoveSection, { flexDirection: "row", alignItems: "center" }]}>
              <TouchableOpacity
                style={styles.uploadArrow}
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

            <View style={styles.dateOfBirth}>
              <TouchableOpacity onPress={showDatePicker}>
                <Text style={{ color: black_1 }}>
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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.labelName}>EMAIL</Text>
            </View>
            <TextInput
              style={styles.inputEmailContainer}
              value={email}
              placeholder="Enter Your Email"
              onChangeText={setEmail}
              placeholderTextColor={black_1}
            />
          </View>

          <View style={styles.personalContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.labelName}>EXPERIENCE</Text>
            </View>
            <TextInput
              style={styles.inputEmailContainer}
              value={experience}
              placeholder={experience ? experience : '0'}
              onChangeText={value => {
                setExperience(value);
              }}
              placeholderTextColor={black_1}
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
                onPress={() => { }}
                style={styles.SignInCountryContainer}
                activeOpacity={0.8}>
                <TextInput
                  placeholder="Code"
                  keyboardType="numeric"
                  value={'+1'}
                  editable={false}
                  caretHidden={false}
                  placeholderTextColor={black_1}
                  style={{ color: black_1 }}
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
            <Text style={styles.labelName}>SPECIALITY</Text>
            <TextInput
              style={styles.inputContainer}
              value={specialityName}
              placeholder={'Speciality Name'}
              placeholderTextColor={black_1}
              editable={false}
            />
          </View>
          <View style={styles.personalContainer}>
            <Text style={styles.labelName}>CATEGORY</Text>
            <TextInput
              style={styles.inputContainer}
              value={categoryList}
              placeholder={'Speciality Name'}
              placeholderTextColor={black_1}
              editable={false}
            />
          </View>
          <View style={styles.personalContainer}>
            <Text style={styles.labelName}>Select Category</Text>
            <Picker
              dropdownIconColor={color_2}
              selectedValue={categoryList?.[0]?.category_name}
              style={{ height: 20, width: 300, marginBottom: 20, color: black }}
              onValueChange={(itemValue, itemIndex) => {
                addCategory(itemValue);
              }}>
              {allCategoryList?.map(item => {
                return (
                  <Picker.Item
                    label={item?.category_name}
                    style={{ backgroundColor: white }}
                    value={item?.category_name}
                    color={black}
                  />
                );
              })}
            </Picker>
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {selectedCategoryList?.map(item => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 0.5,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    marginHorizontal: 2,
                  }}>
                  <Text style={{ color: black, fontSize: 15 }}>{item}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      removeCategory(item);
                    }}>
                    <EntypoIcon name="cross" size={20} color={red} />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>

          <View style={styles.personalContainer}>
            <Text style={styles.labelName}>BIO</Text>
            <TextInput
              style={[
                styles.inputContainer,
                { height: 100, borderWidth: 1, paddingVertical: 0 },
              ]}
              value={bio}
              onChangeText={setBio}
              placeholder="Enter Your Bio"
              placeholderTextColor={black_1}
              multiline={true}
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
export default MentorUpdateProfile;
