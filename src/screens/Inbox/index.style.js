import { StyleSheet } from "react-native";
import { black_1, color_4, osloGrey, porcelain, transparent, white, woodSmoke } from "../../constants/colors";


const styles = StyleSheet.create({
  inboxContainer: {
    backgroundColor: woodSmoke,
    paddingHorizontal: 15,
    backgroundColor: white,
  },
  inboxMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    width: "100%",
    marginBottom: 10,
  },
  inboxTab: {
    width: "60%",
    justifyContent: "center",
  },
  inboxHeading: {
    color: black_1,
    fontSize: 16,
    fontWeight: "bold",
  },
  inboxName: {
    color: osloGrey,
    fontSize: 12,
    marginTop: 5,
  },
  homeProfileImg: {
    width: 55,
    height: 55,
    borderRadius: 27,
  },
  inboxDaySection: {
    width: "20%",
    justifyContent: "center",
  },
  inboxDay: {
    color: color_4,
    fontSize: 10,
    textAlign: "right",
  },
  background: {
    flex: 1,
    width: '100%',
  },
  appLogo: {
    width: 65,
    height: 65,
    borderRadius: 32,
  },
  searchContainerStyle:{
    backgroundColor: transparent,
    marginTop: 10,
    shadowColor: transparent,
    padding: 0,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderRadius: 6
  },
  inputSearch:{
    backgroundColor: porcelain,
    paddingHorizontal: 10,
    borderWidth: 0,
    borderRadius: 6
  },
  
});

export default styles;