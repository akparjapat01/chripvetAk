import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./index.style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PostAPIRequest } from "../../API/Axios";
import { getAllScheduledAppointment_Mentee, scheduled_Mentor } from "../../API/endpoints";
import moment from "moment";
import { BASE_URL_IMAGE } from "../../constants/Host";
import LoadingComp from "../../component/LoadingComp/LoadingComp";
import { FontAwesome5 } from "../../component/Icons";
import { DateTimeFormat } from "../../helper/TimeFormat";
import VirtualizedListComp from "../../component/VirtualizedComp/VirtualizedComp";
import { white } from "../../constants/colors";


let today = moment();
let nextDate = today.clone().add(0, "days").toISOString();
nextDate = nextDate.slice(0, 10);

function History() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [bookingList, setBookingList] = useState([]);

  const getAllAvailableMentors = async (item) => {

    const token = await AsyncStorage.getItem("tokens");
    const user_type = await AsyncStorage.getItem("user_type");
    const endpoint = user_type == "MENTOR" ? scheduled_Mentor : getAllScheduledAppointment_Mentee;

    const formData = new FormData();
    formData.append("date", item ? item : nextDate);
    formData.append("booking_type", "history");
    setLoading(true);
    let res = await PostAPIRequest({ formData: formData, endpoint: endpoint, token: token })
    if (res.status == 200) {
      console.log("YES", res?.data?.data[0]);
      res = res?.data?.data;
      setLoading(false);
      setBookingList(res);
    } else {
      console.log("NO", res?.response);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllAvailableMentors();
  }, []);

  const renderItem = (item, date) => {
    const imageURL = item?.mentor_details?.[0]?.profile_pic ? item?.mentor_details?.[0]?.profile_pic : item?.mentee_details?.[0]?.profile_pic
    return (
      <>
        <View style={styles.beautyFirstContainer}>
          <View style={styles.beautyFirstContainerBox}>

            <View style={[styles.beautyImgProfile]}>
              {imageURL ? (<>
                <Image source={{ uri: `${BASE_URL_IMAGE}${imageURL}` }} style={{ width: "100%", height: "100%", borderTopLeftRadius: 10, borderTopRightRadius: 10 }} resizeMode="contain" />
              </>) : (<>
                <FontAwesome5
                  name="user-circle"
                  size={40}
                /></>)}

            </View>

            <View style={{ backgroundColor: white, height: 80, paddingHorizontal: 10, borderBottomLeftRadius: 10, borderBottomLeftRadius: 10 }}>
              <Text style={styles.beautyName}>{item?.mentee_name}</Text>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 4 }} >
                <Text style={styles.beautySixteen}>{DateTimeFormat(item.start_time) + " To " + DateTimeFormat(item.end_time)}</Text>
                <Text style={styles.beautySixteen}>{item?.booking_date}</Text>
              </View>
            </View>

          </View>
        </View>
      </>
    );
  };


  return (
    <VirtualizedListComp
      onRefresh={() => { getAllAvailableMentors(); }}
    >
      {loading ? (<><LoadingComp /></>) : (<>
        {bookingList?.map((item) => {
          return (
            renderItem(item,)
          )
        })}

        {bookingList.length == 0 ? (<>
          <Text style={styles.noHistoryText} >No History</Text>
        </>) : (<></>)}
      </>)}
    </VirtualizedListComp>
  );
}


export default History;
