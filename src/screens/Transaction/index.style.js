import { StyleSheet } from "react-native";
import { color_12, color_2, color_3, dune, havlockBlue, porcelain, whiteHex } from "../../constants/colors";

const styles = StyleSheet.create({
    transactionsContainer: {
      backgroundColor: whiteHex,
      paddingTop: 15,
      paddingHorizontal: 12,
    },
    earningText: {
      color: color_2,
      fontSize: 14,
      lineHeight: 18,
    },
    dollarText: {
      fontSize: 20,
      lineHeight: 34,
      color: dune,
      fontWeight: "bold",
      marginTop: 8,
    },
    weekSection: {
      flexDirection: "row",
      backgroundColor: whiteHex,
      borderRadius: 4,
      width: "35%",
    },
    noClickStyle: {
      borderRadius: 4,
      width: "35%",
      height: "100%",
      backgroundColor: whiteHex
    },
    clickStyle: {
      width: "35%",
      backgroundColor: havlockBlue,
      height: "100%",
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
    },
    wStyle: {
      color: whiteHex,
      textAlign: "center",
      marginTop: 11,
      fontSize: 14,
      fontWeight: "bold",
    },
    noWStyle: {
      color: color_2,
      textAlign: "center",
      marginTop: 11,
      fontSize: 14,
    },
    historyText: {
      fontSize: 18,
      lineHeight: 22,
      color: dune,
      marginTop: 26,
      fontWeight: "bold",
    },
    beautyFirstContainer: {
      width: "100%",
      height: "auto",
      marginTop: 14,
      marginBottom: 25,
      backgroundColor: porcelain
    },
    beautyFirstContainerBox: {
      width: "100%",
      flexDirection: "row",
      marginTop: 10,
      marginBottom: 10,
      alignItems: "center",
    },
    beautyImgProfile: {
      width: "25%",
      alignItems: "center",
    },
    beautyName: {
      fontSize: 16,
      lineHeight: 19,
      color: dune,
    },
    beautySixteen: {
      color: color_3,
      fontSize: 13,
      lineHeight: 18,
      marginTop: 3,
    },
    lessThenIconContainer:{
      flexDirection: "row",
      backgroundColor: whiteHex,
      paddingHorizontal: 15,
      justifyContent: "space-between",
      alignContent: "center",
      marginTop: 12,
      borderRadius: 4,
      paddingVertical: 12,
    },
    lessThanIcon:{ color: dune, backgroundColor: porcelain, borderRadius: 4, alignSelf:'center', padding: 5 },
    greaterThanIcon: { color: dune, backgroundColor: porcelain, borderRadius: 4, alignSelf:'center', padding: 5 },
    text_1:{
      fontSize: 15,
      lineHeight: 25,
      color: color_12,
      fontWeight: "bold",
    },
    image:{ width: 57, height: 57 },
  });

  export default styles;