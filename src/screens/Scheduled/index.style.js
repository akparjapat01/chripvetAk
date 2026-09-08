import { StyleSheet } from "react-native";
import { black, black_1, color_3, porcelain, white } from "../../constants/colors";

const styles = StyleSheet.create({
  container:{
    width: '100%',
    height: '100%',
    backgroundColor: porcelain,
  },
  beautyFirstContainer: {
    width: '97%',
    height: 'auto',
    marginTop: 10,
    backgroundColor: porcelain,
    borderRadius:10,
  },
  beautyFirstContainerBox: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
  },
  beautyImgProfile: {
    width: '100%',
    alignItems: 'center',
  },
  beautyName: {
    fontSize: 18,
    lineHeight: 18,
    color: black_1,
    fontWeight:"600"
  },
  beautySixteen: {
    color: color_3,
    fontSize: 14,
    lineHeight: 15,
    marginTop: 10,
  },
  noMentorText: {
    color: black,
    fontSize: 18,
    fontWeight: "500",
    alignSelf: "center",
    marginTop: 40,
  },
  appLogo: {
    width: 65,
    height: 65,
    borderRadius: 32,
  },
  buttons: {
    color: black,
    fontWeight: "500",
    fontSize: 12
  },
  buttonContainer: {
    position: "absolute",
    backgroundColor: white,
    width: 50,
    right: 30,
    top: 10,
    paddingHorizontal: 5,
    paddingVertical: 4
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    display: "flex"
  },
});

export default styles;