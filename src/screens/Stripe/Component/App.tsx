import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import ACHSetupScreen from './ACHSetupScreen';
import { StatusBar } from 'react-native';
import { colors } from './colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  HomeScreen: undefined;
  PaymentResultScreen: { url: string };
  SofortPaymentScreen: undefined;
  DetailsScreen: undefined;
  ACHSetupScreen: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

function Test() {
  return (
    <>
      {/* <StatusBar
        backgroundColor={colors.blurple_dark}
        barStyle="light-content"
        translucent
      />
        <Stack.Navigator
          screenOptions={{
            headerTintColor: colors.white,
            headerStyle: {
              backgroundColor: colors.blurple,
            },
            headerTitleStyle: {
              color: colors.white,
            },
          }}
        >
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ACHSetupScreen" component={ACHSetupScreen} />
        </Stack.Navigator> */}
        <HomeScreen/>
    </>
  );
}

export default Test;
