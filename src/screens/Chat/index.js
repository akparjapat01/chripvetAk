/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  BackHandler,
} from 'react-native';
import { AntIcon, EntypoIcon, IonIcon } from '../../component/Icons';
import { useNavigation } from '@react-navigation/native';
import styles from './index.style';
import {
  agoraCallStart,
  booking_Mentor,
  getAllCurrentMessage_Mentee,
  sendChat_Mentee,
} from '../../API/endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PostAPIRequest } from '../../API/Axios';
import { BASE_URL_IMAGE } from '../../constants/Host';
import { useDispatch, useSelector } from 'react-redux';
import { black, blackHex, gray_light } from '../../constants/colors';
import { fetchMenteeProfile, fetchMentorProfile } from '../../redux/authaction';
import { DateTimeFormat_Both } from '../../helper/TimeFormat';
import { getDatabase, onValue, ref } from 'firebase/database';
import { app } from '../../../firebase';
import moment from 'moment';
import { show } from '../../utils/toast';

const Chat = props => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const scrollViewRef = useRef();
  let token = useSelector(state => state.getToken);
  token = token.data;
  const [upcomingMeeting, setUpcomingMeeting] = useState(null);
  let menteeProfileData = useSelector(state => state.profileData);
  menteeProfileData = menteeProfileData?.data?.data;

  let mentorProfileData = useSelector(state => state.mentorProfileData);
  mentorProfileData = mentorProfileData?.data?.data;

  const data = props?.route?.params?.data;
  const data2 = props?.route?.params?.data2;
  const user_type = props?.route?.params?.user_type;

  const booking_id = data?.id ? data.id : data2?.id;
  const receiverId = data?.receiverUserId ? data.receiverUserId : (user_type == 'MENTEE' ? data2?.mentor_id : data2?.mentee_id);

  const [list, setList] = useState([]);
  const [message, setMessage] = useState('');
  const [callDetails, setCallDetails] = useState({});
  const [bookingId, setBookingId] = useState();
  const [profileImage, setProfileImage] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    getUpcomingBookings();
  }, []);

  const getUpcomingBookings = async type => {
    const token = await AsyncStorage.getItem('tokens');
    const formData = new FormData();
    let today = moment();
    let nextDate = today.toISOString().slice(0, 10);
    formData.append('date', nextDate);
    formData.append('booking_type', type);
    // console.log(formData, token);
    let res = await PostAPIRequest({
      formData: formData,
      endpoint: booking_Mentor,
      token: token,
    });

    if (res?.status == 200) {
      setUpcomingMeeting(res);
      // console.log(res?.data);
    }
  };

  const getAllMessages = async () => {
    const formData = new FormData();
    formData.append('receiverUserId', receiverId);
    const token = await AsyncStorage.getItem('tokens');
    let res = await PostAPIRequest({
      formData: formData,
      endpoint: getAllCurrentMessage_Mentee,
      token: token,
    });

    if (res?.status == 200) {
      res = res?.data;
      // console.log('MESSAGES', res);
      setBookingId(res?.booking?.bookingId);
      // setList(res);
      setProfileImage(res?.profile_details?.receiverProfileUrl);
      setName(res?.profile_details?.receiverName);
    } else {
      console.log(res?.response?.data);
    }

    let user_type = await AsyncStorage.getItem('user_type');
    let currentUserId = '';
    let MENTEE_ID;
    let MENTOR_ID;

    if (user_type == 'MENTOR') {
      MENTOR_ID = mentorProfileData?.id;
      if (!MENTOR_ID) {
        let res = dispatch(fetchMentorProfile());
        MENTOR_ID = mentorProfileData?.id;
      }
      MENTOR_ID = mentorProfileData?.id;

      MENTEE_ID = receiverId;
    } else {
      MENTEE_ID = menteeProfileData?.id;
      if (!MENTEE_ID) {
        let res = dispatch(fetchMenteeProfile());
        MENTEE_ID = menteeProfileData?.id;
      }
      MENTOR_ID = receiverId;
    }

    const db = getDatabase(app);
    const starCountRef = ref(db, 'chatRoom/messages');

    onValue(starCountRef, snapshot => {
      const data = snapshot.val();
      let currentMsg = [];
      for (var i in data) {
        const temp = data[i];
        if (user_type == 'MENTEE') {
          if (i == 'MENTEE_' + MENTEE_ID) {
            for (var j in temp) {
              if (j == 'MENTOR_' + MENTOR_ID) {
                const items = temp[j];
                for (let id in items) {
                  console.log(items[id]);
                  currentMsg.push(items[id]);
                }
                console.log(currentMsg);
                setList(currentMsg);
                // break;
              }
            }
          }
        } else {
          if (i == 'MENTOR_' + MENTOR_ID) {
            for (var j in temp) {
              if (j == 'MENTEE_' + MENTEE_ID) {
                const items = temp[j];
                for (let id in items) {
                  // console.log(items[id])
                  currentMsg.push(items[id]);
                }
                console.log(currentMsg);
                setList(currentMsg);
                break;
              }
            }
          }
        }
      }
    });
  };

  const getChannel = async () => {
    let user_type = await AsyncStorage.getItem('user_type');
    let currentUserId = '';

    if (user_type == 'MENTOR') {
      currentUserId = mentorProfileData?.id;
      if (!currentUserId) {
        let res = dispatch(fetchMentorProfile());
        console.log('response moinsoted', res);
        currentUserId = mentorProfileData?.id;
      }
      currentUserId = mentorProfileData?.id;
    } else {
      currentUserId = menteeProfileData?.id;
      if (!currentUserId) {
        let res = dispatch(fetchMenteeProfile());
        console.log('response moinsoted', res);
        currentUserId = menteeProfileData?.id;
      }
    };

    const formData = new FormData();
    formData.append('call_type', 'VideoCall');
    formData.append('receiver_user_id', receiverId);
    formData.append('sender_user_id', currentUserId);
    // formData.append('play_ringtone', true);
    formData.append(
      'receiver_type',
      user_type == 'MENTOR' ? 'MENTEE' : 'MENTOR',
    );


    // console.log("GET CHANNEL formdata", formData);
    let res = await PostAPIRequest({
      formData: formData,
      endpoint: `${agoraCallStart}/${bookingId}/publisher/uid/1`,
    });
    if (res?.status == 200) {
      res = res?.data?.data;
      console.log(res);
      navigation.navigate('VideoCall', {
        data: res,
        receiverId: receiverId,
        upcomingMeeting: upcomingMeeting,
      });
    } else {
      console.log(res?.response?.data);
      show("Please booked the slot", "warning");
    }
  };

  useEffect(() => {
    getAllMessages();
    if (!mentorProfileData?.id) {
      dispatch(fetchMentorProfile());
    }
    if (!menteeProfileData?.id) {
      dispatch(fetchMenteeProfile());
    }
  }, []);

  const backAction = () => {
    navigation.navigate('Inbox');
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const sendMessage = async () => {
    if (message.length > 0) {
      const token = await AsyncStorage.getItem('tokens');
      const formData = new FormData();
      formData.append('receiverUserId', receiverId);
      formData.append('message', message);
      const res = await PostAPIRequest({
        formData: formData,
        endpoint: sendChat_Mentee,
        token: token,
      });

      if (res?.status == 200) {
        console.log('Message send successfully !', res?.data);
        getAllMessages();
      } else {
        console.log('Error while sending message !', token);
        console.log(res?.response);
      }
      setMessage('');
    }
  };

  const messageTime = milliseconds => {
    let date = new Date(milliseconds);
    date = DateTimeFormat_Both(date);
    return date.toString();
  };

  return (
    <>

      <View>
        <View
          style={[
            styles.contractorHeader,
            { backgroundColor: gray_light, paddingHorizontal: 16 },
          ]}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Inbox');
            }}>
            <AntIcon name="arrowleft" size={20} color={blackHex} />
          </TouchableOpacity>
          <View>
            <Image
              source={{ uri: `${BASE_URL_IMAGE}${profileImage}` }}
              style={styles.chatProfileImg}
            />
          </View>
          <Text style={styles.chatHeading}>{name}</Text>
          <View style={{ flexDirection: 'row', position: 'absolute', right: 10 }}>
            {/* <TouchableOpacity
              onPress={() => {
                // startCall()
                // navigation.navigate("SurveyForm");
              }}
            >
              <IonIcon
                name="md-call-outline"
                size={25}
                color={blackHex}
                style={{ marginRight: 22 }}
              />
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => {
                getChannel();
              }}>
              <AntIcon name="videocamera" size={25} color={blackHex} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}
          style={[styles.inboxContainer]}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }>
          <View style={{ marginBottom: 150 }}>
            {list.map((item, index) => {
              return (
                <>
                  {item?.source === 'SENDER' ? (
                    <>
                      <View style={styles.secondChat}>
                        <Text style={styles.secondChatText}>
                          {item?.message}
                        </Text>
                        <Text style={[styles.secondChatText, styles.timeText]}>
                          {messageTime(item?.timestamp)}
                        </Text>
                      </View>
                    </>
                  ) : (
                    <>
                      <View style={styles.firstChat}>
                        <Text style={styles.firstChatText}>
                          {item?.message}
                        </Text>
                        <Text style={[styles.firstChatText, styles.timeText]}>
                          {messageTime(item?.timestamp)}
                        </Text>
                      </View>
                    </>
                  )}
                </>
              );
            })}
          </View>
        </ScrollView>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: 50,
          justifyContent: 'space-between',
          alignSelf: 'center',
          paddingHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: gray_light,
        }}>
        <TouchableOpacity style={{}}>
          <EntypoIcon name="attachment" size={20} color={black} />
        </TouchableOpacity>
        <TextInput
          onChangeText={value => {
            setMessage(value);
          }}
          multiline={true}
          placeholderTextColor={black}
          placeholder={'Type something...'}
          value={message}
          style={{ width: '80%', height: 45, fontSize: 16, color: black }}
        />
        <TouchableOpacity
          onPress={() => {
            sendMessage();
          }}
          style={{ justifyContent: 'center', alignItems: 'center' }}>
          <IonIcon name="send" size={30} color={black} />
        </TouchableOpacity>
      </View>

    </>
  );
};

export default Chat;
