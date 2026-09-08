import { StyleSheet } from "react-native";
import { black, black_1, color_3, gray_light, green, gunPowder, white, whiteHex } from "../../../constants/colors";

const styles = StyleSheet.create({
  modalContainer: {
    marginTop: 300,
    backgroundColor: gray_light,
    paddingVertical: 20,
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 0.5
  },
  timeText: {
    borderWidth: 0.4,
    height: 40,
    width: 55,
    justifyContent: "center",
    color: black,
    borderRadius: 10,
    paddingHorizontal: 15
  },
  container_1: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  container2: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "40%",
  },
  text3: {
    fontWeight: "600",
    fontSize: 16,
    color: black
  },
  closeButton: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  doneButton: {
    alignSelf: "center",
    justifyContent: "center",
    width: 80,
    height: 35,
    borderRadius: 10,
    backgroundColor: green,
    alignItems: "center",
    marginTop: 25
  },
  doneText: {
    color: white,
    fontSize: 15,
    fontWeight: "600",
  },
  beautyFirstContainer: {
    width: "100%",
    height: "auto",
    // marginTop: 5,
    // marginBottom: 10,
    // backgroundColor: whiteHex,
    borderRadius: 8
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
    color: black_1,
    fontWeight:"600"
  },
  beautySixteen: {
    color: color_3,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 3,
  },
  arrowUp: {
    color: gunPowder
  },
  image: {
    width: 50,
    height: 50,
    borderRadius:100
  },
  noDateText: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "600",
    color: black
  },
});

export default styles;
