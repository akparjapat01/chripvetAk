import { StyleSheet } from "react-native";
import { black_1, color_1, color_2, gunPowder, porcelain, seaShell, whiteHex } from "../../constants/colors";

const styles = StyleSheet.create({
    settingContainer: {
      backgroundColor: whiteHex,
      height: "100%",
      paddingTop: 12,
      paddingLeft: 16,
      paddingBottom: 16,
      paddingRight: 20,
    },
    generalSetting: {
      fontSize: 12,
      color: color_1,
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    settingButtonContainer: {
      marginTop: 15,
    },
    iconAndHeading: {
      flexDirection: "row",
      alignItems: "center",
      width: "80%",
    },
    iconBorder: {
      paddingVertical: 10,
      width: 48,
      marginRight: 15,
      backgroundColor: porcelain,
      borderRadius: 10,
      alignSelf: 'center',
      alignItems: 'center'
    },
    iconInner: {
      color: black_1,
    },
    settingHeading: {
      color: gunPowder,
      fontSize: 16,
      flex: 1,
      flexWrap: "nowrap",
    },
    settingMain: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
    },
    settingSymbol: {
      color: color_2,
      fontSize: 18,
      fontWeight: "bold",
    },
    secondSection: {
      width: "22%",
      alignItems: "flex-end",
    },
    horizontalLine: {
      borderBottomColor: seaShell,
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginTop: 16,
    },
    background: {
      flex: 1,
      width: '100%',
    },
  });

  
  export default styles;