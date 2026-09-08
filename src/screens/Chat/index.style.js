import { StyleSheet } from "react-native";
import { black, cobalt, color_5, lightGray, porcelain, white, whiteHex } from "../../constants/colors";

const styles = StyleSheet.create({
    inboxContainer: {
      backgroundColor: white,
      paddingHorizontal: 16,
    },
    contractorHeader: {
      flexDirection: "row",
      alignItems: "center",
      height:60
    },
    chatProfileImg: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: lightGray,
      marginHorizontal: 12,
    },
    chatHeading: {
      fontSize: 16,
      lineHeight: 20,
      color: black,
      marginRight: 68,
    },
    firstChat: {
      backgroundColor: porcelain,
      paddingVertical: 15,
      paddingHorizontal: 14,
      marginTop: "4%",
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 14,
      borderTopRightRadius: 14,
      borderBottomRightRadius: 14,
      width: "80%",
    },
    firstChatText: {
      fontSize: 16,
      color: color_5,
      lineHeight: 20,
    },
    secondChatText: {
      fontSize: 16,
      color: whiteHex,
      lineHeight: 20,
    },
    secondChat: {
      paddingVertical: 8,
      paddingHorizontal: 14,
      marginTop: "4%",
      borderTopLeftRadius: 14,
      borderBottomLeftRadius: 14,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 14,
      width: "80%",
      alignSelf: "flex-end",
      backgroundColor:cobalt
    },
    timeText:{ fontSize: 10, textAlign:"right", bottom: -5, lineHeight:12  },
  });

  export default styles;