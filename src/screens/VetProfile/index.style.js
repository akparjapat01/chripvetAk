import { StyleSheet } from "react-native";
import { dune, gray_light_2, havlockBlue, whiteHex } from "../../constants/colors";

const styles = StyleSheet.create({
    followerContainer: {
      backgroundColor: whiteHex,
      height: '100%',
    },
    serviceNameText: {
      color: gray_light_2,
      fontSize: 12,
      lineHeight: 18,
    },
    microText: {
      color: dune,
      fontSize: 14,
      lineHeight: 20,
      fontWeight: 'bold',
      marginTop: 16,
      marginBottom: 10,
    },
    profileName: {
      color: dune,
      fontSize: 18,
      lineHeight: 22,
    },
    signInButton: {
      width: '100%',
      marginTop: 30,
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
    },
  });

  export default styles;