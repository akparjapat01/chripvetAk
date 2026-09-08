import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { FontAwesome5, MaterialCommunityIcon } from '../../component/Icons';
import { useNavigation } from '@react-navigation/native';
import styles from './index.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PostAPIRequest } from '../../API/Axios';
import {
  agoraCallStart,
  deleteAppointment_Mentee,
  getAllScheduledAppointment_Mentee,
  scheduled_Mentor,
} from '../../API/endpoints';
import moment from 'moment';
import { BASE_URL_IMAGE } from '../../constants/Host';
import {
  black,
  black_1,
  blue,
  cobalt,
  havlockBlue,
  porcelain,
  white,
} from '../../constants/colors';
import LoadingComp from '../../component/LoadingComp/LoadingComp';
import { DateTimeFormat } from '../../helper/TimeFormat';
import VirtualizedListComp from '../../component/VirtualizedComp/VirtualizedComp';
import { show } from '../../utils/toast';

let today = moment();
let dateList = [];
for (let i = 0; i < 7; i++) {
  let nextDate = today.clone().add(i, 'days').toISOString();
  nextDate = nextDate.slice(0, 10);
  dateList.push(nextDate);
}

function Scheduled() {

  const navigation = useNavigation();

  const [selectedDate, setSelectedDate] = useState(dateList[0]);
  const [bookingList, setBookingList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEditDelete, setShowEditDelete] = useState(-1);
  const [currentUserType, setCurrentUserType] = useState('');

  // const getChannel = async (receiverId, senderId, bookingId) => {

  //   let user_type = await AsyncStorage.getItem('user_type');

  //   const formData = new FormData();
  //   formData.append('call_type', 'VideoCall');
  //   formData.append('receiver_user_id', receiverId);
  //   formData.append('sender_user_id', senderId);
  //   formData.append(
  //     'receiver_type',
  //     user_type == 'MENTOR' ? 'MENTEE' : 'MENTOR',
  //   );

  //   console.log("GET CHANNEL formdata", formData);
  //   let res = await PostAPIRequest({
  //     formData: formData,
  //     endpoint: `${agoraCallStart}/${bookingId}/publisher/uid/1`,
  //   });
  //   if (res?.status == 200) {
  //     res = res?.data?.data;
  //     console.log(res);
  //     navigation.navigate('VideoCall', {
  //       data: res,
  //       receiverId: receiverId,
  //       // upcomingMeeting: upcomingMeeting,
  //     });
  //   } else {
  //     console.log(res?.response?.data);
  //     show("Please call on your booked slots", "warning")
  //   }
  // };

  const getAllAvailableMentors = async item => {
    const token = await AsyncStorage.getItem('tokens');
    const user_type = await AsyncStorage.getItem('user_type');
    if (currentUserType.length == 0) {
      setCurrentUserType(user_type);
    }
    const endpoint =
      user_type == 'MENTOR'
        ? scheduled_Mentor
        : getAllScheduledAppointment_Mentee;

    const formData = new FormData();
    formData.append('date', item ? item : selectedDate);
    formData.append('booking_type', 'upcoming');

    setLoading(true);
    let res = await PostAPIRequest({
      formData: formData,
      endpoint: endpoint,
      token: token,
    });
    if (res.status == 200) {
      res = res?.data?.data;
      console.log(res[0]);
      setBookingList(res);
      setLoading(false);
    } else {
      console.log(endpoint, user_type, 'NO', res?.response?.data);
      setLoading(false);
    }
  };

  const handleDelete = booking_id => {
    Alert.alert('Are you sure?', 'Are you sure want to delete?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          const token = await AsyncStorage.getItem('tokens');
          const formData = new FormData();
          formData.append('booking_id', booking_id);
          let res = await PostAPIRequest({
            formData: formData,
            endpoint: deleteAppointment_Mentee,
            token: token,
          });

          if (res?.status == 200) {
            setShowEditDelete(-1);
            show('Deleted successfully !', 'success');
            console.log(res?.data);
            getAllAvailableMentors();
          } else {
            console.log(res?.response?.data);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    setShowEditDelete(-1);
    getAllAvailableMentors();
  }, []);

  const renderItem = (item, index) => {
    let uri = item?.mentor_details?.[0]?.profile_pic;
    let receiverId = item?.mentor_id;
    let senderId = item?.mentee_id;
    if (currentUserType == 'MENTOR') {
      uri = item?.mentee_details?.[0]?.profile_pic;

      receiverId = item?.mentee_id;
      senderId = item?.mentor_id;
    }

    return (
      <View style={styles.beautyFirstContainer} key={item.id}>
        <TouchableOpacity
          disabled={true}
          onPress={() => {
            // navigation.navigate('Chat', {
            //   data2: item,
            //   user_type: currentUserType,
            // });
            // getChannel(receiverId, senderId, item?.id);
          }}
          style={styles.beautyFirstContainerBox}>

          <View style={styles.beautyImgProfile}>
            {uri ? (
              <>
                <Image
                  source={{ uri: `${BASE_URL_IMAGE}${uri}` }}
                  style={{ width: "100%", height: 180, borderTopLeftRadius: 10, borderTopRightRadius:10 }}
                  resizeMode="contain"
                />
              </>
            ) : (
              <>
                <FontAwesome5
                  name="user-circle"
                  size={35}
                  style={styles.appLogo}
                  color={black_1}
                />
              </>
            )}
          </View>

        </TouchableOpacity>
          <View style={{ paddingHorizontal:10, backgroundColor: white, height: 100, borderBottomLeftRadius:10, borderBottomRightRadius:10 }}>
            <View style={{ flexDirection: 'row', marginTop:15 }}>
              <Text style={styles.beautyName}>
                {currentUserType == 'MENTEE'
                  ? item?.mentor_name
                  : item?.mentee_name}
              </Text>
            </View>
            <Text style={styles.beautySixteen}>
              {DateTimeFormat(item?.start_time) +
                ' To ' +
                DateTimeFormat(item?.end_time)}
            </Text>
            <Text style={[styles.beautySixteen, {marginTop:5}]}>{item?.booking_date}</Text>
          </View>
        {currentUserType == 'MENTEE' ? (
          <>
            <TouchableOpacity
              onPress={() => {
                showEditDelete == -1
                  ? setShowEditDelete(index)
                  : setShowEditDelete(-1);
              }}
              style={{ position: "absolute", right: -20 }}>
              <MaterialCommunityIcon
                name="dots-vertical"
                size={25}
                color={black}
                style={{}}
              />
            </TouchableOpacity>
            {showEditDelete == index ? (
              <>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      item?.call_type == 'General Discussion' ||
                        item?.is_details == 1
                        ? Alert.alert(
                          item?.call_type == 'General Discussion'
                            ? ('General Discussion booking!',
                              "Can't edit general discussion booking")
                            : 'You already filled form !',
                        )
                        : navigation.navigate('PatientEditForm', {
                          data: item,
                        });
                    }}>
                    <Text style={styles.buttons}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      handleDelete(item?.id);
                    }}>
                    <Text style={[styles.buttons, { marginTop: 4 }]}>
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
      </View>
    );
  };

  return (
    <View
      onTouchEnd={() => {
        showEditDelete > -1 ? setShowEditDelete(-1) : null;
      }}
      style={styles.container}>
      {loading ? (
        <>
          <LoadingComp />
        </>
      ) : (
        <>

          {loading ? (<><LoadingComp /></>) : (<>
            <View style={styles.dateContainer} >
              {dateList.map((item) => {
                return (
                  <TouchableOpacity onPress={() => { setSelectedDate(item); getAllAvailableMentors(item); }} >
                    <Text style={item == selectedDate ? { color: havlockBlue } : { color: black }} >{item.slice(8, 10)}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>

            {bookingList.length == 0 ? (<>
              <Text style={styles.noMentorText} >No Booking</Text>
            </>) : (<></>)}

            <VirtualizedListComp
              onRefresh={() => {
                setShowEditDelete(-1);
                getAllAvailableMentors();
              }} >
              {bookingList?.map((item, index) => {
                return (
                  renderItem(item, index)
                )
              })}
            </VirtualizedListComp>

          </>)}
        </>
      )}
    </View>
  );
}
export default Scheduled;
