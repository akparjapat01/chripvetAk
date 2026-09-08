import { StyleSheet } from "react-native";
import { black, whiteHex, white, black_1, gray_light, havlockBlue, cobalt, color_1, green } from "../../../constants/colors";

const styles = StyleSheet.create({
    profileContainer: {
      backgroundColor: whiteHex,
      paddingHorizontal: 16,
    },
    labelName: {
      color: color_1,
      fontSize: 11,
      marginTop: 16,
    },
    inputContainer: {
      marginTop: 12,
      color: black_1,
      paddingHorizontal: 15,
      paddingVertical: 12,
      fontSize: 14,
      borderBottomColor: black_1,
      borderBottomWidth: 1,
    },
    signUpButton: {
      width: '100%',
      marginVertical: 10,
      borderRadius: 9,
      backgroundColor: havlockBlue,
    },
    signText: {
      textAlign: 'center',
      color: white,
      fontSize: 18,
      lineHeight: 24,
      paddingVertical: 11,
    },
    code: {
      height: 22,
      color: black_1,
    },
    signInLabel: {
      color: color_1,
      fontSize: 11,
      marginTop: 16,
    },
    background: {
      flex: 1,
      width: '100%',
    },
    dropGender: {
      fontSize: 14,
      lineHeight: 18,
      color: black_1,
      borderBottomColor: black_1,
      borderBottomWidth: 2,
    },
    skipText: {
      textAlign: 'center',
      color: cobalt,
      fontSize: 14,
      lineHeight: 18,
      fontWeight: 'bold',
    },
    timeHorizontalContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "90%", alignSelf: "center",
      borderWidth: 0.5,
      borderRadius: 10,
      height: 40,
      alignItems: "center",
      marginTop: 11
    },
    title: {
      color: black,
      fontSize: 15,
      fontWeight: "600",
    },
    text: {
      color: black,
      fontSize: 14,
      fontWeight: "500",
    },

    modalContainer: {
      marginTop: 300,
      backgroundColor: gray_light,
      paddingVertical: 20,
      width: "90%",
      alignSelf: "center",
      justifyContent: "center",
      borderRadius: 10,
      borderWidth: 0.5
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
  },
  container2: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "40%",
  },
  text3: {
      fontWeight: "600",
      fontSize: 16,
      color: black
  },
  closeButton: {
      position: "absolute",
      top: 5,
      right:5,
  },
  doneButton: {
      alignSelf: "center",
      justifyContent: "center",
      width: 80,
      height: 35,
      borderRadius: 10,
      backgroundColor: green,
      alignItems: "center",
      marginTop: 25
  },
  doneText: {
      color: white,
      fontSize: 15,
      fontWeight: "600",
  },


  });

  
  export default styles;