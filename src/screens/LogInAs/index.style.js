import { StyleSheet } from "react-native";
import { black_1, havlockBlue, whiteHex } from "../../constants/colors";

const styles = StyleSheet.create({
    LogInAsContainer: {
      paddingHorizontal: 16,
      backgroundColor: whiteHex,
    },
    continueAsContainer: {
      marginTop: '2%',
    },
    continueAsText: {
      color: black_1,
      fontSize: 17,
      lineHeight: 20,
      fontWeight: "bold",
    },
    applicantBox: {
      backgroundColor: havlockBlue,
      borderRadius: 10,
      paddingVertical: "7%",
      paddingHorizontal: '5%',
      marginTop: "7%",
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    applicantText: {
      color: black_1,
      fontSize: 17,
      lineHeight: 20,
      fontWeight: "bold",
    },
    logInContinueBox: {
      borderRadius: 9,
      marginTop: "100%",
      backgroundColor:havlockBlue
    },
    logInContinueText: {
      color: whiteHex,
      textAlign: "center",
      fontSize: 16,
      lineHeight: 20,
      paddingVertical: 11,
    },
    outer: {
      width: 30,
      height: 30,
      borderRadius: 15,
      borderWidth: 3,
      borderColor: black_1,
      justifyContent: "center",
      alignItems: "center",
    },
    inner: {
      width: 16,
      height: 16,
      borderRadius: 10,
      backgroundColor: black_1,
    },
    background: {
      flex: 1,
      width: '100%',
    },
    loadingStyle: {
      justifyContent: "center",
      width: "100%",
      height: "100%",
      alignItems: "center",
    },
  });

  export default styles;