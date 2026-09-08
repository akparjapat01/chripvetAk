import { StyleSheet } from "react-native";
import { black_1, blue, cobalt, color_1, havlockBlue, whiteHex } from "../../constants/colors";

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
      marginVertical: 20,
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
    number: {
      width: '100%',
      backgroundColor: blue,
      borderRadius: 4,
      marginTop: 12,
      color: black_1,
      paddingHorizontal: 15,
      paddingVertical: 15,
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
  });
  
  export default styles;