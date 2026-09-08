import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import {
  AntIcon,
  MaterialCommunityIcon,
} from "../../component/Icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./index.style";
import { cases_Mentee, cases_Mentor } from "../../API/endpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PostAPIRequest } from "../../API/Axios";
import { black, osloGrey, porcelain } from "../../constants/colors";
import { BASE_URL_IMAGE } from "../../constants/Host";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenteeProfile } from "../../redux/authaction";
import LoadingComp from "../../component/LoadingComp/LoadingComp";
import VirtualizedListComp from "../../component/VirtualizedComp/VirtualizedComp";
import { SearchBar } from "react-native-elements";

function PendingForm() {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const profileData = useSelector(state => state.profileData);

  const mentee_id = profileData?.data?.data?.id;

  const [loading, setLoading] = useState(false);
  const [pendingFormsList, setPendingFormList] = useState([]);
  const [backupList, setBackupList] = useState([]);
  const [userType, setUserType] = useState("MENTEE");

  const [searchValue, setSearchValue] = useState();
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleSearch = () => {

    const curr = [...backupList];
    const currList = [];

    for (let i in curr) {
      let name = (userType == "MENTEE" ? curr[i]?.mentor_name : curr[i]?.mentee_details?.[0]?.name)?.toLowerCase();
      if (name?.includes(searchValue?.toLowerCase())) {
        currList.push(curr[i]);
      };
      console.log(name)
    };
    setPendingFormList(currList);

  }

  const pendingForms = async () => {
    const token = await AsyncStorage.getItem("tokens");
    const user_type = await AsyncStorage.getItem("user_type");
    const formData = new FormData();

    let endpoint = cases_Mentee;
    if (user_type === "MENTOR") {
      setUserType(user_type)
      endpoint = cases_Mentor;
    };
    formData.append("case_type", "Pending");
    setLoading(true);
    let res = await PostAPIRequest({ formData: formData, endpoint: endpoint, token: token });

    if (res?.status == 200) {
      res = res?.data?.data;
      console.log("res[0]", res[0]);
      setPendingFormList(res);
      setBackupList(res);
      setLoading(false);
    } else {
      console.log(res?.response?.data);
      setLoading(false);
    };

  };

  useEffect(() => {
    pendingForms();
    if (!mentee_id) {
      console.log("CALLING PROFILE API ")
      dispatch(fetchMenteeProfile());
    }
  }, []);

  return (
    <VirtualizedListComp
      style={styles.mainContainer}
      onRefresh={() => { pendingForms(); }}
    >

      {loading ? (<><LoadingComp /></>) : (<>
        <View style={{ width: "100%", height: "100%" }}>
          
          {!showSearchInput && <TouchableOpacity onPress={() => { setShowSearchInput(true); }} style={{ alignSelf: "flex-end", marginRight: 20 }} >
            <AntIcon name="search1" color={black} size={20} />
          </TouchableOpacity>}

          {showSearchInput && <View
            style={styles.searchContainer}>
            <TouchableOpacity onPress={() => { setShowSearchInput(false); }} style={{ width: 20 }} >
              <AntIcon name="close" color={black} size={20} />
            </TouchableOpacity>
            <View style={{ width: "90%" }} >
              <SearchBar
                searchIcon={{ size: 22, color: osloGrey }}
                placeholder="Search here..."
                placeholderTextColor={osloGrey}
                onSubmitEditing={() => { handleSearch(); }}
                value={searchValue}
                onClear={() => { setPendingFormList(backupList) }}
                onChangeText={(value) => { setSearchValue(value) }}
                inputContainerStyle={styles.inputSearch}
                containerStyle={styles.searchContainerStyle}
              />
            </View>
          </View>}

          <FlatList
            data={pendingFormsList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <>
                  <TouchableOpacity
                    onPress={() => { navigation.navigate('PatientEditForm', { data: item, hideTimeSlot: true }) }}
                    disabled={userType == "MENTOR" ? true : (item?.mentee_id == mentee_id ? false : true)}
                    style={styles.beautyFirstContainer} activeOpacity={0.8}
                  >
                    <View style={styles.beautyFirstContainerBox}>
                      <View style={styles.beautyImgProfile}>
                        <Image
                          source={{ uri: userType == "MENTOR" ? `${BASE_URL_IMAGE}${item?.mentee_details?.[0]?.profile_pic}` : `${BASE_URL_IMAGE}${item?.mentor_details?.[0]?.profile_pic}` }}
                          style={{ width: 57, height: 57 }}
                        />
                      </View>
                      <View style={{ width: "66%" }}>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={styles.beautyName}>{userType == "MENTEE" ? item?.mentor_name : item?.mentee_details?.[0]?.name}</Text>
                        </View>
                        <Text style={styles.beautySixteen}>{item?.date}</Text>
                      </View>
                      {userType == "MENTEE" ? (<>
                        <View style={{ width: "20%" }}>
                          <MaterialCommunityIcon
                            name="chevron-down"
                            size={20}
                            style={styles.arrowUp}
                          />
                        </View>
                      </>) : (<></>)}
                    </View>
                  </TouchableOpacity>
                </>
              )
            }}
          />

          {pendingFormsList?.length == 0 ? (<>
            <Text style={styles.noDataText} >No Pending Forms</Text>
          </>) : (<></>)}

        </View>
      </>)}

    </VirtualizedListComp>
  );
};


export default PendingForm;