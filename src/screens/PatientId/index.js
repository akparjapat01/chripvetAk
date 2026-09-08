/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { AntIcon, MaterialCommunityIcon } from '../../component/Icons';
import { useNavigation } from '@react-navigation/native';
import { black, offWhite, osloGrey, porcelain } from '../../constants/colors';
import { cases_Mentor } from '../../API/endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PostAPIRequest } from '../../API/Axios';
import { BASE_URL_IMAGE } from '../../constants/Host';
import styles from './index.style';
import VirtualizedListComp from '../../component/VirtualizedComp/VirtualizedComp';
import { SearchBar } from 'react-native-elements';

function PatientId() {
  const navigation = useNavigation();

  const [patientIDList, setPatientIDList] = useState([]);
  const [backupList, setBackupList] = useState([]);

  const [searchValue, setSearchValue] = useState();
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleSearch = () => {

    const curr = [...backupList];
    const currList = [];

    for (let i in curr) {
      let name = curr[i]?.mentee_details?.[0]?.name?.toLowerCase();
      let caseId = curr[i]?.case_id;
      if (name?.includes(searchValue?.toLowerCase()) || caseId?.includes(searchValue)) {
        currList.push(curr[i]);
      };
    };
    setPatientIDList(currList);

  }
  const getPatientList = async () => {
    const token = await AsyncStorage.getItem('tokens');
    const formData = new FormData();
    formData.append('case_type', 'completed');
    console.log(token);
    let res = await PostAPIRequest({
      formData: formData,
      endpoint: cases_Mentor,
      token: token,
    });

    if (res?.status == 200) {
      res = res?.data?.data;
      console.log('TEST ', res[0]);
      setPatientIDList(res);
      setBackupList(res);
    } else {
      console.log(res?.response?.data);
    }
  };

  useEffect(() => {
    getPatientList();
  }, []);

  return (
    <VirtualizedListComp
      onRefresh={() => { getPatientList(); }}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: porcelain,
      }}>

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
            onClear={() => { setPatientIDList(backupList); }}
            onChangeText={(value) => { setSearchValue(value) }}
            inputContainerStyle={styles.inputSearch}
            containerStyle={styles.searchContainerStyle}
          />
        </View>
      </View>}

      <View style={{ width: '100%', height: '100%' }}>
        <FlatList
          data={patientIDList}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('PatientIDDetails', { data: item });
                  }}
                  style={styles.beautyFirstContainer}
                  activeOpacity={0.8}>
                  <View style={styles.beautyFirstContainerBox}>
                    <View style={styles.beautyImgProfile}>
                      <Image
                        source={{
                          uri: `${BASE_URL_IMAGE}${item?.mentee_details?.[0]?.profile_pic}`,
                        }}
                        style={{ width: 57, height: 57 }}
                      />
                    </View>
                    <View style={{ width: '66%' }}>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.beautyName}>
                          {item?.mentee_details?.[0]?.name}
                        </Text>
                      </View>
                      <Text style={styles.beautySixteen}>Case ID : {item?.case_id}</Text>
                      <Text style={styles.beautySixteen}>{item?.date}</Text>
                    </View>
                    <View style={{ width: '20%' }}>
                      <MaterialCommunityIcon
                        name="chevron-down"
                        size={20}
                        style={styles.arrowUp}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </>
            );
          }}
        />

        {patientIDList?.length == 0 ? (
          <>
            <Text style={styles.noDataText}>No Patient Found</Text>
          </>
        ) : (
          <></>
        )}
      </View>
    </VirtualizedListComp>
  );
}
export default PatientId;
