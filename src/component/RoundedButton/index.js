import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AntIcon } from "../Icons";
import { havlockBlue, whiteHex } from "../../constants/colors";
const RoundedButton = ({ arrow, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ borderColor: havlockBlue, borderWidth: 1, borderRadius: 10 }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 50,
          height: 50,
          backgroundColor: havlockBlue,
          borderRadius: 10,
          margin: 5,
        }}
      >
        <AntIcon name={arrow} size={30} color={whiteHex} />
      </View>
    </TouchableOpacity>
  );
};
export default RoundedButton;
