import { StyleSheet } from "react-native";
import { black_1, color_1, color_2, color_7, havlockBlue, whiteHex } from "../../constants/colors";

const styles = StyleSheet.create({
    signInPage: {
      backgroundColor: whiteHex,
      paddingHorizontal: 16,
    },
    signInText: {
      color: black_1,
      fontSize: 22,
      lineHeight: 28,
      marginBottom: 10,
      fontWeight: 'bold',
      marginTop: 15,
    },
    sentData: {
      color: color_2,
      fontSize: 13,
      lineHeight: 17,
    },
    mailIdText: {
      color: black_1,
      fontSize: 15,
      lineHeight: 19,
      fontWeight: 'bold',
    },
    signInLabel: {
      color: color_1,
      fontSize: 12,
      marginTop: 30,
    },
    signInButton: {
      width: '100%',
      marginTop: 370,
      borderRadius: 9,
      marginBottom: 20,
      backgroundColor: havlockBlue,
    },
    signInTextButton: {
      textAlign: 'center',
      color: whiteHex,
      fontSize: 18,
      lineHeight: 24,
      paddingVertical: 15,
      fontWeight: 'bold',
    },
    otpText: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 12,
    },
    otpInput: {
      width: 56,
      textAlign: 'center',
      color: black_1,
      paddingVertical: 15,
      borderBottomColor: black_1,
      borderBottomWidth: 1,
      marginHorizontal: 2,
    },
    resendText: {
      marginTop: 12,
      color: color_7,
      fontSize: 12,
      lineHeight: 18,
    },
    background: {
      flex: 1,
      width: '100%',
    },
    errorText: {
      fontSize: 9,
      color: 'red',
    },
    signInLoading: {
      textAlign: 'center',
      paddingVertical: 14,
    },
    secondText: {
      color: black_1,
      fontSize: 14,
      lineHeight: 22,
      fontWeight: 'bold',
      marginTop: 12,
    },
  });

  export default styles;