import React, { useEffect, useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Switch,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  FlatList,
  Dimensions,
  RefreshControl,
} from 'react-native';

import {
  black,
  blue,
  color_2,
  gray,
  gray_light,
  havlockBlue,
  iridium,
  red,
  white,
} from '../../../constants/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import { GetAPIRequest, PostAPIRequest } from '../../../API/Axios';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  deleteSlot_Mentor,
  mentorAvailbility,
  profile_Mentor,
  provideAvailability_Mentor,
} from '../../../API/endpoints';
import { updateAvailability_Mentor } from '../../../API/endpoints';
import { createSlots_Mentor } from '../../../API/endpoints';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { updateSlots_Mentor } from '../../../API/endpoints';
import styles from './weekly.style';
import { AntIcon } from '../../../component/Icons';
import { Picker } from '@react-native-picker/picker';
import LoadingComp from '../../../component/LoadingComp/LoadingComp';
import {
  DateFormat,
  DateTimeFormat,
  DateTimeFormat_Both,
} from '../../../helper/TimeFormat';
import { show } from '../../../utils/toast';
// import DatePicker from "react-native-date-picker";

const windowWidth = Dimensions.get('window').width;

const HourList = [
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
];
const MinutesList = [
  '00',
  '20',
  '40',
];

const AmPmList = ['AM', 'PM'];

const Weekly = () => {

  let list = [
    { title: 'Sunday', isEnabled: false, id: 0 },
    { title: 'Monday', isEnabled: false, id: 1 },
    { title: 'Tuesday', isEnabled: false, id: 2 },
    { title: 'Wednesday', isEnabled: false, id: 3 },
    { title: 'Thursday', isEnabled: false, id: 4 },
    { title: 'Friday', isEnabled: false, id: 5 },
    { title: 'Saturday', isEnabled: false, id: 6 },
  ];

  console.log('windowWidth', windowWidth);

  let weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ][new Date().getDay()];
  let curr = [];
  let last = [];
  let final = [];

  switch (weekday) {
    case 'Monday':
      curr = list.slice(1, 7);
      last = list.slice(0, 1);
      final = curr.concat(last);
      break;
    case 'Tuesday':
      curr = list.slice(2, 7);
      last = list.slice(0, 2);
      final = curr.concat(last);
      break;
    case 'Wednesday':
      curr = list.slice(3, 7);
      last = list.slice(0, 3);
      final = curr.concat(last);
      break;
    case 'Thursday':
      curr = list.slice(4, 7);
      last = list.slice(0, 4);
      final = curr.concat(last);
      break;
    case 'Friday':
      curr = list.slice(5, 7);
      last = list.slice(0, 5);
      final = curr.concat(last);
      break;
    case 'Saturday':
      curr = list.slice(6, 7);
      last = list.slice(0, 6);
      final = curr.concat(last);
      break;
    default:
      curr = list;
      break;
  }

  for (var i in final) {
    final[i].id = i;
  }

  list = [...final];

  const [isEnabled, setIsEnabled] = useState(final);
  const [availbilityList, setAvailbilityList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const toggleSwitch = async () => {
    let index = 0;
    const curr = [...isEnabled];
    curr[index].isEnabled = !curr[index].isEnabled;
    setIsEnabled(curr);
    let token = await AsyncStorage.getItem('tokens');

    let today = moment();

    for (var i = 0; i < 7; i++) {
      index = i;
      let nextDate = today.clone().add(index, 'days').toISOString();
      nextDate = nextDate.slice(0, 10);
      const formData = new FormData();
      formData.append('date', nextDate);
      const res = await PostAPIRequest({
        formData: formData,
        endpoint: provideAvailability_Mentor,
        token: token,
      });
      if (res?.status == 200) {
        console.log('DATE', nextDate);
      } else {
        console.log('error', res?.response?.data?.message);
      }
    }
  };

  const getallavailability = async () => {
    const curr = [...isEnabled];

    const token = await AsyncStorage.getItem('tokens');
    // setLoading(true);
    let profile = await GetAPIRequest({
      formData: undefined,
      endpoint: profile_Mentor,
      token: token,
    });
    profile = profile?.data?.data;
    const id = profile?.id;

    const formData = new FormData();
    formData.append('mentor_id', id);
    console.log(formData);
    let res = await PostAPIRequest({
      formData: formData,
      endpoint: mentorAvailbility,
      token: token,
    });

    if (res?.status == 200) {
      res = res?.data?.data;
      let list = {
        Sunday: [],
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
      };

      const nextSevenDays = [];
      let today = moment();
      for (var i = 0; i < 7; i++) {
        let nextDate = today.clone().add(i, 'days').toISOString();
        nextDate = nextDate.slice(0, 10);
        nextSevenDays.push(nextDate);
      }

      for (var i in res) {
        if (nextSevenDays.includes(res[i]?.date?.slice(0, 10))) {
          list[res[i].day] = res[i]?.mentor_slots;
        }
        console.log(
          'res[i]?.date',
          res[i]?.date,
          '->',
          DateFormat(res[i].date),
        );
      }

      for (var i in curr) {
        if (list[curr[i].title].length > 0) {
          curr[i].isEnabled = true;
        } else {
          curr[i].isEnabled = false;
        }
      }

      setIsEnabled(curr);
      setAvailbilityList(list);
      setLoading(false);
    } else {
      console.log('ERROR while fetching', res?.response?.data, res?.status);
      setLoading(false);
    }
  };

  const updateSlot = async (start, end, index, slot_id) => {
    // getting token
    const token = await AsyncStorage.getItem('tokens');

    // getting date.
    let today = moment();
    let nextDate = today.clone().add(index, 'days').toISOString();
    nextDate = nextDate.slice(0, 10);
    const formData = new FormData();
    formData.append('date', nextDate);
    formData.append('start_time', start);
    formData.append('end_time', end);
    formData.append('slot_id', slot_id);
    console.log(formData);
    const res = await PostAPIRequest({
      formData: formData,
      endpoint: updateSlots_Mentor,
      token: token,
    });

    if (res?.status == 200) {
      console.log(res?.data?.data);
      show("Slots updated Successfully ", "success");
      getallavailability();
    } else {
      show("Error" + res?.response?.data?.message, "danger");
    }
    console.log(res?.response?.data?.message);
  };

  const createSlots = async (start, end, index) => {
    // getting token
    const token = await AsyncStorage.getItem('tokens');

    // getting date
    let today = moment();
    let nextDate = today.clone().add(index, 'days').toISOString();
    nextDate = nextDate.slice(0, 10);

    const formData = new FormData();
    formData.append('date', nextDate);
    formData.append('start_time', start);
    formData.append('end_time', end);
    // console.log('formData create slot ', formData);
    const res = await PostAPIRequest({
      formData: formData,
      endpoint: createSlots_Mentor,
      token: token,
    });

    if (res?.status == 200) {
      // console.log('DONE', res?.data);
      show("Slots created Successfully ", "success");
      getallavailability();
    } else {
      show("Error: " + res?.response?.data?.message, "danger");
    }
  };

  const deleteSlots = async (date, slot_id) => {
    const token = await AsyncStorage.getItem('tokens');
    const formData = new FormData();
    formData.append('date', date);
    formData.append('slot_id', slot_id);
    console.log('delete form data ->', formData, token);
    let res = await PostAPIRequest({
      formData: formData,
      endpoint: deleteSlot_Mentor,
      token: token,
    });
    if (res?.status == 200) {
      console.log('SUCCESS ->>>>>>>>', res?.data);
      show("Slots deleted Successfully ", "success");
      getallavailability();
    } else {
      console.log('ERROR WHILE DELETING SLOTS ->>>>>', res?.response?.data);
      show(res?.response?.data?.message, "danger");
    }
  };

  useEffect(() => {
    // For now always provide availability.
    toggleSwitch();
    getallavailability();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // For now always provide availability.
    toggleSwitch();
    getallavailability();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {loading ? (
          <>
            {' '}
            <LoadingComp />{' '}
          </>
        ) : (
          <>
            <View style={styles.container}>
              {list.map((item, index) => {
                return (
                  <HorizontalComp
                    title={item.title}
                    isEnabled={isEnabled[index].isEnabled}
                    handleDeleteSlot={(date, slot_id) => {
                      deleteSlots(date, slot_id);
                    }}
                    onAddIconClick={(start, end) => {
                      createSlots(start, end, index);
                    }}
                    slotList={availbilityList[item.title]}
                    updateSlot={(start, end, slot_id) => {
                      updateSlot(start, end, index, slot_id);
                    }}
                  />
                );
              })}
            </View>
          </>
        )}
      </ScrollView>
    </>
  );
};

export default Weekly;

const HorizontalComp = ({
  title,
  isEnabled,
  handleDeleteSlot,
  onAddIconClick,
  slotList,
  updateSlot,
}) => {
  // listing all slots in one list

  const list = [];
  for (var i in slotList) {
    list.push(slotList[i]);
  }
  slotList = list;
  console.log(slotList);
  const [showPicker, setShowPicker] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [slotId, setSlotId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [AMPM_Start, setAMPM_Start] = useState('AM');
  const [AMPM_End, setAMPM_End] = useState('AM');
  const [currentTime, setCurrentTime] = useState(1);

  // time input variables.
  const [startHH, setStartHH] = useState('');
  const [startMM, setStartMM] = useState('');
  const [endHH, setEndHH] = useState('');
  const [endMM, setEndMM] = useState('');

  const handleTime = () => {
    let currStartHH = startHH;
    let currEndHH = endHH;
    if (AMPM_Start == 'AM') {
      if (currStartHH == '12') {
        currStartHH = '00';
      }
    }
    if (AMPM_Start == 'PM') {
      if (currStartHH != '12') {
        currStartHH = (parseInt(currStartHH) + 12).toString();
      }
    }
    if (AMPM_End == 'AM') {
      if (currEndHH == '12') {
        currEndHH = '00';
      }
    }
    if (AMPM_End == 'PM') {
      if (currEndHH != '12') {
        currEndHH = (parseInt(currEndHH) + 12).toString();
      }
    }
    console.log(currStartHH, currEndHH);
    console.log(currStartHH + ':' + startMM, currEndHH + ':' + endMM);
    if (!isUpdate) {
      onAddIconClick(currStartHH + ':' + startMM, currEndHH + ':' + endMM);
    } else {
      updateSlot(currStartHH + ':' + startMM, currEndHH + ':' + endMM, slotId);
    }
    setShowPicker(false);
    setEndHH('');
    setEndMM('');
    setStartHH('');
    setStartMM('');
    setAMPM_Start('AM');
    setAMPM_End('AM');
  };

  const handleDelete = (date, id) => {
    Alert.alert('Delete !', 'Are you sure want to delete?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          handleDeleteSlot(date, id);
        },
      },
    ]);
  };

  const updateTimeStates = (start, end) => {
    const startTime = DateTimeFormat(start);
    const endTime = DateTimeFormat(end);

    setStartHH(startTime?.slice(0, 2));
    setStartMM(startTime?.slice(3, 5));
    setAMPM_Start(startTime?.slice(5, 7));
    setEndHH(endTime?.slice(0, 2));
    setEndMM(endTime?.slice(3, 5));
    setAMPM_End(endTime?.slice(5, 7));
  };

  return (
    <View style={styles.horizontalContainer}>
      <View>
        <Text style={[styles.text1, windowWidth < 411 ? { fontSize: 16 } : null]}>
          {title}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 }}>
        {slotList?.length == 0 ? (
          <>
            <TouchableOpacity
              onPress={() => {
                setShowPicker(true);
              }}
              disabled={!isEnabled}
              style={[
                styles.timeContainer,
                { borderWidth: 0.6, width: 135, backgroundColor: havlockBlue },
              ]}>
              <Text style={[styles.text2, { color: white }]}>Unavailable</Text>
            </TouchableOpacity>
          </>
        ) : (
          <></>
        )}
        {slotList?.map((item, index) => {
          return (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 4,
                  marginTop: 4,
                  backgroundColor: white,
                  borderRadius: 6,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setShowPicker(true);
                    setSlotId(item?.id);
                    setIsUpdate(true);
                    updateTimeStates(item?.start_time, item?.end_time);
                    setCurrentTime(1);
                  }}
                  key={index}
                  disabled={!isEnabled}
                  style={[styles.timeContainer]}>
                  <Text style={styles.text2}>{`${DateTimeFormat(item?.start_time) +
                    ' - ' +
                    DateTimeFormat(item?.end_time)
                    }`}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleDelete(item?.date, item?.id);
                  }}
                  style={{ marginHorizontal: 2 }}>
                  <AntIcon name="delete" size={16} color={red} />
                </TouchableOpacity>
              </View>
            </>
          );
        })}
      </View>

      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          right: 4,
          alignItems: 'center',
          height: '100%',
        }}>
        <TouchableOpacity
          onPress={() => {
            setIsUpdate(false);
            setShowPicker(true);
            setCurrentTime(1);
          }}
          style={styles.addContainer}>
          <Icon name="plus" color={white} size={24} />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showPicker}
        onRequestClose={() => {
          setShowPicker(false);
          setEndHH('');
          setEndMM('');
          setStartHH('');
          setStartMM('');
        }}>

        <View style={styles.modalContainer}>
          <View style={styles.container_1}>
            <TouchableOpacity
              onPress={() => {
                setCurrentTime(1);
              }}
              style={[
                styles.currentTimeBox,
                currentTime == 1 ? { backgroundColor: havlockBlue } : null,
              ]}>
              <Text
                style={[
                  styles.text3,
                  { alignSelf: 'center' },
                  currentTime == 1 ? { color: white } : { color: black },
                ]}>
                Start time
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setCurrentTime(2);
              }}
              style={[
                styles.currentTimeBox,
                currentTime == 2 ? { backgroundColor: havlockBlue } : null,
              ]}>
              <Text
                style={[
                  styles.text3,
                  { alignSelf: 'center' },
                  currentTime == 2 ? { color: white } : { color: black },
                ]}>
                End Time
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.selectedTimeContainer}>
            <Text style={styles.fromToText}>
              To{'  :  '}
              {(startHH ? startHH : '--') +
                ' : ' +
                (startMM ? startMM : '--') +
                ' ' +
                AMPM_Start}
            </Text>
            <Text style={styles.fromToText}>
              From{'  :  '}
              {(endHH ? endHH : '--') +
                ' : ' +
                (endMM ? endMM : '--') +
                ' ' +
                AMPM_End}
            </Text>
          </View>

          <View
            style={{
              height: 80,
              flexDirection: 'row',
              alignSelf: 'center',
              marginTop: 20,
            }}>
            <View>
              <FlatList
                data={HourList}
                keyExtractor={item => item?.id}
                renderItem={({ item }) => {
                  return (
                    <>
                      <TouchableOpacity
                        onPress={() => {
                          currentTime == 1 ? setStartHH(item) : setEndHH(item);
                        }}>
                        <Text
                          style={[
                            styles.text4,
                            (startHH == item && currentTime == 1) |
                              (currentTime == 2 && endHH == item)
                              ? { color: black }
                              : { color: white },
                          ]}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    </>
                  );
                }}
              />
            </View>
            <View style={{ marginHorizontal: 20 }}>
              <FlatList
                data={MinutesList}
                keyExtractor={item => item?.id}
                renderItem={({ item }) => {
                  return (
                    <>
                      <TouchableOpacity
                        onPress={() => {
                          currentTime == 1 ? setStartMM(item) : setEndMM(item);
                        }}>
                        <Text
                          style={[
                            styles.text4,
                            (startMM == item && currentTime == 1) |
                              (currentTime == 2 && endMM == item)
                              ? { color: black }
                              : { color: white },
                          ]}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    </>
                  );
                }}
              />
            </View>
            <View>
              <FlatList
                data={AmPmList}
                keyExtractor={item => item?.id}
                renderItem={({ item }) => {
                  return (
                    <>
                      <TouchableOpacity
                        onPress={() => {
                          currentTime == 1
                            ? setAMPM_Start(item)
                            : setAMPM_End(item);
                        }}>
                        <Text
                          style={[
                            styles.text4,
                            (AMPM_Start == item && currentTime == 1) |
                              (currentTime == 2 && AMPM_End == item)
                              ? { color: black }
                              : { color: white },
                          ]}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    </>
                  );
                }}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              startHH.length == 2 &&
                startMM.length == 2 &&
                endHH.length == 2 &&
                endMM.length == 2
                ? handleTime()
                : show('Please select time slots', "warning");
            }}
            // disabled={(startHH.length == 2 && startMM.length == 2 && endHH.length == 2 && endMM.length == 2) ? false : true}
            style={[styles.doneButton]}>
            <Text style={styles.doneText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowPicker(false);
              setEndHH('');
              setEndMM('');
              setStartHH('');
              setStartMM('');
            }}
            style={[
              styles.doneButton,
              { width: 80, backgroundColor: havlockBlue, marginBottom: 20 },
            ]}>
            <Text style={[styles.doneText, { color: white }]}>Cancel</Text>
          </TouchableOpacity>
        </View>

      </Modal>
      
    </View>
  );
};
