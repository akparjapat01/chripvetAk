/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  MaterialCommunityIcon,
  FontAwesome5,
  IonIcon,
  FAIcon,
} from '../component/Icons';
import {SearchBar} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile';
import Home from '../screens/Home';
import Cases from '../screens/Cases';
import Schedule from '../screens/Schedule';
import Favourite from '../screens/Favourite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL, BASE_URL_IMAGE} from '../constants/Host';
import {useDispatch, useSelector} from 'react-redux';
import Avalability from '../screens/Avalability';
import MentorHome from '../screens/MentorHome';
import MentorProfile from '../screens/MentorProfile';
import MentorCases from '../screens/MentorCases';
import messaging from '@react-native-firebase/messaging';
import { cobalt, havlockBlue, offWhite, osloGrey, white, whiteHex } from '../constants/colors';
import { PostAPIRequest } from '../API/Axios';
import { logout_Mentee, logout_Mentor } from '../API/endpoints';

const Tab = createBottomTabNavigator();
const CustomTabButton = props => (
  <TouchableOpacity
    activeOpacity={0.8}
    {...props}
    style={
      props.accessibilityState.selected
        ? [props.style, {borderTopColor: '#FED604', borderTopWidth: 4}]
        : props.style
    }
  />
);
const ModalTab = props => {

  const handleLogout = async () => {

    const token = await AsyncStorage.getItem("tokens");
    const user_type = await AsyncStorage.getItem("user_type");
    let endPoint = user_type == "MENTEE" ? logout_Mentee : logout_Mentor;
    console.log(endPoint)
    const formData = new FormData();
    formData.append("refreshToken", token);
    let res = await PostAPIRequest({ formData: formData, endpoint: endPoint });

    console.log("res", res)
    console.log("res", res?.data)
    if (res?.status == 200) {
      await AsyncStorage.removeItem("tokens");
      props.navigation.navigate('LogInAs');
    } else {
      console.log("ERROR while signout", res?.response?.data);
    }

  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(!props.modalVisible);
      }}>
      <TouchableOpacity
        style={styles.centeredView}
        activeOpacity={1}
        onPressOut={() => {
          props.setModalVisible(!props.modalVisible);
        }}>
        <View style={styles.modalView}>
          <Text style={styles.modalTextCenter}>___</Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Help');
            }}>
            <Text style={styles.modalText}>Help</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Transactions');
            }}>
            <Text style={styles.modalText}>Transactions</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Settings');
            }}>
            <Text style={styles.modalText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { handleLogout(); }}
          >
            <Text style={styles.modalText}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const BottomTab = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleTwo, setModalVisibleTwo] = useState(false);
  const [modalVisibleThree, setModalVisibleThree] = useState(false);
  const [modalVisibleFour, setModalVisibleFour] = useState(false);
  const [modalVisibleFive, setModalVisibleFive] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [userTypes, setUserTypes] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const navigation = useNavigation();

  // firebase notification
  const username = 'username';

  const TestMessage = (name, fcmToken) => {
    const saveNotification = async (title, body) => {
      const data = {title: title, body: body};
      console.log(data);
    };
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      title = remoteMessage?.notification?.title;
      body = remoteMessage?.notification?.body;
      Alert.alert(title, body);
      console.log(
        'remoteMessage',
        remoteMessage?.notification?.click_action,
        remoteMessage,
      );

      saveNotification(title, body);
    });
  };

  const fetchUserData = async () => {
    const token = await AsyncStorage.getItem('tokens');
    console.log('Mentee Token: ', token);
    if (token) {
      await axios
        .get(BASE_URL + '/mentee/profile', {
          headers: {
            Accept: '*/*',
            'x-access-token': `${token}`,
          },
        })
        .then(response => {
          console.log('Mentee: ', response.data);
          setUserTypes(response?.data?.data?.user_type);
          setProfilePic(BASE_URL_IMAGE + response.data.data.profile_pic);
        })
        .catch(error => {
          console.log('Mentee Error: ' + error.response.data.message);
          navigation.navigate('LogInAs');
        });
    }
  };

  const fetchMentorData = async () => {
    const token = await AsyncStorage.getItem('tokens');
    console.log('Mentor Token: ', token);
    if (token) {
      await axios
        .get(BASE_URL + '/mentor/profile', {
          headers: {
            Accept: '*/*',
            'x-access-token': `${token}`,
          },
        })
        .then(response => {
          console.log('mentor');
          setUserTypes(response?.data?.data?.user_type);
          setProfilePic(BASE_URL_IMAGE + response.data.data.profile_pic);
        })
        .catch(error => {
          console.log('Mentor Error: ' + error.response.data.message);
          fetchUserData();
        });
    }
  };

  useEffect(() => {
    messaging()
      .subscribeToTopic(username)
      .then(() => {
        console.log('Subscribed user', username);
      });
    fetchMentorData();
    // fetchUserData();
  }, []);

  if (userTypes === '') {
    return (
      <View style={styles.loadingStyle}>
        <ActivityIndicator />
      </View>
    );
  } else {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: cobalt,
            height: 56,
            paddingBottom: 6,
          },
          tabBarShowLabel: false,
        }}>
        <Tab.Screen
          name="Home"
          component={userTypes === 'MENTOR' ? Schedule : Home}
          options={{
            headerLeft: () => (
              <View
                style={{
                  marginLeft: 10,
                  marginTop: 4,
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../assets/homeLogo.png')}
                  style={{width: 77, height: 60}}
                />
              </View>
            ),
            headerRight: () => (
              <View style={styles.rowView}>
                <ModalTab
                  modalVisible={modalVisible}
                  setModalVisible={setModalVisible}
                  navigation={navigation}
                />
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                  activeOpacity={1}>
                  <MaterialCommunityIcon
                    name="dots-vertical"
                    size={25}
                    color={whiteHex}
                    style={{marginRight: 15}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    navigation.navigate('Inbox');
                  }}>
                  <IonIcon
                    name="chatbubble-ellipses-outline"
                    size={25}
                    color={whiteHex}
                    style={{marginRight: 10}}
                  />
                </TouchableOpacity>
              </View>
            ),
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 4,
                }}>
                <MaterialCommunityIcon
                  name="home"
                  size={26}
                  color={focused ? '#FED604' : 'rgba(255, 255, 255, 0.64);'}
                />
                <Text
                  style={{
                    color: focused ? '#FED604' : 'rgba(255, 255, 255, 0.64);',
                    fontSize: 9,
                  }}>
                  Home
                </Text>
              </View>
            ),
            tabBarButton: CustomTabButton,
            tabBarActiveTintColor: whiteHex,
            tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.64)',
            headerStyle: {
              backgroundColor: cobalt,
              height: 65,
            },
            headerTitleStyle: {
              color: cobalt,
            },
            headerTitleAlign: 'center',
          }}
        />
        <Tab.Screen
          name="Cases"
          component={userTypes === 'MENTOR' ? MentorCases : Cases}
          options={{
            headerLeft: () => (
              <View
                style={{
                  marginLeft: 10,
                  marginTop: 4,
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../assets/homeLogo.png')}
                  style={{width: 77, height: 60}}
                />
              </View>
            ),
            headerRight: () => (
              <View style={styles.rowView}>
                <ModalTab
                  modalVisible={modalVisibleTwo}
                  setModalVisible={setModalVisibleTwo}
                  navigation={navigation}
                />
                <TouchableOpacity
                  onPress={() => setModalVisibleTwo(!modalVisibleTwo)}
                  activeOpacity={1}>
                  <MaterialCommunityIcon
                    name="dots-vertical"
                    size={25}
                    color={whiteHex}
                    style={{marginRight: 15}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    navigation.navigate('Inbox');
                  }}>
                  <IonIcon
                    name="chatbubble-ellipses-outline"
                    size={25}
                    color={whiteHex}
                    style={{marginRight: 10}}
                  />
                </TouchableOpacity>
              </View>
            ),
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 4,
                }}>
                <FontAwesome5
                  name="briefcase-medical"
                  size={25}
                  color={focused ? '#FED604' : 'rgba(255, 255, 255, 0.64);'}
                />
                <Text
                  style={{
                    color: focused ? '#FED604' : 'rgba(255, 255, 255, 0.64)',
                    fontSize: 9,
                  }}>
                  Cases
                </Text>
              </View>
            ),
            tabBarButton: CustomTabButton,
            tabBarActiveTintColor: whiteHex,
            tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.64)',
            headerStyle: {
              backgroundColor: cobalt,
              height: 65,
            },
            headerTitleStyle: {
              color: cobalt,
            },
            headerTitleAlign: 'center',
            tabBarShowLabel:false
          }}
        />
        <Tab.Screen
          name="Schedule"
          component={Schedule}
          options={{
            headerLeft: () => (
              <View
                style={{
                  marginLeft: 10,
                  marginTop: 4,
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../assets/homeLogo.png')}
                  style={{width: 77, height: 60}}
                />
              </View>
            ),
            headerRight: () => (
              <View style={styles.rowView}>
                <ModalTab
                  modalVisible={modalVisibleThree}
                  setModalVisible={setModalVisibleThree}
                  navigation={navigation}
                />
                <TouchableOpacity
                  onPress={() => setModalVisibleThree(!modalVisibleThree)}
                  activeOpacity={1}>
                  <MaterialCommunityIcon
                    name="dots-vertical"
                    size={25}
                    color={whiteHex}
                    style={{marginRight: 15}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    navigation.navigate('Inbox');
                  }}>
                  <IonIcon
                    name="chatbubble-ellipses-outline"
                    size={25}
                    color={whiteHex}
                    style={{marginRight: 10}}
                  />
                </TouchableOpacity>
              </View>
            ),
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 4,
                }}>
                <FontAwesome5
                  name="clipboard-list"
                  size={25}
                  color={focused ? '#FED604' : 'rgba(255, 255, 255, 0.64);'}
                />
                <Text
                  style={{
                    color: focused ? '#FED604' : 'rgba(255, 255, 255, 0.64)',
                    fontSize: 9,
                  }}>
                  {userTypes == "MENTOR" ? "Chat Room" :"Appointments"}
                </Text>
              </View>
            ),
            tabBarButton: CustomTabButton,
            tabBarActiveTintColor: whiteHex,
            tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.64)',
            headerStyle: {
              backgroundColor: cobalt,
              height: 65,
            },
            headerTitleStyle: {
              color: cobalt,
            },
            headerTitleAlign: 'center',
          }}
        />
        {userTypes == 'MENTOR' ? (
          <Tab.Screen
            name="Avalability"
            component={Avalability}
            options={{
              headerLeft: () => (
                <View
                  style={{
                    marginLeft: 10,
                    marginTop: 4,
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../assets/homeLogo.png')}
                    style={{width: 77, height: 60}}
                  />
                </View>
              ),
              headerRight: () => (
                <View style={styles.rowView}>
                  <ModalTab
                    modalVisible={modalVisibleFour}
                    setModalVisible={setModalVisibleFour}
                    navigation={navigation}
                  />
                  <TouchableOpacity
                    onPress={() => setModalVisibleFour(!modalVisibleFour)}
                    activeOpacity={1}>
                    <MaterialCommunityIcon
                      name="dots-vertical"
                      size={25}
                      color={whiteHex}
                      style={{marginRight: 15}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      navigation.navigate('Inbox');
                    }}>
                    <IonIcon
                      name="chatbubble-ellipses-outline"
                      size={25}
                      color={whiteHex}
                      style={{marginRight: 10}}
                    />
                  </TouchableOpacity>
                </View>
              ),
              headerTitle: () => (
                <View
                  style={{
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'center',
                    width: '100%',
                  }}>
                  {/* <SearchBar
                    searchIcon={{size: 24, color: osloGrey}}
                    placeholder="Search here"
                    placeholderTextColor={osloGrey}
                    value={searchValue}
                    onChangeText={setSearchValue}
                    inputContainerStyle={{
                      backgroundColor: offWhite,
                      borderWidth: 0,
                      alignSelf: 'center',
                      borderRadius: 6,
                      marginHorizontal: 60,
                      borderBottomWidth: 0,
                      borderTopWidth: 0,
                      width: '100%',
                      height: 30,
                    }}
                    containerStyle={{
                      backgroundColor: offWhite,
                      borderRadius: 6,
                      width: '100%',
                      height: 45,
                    }}
                  /> */}
                </View>
              ),
              tabBarIcon: ({focused}) => (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: 4,
                  }}>
                  <FAIcon
                    name="calendar-o"
                    size={25}
                    color={focused ? '#FED604' : 'rgba(255, 255, 255, 0.64)'}
                  />
                  <Text
                    style={{
                      color: focused ? '#FED604' : 'rgba(255, 255, 255, 0.64)',
                      fontSize: 9,
                    }}>
                    My Availability
                  </Text>
                </View>
              ),
              tabBarButton: CustomTabButton,
              tabBarActiveTintColor: whiteHex,
              tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.64)',
              headerStyle: {
                backgroundColor: cobalt,
                height: 65,
              },
              headerTitleStyle: {
                color: whiteHex,
              },
              headerTitleAlign: 'center',
            }}
          />
        ) : (
          <Tab.Screen
            name="Favourites"
            component={Favourite}
            options={{
              headerLeft: () => (
                <View
                  style={{
                    marginLeft: 10,
                    marginTop: 4,
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../assets/homeLogo.png')}
                    style={{width: 77, height: 60}}
                  />
                </View>
              ),
              headerRight: () => (
                <View style={styles.rowView}>
                  <ModalTab
                    modalVisible={modalVisibleFour}
                    setModalVisible={setModalVisibleFour}
                    navigation={navigation}
                  />
                  <TouchableOpacity
                    onPress={() => setModalVisibleFour(!modalVisibleFour)}
                    activeOpacity={1}>
                    <MaterialCommunityIcon
                      name="dots-vertical"
                      size={25}
                      color={whiteHex}
                      style={{marginRight: 15}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      navigation.navigate('Inbox');
                    }}>
                    <IonIcon
                      name="chatbubble-ellipses-outline"
                      size={25}
                      color={whiteHex}
                      style={{marginRight: 10}}
                    />
                  </TouchableOpacity>
                </View>
              ),
              tabBarIcon: ({focused}) => (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: 4,
                  }}>
                  <MaterialCommunityIcon
                    name="heart-outline"
                    size={25}
                    color={focused ? '#FED604' : 'rgba(255, 255, 255, 0.64)'}
                  />
                  <Text
                    style={{
                      color: focused ? '#FED604' : 'rgba(255, 255, 255, 0.64)',
                      fontSize: 9,
                    }}>
                    Favorites
                  </Text>
                </View>
              ),
              tabBarButton: CustomTabButton,
              tabBarActiveTintColor: whiteHex,
              tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.64)',
              headerStyle: {
                backgroundColor: cobalt,
                height: 65,
              },
              headerTitleStyle: {
                color: whiteHex,
              },
              headerTitleAlign: 'center',
            }}
          />
        )}

        <Tab.Screen
          name="Profile"
          component={userTypes === 'MENTOR' ? MentorProfile : Profile}
          options={{
            headerLeft: () => (
              <View
                style={{
                  marginLeft: 10,
                  marginTop: 4,
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../assets/homeLogo.png')}
                  style={{width: 77, height: 60}}
                />
              </View>
            ),
            headerRight: () => (
              <View style={styles.rowView}>
                <ModalTab
                  modalVisible={modalVisibleFive}
                  setModalVisible={setModalVisibleFive}
                  navigation={navigation}
                />
                <TouchableOpacity
                  onPress={() => setModalVisibleFive(!modalVisibleFive)}
                  activeOpacity={1}>
                  <MaterialCommunityIcon
                    name="dots-vertical"
                    size={25}
                    color={whiteHex}
                    style={{marginRight: 15}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    navigation.navigate('Inbox');
                  }}>
                  <IonIcon
                    name="chatbubble-ellipses-outline"
                    size={25}
                    color={whiteHex}
                    style={{marginRight: 10}}
                  />
                </TouchableOpacity>
              </View>
            ),
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 4,
                }}>
                {profilePic === 'http://chirpvet.com/uploads/' ||
                profilePic === null ||
                profilePic === '' ? (
                  <FontAwesome5
                    name="user-circle"
                    size={25}
                    style={{width: 26, height: 26, borderRadius: 13}}
                    color={focused ? '#FED604' : 'rgba(255, 255, 255, 0.64)'}
                  />
                ) : (
                  <Image
                    source={{uri: profilePic}}
                    style={{width: 26, height: 26, borderRadius: 13}}
                  />
                )}
                <Text
                  style={{
                    color: focused ? '#FED604' : 'rgba(255, 255, 255, 0.64)',
                    fontSize: 9,
                  }}>
                  Profile
                </Text>
              </View>
            ),
            tabBarButton: CustomTabButton,
            tabBarActiveTintColor: whiteHex,
            tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.64)',
            headerStyle: {
              backgroundColor: cobalt,
              height: 65,
            },
            headerTitleStyle: {
              color: cobalt,
            },
            headerTitleAlign: 'center',
          }}
        />
      </Tab.Navigator>
    );
  }
};
export default BottomTab;
const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
  },
  modalView: {
    width: '100%',
    backgroundColor: havlockBlue,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 35,
    paddingHorizontal: 35,
    bottom: 0,
    position: 'absolute',
    shadowColor: whiteHex,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
    color: whiteHex,
  },
  modalTextCenter: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 15,
    textAlign: 'center',
    color: whiteHex,
  },
  loadingStyle: {
    backgroundColor: whiteHex,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
});
