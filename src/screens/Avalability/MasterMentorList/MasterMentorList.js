import React, { useEffect, useState } from "react";
import { PostAPIRequest } from "../../../API/Axios";
import { availableMentors_Mentor } from "../../../API/endpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import VirtualizedListComp from "../../../component/VirtualizedComp/VirtualizedComp";
import { FlatList, Image, Text, View } from "react-native";
import { black, cobalt, gray } from "../../../constants/colors";
import { BASE_URL_IMAGE } from "../../../constants/Host";

const MasterMentorList = (props) => {

    const data = props?.route?.params?.data;
    const allList = data?.list?.mentorNames;
    console.log(allList);
    const date = data?.date;
    const start_time = date + " " + data?.test?.startHour?.slice(0, 5) + ":00";
    const end_time = date + " " + data?.test?.endHour?.slice(0, 5) + ":00";

    return (
        <>
            <VirtualizedListComp>
                <Text style={{ color: black, fontSize: 16, fontWeight: "600", marginLeft: 20, marginTop: 10 }} >{date}</Text>
                <Text style={{ color: cobalt, fontSize: 15, fontWeight: "400", marginLeft: 20, marginTop: 5 }} >{data?.start_time?.slice(0, 2) + ":00" + data?.start_time?.slice(5, 7) + " - " + data?.end_time?.slice(0, 2) + ":00" + data?.end_time?.slice(5, 7)}</Text>
                <FlatList
                    data={allList}
                    renderItem={({ item, index }) => {
                        return (
                            <>
                                <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20, marginVertical: 10 }} >
                                    <View style={{ width: 50, height: 50, backgroundColor: gray, borderRadius: 40 }} >
                                        <Image
                                            source={{ uri: `${BASE_URL_IMAGE}${item?.[0]?.profile_pic}` }}
                                            style={{ width: 50, height: 50, resizeMode: "contain", borderRadius: 40 }}
                                        />
                                    </View>
                                    <Text style={{ fontWeight: "600", fontSize: 16, color: black, marginLeft: 10 }} >{item?.[0]?.name}</Text>
                                </View>
                            </>
                        )
                    }}
                    showsVerticalScrollIndicator={false}
                />
                {allList?.length == 0 && <Text style={{flexWeight:"600", fontSize:18, color: cobalt, alignSelf:"center", marginTop:50}} >No Mentors Available</Text>}
            </VirtualizedListComp>
        </>
    );
};


export default MasterMentorList;