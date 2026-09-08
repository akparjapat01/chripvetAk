import { StyleSheet } from "react-native";
import { black, black_1, cobalt, color_3, green, havlockBlue, lavendarMist, merino, offWhite, porcelain, rubberDuckyYellow, whiteHex } from "../../constants/colors";

const styles = StyleSheet.create({
  transactionsContainer: {
    backgroundColor: porcelain,
    paddingTop: 15,
    paddingHorizontal: 12,
  },
  availableHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainContainer: {
    backgroundColor: whiteHex,
    borderColor: cobalt,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginHorizontal: 8,
    marginTop:10
  },
  availableText: {
    color: black_1,
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
  },
  seeText: {
    color: black_1,
    fontSize: 12,
    lineHeight: 14,
  },
  beautyFirstContainer: {
    width: '100%',
    height: 'auto',
    marginTop: 14,
    backgroundColor: porcelain,
    borderRadius: 8,
  },
  beautyFirstContainerBox: {
    width: '100%',
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
  beautyImgProfile: {
    width: '25%',
    alignItems: 'center',
  },
  beautyName: {
    fontSize: 16,
    lineHeight: 19,
    color: black_1,
    fontWeight: 'bold',
  },
  beautySixteen: {
    color: color_3,
    fontSize: 12,
    lineHeight: 17,
    marginVertical: 3,
  },
  callBox: {
    backgroundColor: havlockBlue,
    width: '60%',
    borderRadius: 2,
    paddingVertical: 6,
    alignItems:"center",
    justifyContent:"center"
  },
  callText: {
    alignSelf: 'center',
    color: whiteHex,
    fontSize: 12,
    lineHeight: 15,
  },
  secondContainer: {
    backgroundColor: lavendarMist,
    borderColor: havlockBlue,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginTop: 16,
    marginHorizontal: 8,
  },
  medicalIcons: {
    backgroundColor: whiteHex,
    borderRadius: 6,
    padding: 16,
    marginVertical: 12,
  },
  generalText: {
    fontSize: 10,
    color: black_1,
    alignSelf: 'center',
  },
  iconInner: {
    alignSelf: 'center',
  },
  thirdContainer: {
    backgroundColor: merino,
    borderColor: rubberDuckyYellow,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginTop: 16,
    marginBottom: 45,
    marginHorizontal: 8,
  },
  categoryImage: {
    width: "100%",
    height: 25,
    resizeMode: "contain"
  },
  greenCircle: {
    position: "absolute",
    backgroundColor: green,
    width: 10,
    height: 10,
    borderRadius: 10,
    right: 0,
    bottom: 0
  },
  noMentorText: {
    alignSelf: "center",
    color: black,
    fontWeight: "600",
    marginTop: 20
  },
  searchContainer:{
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  inputStyle:{
    backgroundColor: offWhite,
    borderWidth: 0,
    alignSelf: 'center',
    borderRadius: 6,
    marginHorizontal: 60,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    width: '100%',
    height: 45,
    paddingHorizontal:10
  },
});

export default styles;