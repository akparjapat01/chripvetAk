import { StyleSheet } from "react-native";
import { black_1, color_1, gray_light_2, whiteHex } from "../../constants/colors";

const styles = StyleSheet.create({
  signInPage: {
    backgroundColor: whiteHex,
    paddingHorizontal: 16,
  },
  background: {
    flex: 1,
    width: '100%',
  },
  caseId: {
    fontSize: 18,
    lineHeight: 22,
    color: black_1,
    marginTop: 10,
  },
  petDetails: {
    flexDirection: 'row',
    marginTop: 25,
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal:25
  },
  petName: {
    color: black_1,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  details: {
    color: gray_light_2,
    fontSize: 12,
    lineHeight: 14,
  },
  callDetails: {
    marginLeft: 0,
  },
  ageDetails: {
    marginLeft: 69,
  },
  summaryHeading: {
    color: black_1,
    fontSize: 14,
    lineHeight: 17,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  summaryText: {
    color: gray_light_2,
    lineHeight: 16,
    fontSize: 12,
  },
  beautyFirstContainer: {
    width: '100%',
    height: 'auto',
    marginTop: 12,
  },
  labelName: {
    color: color_1,
    fontSize: 11,
    marginTop: 16,
  },
  imageContainer:{
    marginTop:20
  },
  image:{ width: 100, height: 100, marginHorizontal: 10 },
  titleContainer:{width:"50%"},
});


export default styles;