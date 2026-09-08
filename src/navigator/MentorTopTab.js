/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Text} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PendingForm from '../screens/PendingForm';
import PatientId from '../screens/PatientId';
import {color_5, havlockBlue, whiteHex} from '../constants/colors';
const Tab = createMaterialTopTabNavigator();
export default function MentorTopTab(props) {
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
          height: '100%',
          borderRadius: 30,
          width: '50%',
        },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="PatientId"
        component={PatientId}
        options={{
          tabBarIcon: ({focused}) => (
            <Text
              style={{
                color: focused ? whiteHex : color_5,
                marginHorizontal: -30,
                alignSelf: 'center',
                fontSize: 14,
                fontWeight: focused ? 'bold' : 'normal',
              }}>
              Patient ID
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="PendingForms"
        component={PendingForm}
        options={{
          tabBarIcon: ({focused}) => (
            <Text
              style={{
                color: focused ? whiteHex : color_5,
                marginHorizontal: -51,
                alignSelf: 'center',
                fontSize: 14,
                fontWeight: focused ? 'bold' : 'normal',
              }}>
              Pending Forms
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
