import React, { useState, useEffect } from 'react';
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
import {
  FontAwesome5,
} from '../../component/Icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import CountryPicker from 'react-native-country-picker-modal';
import { launchImageLibrary } from "react-native-image-picker";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenteeProfile } from '../../redux/authaction';
import { BASE_URL_IMAGE } from '../../constants/Host'
import styles from './index.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PostAPIRequest } from '../../API/Axios';
import { update_Mentee } from '../../API/endpoints';
import { black_1, color_6 } from '../../constants/colors';
import VirtualizedListComp from '../../component/VirtualizedComp/VirtualizedComp';

const Profile = props => {
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


  const setToastMsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };


  useEffect(() => {
    if (profileData && profileData.data && profileData.data.data) {
      setProfilePic(BASE_URL_IMAGE + profileData.data.data.profile_pic)
      setUserDetails(profileData.data.data)
      setName(profileData.data.data.name)
      setDob(profileData.data.data.dob)
      setEmail(profileData.data.data.email_id)
      setCountryCode(profileData.data.data.ph_code)
      setPhoneNumber(profileData.data.data.mobile)
      setHospitalName(profileData.data.data.animal_hospital)
      setCollegeName(profileData.data.data.vet_school_attendent)
      setYear(profileData.data.data.graduation_year)
    } else if (profileData && profileData.error) {
      console.log(profileData.error)
    }
  }, [profileData]);

  useEffect(() => {
    dispatch(fetchMenteeProfile());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(fetchMenteeProfile());
  }, []);

  return (
    <VirtualizedListComp
      onRefresh={() => { dispatch(fetchMenteeProfile()); }}
      style={styles.profileContainer}>
      <ImageBackground
        source={require('../../assets/backgroundImage.png')}
        style={styles.background}
        resizeMode="contain">
        <View style={styles.uploadMain}>
          {/* <Text style={styles.uploadText}>PROOF PICTURE</Text> */}
          <View style={styles.uploadBox}>
            <View style={styles.uploadRemoveSection}>
              <TouchableOpacity
                style={styles.uploadArrow}
                onPress={() => { navigation.navigate('FilePreview', `${profilePic}`,); }}
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

            </View>
            <View style={{ marginLeft: 30, justifyContent: "space-around", height: 50 }} >
              <Text style={styles.text} >{name}</Text>
              <Text style={styles.text} >{email}</Text>
            </View>
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
              <Text style={{ color: black_1 }}>
                {dob ? dob : 'Error'}
              </Text>
            </View>
          </View>
          <View style={styles.personalContainer}>
            <Text style={styles.labelName}>PHONE NUMBER</Text>
            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: black_1,
                borderBottomWidth: 1,
              }}>
              <TouchableOpacity
                onPress={() => {
                  // setCountryPickerVisible(!countryPickerVisible);
                }}
                style={styles.SignInCountryContainer}
                activeOpacity={0.8}>
                <TextInput
                  placeholder="Code"
                  keyboardType="numeric"
                  value={"+1"}
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
                editable={false}
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
              editable={false}
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
              editable={false}
            />
          </View>
          <View style={styles.personalContainer}>
            <Text style={styles.labelName}>GRADUATION YEAR</Text>
            <TextInput
              style={styles.inputContainer}
              value={year}
              onChangeText={(value) => { setYear(value); }}
              placeholder="Hospital Name"
              placeholderTextColor={black_1}
              editable={false}
            />
          </View>

          <TouchableOpacity onPress={() => {
            navigation.navigate("MenteeUpdateProfile");
          }} activeOpacity={0.8} style={styles.signUpButton}>
            <Text style={styles.signText}>{"Edit"}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </VirtualizedListComp>
  );
};
export default Profile;