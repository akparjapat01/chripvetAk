import { StyleSheet } from "react-native";
import { black, black_1, color_3, havlockBlue, offWhite, osloGrey, porcelain, transparent, whiteHex } from "../../constants/colors";


const styles = StyleSheet.create({
  transactionsContainer: {
    backgroundColor: whiteHex,
    paddingTop: 15,
    paddingHorizontal: 12,
  },
  beautyFirstContainer: {
    width: '100%',
    height: 'auto',
    marginTop: 12,
    backgroundColor: porcelain,
    borderRadius: 8,
  },
  beautyFirstContainerBox: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
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
  },
  beautySixteen: {
    color: color_3,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 3,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
  },
  modalView: {
    width: '100%',
    backgroundColor: havlockBlue,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 35,
    paddingHorizontal: 35,
    bottom: 0,
    position: 'absolute',
    shadowColor: whiteHex,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
    color: whiteHex,
  },
  modalTextCenter: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 15,
    textAlign: 'center',
    color: whiteHex,
  },
  availabilityText: {
    color: whiteHex,
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 10,
  },
  searchInputStyle: {
    backgroundColor: porcelain,
    paddingHorizontal: 10,
    borderWidth: 0,
    borderRadius: 6,
  },
  searchContainer: {
    backgroundColor: transparent,
    marginTop: 10,
    shadowColor: transparent,
    padding: 0,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderRadius: 6,
  },
  filterButton: {
    justifyContent: 'center',
    marginHorizontal: 10,
    backgroundColor: havlockBlue,
    borderRadius: 3,
  },
  filterText: {
    color: whiteHex,
    fontSize: 10,
    alignSelf: 'center',
    marginRight: 5,
  },
  filterTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5
  },
  noDataText: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "600",
    color: black,
    marginTop: 20
  },
  searchIconTag: {
    size: 22,
    color: osloGrey
  },
  inputStyle:{
    backgroundColor: offWhite,
    borderWidth: 0,
    alignSelf: 'center',
    borderRadius: 6,
    paddingHorizontal: 10,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    width: '100%',
    height: 40,
    color: black
  },
});

export default styles;