import { StyleSheet } from "react-native";
import { black, black_1, color_3, porcelain, whiteHex } from "../../constants/colors";

const styles = StyleSheet.create({
  transactionsContainer: {
    backgroundColor: whiteHex,
    paddingTop: 15,
    paddingHorizontal: 12,
  },
  beautyFirstContainer: {
    width: "100%",
    height: "auto",
    marginTop: 12,
    backgroundColor: porcelain,
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
  },
  beautySixteen: {
    color: color_3,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 3,
  },
  noFavText: {
    color: black,
    fontSize: 18,
    fontWeight: "500",
    alignSelf: "center",
    marginTop: 40,
  }
});


export default styles;