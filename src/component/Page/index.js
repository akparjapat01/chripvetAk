import React from "react";
import { View, Text, Image } from "react-native";
import { black_1, gray_light_2 } from "../../constants/colors";
const Page = ({ backgroundColor, title, subtitle, pics }) => {
  return (
    <View
      style={{
        // flex: 1,
        backgroundColor,
        paddingHorizontal: 20,
        paddingTop: 100,
      }}
    >
     <Image
        source={pics}
        style={{
          height: "70%",
          width: "100%",
          alignSelf: "center",
          borderRadius: 10,
        }}
      />
      <View style={{ marginTop: 30 }}>
        <Text
          style={{
            fontSize: 18,
            color: black_1,
            lineHeight: 22,
            alignSelf: "center",
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: 15,
            lineHeight: 18,
            color: gray_light_2,
            marginTop: 10,
            textAlign: "center",
          }}
        >
          {subtitle}
        </Text>
      </View>
    </View>
  );
};

export default Page;
