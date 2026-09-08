import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Modal, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import styles from "./DateOverrides.style";
import { black, cobalt, color_2, gray, havlockBlue, red, white } from "../../../constants/colors";
import { AntIcon, MaterialCommunityIcon } from "../../../component/Icons";
import { PostAPIRequest } from "../../../API/Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { dateOverrider_Mentor, noOfAvailable_Mentor } from "../../../API/endpoints";
import { BASE_URL_IMAGE } from "../../../constants/Host";
import { DateFormat, DateTimeFormat, DateTimeFormat_Both } from "../../../helper/TimeFormat";
import VirtualizedListComp from "../../../component/VirtualizedComp/VirtualizedComp";
import { getTimeZone } from 'react-native-localize';
import { useNavigation } from "@react-navigation/native";

const Timezone = getTimeZone();

const HourList = ["--", '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];
const MinutesList = ["--", '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'];
const AmPmList = ["AM", "PM"];
const monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let today = moment();
let nextDate = today.clone().add(0, "days").toISOString();
nextDate = nextDate.slice(0, 10);

const listColors = ["#A57BFF", "#E57BFF", "#7BB0FF", "#FF96C8"]

const DateOverrides = () => {

    const navigation = useNavigation();

    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(nextDate);
    const [dataOverridesList, setDateOverridesList] = useState([]);
    const [showCalendar, setShowCalendar] = useState(false);
    const [dateInfo, setDateInfo] = useState([]);
    const [sevenDate, setSevenDate] = useState([]);
    const [update, setUpdate] = useState(true);
    const [numberList, setNumberList] = useState([]);

    // time input variables.
    const [startHH, setStartHH] = useState("");
    const [startMM, setStartMM] = useState("");
    const [endHH, setEndHH] = useState("");
    const [endMM, setEndMM] = useState("");
    const [AMPM_Start, setAMPM_Start] = useState("AM");
    const [AMPM_End, setAMPM_End] = useState("AM");

    const getData = async (DATE) => {
        updateSevenDate(DATE);

        let currStartHH = startHH;
        let currEndHH = endHH;
        if (AMPM_Start == "AM") {
            if (currStartHH == "12") {
                currStartHH = "00";
            };
        };
        if (AMPM_Start == "PM") {
            if (currStartHH != "12") {
                currStartHH = (parseInt(currStartHH) + 12).toString();
            };
        };
        if (AMPM_End == "AM") {
            if (currEndHH == "12") {
                currEndHH = "00";
            };
        };
        if (AMPM_End == "PM") {
            if (currEndHH != "12") {
                currEndHH = (parseInt(currEndHH) + 12).toString();
            };
        }
        const token = await AsyncStorage.getItem("tokens");
        const formData = new FormData();
        if (DATE) {
            formData.append("date", DATE);
        } else {
            formData.append("date", selectedDate);
            DATE = selectedDate;
        }
        // console.log(formData);
        // let res = await PostAPIRequest({ formData: formData, endpoint: dateOverrider_Mentor, token: token });
        let res2 = await PostAPIRequest({ formData: formData, endpoint: noOfAvailable_Mentor, token: token });
        res2 = res2?.data?.data;

        const curr = [];
        for (let i in res2) {
            const temp = {};
            let startTime = DATE + "T" + res2[i]?.startHour?.slice(0, 5) + ":00.000Z";
            startTime = DateTimeFormat(startTime, true);
            let endTime = DATE + "T" + res2[i]?.endHour?.slice(0, 5) + ":00.000Z";
            endTime = DateTimeFormat(endTime, true);
            console.log("currTime", startTime, endTime);
            // startTime = (startTime?.split(" ")?.[1]?.slice(0,5));

            temp["start_time"] = startTime;
            temp["end_time"] = endTime;
            temp["numbers"] = res2[i]?.count;
            temp["date"] = DATE;
            temp["list"] = res2[i];
            curr.push(temp);
            // console.log(res2[i])
        };
        // console.log("curr", curr, DATE);
        setNumberList(curr);
        setStartHH("");
        setStartMM("");
        setEndHH("");
        setEndMM("");

    };

    const updateSevenDate = (DATE) => {
        // getData(DATE);
        const list = [];
        let date = new Date();
        if (DATE) {
            date = new Date(DATE);
        }
        setSelectedDate(DateFormat(date))

        for (let i = 0; i < 7; i++) {
            let curr = new Date(new Date().setDate(date.getDate() + i)).toISOString();
            let temp = DateFormat(curr)
            list.push(curr.slice(0, 10));
            // console.log("date", i, temp);

        };
        setSevenDate(list);
        setUpdate(!update);
        // let nextDate = today.clone().add(0, "days")
        // nextDate = moment
        //     .utc(nextDate)
        //     .tz(Timezone)
        //     .format('YYYY-MM-DD');
        // // nextDate = nextDate.slice(0, 10);
        // console.log("nextDate", Timezone, nextDate)
        console.log("list", list)

    }

    useEffect(() => {
        updateSevenDate();
        getData();
    }, []);

    return (
        <>
            <VirtualizedListComp
                onRefresh={() => { getData(); }}
            >
                <View style={{ backgroundColor: white, paddingHorizontal: 10, paddingVertical: 5 }} >
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
                        <Text style={{ color: black }} >{selectedDate}</Text>

                        <View style={{ flexDirection: "row" }} >
                            <TouchableOpacity onPress={() => { setShowCalendar(true); }} style={{ flexDirection: "row", alignItems: "center", marginRight: 10 }} >
                                <Text style={{ color: black }}>{dateInfo?.length > 0 ? monthsList[dateInfo?.month - 1] : monthsList[selectedDate?.slice(6, 7) - 1]}</Text>
                                <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 4, }} >
                                    <AntIcon name="down" color={black} size={15} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setShowCalendar(true); }} style={{ flexDirection: "row", alignItems: "center", }} >
                                <Text style={{ color: black }}>{dateInfo?.year ? dateInfo.year : moment().year()}</Text>
                                <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 4, }} >
                                    <AntIcon name="down" color={black} size={15} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginVertical: 4 }} >
                        <FlatList
                            data={sevenDate}
                            keyExtractor={(item) => { item?.id }}
                            renderItem={(item, index) => {
                                return (
                                    <TouchableOpacity onPress={() => { getData(item?.item); updateSevenDate(item.item); }}
                                        style={[{ width: 22, height: 22, justifyContent: "center", alignItems: "center" }, selectedDate == item?.item ? { backgroundColor: havlockBlue, borderRadius: 10, } : {}, true ? { marginLeft: 25 } : {}]} >
                                        <Text style={[{ color: black, fontWeight: "500" }, selectedDate == item?.item ? { color: white } : {}]} >{item.item?.slice(8, 10)}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                            horizontal={true}
                            extraData={update}
                        />
                    </View>
                </View>

                {showCalendar && <Calendar
                    onDayPress={day => {
                        console.log(day);
                        setSelectedDate(day?.dateString);
                        setShowPicker(true);
                        getData(day?.dateString);
                        setDateInfo(day);
                        setShowCalendar(false);
                    }}
                    markedDates={{
                        [selectedDate]: { selected: true, disableTouchEvent: true, selectedColor: havlockBlue }
                    }}
                />}

                {numberList?.length == 0 ? (<>
                    <Text style={styles.noDateText} >No Result For {selectedDate}</Text>
                </>) : (<></>)}

                <View style={{ flexDirection: "row", justifyContent: "space-around", width: "90%", marginTop: 15, alignSelf: "center" }}>
                    <Text style={{ color: black, fontSize: 16, fontWeight: "600" }} >Time - Slot</Text>
                    <Text style={{ color: black, fontSize: 16, fontWeight: "600" }} >Mentors Avaialble</Text>
                </View>

                <FlatList
                    data={numberList}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => {
                        return (
                            <>

                                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", alignSelf: "center", marginTop: 15, paddingHorizontal: 40 }} >
                                    <View style={{ flexDirection: "row", alignItems: "center", width: "40%" }} >
                                        <Text style={{ color: cobalt, marginLeft: 8, fontSize: 15, fontWeight: "500" }} >{item?.start_time?.slice(0, 2) + ":00" + item?.start_time?.slice(5, 7)}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => { navigation.navigate("MasterMentorList", { data: item }) }}
                                        style={{ flexDirection: "row", width: "60%", height: 50, backgroundColor: listColors[index % 4], alignItems: "center", borderRadius: 6, borderTopLeftRadius: 0 }} >
                                        <View style={{ width: 6, height: 45, backgroundColor: "white", borderRadius: 10, marginLeft: 10 }} ></View>
                                        <Text style={{ color: white, fontSize: 15, fontWeight: "500", marginLeft: 20 }} >{item.numbers + " Members"}</Text>
                                    </TouchableOpacity>
                                    {/* <TouchableOpacity
                                        // disabled={item?.numbers ? false : true}
                                        onPress={() => { navigation.navigate("MasterMentorList", { data: item }) }}
                                        style={{ width: 30, height: 30, backgroundColor: havlockBlue, justifyContent: "center", alignItems: "center", borderRadius: 30 }} >
                                        <AntIcon name="arrowright" color={white} size={20} />
                                    </TouchableOpacity> */}
                                </View>

                            </>
                        )
                    }}
                />

            </VirtualizedListComp>
        </>
    );
};

export default DateOverrides;