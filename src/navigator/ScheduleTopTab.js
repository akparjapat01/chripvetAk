import * as React from "react";
import { Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Scheduled from "../screens/Scheduled";
import History from "../screens/History";
import { color_5, havlockBlue, whiteHex } from "../constants/colors";
const Tab = createMaterialTopTabNavigator();
export default function ScheduleTopTab(props) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: whiteHex,
          borderRadius: 28,
          marginTop: 20,
          marginBottom: 20,
        },
        tabBarIndicatorStyle: {
          backgroundColor: havlockBlue,
          height: "100%",
          borderRadius: 30,
          width: "50%",
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Scheduled"
        component={Scheduled}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text
              style={{
                color: focused ? whiteHex : color_5,
                marginHorizontal: -32,
                alignSelf: "center",
                fontSize: 14,
                fontWeight: focused ? "bold" : "normal",
              }}
            >
              Scheduled
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text
              style={{
                color: focused ? whiteHex : color_5,
                marginHorizontal: -51,
                alignSelf: "center",
                fontSize: 14,
                fontWeight: focused ? "bold" : "normal",
              }}
            >
              History
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
