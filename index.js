import {Alert, AppRegistry, Linking} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import App from './App';
import { useEffect } from 'react';
import notifee, {AndroidImportance, AndroidStyle} from '@notifee/react-native';
import Sound from 'react-native-sound';
import {agoraCallStart} from './src/API/endpoints';
import {PostAPIRequest} from './src/API/Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage from 'react-native-flash-message';

// Initialize the sound
// Sound.setCategory('Playback');
export const notificationSound = new Sound(
  'ringtone.mp3',
  Sound.MAIN_BUNDLE,
  error => {
    if (error) {
      console.log('Failed to load the sound', error);
    }
  },
);

// Play the sound
export const playSound = async () => {
  const token = await AsyncStorage.getItem('tokens');
  if (token) {
    notificationSound.play(success => {
      if (success) {
        console.log('Sound played successfully');
      } else {
        console.log('Sound playback failed');
      }
    });
  }
};

const Stack = createStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="App" component={App} />
    </Stack.Navigator>
  );
}

function HeadlessCheck() {
  const navigation = useNavigation();

  const NotifeeNotification = async remoteMessage => {
    const token = await AsyncStorage.getItem('tokens');
    const channelId = await notifee.createChannel({
      id: 'test',
      name: 'test',
    });
    let paths;
    const title = remoteMessage?.notification?.title;
    const body = remoteMessage?.notification?.body;
    const test = remoteMessage?.notification?.android?.clickAction;
    paths = test?.split(',');

    if (title && token) {
      notifee.displayNotification({
        title: title,
        body: body,
        android: {
          channelId,
          style: {
            type: AndroidStyle.BIGPICTURE,
            picture: 'https://wallpaperaccess.com/full/317501.jpg',
          },
          pressAction: {
            id: 'default',
            mainComponent: 'default',
          },
        },
      });
    }

    if (paths?.[0] == 'ringtone') {
      playSound();
      let user_type = await AsyncStorage.getItem('user_type');
      console.log('PATHS DATA ', paths, !isNaN(paths?.[2]), !isNaN(paths?.[3]));
      if (
        paths?.[1] == 'VideoCall' &&
        !isNaN(paths?.[2]) &&
        !isNaN(paths?.[3])
      ) {
        const receiver_id = paths?.[2];
        const booking_id = paths?.[4];
        const formData = new FormData();
        formData.append('call_type', 'Video');
        formData.append('receiver_user_id', receiver_id);
        formData.append(
          'receiver_type',
          user_type == 'MENTEE' ? 'MENTOR' : 'MENTEE',
        );
        // formData.append("sender_user_id", "MENTOR");
        let res = await PostAPIRequest({
          formData: formData,
          endpoint: `${agoraCallStart}/${booking_id}/publisher/uid/1`,
        });
        if (res?.status == 200 && token) {
          res = res?.data?.data;
          navigation.navigate('VideoCallPrevComp', {
            data: res,
            receiverId: receiver_id,
            goToHome: true,
            senderId: paths?.[3],
          });
        } else {
          console.log(res?.response?.data, formData);
        }
      }
    }
  };

  const Helper = async (paths) => {
    let user_type = await AsyncStorage.getItem('user_type');
    let token = await AsyncStorage.getItem('tokens');
    if (paths?.[0] == 'ringtone') {
      playSound();
      if (
        paths?.[1] == 'VideoCall' &&
        !isNaN(paths?.[2]) &&
        !isNaN(paths?.[3])
      ) {
        const formData = new FormData();
        formData.append('call_type', 'Video');
        formData.append('receiver_user_id', paths?.[2]);
        formData.append(
          'receiver_type',
          user_type == 'MENTEE' ? 'MENTOR' : 'MENTEE',
        );
        // formData.append("sender_user_id", "MENTOR");
        let res = await PostAPIRequest({
          formData: formData,
          endpoint: `${agoraCallStart}/${paths?.[4]}/publisher/uid/1`,
        });
        if (res?.status == 200 && token) {
          res = res?.data?.data;
          console.log(res);
          navigation.navigate('VideoCallPrevComp', {
            data: res,
            receiverId: paths?.[2],
            goToHome: true,
            senderId: paths?.[3],
          });
          // setCallDetails(res);
        } else {
          console.log(res?.response?.data, formData);
        }
      }
    } else if (paths?.[0] == 'Chat') {
      navigation.navigate('Chat', {
        data: { receiverUserId: paths?.[2] },
        user_type: user_type,
      });
    }
  }

  messaging().onMessage(async remoteMessage => {
    title = remoteMessage?.notification?.title;
    body = remoteMessage?.notification?.body;
    const test = remoteMessage?.notification?.android?.clickAction;
    paths = test?.split(',');
    console.log('Frontend notification message --------------> ', remoteMessage);
    // NotifeeNotification(remoteMessage);
    Helper(paths);
  });

  useEffect(() => {
    let paths;

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      NotifeeNotification(remoteMessage);
      const test = remoteMessage?.notification?.android?.clickAction;
      paths = test?.split(',');
      console.log('Background notification message --------------> ', remoteMessage);
      // Helper(paths);
    });

    notifee.onBackgroundEvent(async ({type, detail, headless}) => {
      let user_type = await AsyncStorage.getItem('user_type');
      let token = await AsyncStorage.getItem('tokens');
      if (paths?.[0] == 'ringtone') {
        playSound();
        if (
          paths?.[1] == 'VideoCall' &&
          !isNaN(paths?.[2]) &&
          !isNaN(paths?.[3])
        ) {
          const formData = new FormData();
          formData.append('call_type', 'Video');
          formData.append('receiver_user_id', paths?.[2]);
          formData.append(
            'receiver_type',
            user_type == 'MENTEE' ? 'MENTOR' : 'MENTEE',
          );
          // formData.append("sender_user_id", "MENTOR");
          let res = await PostAPIRequest({
            formData: formData,
            endpoint: `${agoraCallStart}/${paths?.[4]}/publisher/uid/1`,
          });
          if (res?.status == 200 && token) {
            res = res?.data?.data;
            console.log(res);
            navigation.navigate('VideoCallPrevComp', {
              data: res,
              receiverId: paths?.[2],
              goToHome: true,
              senderId: paths?.[3],
            });
            // setCallDetails(res);
          } else {
            console.log(res?.response?.data, formData);
          }
        }
      } else if (paths?.[0] == 'Chat') {
        navigation.navigate('Chat', {
          data: {receiverUserId: paths?.[2]},
          user_type: user_type,
        });
      }
    });

    const handleNotificationClick = async remoteMessage => {
      console.log('CLICKED function');
      // playSound();
    };

    messaging().onNotificationOpenedApp(handleNotificationClick);

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log('CLICKED 1');
        // Linking.openURL("https://google.com");
      });

    return () => {
      messaging().onNotificationOpenedApp.unsubscribe(handleNotificationClick);
    };
  }, []);

  return <AppStack />;
}

AppRegistry.registerComponent('chirpvet', () => () => (
  <NavigationContainer>
    <FlashMessage position="top" />
    <HeadlessCheck />
  </NavigationContainer>
));
