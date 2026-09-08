import { StyleSheet } from "react-native";
import { black_1, color_1, color_2, havlockBlue, whiteHex } from "../../constants/colors";

const styles = StyleSheet.create({
    signInPage: {
      backgroundColor: whiteHex,
      paddingHorizontal: 16,
    },
    signInPara: {
      color: color_2,
      fontSize: 12,
      lineHeight: 16,
      marginTop: 15,
      width: '80%',
    },
    signInLabel: {
      color: color_1,
      fontSize: 11,
      marginTop: 25,
    },
    SignInInputContainer: {
      marginTop: 10,
      color: black_1,
      paddingHorizontal: 20,
      paddingVertical: 13,
      width: '100%',
      fontSize: 14,
      lineHeight: 18,
      borderBottomColor: black_1,
      borderBottomWidth: 1,
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
    signInButton: {
      width: '100%',
      marginTop: 380,
      borderRadius: 9,
      marginBottom: 20,
      backgroundColor: havlockBlue,
    },
    signInTextButton: {
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
  });

  export default styles;