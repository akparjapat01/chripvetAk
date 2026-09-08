import { StyleSheet } from "react-native";
import { black, black_1, blue, color_1, color_2, color_5, color_9, gray_light_2, havlockBlue, whiteHex } from "../../constants/colors";

const styles = StyleSheet.create({
    profileContainer: {
      backgroundColor: whiteHex,
      paddingHorizontal: 16,
    },
    uploadMain: {
      marginTop: 10,
    },
    uploadText: {
      fontSize: 11,
      lineHeight: 16,
      color: color_1,
      marginTop: 10,
    },
    uploadBox: {
      marginTop:15,
      flexDirection:"row",
      alignItems:"center"
    },
    uploadArrow: {
      // width: '20%',
    },
    appLogo: {
      width: 85,
      height: 85,
      borderRadius: 52,
    },
    profileRightSection: {
      width: '80%',
    },
    uploadRemoveSection: {
      alignItems: 'center',
      // width: '100%',
    },
    removeSection: {
      textAlign: 'center',
      paddingVertical: 5,
      color: gray_light_2,
      fontSize: 16,
    },
    removeFile: {
      borderColor: color_9,
      borderRadius: 4,
      borderWidth: 1,
      width: '30%',
    },
    uploadSection: {
      textAlign: 'center',
      paddingVertical: 5,
      color: black_1,
      fontSize: 14,
    },
    uploadFile: {
      borderColor: color_5,
      borderRadius: 2,
      borderWidth: 1,
      width: '50%',
    },
  
    uploadAndRemove: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    uploadImg: {
      marginTop: 10,
      width: '100%',
      paddingHorizontal: 10,
    },
    uploadImgText: {
      color: color_2,
      fontSize: 9,
      lineHeight: 13,
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
    inputEmailContainer: {
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
      marginVertical: 40,
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
      borderBottomWidth: 2
    },
    SignInCountryContainer: {
      marginTop: 15,
      color: black_1,
      fontSize: 14,
      borderRightWidth: 1,
      borderRightColor: black,
    },
    SignInInputContainer: {
      marginTop: 12,
      color: black_1,
      paddingHorizontal: 20,
      paddingVertical: 13,
      fontSize: 14,
    },
    text:{
      color: black,
      fontSize:16,
      fontWeight:"500"
    }
  });

  export default styles;