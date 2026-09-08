import { StyleSheet } from "react-native";
import { black_1, cobalt, color_1, color_2, color_7, havlockBlue, red, whiteHex } from "../../constants/colors";

const styles = StyleSheet.create({
    signInPage: {
      backgroundColor: whiteHex,
      paddingHorizontal: 16,
    },
    signInText: {
      color: black_1,
      fontSize: 22,
      lineHeight: 25,
      marginBottom: 10,
      fontWeight: 'bold',
      marginTop: 15,
    },
    signInPara: {
      color: color_2,
      fontSize: 12,
      lineHeight: 16,
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
      borderBottomWidth: 1
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
    forgetLink: {
      marginTop: 16,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      width: "35%",
      alignSelf: 'flex-end',
      flex: 1,
    },
    forgetText: {
      color: cobalt,
      fontSize: 12,
      lineHeight: 15,
      textAlign: 'right',
      textDecorationLine: 'underline',
    },
    signInButton: {
      width: '100%',
      marginTop: 250,
      borderRadius: 9,
      marginBottom: 20,
      backgroundColor: havlockBlue
    },
    signInTextButton: {
      textAlign: 'center',
      color: whiteHex,
      fontSize: 18,
      lineHeight: 24,
      paddingVertical: 11,
    },
    signInLoading: {
      textAlign: "center",
      paddingVertical: 11,
    },
    newSignText: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    newText: {
      color: color_7,
      fontSize: 12,
    },
    upText: {
      color: cobalt,
      fontSize: 16,
      marginLeft: 3,
    },
    background: {
      flex: 1,
      width: '100%',
    },
    errorText:{
      fontSize: 9,
      color: red
    }
  });

  export default styles;