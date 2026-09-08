import { StyleSheet } from "react-native";
import { black, black_1, color_3, porcelain, transparent, white } from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: porcelain,
  },
  beautyFirstContainer: {
    width: "100%",
    height: "auto",
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: white,
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
    width: "28%",
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
  },
  gizmoText: {
    color: black_1,
    fontSize: 12,
    lineHeight: 16
  },
  idText: {
    color: color_3,
    fontSize: 12,
    lineHeight: 16
  },
  noDataText: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "600",
    color: black,
    marginTop: 20,
  },
  searchContainer:{
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around',
    width: '100%',
    alignSelf:"center",
    flexDirection:"row"
  },
  searchContainerStyle:{
    backgroundColor: white,
    marginTop: 10,
    shadowColor: white,
    padding: 0,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderRadius: 6
  },
  inputSearch:{
    backgroundColor: white,
    paddingHorizontal: 10,
    borderWidth: 0,
    borderRadius: 6,
    width:"100%"
  },
});


export default styles;