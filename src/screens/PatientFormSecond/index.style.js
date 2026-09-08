import { StyleSheet } from "react-native";
import { black, whiteHex, white, black_1, havlockBlue, cobalt, color_1 } from "../../constants/colors";

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
      paddingVertical: 10,
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
      width: "80%", 
      alignSelf: "center",
      borderWidth: 1.5,
      borderRadius: 5,
      height: 40,
      alignItems: "center",
      marginTop: 11,
      borderColor: cobalt,
    },
    title: {
      color: white,
      fontSize: 16,
      alignSelf:"center",
      marginVertical:10,
      color: black,
      fontWeight:"600"
    },
    text: {
      color: cobalt,
      fontSize: 15,
      fontWeight: "500",
      alignSelf:"center"
    },
    rowContainer:{
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: 100,
    },
  });

  
  export default styles;