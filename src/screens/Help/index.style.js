import { StyleSheet } from "react-native";
import { color_5, gray_light_2, gray_light_3, gray_light_4, porcelain, whiteHex } from "../../constants/colors";

const styles = StyleSheet.create({
    scroll: {
      backgroundColor: whiteHex,
    },
    support: {
      paddingTop: 12,
      paddingLeft: 16,
      paddingBottom: 16,
      paddingRight: 20,
    },
    query: {
      fontSize: 12,
      color: gray_light_2,
    },
    subscriptionMain: {
      backgroundColor: porcelain,
      borderRadius: 8,
      width: '100%',
      marginVertical: 10,
      height: 'auto',
      paddingHorizontal: 15,
      paddingVertical: 15,
    },
    subscriptionContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
    },
    subscriptionHeading: {
      fontSize: 14,
      color: color_5,
      fontStyle: 'normal',
      fontWeight: '500',
    },
    arrowUp: {
      color: gray_light_2,
      fontSize: 19,
    },
    subscriptionPara: {
      width: '95%',
      fontSize: 12,
      lineHeight: 16,
      color: gray_light_2,
    },
    horizontalLines: {
      borderBottomColor: gray_light_3,
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginTop: 40,
    },
    mailBox: {
      flexDirection: 'row',
      marginTop: 34,
      alignItems: 'center',
    },
    chatBox: {
      color: gray_light_4,
    },
    chatHead: {
      color: gray_light_2,
      fontSize: 15,
      marginLeft: 17,
    },
    texts: {
      fontSize: 18,
      color: color_5,
      marginLeft: 49,
    },
    mailId: {
      fontSize: 18,
      color: color_5,
      marginLeft: 49,
    },
    background: {
      flex: 1,
      width: '100%',
    },
    loadingStyle: {
      backgroundColor: whiteHex,
      justifyContent: "center",
      width: "100%",
      height: "100%",
      alignItems: "center",
    },
  });

  export default styles;