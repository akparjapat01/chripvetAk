import React, { useCallback, useEffect, useState } from 'react';
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
  Dimensions,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import CountryPicker from 'react-native-country-picker-modal';
import {
  black,
  black_1,
  cobalt,
  color_2,
  havlockBlue,
  ligth_blue,
  red,
  white,
  whiteHex,
} from '../../constants/colors';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PostAPIRequest } from '../../API/Axios';
import {
  agoraCallStart,
  bookAppointment_Mentee,
  getAvailbilityFromId_Mentee,
} from '../../API/endpoints';
import moment from 'moment';
import { MaterialCommunityIcon } from '../../component/Icons';
import styles from './index.style';
import { launchImageLibrary } from 'react-native-image-picker';
import LoadingComp from '../../component/LoadingComp/LoadingComp';
import DocumentPicker from 'react-native-document-picker';
import { DateTimeFormat } from '../../helper/TimeFormat';
import VirtualizedListComp from '../../component/VirtualizedComp/VirtualizedComp';
import { show } from '../../utils/toast';
import { useSelector } from 'react-redux';

const windowWidth = Dimensions.get('window').width;

let today = moment();
let curr_date = today.clone().add(0, 'days').toISOString();
curr_date = curr_date.slice(0, 10);

const d = new Date();
let milliSeconds = d.getTime();

const PatientFormSecond = props => {
  const prevData = props?.route?.params;
  const mentor_id = prevData?.mentor_id;
  const isCallNowClicked = props?.route?.params?.callNowClicked;

  let profileData = useSelector(state => state.profileData);
  profileData = profileData?.data?.data;
  console.log("profile data", profileData);
  const mentee_id = profileData?.id;

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [month, setMonth] = useState();
  const [gender, setGender] = useState('MALE');
  const [breed, setBreed] = useState('');
  const [history, setHistory] = useState('');
  const [problem, setProblem] = useState('');
  const [noteList, setNoteList] = useState('');
  const [startTime, setStartTime] = useState('');
  const [slot_id, setSlotId] = useState('');
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('lbs');
  const [callType, setCallType] = useState('Query');
  const [profilePic, setProfilePic] = useState([]);
  const [selectedDate, setSelectedDate] = useState(curr_date);
  const [showCal, setShowCal] = useState(true);
  const [schedules, setSchedules] = useState({});
  const [slots, setSlots] = useState();
  const [updateList, setUpdateList] = useState(false);

  const handleOnChangeCountry = country => {
    setCountryIso2(country);
    setCallingCode(`+${country.callingCode[0]}`);
  };

  const WarnAlert = message => {
    show(message, "warning");
  };

  // This function is to handle the form after clicking the submit button
  const handleSheduleForm = async isSkip => {
    setSubmitButtonClicked(true);
    let flag = true;
    const formData = new FormData();

    formData.append('booking_date', selectedDate);
    formData.append('start_time', startTime);
    formData.append('mentor_id', mentor_id);
    formData.append('slot_division_id', slot_id);
    formData.append('call_type', callType);

    if (isCallNowClicked) {
      formData.append('booking_type', 'Emergency');
    } else {
      formData.append('booking_type', 'Normal');
    }

    if (callType == 'Query' && !isCallNowClicked && !isSkip) {
      // name
      if (name.trim()) {
        formData.append('patient_name', name);
      } else {
        setSubmitButtonClicked(false);
        show('Please enter valid name', "warning");
        return;
      }
      // breed
      if (breed) {
        formData.append('breed', breed);
      } else {
        setSubmitButtonClicked(false);
        show('Please enter valid breed', "warning");
        return;
      }
      // age and month
      if (age) {
        let finalAge = age + ' year, ' + month ? month : 0 + ' months';
        formData.append('patient_age', finalAge);
      } else {
        setSubmitButtonClicked(false);
        show('Please enter valid age', "warning");
        return;
      }
      // weight
      if (weight) {
        formData.append('weight', weight + ' ' + weightUnit);
      } else {
        setSubmitButtonClicked(false);
        show('Please enter valid weight', "warning");
        return;
      }

      if (gender) {
        formData.append('patient_sex', gender);
      }
      // history
      if (history) {
        formData.append('summary', history);
      } else {
        setSubmitButtonClicked(false);
        show('Please enter valid history', "warning");
        return;
      }
      // problem
      if (problem) {
        formData.append('problem', problem);
      } else {
        setSubmitButtonClicked(false);
        show('Please enter valid problem', "warning");
        return;
      }

      if (profilePic?.length == 0) {
        setSubmitButtonClicked(false);
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
    setSubmitButtonClicked(true);
    console.log(formData);
    let res = await PostAPIRequest({
      formData: formData,
      endpoint: bookAppointment_Mentee,
      token: token,
    });
    if (res?.status == 200) {
      res = res?.data?.data;
      if (isCallNowClicked) {
        getChannel(res?.mentor_id, res?.id);
      } else {
        show('Slot booked', 'success');
        navigation.navigate('Schedule');
      }
      setSubmitButtonClicked(false);
    } else {
      // show("This mentor is already on call,Please Try to book another slot.");
      console.log(res?.response?.data?.message);
      show(res?.response?.data?.message, 'danger');
      setSubmitButtonClicked(false);
    }
  };

  // if some user is click on call now then this function will fire and will navigate to video call screen
  const getChannel = async (mentor_id, booking_id) => {
    const receiverId = mentor_id;
    const formData = new FormData();
    formData.append('call_type', 'VideoCall');
    formData.append('receiver_user_id', receiverId);
    formData.append('receiver_type', 'MENTOR');
    formData.append('sender_user_id', mentee_id);
    let res = await PostAPIRequest({
      formData: formData,
      endpoint: `${agoraCallStart}/${booking_id}/publisher/uid/1`,
    });
    if (res?.status == 200) {
      res = res?.data?.data;
      console.log(res);
      navigation.navigate('VideoCall', { data: res, receiverId: receiverId });
    } else {
      console.log(res?.response?.data, formData);
      show(res?.response?.data, "danger");
    }
  };

  const setToastMsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  // This function is to select photo/documents from the device.
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

  // This function is get all avaialble slots of current mentor
  const getMentorAvailbility = async () => {
    const token = await AsyncStorage.getItem('tokens');
    const formData = new FormData();
    formData.append('mentor_id', mentor_id);
    const dateList = {};
    const List = [];
    for (let i = 0; i < 7; i++) {
      let nextDate = today.clone().add(i, 'days').toISOString();
      nextDate = nextDate.slice(0, 10);
      dateList[nextDate] = [];
      List.push(nextDate);
    }

    // setLoading(true);

    let res = await PostAPIRequest({
      formData: formData,
      endpoint: getAvailbilityFromId_Mentee,
      token: token,
    });

    if (res?.status == 200) {
      res = res?.data?.data;
      for (var i in res) {
        if (List.includes(res[i].date)) {
          const curr = res[i]?.mentor_slots;
          const temp = [];
          for (var j in curr) {
            const curr2 = curr[j]?.slot_divison;
            for (let k in curr2) {
              temp.push(curr2[k]);
            }
          }
          dateList[res[i].date] = temp;
        }
      }
      setSchedules(dateList);
      setSlots(dateList[curr_date]);
    } else {
      console.log(res.response);
    }

    // setLoading(false);
  };

  useEffect(() => {
    getMentorAvailbility();
    if (isCallNowClicked) {
      setShowCal(false);
    }
  }, []);

  return (
    <>
      {!showCal ? (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}
            style={styles.profileContainer}>
            <ImageBackground
              source={require('../../assets/backgroundImage.png')}
              style={styles.background}
              resizeMode="contain">
              <View style={styles.uploadMain}>
                {loading ? (
                  <>
                    {' '}
                    <LoadingComp />{' '}
                  </>
                ) : (
                  <>
                    {isCallNowClicked ? (
                      <></>
                    ) : (
                      <>
                        <View>
                          <Text style={styles.signInLabel}>Call Type</Text>
                          <View
                            style={{
                              overflow: 'hidden',
                              borderBottomColor: black_1,
                              borderBottomWidth: 1,
                            }}>
                            <Picker
                              style={styles.dropGender}
                              dropdownIconColor={color_2}
                              selectedValue={callType}
                              onValueChange={itemValue => {
                                setCallType(itemValue);
                              }}>
                              <Picker.Item
                                label="Query"
                                value="Query"
                                style={{ backgroundColor: white }}
                                color={black}
                              />
                              <Picker.Item
                                label="General Discussion"
                                style={{ backgroundColor: white }}
                                value="General Discussion"
                                color={black}
                              />
                            </Picker>
                          </View>
                        </View>
                      </>
                    )}

                    {callType == 'Query' ? (
                      <>
                        <View style={styles.personalContainer}>
                          <Text style={styles.labelName}>
                            PET’S NAME, LAST NAME
                          </Text>
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
                              style={{ backgroundColor: white }}
                              value="MALE"
                              color={black}
                            />
                            <Picker.Item
                              label="FEMALE"
                              style={{ backgroundColor: white }}
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
                            {
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            },
                          ]}>
                          <View style={{ width: '40%' }}>
                            <TextInput
                              style={styles.inputContainer}
                              value={age}
                              onChangeText={text => {
                                setAge(text);
                              }}
                              placeholder="Year"
                              placeholderTextColor={black_1}
                              keyboardType="numeric"
                              maxLength={2}
                            />
                          </View>
                          <View style={{ width: '40%' }}>
                            <TextInput
                              style={styles.inputContainer}
                              value={month}
                              onChangeText={text => {
                                setMonth(text);
                              }}
                              placeholder="Months"
                              placeholderTextColor={black_1}
                              keyboardType="numeric"
                              maxLength={2}
                            />
                          </View>
                        </View>

                        <View style={[styles.personalContainer]}>
                          <Text style={styles.labelName}>WEIGHT</Text>
                          <View style={{ justifyContent: 'center' }}>
                            <TextInput
                              style={styles.inputContainer}
                              value={weight}
                              onChangeText={text => setWeight(text)}
                              placeholder="Enter Weight"
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
                                color: black,
                              }}
                              onValueChange={(itemValue, itemIndex) => {
                                setWeightUnit(itemValue);
                              }}>
                              <Picker.Item
                                label={'lbs'}
                                value={'lbs'}
                                style={{ backgroundColor: white }}
                                color={black}
                              />
                              <Picker.Item
                                label={'Kg'}
                                value={'Kg'}
                                style={{ backgroundColor: white }}
                                color={black}
                              />
                            </Picker>
                          </View>
                        </View>

                        <View style={{}}>
                          <Text style={styles.labelName}>
                            BRIEF PATIENT HISTORY
                          </Text>
                          <TextInput
                            style={[
                              styles.inputContainer,
                              { height: 100, borderWidth: 1, paddingVertical: 0 },
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
                            style={[
                              styles.inputContainer,
                              { height: 100, borderWidth: 1, paddingVertical: 0 },
                            ]}
                            value={problem}
                            onChangeText={setProblem}
                            placeholder="Enter patient's problem list, if applicable"
                            placeholderTextColor={black_1}
                            multiline={true}
                          />
                        </View>

                        <View style={styles.personalContainer}>
                          <Text style={styles.labelName}>Picture</Text>
                          <View
                            style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {profilePic?.map(item => {
                              return (
                                <Image
                                  source={{ uri: item?.uri }}
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
                      </>
                    ) : (
                      <></>
                    )}

                    {callType != 'General Discussion' ? (
                      <>
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
                              { paddingVertical: 0, marginTop: 6 },
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
                      </>
                    ) : (
                      <></>
                    )}

                    {submitButtonClicked ? (
                      <>
                        <LoadingComp />
                      </>
                    ) : (
                      <>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          disabled={submitButtonClicked}
                          style={[styles.signUpButton]}
                          onPress={() => {
                            handleSheduleForm();
                          }}>
                          <Text style={styles.signText}>{'Submit'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          disabled={submitButtonClicked}
                          style={{ marginTop: 10, marginBottom: 40 }}
                          onPress={() => {
                            handleSheduleForm(true);
                          }}>
                          <Text style={styles.skipText}>Skip For Now</Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </>
                )}
              </View>
            </ImageBackground>
          </ScrollView>
        </>
      ) : (
        <>
          <Calendar
            onDayPress={day => {
              const x = new Date(day?.dateString);
              const y = new Date(today.toISOString()?.slice(0, 10));
              if (x >= y) {
                setSelectedDate(day?.dateString);
                setUpdateList(!updateList);
                setSlots(schedules[day?.dateString]);
              } else {
                Alert.alert('Invalid date', 'Please select valid date');
              }
            }}
            markedDates={{
              [selectedDate]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: havlockBlue,
              },
            }}
          />
          <VirtualizedListComp style={{ marginBottom: 10 }}>
            <View
              style={{
                // backgroundColor: cobalt,
                width: '100%',
                alignSelf: 'center',
                marginBottom: 50,
                paddingHorizontal: 10,
              }}>

              <Text style={styles.title}>Select a Slot</Text>

              {loading ? (
                <>
                  <LoadingComp />
                </>
              ) : (
                <>
                  {(!slots || slots.length == 0) && (
                    <Text style={[styles.text, { marginVertical: 10 }]}>
                      No Slots Found
                    </Text>
                  )}
                  <FlatList
                    data={slots}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item?.id}
                    renderItem={({ item, index }) => {
                      return (
                        <>
                          <TouchableOpacity
                            onPress={() => {
                              setStartTime(
                                DateTimeFormat(
                                  item.start_time,
                                  (twelve = false),
                                ),
                              );
                              setSlotId(item?.id);
                              setShowCal(false);
                            }}
                            disabled={item?.is_booked == 0 ? false : true}
                            style={[
                              styles.timeHorizontalContainer,
                              index == slots?.length - 1
                                ? { marginBottom: 20 }
                                : {},
                              windowWidth < 411 ? { width: '100%' } : null,
                            ]}>
                            <View
                              style={styles.rowContainer}>
                              {/* <Text style={styles.text}>From</Text> */}
                              <Text style={[styles.text, item?.is_booked != 0 ? { color: red } : {}]}>
                                {DateTimeFormat(item?.start_time)?.slice(0, 2)}
                                {'  :'}
                              </Text>
                              <Text style={[styles.text, item?.is_booked != 0 ? { color: red } : {}]}>{DateTimeFormat(item?.start_time)?.slice(3, 5)}{' '} {DateTimeFormat(item?.start_time)?.slice(5, 7,)} </Text>
                            </View>

                            {/* <Text style={[styles.text,item?.is_booked != 0?{color:red}:{}]} >To</Text>

                            <View
                              style={styles.rowContainer}>
                              <Text style={[styles.text,item?.is_booked != 0?{color:red}:{}]}>
                                {DateTimeFormat(item?.end_time)?.slice(0, 2)}
                                {' :'}
                              </Text>
                              <Text style={[styles.text,item?.is_booked != 0?{color:red}:{}]}>{DateTimeFormat(item?.end_time)?.slice(3, 5)}{' '}{DateTimeFormat(item?.end_time)?.slice(5, 7)} </Text>
                            </View> */}

                          </TouchableOpacity>
                        </>
                      );
                    }}
                    extraData={updateList}
                  />
                </>
              )}
            </View>
          </VirtualizedListComp>
        </>
      )}
    </>
  );
};
export default PatientFormSecond;
