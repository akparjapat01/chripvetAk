import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  BackHandler
} from "react-native";
import { SearchBar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import styles from "./index.style";
import { GetAPIRequest } from "../../API/Axios";
import { getAllMessages_Mentee } from "../../API/endpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL_IMAGE } from "../../constants/Host";
import { black, black_1, osloGrey, porcelain, transparent } from "../../constants/colors";
import { AntIcon } from "../../component/Icons";
import LoadingComp from "../../component/LoadingComp/LoadingComp";
import DummyProfileLogo from "../../component/DummyProfileLogo/DummyProfileLogo";
import VirtualizedListComp from "../../component/VirtualizedComp/VirtualizedComp";

const Inbox = () => {

  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [list, setList] = useState([]);
  const [backupList, setBackupList] = useState([]);
  const [currentUserType, setCurrentUserType] = useState("");

  const handleSearch = () => {
    console.log("working!");
    const currList = [...backupList];
    const newList = [];
    for (var i in currList) {
      if (currList[i]?.userDetails?.receiverName.toLowerCase()?.includes(searchValue.toLowerCase())) {
        newList.push(currList[i]);
      };
    };
    setList(newList);
  };

  const getAllChatList = async () => {

    const token = await AsyncStorage.getItem("tokens");
    setLoading(true);
    let res = await GetAPIRequest({ formData: null, endpoint: getAllMessages_Mentee, token: token });
    if (res?.status == 200) {
      res = res?.data?.messages;
      res.sort(function (a, b) {
        console.log(b?.lastMessage?.timestamp)
        return parseInt(b?.lastMessage?.timestamp) > parseInt(a?.lastMessage?.timestamp);
      });
      setList(res);
      setBackupList(res);
      setLoading(false);
    } else {
      console.log("ERROR", res);
      setLoading(false);
    };

  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => { navigation.navigate("Home") }} activeOpacity={1} style={{ marginLeft: 15 }}>
          <AntIcon
            name="arrowleft"
            size={25}
            color={black}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  const getUserType = async () => {
    const user_type = await AsyncStorage.getItem("user_type");
    setCurrentUserType(user_type)
  }

  useEffect(() => {
    getAllChatList();
  }, []);

  const getDate = (value) => {
    let time = new Date(value);
    return time.toLocaleDateString();
  }

  const backAction = () => {
    navigation.navigate("Home");
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();

  }, [navigation]);

  return (
    <VirtualizedListComp
      onRefresh={() => { getAllChatList(); }}
      style={styles.inboxContainer}
    >

      <SearchBar
        searchIcon={{ size: 22, color: osloGrey }}
        placeholder="Search here..."
        placeholderTextColor={osloGrey}
        onSubmitEditing={handleSearch}
        value={searchValue}
        onClear={() => { setList(backupList) }}
        onChangeText={(value) => { setSearchValue(value) }}
        inputContainerStyle={styles.inputSearch}
        containerStyle={styles.searchContainerStyle}
      />
      {loading ? (<>
        <LoadingComp />
      </>) : (<>
        <ImageBackground
          source={require('../../assets/backgroundImage.png')}
          style={styles.background}
          resizeMode="contain">
          {list?.length == 0 && <Text style={{ color: black, fontSize: 18, fontWeight: "600", alignSelf: "center", marginTop:40 }} >No chats</Text>}
          {list.map((item, index) => {
            return (
              <>
                {item && <TouchableOpacity
                  style={styles.inboxMain}
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate("Chat", { data: item, user_type: currentUserType });
                  }}
                >
                  <View>
                    {item?.userDetails?.receiverProfileUrl ? (<>
                      <Image
                        source={{ uri: `${BASE_URL_IMAGE}${item.userDetails.receiverProfileUrl}` }}
                        style={styles.homeProfileImg}
                      /></>) :
                      (<>
                        <DummyProfileLogo />
                      </>)}
                  </View>
                  <View style={styles.inboxTab}>
                    <Text style={styles.inboxHeading}>{item?.userDetails?.receiverName}</Text>
                    <Text style={styles.inboxName}>{item?.lastMessage?.message}</Text>
                  </View>
                  <View style={styles.inboxDaySection}>
                    <Text style={styles.inboxDay}>{getDate(item?.lastMessage?.timestamp)}</Text>
                  </View>
                </TouchableOpacity>}
              </>
            )
          })}
        </ImageBackground>
      </>)}

    </VirtualizedListComp>
  );
};
export default Inbox;



