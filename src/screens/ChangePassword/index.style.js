import { StyleSheet } from "react-native";
import { black_1, color_1, color_2, green, havlockBlue, whiteHex } from "../../constants/colors";

const styles = StyleSheet.create({
    contains: {
      marginTop: 20,
    },
    signInLabel: {
      color: color_1,
      fontSize: 12,
      marginTop: 16,
    },
    wrapperInput: {
      position: 'relative',
    },
    wrapperIcon: {
      position: 'absolute',
      right: 13,
      top: 25,
    },
    eyeIcon: {
      color: color_2,
    },
    SignInInputContainer: {
      marginTop: 12,
      color: black_1,
      paddingHorizontal: 20,
      paddingVertical: 13,
      width: '100%',
      borderBottomColor: black_1,
      borderBottomWidth: 1,
    },
    personalMainSection: {
      backgroundColor: whiteHex,
      height: '100%',
      paddingHorizontal: 16,
    },
    signUpButton: {
      width: '100%',
      marginTop: 280,
      marginVertical: 30,
      borderRadius: 9,
      backgroundColor: havlockBlue,
    },
    signText: {
      textAlign: 'center',
      color: whiteHex,
      fontSize: 18,
      lineHeight: 24,
      paddingVertical: 11,
    },
    background: {
      flex: 1,
      width: '100%',
    },
    errorText: {
      fontSize: 9,
      color: 'red',
    },
    messageText: {
      fontSize: 9,
      color: green,
    },
    signInLoading: {
      textAlign: 'center',
      paddingVertical: 11,
    },
  });

  
  export default styles;