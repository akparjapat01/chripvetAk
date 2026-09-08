import React from "react";
import {
  View,
  useWindowDimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import RoundedButton from "../RoundedButton";
import { useNavigation } from "@react-navigation/native";
import { gray_light_3 } from "../../constants/colors";

const Footer = ({
  backgroundColor,
  rightButtonLabel = false,
  rightButtonPress = false,
  pageNo,
}) => {
  const navigation = useNavigation();
  const windowWidth = useWindowDimensions().width;
  const HEIGHT = windowWidth * 0.75;
  const FOOTER_PADDING = windowWidth * 0.1;
  return (
    <View style={{ backgroundColor, paddingHorizontal: FOOTER_PADDING }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            width: pageNo === "1" ? 20 : 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: pageNo === "1" ? '#FED604' : "#F2EFF8",
            marginRight: 6,
          }}
        ></Text>
        <Text
          style={{
            width: pageNo === "2" ? 20 : 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: pageNo === "2" ? '#FED604' : "#F2EFF8",

            marginRight: 6,
          }}
        ></Text>
        <Text
          style={{
            width: pageNo === "3" ? 20 : 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: pageNo === "3" ? '#FED604' : "#F2EFF8",

            marginRight: 6,
          }}
        ></Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {navigation.navigate('LogIn')}}
        >
          <Text
            style={{
              color: gray_light_3,
              fontSize: 17,
              lineHeight: 20,
            }}
          >
            Skip
          </Text>
        </TouchableOpacity>
        <RoundedButton arrow={rightButtonLabel} onPress={rightButtonPress} />
      </View>
    </View>
  );
};

export default Footer;
