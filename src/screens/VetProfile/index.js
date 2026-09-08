import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import Carousel from 'react-native-snap-carousel';
import { GetAPIRequest, PostAPIRequest } from '../../API/Axios';
import { addToFavourite_Mentee, agoraCallStart, bookAppointment_Mentee, editFavouriteMentor_Mentee, getAllFavourites_Mentee, getAvailbilityFromId_Mentee, getMentorDetailsById_Mentee } from '../../API/endpoints';
import styles from './index.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingComp from '../../component/LoadingComp/LoadingComp';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { favStarColor, fetchFavoriteMentors } from '../../redux/authaction';
import { BASE_URL_IMAGE } from '../../constants/Host';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { black, gold_star, gray } from '../../constants/colors';
import { show } from '../../utils/toast';
import { IonIcon } from '../../component/Icons';

// Pass the data in props from parent component.

const images = [
  { id: 1, uri: require('../../assets/caraouselImage.png') },
  { id: 2, uri: require('../../assets/caraouselImage.png') },
  { id: 3, uri: require('../../assets/caraouselImage.png') },
];

function VetProfile(props) {

  const data = props.route.params.data;

  console.log(data)
  const mentor_id = data?.mentor_id ? data.mentor_id : data?.mentor_slots?.[0].mentor_id;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const color = useSelector(state => state.starColor);
  let token = useSelector(state => state.getToken);
  token = token.data;

  const [mentorDetails, setMentorDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [callDetails, setCallDetails] = useState();
  const [categoryList, setCategoryList] = useState("");

  const { width: viewportWidth } = Dimensions.get('window');
  const itemWidth = viewportWidth * 0.4;

  const getData = async () => {
    const token = await AsyncStorage.getItem("tokens");
    // const formData = new FormData();
    // formData.append("id", mentor_id);
    setLoading(true);
    // const res = await PostAPIRequest({ formData: formData, endpoint: getAvailbilityFromId_Mentee, token: token });
    let res = await GetAPIRequest({ formData: null, endpoint: `${getMentorDetailsById_Mentee}?id=${mentor_id}` });
    if (res?.status == 200) {
      res = res?.data?.data;
      console.log("res", res);
      setMentorDetails(res);
      let currList = res?.mentor_category;
      let curr = [];
      for (let i in currList) {
        curr.push(currList[i]?.category_name);
      }
      currList = res?.mentor_specialist
      for (let i in currList) {
        curr.push(currList[i].specialist_name);
      }
      let curr2 = curr.join(", ");
      setCategoryList(curr2);
    } else {
      console.log("error", res?.response?.data)
    }
    try {
      const fav = await axios.get('https://chirpvet.com:3000/api/v1/mentee/getallFavourites', {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'x-access-token': `${token}`
        },
      });
      let list = fav?.data?.data;
      for (var i in list) {
        if (list[i].mentor_id == mentor_id) {
          dispatch(favStarColor(true, gold_star));
          setIsFavourite(true);
          break;
        }
      }
    } catch (err) {
      console.log("err", err);
    };
    setLoading(false);
  };

  const addToFavourite = async () => {

    Alert.alert(isFavourite ? 'Remove Favorite' : "Add Favorite", `Are you sure want to ${!isFavourite ? "Add" : "Remove"} ?`, [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes', onPress: async () => {
          let endPoint = addToFavourite_Mentee;
          if (isFavourite) {
            endPoint = editFavouriteMentor_Mentee;
          };
          const formData = new FormData();
          formData.append("mentor_id", mentor_id);
          const res = await PostAPIRequest({ formData: formData, endpoint: endPoint, token: token });
          if (res?.status == 200) {
            console.log("done", res?.data, isFavourite);
            dispatch(favStarColor(!isFavourite, !isFavourite ? gold_star : gray));
            dispatch(fetchFavoriteMentors());
            show(isFavourite ? "Removed successfully" : "Added to favorite", "success");
            setIsFavourite(!isFavourite);
          } else {
            console.log("error", res?.response?.data,);
            show("Error" + res?.response?.data?.message, "danger");
          }
        }
      },
    ])


  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row" }} >
          <TouchableOpacity onPress={() => { addToFavourite() }} activeOpacity={1}>
            <AntIcon
              name="star"
              size={25}
              color={isFavourite ? gold_star : gray}
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Chat', {
              data: { receiverUserId: mentor_id },
              user_type: "MENTEE",
            });
          }} activeOpacity={1}>
            <IonIcon
              name="chatbubble-ellipses-outline"
              size={25}
              color={black}
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [color.data, isFavourite]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={'handled'}
      style={styles.followerContainer}>

      {loading ? (<>
        <LoadingComp />
      </>) : (<>
        {mentorDetails?.profile_pic ? (
          <Image
            source={{ uri: `${BASE_URL_IMAGE}${mentorDetails?.profile_pic}` }}
            style={{ width: '100%', height: undefined, aspectRatio: 1 }}
            resizeMode="contain"
          />
        ) : (<Text style={{ color: black, fontWeight: "600", alignSelf: "center", fontSize: 16, marginTop: 60 }} >No Image Found</Text>)}

        <View style={{ paddingHorizontal: 16 }}>
          <Text style={styles.profileName}>{mentorDetails?.name}</Text>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.microText}>Category</Text>
            <Text style={styles.serviceNameText}>{categoryList}</Text>
            <Text style={styles.microText}>Experience</Text>
            <Text style={styles.serviceNameText}>{mentorDetails?.experience}</Text>
            <Text style={styles.microText}>Summary</Text>
            <Text style={styles.serviceNameText}>{mentorDetails?.bio}</Text>
          </View>
          <TouchableOpacity onPress={() => { navigation.navigate('PatientFormSecond', { mentor_id: mentor_id, callNowClicked: true }) }} activeOpacity={0.8} style={[styles.signInButton, { marginBottom: 0 }]} >
            <Text style={styles.signInTextButton}>Call Now</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { navigation.navigate('PatientFormSecond', { mentor_id: mentor_id, callNowClicked: false }) }}
            activeOpacity={0.8} style={[styles.signInButton, { marginBottom: 40, marginTop: 5 }]}
          >
            <Text style={styles.signInTextButton}>Schedule Appointment</Text>
          </TouchableOpacity>
        </View>
      </>)}
    </ScrollView>
  );
}
export default VetProfile;

