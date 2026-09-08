import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';
import { AntIcon, FAIcon } from '../../component/Icons';
import { TimeDatePicker, Modes } from 'react-native-time-date-picker';
import moment from 'moment';
import styles from './index.style';
import { PostAPIRequest } from '../../API/Axios';
import { categoryList_Mentee } from '../../API/endpoints';
import { BASE_URL_IMAGE } from '../../constants/Host';
import { black, gray, green, whiteHex } from '../../constants/colors';
import LoadingComp from '../../component/LoadingComp/LoadingComp';
import VirtualizedListComp from '../../component/VirtualizedComp/VirtualizedComp';

const GeneralPractice = props => {

  const ID = props?.route?.params?.data?.id;
  const data = props?.route?.params?.data;
  const title = data?.category_name ? data.category_name : data?.specialist_name;
  console.log(data)

  const navigation = useNavigation();
  const now = new Date();
  now.setHours(15);
  now.setMinutes(30);
  now.setSeconds(0);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  // const [modalVisible, setModalVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [mentorList, setMentorList] = useState([]);
  const [totalMentorList, setTotalMentorList] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.searchContainer}>
          <Text style={{ color: black, fontSize: 20, fontWeight: "600" }} >{title}</Text>
        </View>
      ),
    });
  }, [searchValue]);

  const handleSearch = () => {
    const currList = [...totalMentorList];
    console.log(currList[0]);
    const updatedList = [];
    for (var i in currList) {
      if (currList[i].name.toLowerCase().includes(searchValue?.toLowerCase())) {
        updatedList.push(currList[i]);
      }
    };
    setMentorList(updatedList);
  };

  const getList = async () => {
    const formData = new FormData();
    formData.append("category_id", ID);
    console.log(formData);
    setLoading(true);
    let res = await PostAPIRequest({ formData: formData, endpoint: categoryList_Mentee });
    if (res?.status == 200) {
      res = res?.data?.data;
      console.log("res", res);
      setMentorList(res);
      setTotalMentorList(res);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <View
      style={styles.transactionsContainer}
    >
      <View style={{ justifyContent: "center" }}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Search here"
          placeholderTextColor={gray}
          value={searchValue}
          onChangeText={(value) => { setSearchValue(value) }}
        />
        <View style={{ position: "absolute", right: 10, flexDirection: "row" }} >

          {searchValue.length > 0 && <TouchableOpacity onPress={() => { setMentorList(totalMentorList); setSearchValue("") }} style={{ justifyContent: "center", right: 10 }} >
            <AntIcon name="close" size={20} color={black} />
          </TouchableOpacity>}

          <TouchableOpacity onPress={() => { handleSearch(); }} style={{ justifyContent: "center" }} >
            <AntIcon name="search1" size={20} color={black} />
          </TouchableOpacity>


          {/* <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setModalVisible(!modalVisible)}>
            <View
              style={styles.filterTextContainer}>
              <Text
                style={styles.filterText}>
                Filter by availability
              </Text>
              <FAIcon name="filter" size={15} color={whiteHex} />
            </View>
          </TouchableOpacity> */}
        </View>
      </View>


      {loading ? (<>
        <LoadingComp />
      </>) :
        (
          <>
            <VirtualizedListComp onRefresh={() => { getList(); }} style={{ marginBottom: 80, marginTop: 20 }} >
              <FlatList
                data={mentorList}
                keyExtractor={(item) => item?.id}
                renderItem={({ item }) => {
                  return (
                    <>
                      <TouchableOpacity
                        style={styles.beautyFirstContainer}
                        activeOpacity={0.8}
                        onPress={() => {
                          navigation.navigate('VetProfile', { data: { mentor_id: item.id } });
                        }}>
                        <View style={styles.beautyFirstContainerBox}>
                          <View style={styles.beautyImgProfile}>
                            <Image
                              source={{ uri: `${BASE_URL_IMAGE}${item?.profile_pic}` }}
                              style={{ width: 70, height: 70 }}
                            />

                           { item?.is_available && <View style={{width:10, height:10, borderRadius:10, backgroundColor:green, position:"absolute", bottom:-5, right:10}} ></View>}
                            
                          </View>
                          <View style={{ width: '70%' }}>
                            <View style={{ flexDirection: 'row' }}>
                              <Text style={styles.beautyName}>{item?.name}</Text>
                            </View>
                            <Text style={styles.beautySixteen}>
                              {item?.specialistNames}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </>
                  )
                }}
                showsVerticalScrollIndicator={false}
              />
            </VirtualizedListComp>
            {mentorList?.length == 0 ? (<>
              <Text style={styles.noDataText} >No Data Found</Text>
            </>) : (<></>)}
          </>
        )}

      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          style={styles.centeredView}
          activeOpacity={1}
          onPressOut={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalView}>
            <Text style={styles.modalTextCenter}>___</Text>
            <Text style={styles.availabilityText}>Filter By Availability</Text>
            <TimeDatePicker
              mode={Modes.date}
              onSelectedChange={() => { }}
              onMonthYearChange={() => { }}
              onTimeChange={time => setSelectedTime(time)}
              selectedDate={selectedTime}
            />
          </View>
        </TouchableOpacity>
      </Modal> */}

    </View>
  );
};
export default GeneralPractice;


