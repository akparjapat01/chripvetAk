import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./index.style";
import { PostAPIRequest } from "../../API/Axios";
import { cases_Mentee } from "../../API/endpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { black, offWhite, osloGrey } from "../../constants/colors";
import { BASE_URL_IMAGE } from "../../constants/Host";
import LoadingComp from "../../component/LoadingComp/LoadingComp";
import VirtualizedListComp from "../../component/VirtualizedComp/VirtualizedComp";
import { SearchBar } from "react-native-elements";
import { AntIcon } from "../../component/Icons";

function CasesTab() {

  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [backupList, setBackupList] = useState([]);
  const [casesList, setCasesList] = useState();
  const [searchValue, setSearchValue] = useState();
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleSearch = () => {

    const curr = [...backupList];
    const currList = [];

    for (let i in curr) {
      let name = curr[i]?.mentor_name?.toLowerCase();
      let caseId = curr[i]?.case_id;
      if (name?.includes(searchValue?.toLowerCase()) || caseId?.includes(searchValue)) {
        currList.push(curr[i]);
      };
    };
    setCasesList(currList);

  }

  const getCases = async () => {
    const token = await AsyncStorage.getItem("tokens");
    const formData = new FormData();
    formData.append("case_type", "Completed");
    setLoading(true);
    let res = await PostAPIRequest({ formData: formData, endpoint: cases_Mentee, token: token });

    if (res?.status == 200) {
      res = res?.data?.data;
      console.log("data", res[0]);
      setCasesList(res);
      setBackupList(res);
      setLoading(false);
    } else {
      console.log(res?.response)
      setLoading(false);
    };

  };

  useEffect(() => {
    getCases();
  }, []);

  return (
    <VirtualizedListComp
      style={styles.container}
      onRefresh={() => { getCases(); }}
    >

      {loading ? (<><LoadingComp /></>) : (<>
        <View style={{ width: "100%", height: "100%", flex: 1 }} onTouchEnd={() => { showSearchInput ? setShowSearchInput(false) : null }} >
          {!showSearchInput && <TouchableOpacity onPress={() => { setShowSearchInput(true); }} style={{ alignSelf: "flex-end", marginRight:20 }} >
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
                onClear={() => { setCasesList(backupList) }}
                onChangeText={(value) => { setSearchValue(value) }}
                inputContainerStyle={styles.inputSearch}
                containerStyle={styles.searchContainerStyle}
              />
            </View>
          </View>}

          <FlatList
            data={casesList}
            keyExtractor={(item) => item?.id}
            renderItem={({ item }) => {
              return (
                <>
                  <TouchableOpacity style={styles.beautyFirstContainer} activeOpacity={0.8} onPress={() => { navigation.navigate('CaseDetails', { data: item }) }}>
                    <View style={styles.beautyFirstContainerBox}>
                      <View style={styles.beautyImgProfile}>
                        <Image
                          source={{ uri: `${BASE_URL_IMAGE}${item?.mentor_details?.[0]?.profile_pic}` }}
                          style={{ width: 80, height: 80 }}
                        />
                      </View>
                      <View style={{ width: "74%", marginLeft: 10 }}>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={styles.beautyName}>{item?.mentor_name}</Text>
                        </View>
                        <Text style={styles.gizmoText}>{item?.parent_name}</Text>
                        <Text style={styles.idText}>Case ID-{item?.case_id}</Text>
                        <Text style={styles.beautySixteen}>{item?.date}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </>
              )
            }}
          />

          {casesList?.length == 0 ? (<>
            <Text style={styles.noDataText} >No Cases</Text>
          </>) : (<></>)}

        </View>
      </>)}

    </VirtualizedListComp>
  );
};

export default CasesTab;
