import React, { useState } from "react";
import { Text, TouchableOpacity, Image, View } from "react-native";
import styles from "./index.style";
import { FontAwesome5 } from "../../component/Icons";
import { BASE_URL_IMAGE } from "../../constants/Host";
import { black_1, cobalt, white } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { DateTimeFormat } from "../../helper/TimeFormat";
import { agoraCallStart } from "../../API/endpoints";
import { PostAPIRequest } from "../../API/Axios";

const UpcomingBooking = ({ list }) => {

    const navigation = useNavigation();
    const data = list?.[0];

    console.log("data", data)
    const [lastIndex, setLastIndex] = useState(4);
    const currList = list.slice(0, lastIndex);

    // const channelName = data?.channel_name;
    const mentorId = data?.mentor_id;
    const menteeId = data?.mentee_id;
    const startTime = DateTimeFormat(data?.start_time, true);
    const endTime = DateTimeFormat(data?.end_time, true);
    const bookingId = data?.id;


    const getChannel = async () => {

        const formData = new FormData();
        formData.append("call_type", "VideoCall");
        formData.append("receiver_user_id", menteeId);
        formData.append("sender_user_id", mentorId);
        formData.append("receiver_type", "MENTEE");
        console.log(formData)
        // console.log("GET CHANNEL formdata", formData);
        let res = await PostAPIRequest({ formData: formData, endpoint: `${agoraCallStart}/${bookingId}/publisher/uid/1` });
        if (res?.status == 200) {
            res = res?.data?.data;
            console.log(res)
            navigation.navigate("VideoCall", { data: res, receiverId: mentorId });
        } else {
            console.log(res?.response?.data);
        }
    };

    return (
        <>
            <View style={styles.mainContainer}>

                <View style={styles.availableHeading}>
                    <Text style={styles.availableText}>Upcoming Appointment</Text>
                    {currList?.length > 4 &&
                        <TouchableOpacity onPress={() => { lastIndex < list.length ? setLastIndex(list.length + 1) : setLastIndex(4); }} >
                            <Text style={styles.seeText}>{lastIndex > 4 ? "Show less" : "See all"}currList?.length</Text>
                        </TouchableOpacity>
                    }
                </View>

                {list?.map((item, index) => {
                    return (
                        <>
                            <TouchableOpacity key={index}
                                style={styles.beautyFirstContainer}
                                activeOpacity={0.8}
                                onPress={() => { navigation.navigate("PatientDetails", { data: item }) }}
                            >

                                <View style={[styles.beautyFirstContainerBox2]}>
                                    <View
                                        style={[styles.beautyImgProfile, { width: "100%", height: 200, alignItems: "center" }]}
                                        activeOpacity={0.8}>
                                        {item?.mentee_details?.[0]?.profile_pic ? (<>
                                            <Image
                                                source={{ uri: `${BASE_URL_IMAGE}${item?.mentee_details?.[0]?.profile_pic}` }}
                                                style={{ width: "100%", height: "100%" }}
                                            />
                                        </>) : (<>
                                            <FontAwesome5
                                                name="user-circle"
                                                size={45}
                                                style={styles.appLogo}
                                                color={black_1}
                                            />
                                        </>)}
                                    </View>
                                    <View style={{ paddingHorizontal: 10, height: 80 }}>

                                        <View
                                            style={{ flexDirection: 'row' }}
                                            activeOpacity={0.8}>
                                            <Text style={[styles.beautyName, { marginTop: 10, fontSize: 18 }]}>{item?.mentee_name}</Text>
                                        </View>
                                        <Text style={[styles.beautySixteen, { fontSize: 14 }]}>
                                            {DateTimeFormat(item?.start_time) + " To " + DateTimeFormat(item?.end_time) + " ( " + item?.booking_date + " )"}
                                        </Text>

                                        <TouchableOpacity style={{
                                            position: "absolute",
                                            bottom: 12,
                                            right: 10,
                                            borderWidth: 1,
                                            width: 70,
                                            height: 30,
                                            justifyContent: "center",
                                            alignItems:"center",
                                            borderRadius: 8,
                                            borderColor:cobalt
                                        }} 
                                        onPress={() => { navigation.navigate("PatientDetails", { data: item }) }}
                                        >
                                            <Text style={{color:cobalt, fontSize: 14}} >View</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </TouchableOpacity>
                        </>
                    )
                })}

                {currList.length == 0 && <Text style={styles.noText} >No Upcoming Appointments</Text>}

            </View>
        </>
    )
};

export default UpcomingBooking;