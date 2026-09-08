import { StyleSheet } from "react-native";
import { black, blue, cobalt, gray_light, green, havlockBlue, white } from "../../../constants/colors";

const styles = StyleSheet.create({
    container: {
        width: "95%",
        paddingHorizontal: 10,
        backgroundColor: white,
        alignSelf: "center"
    },
    horizontalContainer: {
        justifyContent: "center",
        marginVertical: 15,
        backgroundColor: cobalt,
        padding: 8,
        borderRadius: 8,
    },
    rightContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    leftContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    timeContainer: {
        // borderWidth: 0.8,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        width: 125,
        height: 40,
        // borderColor: havlockBlue,
        // backgroundColor:white 

    },
    addContainer: {
        marginLeft: 10,
    },
    text1: {
        fontWeight: "700",
        fontSize: 18,
        color: white,
    },
    text2: {
        fontWeight: "400",
        fontSize: 13,
        color: black,
    },
    modalContainer: {
        backgroundColor: havlockBlue,
        paddingVertical: 20,
        width: "100%",
        alignSelf: "center",
        justifyContent: "center",
        borderRadius: 10,
        borderWidth: 0.5,
        paddingHorizontal: 1,
        position:"absolute",
        bottom:0,
    },
    timeText: {
        borderWidth: 0.4,
        height: 40,
        width: 55,
        justifyContent: "center",
        color: black,
        borderRadius: 10,
        paddingHorizontal: 15
    },
    container_1: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: white,
        height: 50,
        alignItems: "center",
        width: "95%",
        alignSelf: "center",
        borderRadius: 100,
        marginTop: 15
    },
    container2: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    text3: {
        fontWeight: "600",
        fontSize: 16,
        color: black
    },
    closeButton: {
        position: "absolute",
        top: 5,
        right: 5,
    },
    doneButton: {
        alignSelf: "center",
        justifyContent: "center",
        width: "80%",
        height: 45,
        borderRadius: 10,
        backgroundColor: white,
        alignItems: "center",
        marginTop: 25
    },
    doneText: {
        color: havlockBlue,
        fontSize: 18,
        fontWeight: "600",
    },
    modalScrollView: {
        height: 80, position: "absolute",
        bottom: -80,
        width: 55, backgroundColor: white,
        marginVertical: 10,
        alignSelf: "center"
    },
    timePicker: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "95%", alignSelf: "center", marginTop: 20
    },
    pickerText: { width: 100, color: black, },
    selectedTimeText: {
        backgroundColor: gray_light,
        fontSize: 16,
        fontWeight: "800"
    },
    am_pm: { height: 20, width: 125, color: black },
    currentTimeBox: {
        justifyContent: "center",
        width: "40%",
        alignContent: "center",
        backgroundColor: white,
        height: 40,
        borderRadius: 100
    },
    text4: {
        fontSize: 20,
        fontWeight: "600",
        color: white
    },
    selectedTimeContainer: {
        marginTop: 20,
        flexDirection:"row",
        justifyContent:"space-around"
    },
    fromToText: {
        color: white,
        fontWeight: "600",
        fontSize: 16
    },
});

export default styles;