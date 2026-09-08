import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { green, red, white } from "../../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather"
import { notificationSound } from "../../../..";

const VideoCallPrevComp = (props) => {

    const navigation = useNavigation();
    const data = props?.route?.params?.data;
    const receiver_id = props?.route?.params?.receiverId;
    const senderId = props?.route?.params?.senderId;
    const goToHome = props?.route?.params?.goToHome;

    console.log("video call prev component sender id", senderId);
    const handleCancel = () => {
        notificationSound.stop();
        navigation.goBack();
    }

    const handleRecieve = () => {
        notificationSound.stop();
        navigation.navigate("VideoCall", { data: data, receiverId: receiver_id, goToHome: goToHome, senderId: senderId });
    };

    return (
        <>
            <View style={styles.container} >
                <Image source={{
                    uri: "https://wallpaperaccess.com/full/317501.jpg"
                }} alt="Alternate Text" style={styles.image} />
                <View style={styles.buttonMainContainer} >
                    <TouchableOpacity onPress={() => { handleCancel(); }} style={[styles.buttonContainer, { backgroundColor: red }]} >
                        <Icon name="phone-call" color={white} size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { handleRecieve(); }} style={[styles.buttonContainer]} >
                        <Icon name="phone-call" color={white} size={30} />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default VideoCallPrevComp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    image: {
        width: 100,
        height: 100,
        alignSelf: "center",
        borderRadius: 100,
        resizeMode: "contain"
    },
    buttonMainContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        position: "absolute",
        bottom: 100,
        alignSelf: "center",
        width: "80%"
    },
    buttonContainer: {
        width: 60,
        height: 60,
        backgroundColor: green,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
    },
    joinText: {
        color: white,
        fontWeight: "600",
        fontSize: 18,
    }
})