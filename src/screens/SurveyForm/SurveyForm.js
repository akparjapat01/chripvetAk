import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Alert, BackHandler } from "react-native";
import { GetAPIRequest, PostAPIRequest } from "../../API/Axios";
import { createResponse_Mentee, getAllQuestions_Mentee } from "../../API/endpoints";
import { black, cobalt, gold_star, gray, havlockBlue, white } from "../../constants/colors";
import { AntIcon, EvilIcons } from "../../component/Icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import LoadingComp from "../../component/LoadingComp/LoadingComp";
import VirtualizedListComp from "../../component/VirtualizedComp/VirtualizedComp";

const SurveyForm = (props) => {

    const navigation = useNavigation();

    const [questions, setQuestions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    let data = props?.route?.params;
    const meeting_id = data?.meeting_id;
    const mentor_id = data?.mentor_id;
    const token = data?.token;

    console.log(data);

    const getAllQuestion = async () => {
        setLoading(true);
        let res = await GetAPIRequest({ formData: null, endpoint: getAllQuestions_Mentee });
        if (res?.status == 200) {
            res = (res?.data?.data);
            let list = [];
            for (let i in res) {
                const temp = {};
                temp["id"] = res[i].id;
                temp["answer"] = -1;
                list.push(temp);
            }
            setSelectedOptions(list);
            setQuestions(res);
            setLoading(false);
        } else {
            console.log(res?.response);
            setLoading(false);
        };
    };

    const handleOptions = (id, answer) => {
        const temp = [...selectedOptions];
        for (let i in temp) {
            if (temp[i].id == id) {
                temp[i].answer = answer;
                break;
            }
        }
        setSelectedOptions(temp);
    };

    const handleSubmit = async () => {
        setLoading(true);
        // const token = await AsyncStorage.getItem("tokens");
        let flag = false;
        for (var i in selectedOptions) {
            if (selectedOptions[i].answer != -1) {
                const formData = new FormData();
                formData.append("meeting_id", meeting_id);
                formData.append("mentor_id", mentor_id);
                formData.append("question_id", selectedOptions[i].id);
                formData.append("answer", selectedOptions[i].answer);
                console.log(formData)
                let res = await PostAPIRequest({ formData: formData, endpoint: createResponse_Mentee, token: token });
                if (res?.status == 200) {
                    console.log(res?.data);
                    flag = true;
                } else {
                    console.log(res?.response?.data);
                }
            }
        };
        setLoading(false);
        // if (flag) {
            navigation.navigate("Home");
        // }

    }

    useEffect(() => {
        getAllQuestion();
    }, []);

    const backAction = () => {
        navigation.navigate("Inbox");
        return true;
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
        return () => backHandler.remove();
    }, [navigation]);

    return (
        <>
            {loading ? (<View style={styles.loadingContainer} >
                <LoadingComp />
                <Text style={{ color: black, fontWeight: "600", fontSize: 16 }} >Loading Survey Form</Text>
            </View>) : (<>
                <View style={styles.container} >
                    <Text style={styles.title} >Survey Form</Text>
                    <VirtualizedListComp style={{ marginTop: 0 }} >
                        <View>
                            <FlatList
                                data={questions}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View style={styles.questionContainer} >
                                            <Text style={styles.questionText} >{(index + 1) + " " + item?.question}</Text>
                                            {item?.answer_type == "Boolean" && <BooleanComp handleOnPress={(value) => { handleOptions(item?.id, value) }} />}
                                            {item?.answer_type == "Star rating" && <StarComp handleOnPress={(value) => { handleOptions(item?.id, value) }} />}
                                            {item?.answer_type == "Select one option" && <SingleChoiceComp list={item?.answer} handleOnPress={(value) => { handleOptions(item?.id, value) }} />}
                                        </View>
                                    )
                                }}
                                horizontal={false}
                            />

                            <TouchableOpacity disabled={loading} onPress={() => { handleSubmit(); }} style={styles.submitButton} >
                                {loading ? (<LoadingComp />) : <Text style={styles.submitText} >Submit</Text>}
                            </TouchableOpacity>
                            <TouchableOpacity disabled={loading} onPress={() => { navigation.navigate("Home"); }} style={[styles.submitButton, { backgroundColor: white }]} >
                                {loading ? (<LoadingComp />) : <Text style={[styles.submitText, { color: cobalt }]} >Skip For Now</Text>}
                            </TouchableOpacity>
                        </View>
                    </VirtualizedListComp>

                </View>
            </>)}
        </>
    );
};

const BooleanComp = ({ handleOnPress }) => {

    const [selected, setSelected] = useState(0);

    return (
        <>
            <View style={styles.yesNoContainer} >
                <View style={styles.buttonContainer} >
                    <TouchableOpacity onPress={() => { setSelected(1); handleOnPress("Yes") }} style={[styles.button, selected == 1 ? { backgroundColor: cobalt } : {}]} >
                    </TouchableOpacity>
                    <Text style={styles.text} >Yes</Text>
                </View>
                <View style={[styles.buttonContainer]} >
                    <TouchableOpacity onPress={() => { setSelected(2); handleOnPress("No") }} style={[styles.button, selected == 2 ? { backgroundColor: cobalt } : {}]} ></TouchableOpacity>
                    <Text style={styles.text} >No</Text>
                </View>
            </View>
        </>
    )
};

const SingleChoiceComp = ({ list, handleOnPress }) => {

    const [selected, setSelected] = useState(0);
    let options = list.split(",");

    return (
        <>
            <View style={styles.singleChoiceContainer} >
                {options.map((item, index) => {
                    return (
                        <View style={styles.singleChoicebuttonContainer} >
                            <TouchableOpacity onPress={() => { setSelected(index + 1); handleOnPress(item) }} style={[styles.button, selected == index + 1 ? { backgroundColor: cobalt } : {}]} >
                            </TouchableOpacity>
                            <Text style={styles.text} >{item}</Text>
                        </View>
                    )
                })}
            </View>
        </>
    )
};

const StarComp = ({ handleOnPress }) => {

    const [selectedStar, setSelectedStar] = useState(0);

    return (
        <>
            <View style={styles.starContainer} >
                {[1, 2, 3, 4, 5].map((item, index) => {
                    return (
                        <>
                            <TouchableOpacity onPress={() => { setSelectedStar(index + 1); handleOnPress(index + 1); }} style={styles.starButton} >
                                <AntIcon name="star" size={30} color={index < selectedStar ? gold_star : gray} />
                            </TouchableOpacity>
                        </>
                    )
                })}
            </View>
        </>
    )
};

export default SurveyForm;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        flex: 1,
        backgroundColor: white
    },
    questionText: {
        color: black,
        fontSize: 16,
    },
    text: {
        color: black,
        fontSize: 15,
        marginLeft: 2
    },
    yesNoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "40%",
        marginTop: 20
    },
    singleChoiceContainer: {
        flexDirection: "row",
        marginTop: 20,
        flexWrap: "wrap"
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    singleChoicebuttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginLeft: 20,
        marginTop: 15
    },
    button: {
        width: 25,
        height: 25,
        borderRadius: 8,
        backgroundColor: white,
        borderWidth: 1
    },
    questionContainer: {
        marginTop: 30
    },
    starContainer: {
        flexDirection: "row",
        marginTop: 20,
    },
    starButton: {

    },
    submitButton: {
        width: "80%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: havlockBlue,
        marginTop: 20,
        borderRadius: 10
    },
    submitText: {
        color: white,
        fontSize: 16,
        fontWeight: "600"
    },
    title: {
        fontSize: 20,
        color: black,
        fontWeight: "600",
        alignSelf: "center",
        marginTop: 20
    },
    loadingContainer: {
        justifyContent: "center",
        alignSelf: "center",
        flex: 1
    },
});