import { StyleSheet } from "react-native";
import { black, black_1, cobalt, color_3, havlockBlue, lavendarMist, offWhite, porcelain, white, whiteHex } from "../../constants/colors";

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
    marginTop:10,
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
  beautyFirstContainerBox2: {
    width: '100%',
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
  secondContainer: {
    backgroundColor: lavendarMist,
    borderColor: havlockBlue,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginTop: 16,
    marginBottom: 40
  },
  beautySecondContainer: {
    width: '100%',
    height: 'auto',
    marginTop: 14,
    backgroundColor: whiteHex,
    borderRadius: 8,
  },
  noText: {
    fontSize: 18,
    fontWeight: "600",
    alignSelf: "center",
    marginTop: 20,
    color: black,
  },
  searchContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  inputStyle: {
    backgroundColor: offWhite,
    borderWidth: 0,
    alignSelf: 'center',
    borderRadius: 6,
    marginHorizontal: 60,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    width: '100%',
    height: 30
  },
  appLogo: {
    width: 65,
    height: 65,
    borderRadius: 32,
  },
  joinButton: {
    backgroundColor: "green",
    width: 75,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4
  },
  joinText: {
    color: white,
    fontWeight: "600",
    fontSize: 13
  },
  callText: {
    alignSelf: 'center',
    color: whiteHex,
    fontSize: 12,
    lineHeight: 15,
  },
});

export default styles;