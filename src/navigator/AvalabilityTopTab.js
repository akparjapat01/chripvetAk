import * as React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DateOverrides from "../screens/Avalability/DateOverrides/DateOverrider";
import Weekly from "../screens/Avalability/Weekly/weekly";
import { color_5, havlockBlue, whiteHex } from "../constants/colors";

const Tab = createMaterialTopTabNavigator();
export default function AvabilityTopTab(props) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBarStyle,
        tabBarIndicatorStyle: styles.topMainContainer,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Weekly"
        component={Weekly}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text
              style={[styles.text,{color: focused ? whiteHex : color_5, fontWeight: focused ? "bold" : "normal",}]}
            >
              My Availability
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="DateOverrides"
        component={DateOverrides}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text
            style={[styles.text,{color: focused ? whiteHex : color_5, fontWeight: focused ? "bold" : "normal",}]}
            >
             Master Schedule
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}


const styles = StyleSheet.create({
  topMainContainer:{
    backgroundColor: havlockBlue,
    height: "100%",
    borderRadius: 30,
    width: "50%",
  },
  tabBarStyle:{
    backgroundColor: whiteHex,
    borderRadius: 28,
    marginVertical:20
  },
  text:{
    marginHorizontal: -50,
    alignSelf: "center",
    fontSize: 13,
    marginTop:2
  }
})