/* eslint-disable eqeqeq */
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ImageBackground,
  Image,
  FlatList,
  Alert,
  ToastAndroid,
  Modal,
  BackHandler,
} from 'react-native';
import {Input} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import CountryPicker from 'react-native-country-picker-modal';
import {
  black,
  black_1,
  color_2,
  gray,
  white,
  whiteHex,
} from '../../../constants/colors';
import {Calendar} from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

import moment from 'moment';
import {AntIcon, MaterialCommunityIcon} from '../../../component/Icons';
import styles from './PatientEditForm.style';
import {launchImageLibrary} from 'react-native-image-picker';
import {PostAPIRequest} from '../../../API/Axios';
import {
  editAppointment_Mentee,
  getAvailbilityFromId_Mentee,
} from '../../../API/endpoints';
import LoadingComp from '../../../component/LoadingComp/LoadingComp';
import {BASE_URL_IMAGE} from '../../../constants/Host';
import DocumentPicker from 'react-native-document-picker';
import {DateTimeFormat} from '../../../helper/TimeFormat';
import {show} from '../../../utils/toast';

let today = moment();
let curr_date = today.clone().add(0, 'days').toISOString();
curr_date = curr_date.slice(0, 10);

const HourList = [
  '--',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
];
const MinutesList = [
  '--',
  '00',
  '05',
  '10',
  '15',
  '20',
  '25',
  '30',
  '35',
  '40',
  '45',
  '50',
  '55',
  '59',
];

const PatientEditForm = props => {
  const data = props?.route?.params?.data;
  const hideTimeSlot = props?.route?.params?.hideTimeSlot;

  const mentee_id = data?.mentee_id;
  const mentor_id = data?.mentor_id;
  const booking_id = hideTimeSlot ? data?.booking_cases?.[0]?.id : data?.id;
  // const slot_division_id = data?.slot_id;

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(null);
  const [age, setAge] = useState(null);
  const [month, setMonth] = useState('');
  const [gender, setGender] = useState('MALE');
  const [breed, setBreed] = useState(null);
  const [parentContact, setParentContact] = useState(null);
  const [problemType, setProblemType] = useState(null);
  const [history, setHistory] = useState(null);
  const [problem, setProblem] = useState(null);
  const [weight, setWeight] = useState(null);
  const [weightUnit, setWeightUnit] = useState('lbs');
  const [callType, setCallType] = useState('Query');
  const [profilePic, setProfilePic] = useState([]);
  const [selectedDate, setSelectedDate] = useState(curr_date);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [slot_division_id, setSlotDivisionId] = useState(data?.slot_id);

  const [slots, setSlots] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const WarnAlert = message => {
    show(message, "warning");
  };

  const handleSheduleForm = async () => {
    let flag = true;
    const formData = new FormData();
    if (startTime.length != 5) {
      show('Please select time slot !', "warning");
      return;
    }
    formData.append('booking_date', selectedDate);
    formData.append('mentor_id', mentor_id);
    formData.append('slot_division_id', slot_division_id);
    formData.append('call_type', 'Query');
    formData.append('start_time', startTime);
    formData.append('booking_id', booking_id);
    formData.append('booking_type', 'Normal');

    if (callType == 'Query') {
      if (breed) {
        formData.append('breed', breed);
      } else {
        show('Please enter valid breed', "warning");
        return;
      }
      if (name?.trim()) {
        formData.append('patient_name', name);
      } else {
        show('Please enter valid name', "warning");
        return;
      }
      if (age?.trim()?.length == 0 || month?.trim()?.length == 0) {
        show('Please enter valid age', "warning");
        return;
      }
      if (age?.trim()) {
        const finalAge = age + ' Year, ' + month + ' months';
        formData.append('patient_age', finalAge);
      }
      formData.append('patient_sex', gender);
      if (problem?.trim()) {
        formData.append('problem', problem);
      } else {
        show('Please enter valid problem', "warning");
        return;
      }
      if (weight?.trim()) {
        formData.append('weight', weight + ' ' + weightUnit);
      } else {
        show('Please enter valid weight', "warning");
        return;
      }
      if (history?.trim()) {
        formData.append('summary', history);
      } else {
        show('Please enter valid history', "warning");
        return;
      }
      if (profilePic?.length == 0) {
        show('Please select images', "warning");
        return;
      }
      for (var i in profilePic) {
        const image = profilePic[i];
        formData.append('fileUpload', {
          uri: image?.uri,
          type: image?.type,
          name: image?.name,
        });
      }
    }

    const token = await AsyncStorage.getItem('tokens');

    console.log('formData', formData);
    setLoading(true);
    const res = await PostAPIRequest({
      formData: formData,
      endpoint: editAppointment_Mentee,
      token: token,
    });

    if (res?.status == 200) {
      console.log('res?.data?.data', res?.data?.data);
      show('Appointment updated successfully !', 'success');
      navigation.navigate('Schedule');
      setLoading(false);
    } else {
      console.log(res?.response?.data);
      setLoading(false);
      show(res?.response?.data?.message, 'danger');
    }
  };

  useEffect(() => {
    if (hideTimeSlot) {
      const currData = data?.booking_cases?.[0];

      setWeight(currData?.weight ? currData.weight : null);
      setProblem(currData?.problem ? currData.problem : null);
      setAge(currData?.patient_age ? currData.patient_age : null);
      setBreed(currData?.breed ? currData.breed : null);
      setGender(currData?.patient_sex ? currData?.patient_sex : 'MALE');
      setName(currData?.patient_name ? data.patient_name : null);
      setHistory(currData?.summary ? currData.summary : null);
      setSelectedDate(currData?.booking_date ? currData.booking_date : null);
      setStartTime(DateTimeFormat(currData?.start_time, (twelve = false)));
      setEndTime(DateTimeFormat(currData?.end_time, (twelve = false)));
    } else {
      setWeight(data?.weight ? data.weight : null);
      setProblem(data?.problem ? data.problem : null);
      setAge(data?.patient_age ? data.patient_age : null);
      setBreed(data?.breed ? data.breed : null);
      setGender(data?.patient_sex ? data?.patient_sex : 'MALE');
      setName(data?.patient_name ? data.patient_name : '');
      setHistory(data?.summary ? data.summary : null);
      setSelectedDate(data?.booking_date ? data.booking_date : null);
      setStartTime(DateTimeFormat(data?.start_time, (twelve = false)));
      setEndTime(DateTimeFormat(data?.end_time, (twelve = false)));
    }
    getMentorAvailbility();
  }, []);

  const setToastMsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  //  For uploading image
  const uploadImage = () => {
    const options = {
      noData: true,
      mediaType: 'mixed',
      multiple: true,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        setToastMsg('Canceled image selection');
      } else if (response.errorCode === 'permission') {
        setToastMsg('permission not satisfied');
      } else if (response.errorCode === 'others') {
        setToastMsg(response.errorMessage);
      } else {
        const newImages = [
          ...profilePic,
          {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
          },
        ];
        setProfilePic(newImages);
        setToastMsg('Upload Successfully');
      }
    });
  };

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });
      if (response?.[0]?.name) {
        const newImages = [
          ...profilePic,
          {
            uri: response[0].uri,
            type: response[0].type,
            name: response[0].name,
          },
        ];
        setProfilePic(newImages);
        setToastMsg('Upload Successfully');
      }
      console.log(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const getMentorAvailbility = async () => {
    const token = await AsyncStorage.getItem('tokens');
    const formData = new FormData();
    formData.append('mentor_id', mentor_id);
    const List = [];
    let res = await PostAPIRequest({
      formData: formData,
      endpoint: getAvailbilityFromId_Mentee,
      token: token,
    });

    if (res?.status == 200) {
      res = res?.data?.data;
      for (var i in res) {
        if (data?.booking_date == res[i].date) {
          const curr = res[i]?.mentor_slots;
          const temp = [];
          for (var j in curr) {
            const curr2 = curr[j]?.slot_divison;
            for (let k in curr2) {
              temp.push(curr2[k]);
            }
          }
          console.log('temp[0]', temp[0]);
          setSlots(temp);
          break;
        }
      }
    } else {
      console.log(res.response);
    }
  };

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        style={styles.profileContainer}>
        {loading ? (
          <>
            <LoadingComp />
          </>
        ) : (
          <>
            <ImageBackground
              source={require('../../../assets/backgroundImage.png')}
              style={styles.background}
              resizeMode="contain">
              <View style={styles.uploadMain}>
                <View style={styles.personalContainer}>
                  <Text style={styles.labelName}>SELECT TIME</Text>
                </View>
                <Picker
                  dropdownIconColor={color_2}
                  selectedValue={startTime + '-' + endTime}
                  style={{height: 20, width: 300}}
                  onValueChange={(itemValue, itemIndex) => {
                    setStartTime(itemValue?.split('-')[0]);
                    setEndTime(itemValue?.split('-')[1]);
                    setSlotDivisionId(itemValue?.split('-')?.[2]);
                  }}>
                  <Picker.Item
                    label={startTime + '-' + endTime}
                    style={{backgroundColor: white}}
                    value={startTime + '-' + endTime}
                    color={black}
                  />
                  {!hideTimeSlot &&
                    slots?.map(item => {
                      return (
                        <Picker.Item
                          label={
                            DateTimeFormat(item?.start_time, (twelve = false)) +
                            ' - ' +
                            DateTimeFormat(item?.end_time, (twelve = false))
                          }
                          style={{backgroundColor: white}}
                          value={
                            DateTimeFormat(item?.start_time, (twelve = false)) +
                            '-' +
                            DateTimeFormat(item?.end_time, (twelve = false)) +
                            '-' +
                            item?.id
                          }
                          color={black}
                        />
                      );
                    })}
                </Picker>

                <View style={[styles.personalContainer, {marginTop: 20}]}>
                  <Text style={styles.labelName}>PET’S NAME, LAST NAME</Text>
                  <TextInput
                    style={styles.inputContainer}
                    value={name}
                    onChangeText={text =>
                      setName(text.replace(/[^a-zA-Z\s]/g, ''))
                    }
                    placeholder="Enter Name"
                    placeholderTextColor={black_1}
                  />
                </View>

                <View style={styles.personalContainer}>
                  <Text style={styles.labelName}>SEX</Text>
                  <Picker
                    style={styles.dropGender}
                    dropdownIconColor={color_2}
                    selectedValue={gender}
                    onValueChange={itemValue => {
                      setGender(itemValue);
                    }}>
                    <Picker.Item
                      label="MALE"
                      style={{backgroundColor: white}}
                      value="MALE"
                      color={black}
                    />
                    <Picker.Item
                      label="FEMALE"
                      style={{backgroundColor: white}}
                      value="FEMALE"
                      color={black}
                    />
                  </Picker>
                </View>

                <View style={styles.personalContainer}>
                  <Text style={styles.labelName}>PATIENT'S BREED</Text>
                  <TextInput
                    style={styles.inputContainer}
                    value={breed}
                    onChangeText={text => setBreed(text)}
                    placeholder="Enter Patient breed"
                    placeholderTextColor={black_1}
                  />
                </View>

                <Text style={styles.labelName}>AGE</Text>
                <View
                  style={[
                    styles.personalContainer,
                    {flexDirection: 'row', justifyContent: 'space-between'},
                  ]}>
                  <View style={{width: '40%'}}>
                    <TextInput
                      style={styles.inputContainer}
                      // value={age}
                      onChangeText={text => {
                        setAge(text);
                      }}
                      placeholder={
                        age?.split(',')?.[1]
                          ? age?.split(',')?.[0]
                          : 'Enter years'
                      }
                      placeholderTextColor={black_1}
                      keyboardType="numeric"
                      maxLength={2}
                    />
                  </View>
                  <View style={{width: '40%'}}>
                    <TextInput
                      style={styles.inputContainer}
                      // value={month}
                      onChangeText={text => {
                        setMonth(text);
                      }}
                      placeholder={
                        age?.split(',')?.[1]
                          ? age?.split(',')?.[1]?.split(' ')[0]
                            ? age?.split(',')?.[1]
                            : 'Enter months'
                          : 'Enter months'
                      }
                      placeholderTextColor={black_1}
                      keyboardType="numeric"
                      maxLength={2}
                    />
                  </View>
                </View>

                <View style={styles.personalContainer}>
                  <Text style={styles.labelName}>WEIGHT</Text>
                  <View style={{justifyContent: 'center'}}>
                    <TextInput
                      style={styles.inputContainer}
                      value={weight}
                      onChangeText={text => {
                        setWeight(text);
                      }}
                      placeholder={
                        weight ? weight?.split(' ')?.[0] : 'Enter weight'
                      }
                      placeholderTextColor={black_1}
                      keyboardType="numeric"
                      maxLength={4}
                    />
                    <Picker
                      dropdownIconColor={color_2}
                      selectedValue={weightUnit}
                      style={{
                        height: 20,
                        width: 130,
                        position: 'absolute',
                        right: 0,
                        alignSelf: 'center',
                        black,
                      }}
                      onValueChange={(itemValue, itemIndex) => {
                        setWeightUnit(itemValue);
                      }}>
                      <Picker.Item
                        label={'lbs'}
                        style={{backgroundColor: white}}
                        value={'lbs'}
                        color={black}
                      />
                      <Picker.Item
                        label={'Kg'}
                        style={{backgroundColor: white}}
                        value={'Kg'}
                        color={black}
                      />
                    </Picker>
                  </View>
                </View>

                <View style={styles.personalContainer}>
                  <Text style={styles.labelName}>BRIEF PATIENT HISTORY</Text>
                  <TextInput
                    style={[
                      styles.inputContainer,
                      {height: 100, borderWidth: 1, paddingVertical: 0},
                    ]}
                    value={history}
                    onChangeText={setHistory}
                    placeholder="Enter patient medical history, if applicable"
                    placeholderTextColor={black_1}
                    multiline={true}
                  />
                </View>

                <View style={styles.personalContainer}>
                  <Text style={styles.labelName}>PROBLEM List</Text>
                  <TextInput
                    style={styles.inputContainer}
                    value={problem}
                    onChangeText={setProblem}
                    placeholder="Enter patient's problem list, if applicable"
                    placeholderTextColor={black_1}
                  />
                </View>

                <View style={styles.personalContainer}>
                  <Text style={styles.labelName}>Pictures</Text>
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {data?.pictures?.split(',')?.map(item => {
                      return (
                        <Image
                          source={{uri: `${BASE_URL_IMAGE}${item}`}}
                          style={{
                            width: 100,
                            height: 100,
                            marginHorizontal: 10,
                          }}
                        />
                      );
                    })}
                  </View>
                </View>
                <View style={styles.personalContainer}>
                  <Text style={styles.labelName}>Uploaded images</Text>
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                      {profilePic?.map(item => {
                        return (
                          <Image
                            source={{uri: item?.uri}}
                            style={{
                              width: 100,
                              height: 100,
                              marginHorizontal: 10,
                              marginVertical: 10,
                            }}
                          />
                        );
                      })}
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.signUpButton}
                  onPress={() => {
                    // uploadImage();
                    handleDocumentSelection();
                  }}>
                  <Text
                    style={[
                      styles.signText,
                      {paddingVertical: 0, marginTop: 6},
                    ]}>
                    Upload Documents
                  </Text>
                  <Text
                    style={[
                      {
                        fontSize: 11,
                        color: white,
                        alignSelf: 'center',
                        marginBottom: 6,
                      },
                    ]}>
                    {'(.jpg, .pdf, .png, .jpeg)'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.signUpButton, {marginBottom: 100}]}
                  onPress={() => {
                    handleSheduleForm();
                  }}>
                  <Text style={styles.signText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </>
        )}
      </ScrollView>
    </>
  );
};

export default PatientEditForm;
