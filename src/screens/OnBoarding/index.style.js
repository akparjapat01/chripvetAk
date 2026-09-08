import { StyleSheet } from "react-native";
import { color_10, white, whiteHex } from "../../constants/colors";


const styles = StyleSheet.create({
    main_view: {
      flex: 1,
      backgroundColor: white,
    },
    pager_view: {
      flex: 1,
    },
    titleSubtitle: {
      justifyContent: 'space-around',
      marginTop: 440,
    },
    subtitle: {
      color: color_10,
      fontSize: 20,
      lineHeight: 24,
      marginTop: 10,
      lineHeight: 23,
      paddingHorizontal: 20,
    },
    title: {
      color: whiteHex,
      fontSize: 34,
      fontWeight: 'bold',
      lineHeight: 40,
      paddingHorizontal: 20,
    },
    loadingStyle: {
      justifyContent: "center",
      width: "100%",
      height: "100%",
      alignItems: "center",
    },
  });


  export default styles;