import * as React from "react";
import { Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CasesTab from "../screens/CasesTab";
import PendingForm from "../screens/PendingForm";
import { color_5, havlockBlue, offWhite, osloGrey, whiteHex } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();

export default function TopTab(props) {

  const navigation = useNavigation();

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
        name="CasesTab"
        component={CasesTab}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text
              style={{
                color: focused ? whiteHex : color_5,
                marginHorizontal: -20,
                alignSelf: "center",
                fontSize: 14,
                fontWeight: focused ? "bold" : "normal",
              }}
            >
              Cases
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="PendingForms"
        component={PendingForm}
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
              Pending Forms
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
