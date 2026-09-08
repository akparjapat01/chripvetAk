import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import AppNavigator from './src/navigator/AppNavigator';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { show } from './src/utils/toast';
import FlashMessage from 'react-native-flash-message';


const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  },[])
  
  return (
    <Provider store={store}>
        <FlashMessage position="top" />

    <AppNavigator />
    </Provider>
  )
}
export default App;