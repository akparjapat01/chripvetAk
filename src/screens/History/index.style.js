import { StyleSheet } from "react-native";
import { black, black_1, color_3, porcelain } from "../../constants/colors";

const styles = StyleSheet.create({
  mainContainer:{
    width: "100%",
    height: "100%",
    backgroundColor: porcelain,
  },
  beautyFirstContainer: {
    width: '97%',
    height: 'auto',
    marginTop: 8,
    marginBottom: 5,
    backgroundColor: porcelain,
    alignItems:"center"
  },
  beautyFirstContainerBox: {
    width: '97%',
    marginTop: 10,
    marginBottom: 10,
  },
  beautyImgProfile: {
    width: '100%',
    height: 200,
    alignItems: 'center',
  },
  beautyName: {
    fontSize: 18,
    lineHeight: 18,
    color: black_1,
    fontWeight:"600",
    marginTop:10
  },
  beautySixteen: {
    color: color_3,
    fontSize: 14,
    lineHeight: 15,
    marginTop: 3,
  },
  noHistoryText: {
    color: black,
    fontSize: 18,
    fontWeight: "500",
    alignSelf: "center",
    marginTop:50
  }
});


export default styles;