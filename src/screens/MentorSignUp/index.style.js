import { StyleSheet } from "react-native";
import { black_1, color_1, color_2, havlockBlue, whiteHex } from "../../constants/colors";

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
      borderBottomWidth: 1,
    },
    signInButton: {
      width: '100%',
      marginTop: 420,
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
    signInLoading: {
      textAlign: "center",
      paddingVertical: 11,
    },
  });

  export default styles;