import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './index.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL_IMAGE } from '../../constants/Host';
import { FontAwesome5 } from '../../component/Icons';
import { black, black_1, offWhite, osloGrey } from '../../constants/colors';
import LoadingComp from '../../component/LoadingComp/LoadingComp';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavoriteMentors } from '../../redux/authaction';
import VirtualizedListComp from '../../component/VirtualizedComp/VirtualizedComp';
import { SearchBar } from 'react-native-elements';

const Favourite = (props) => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  let Fav_List = useSelector(state => state.getFavorite);
  Fav_List = Fav_List?.data?.data;

  const [loading, setLoading] = useState(false);
  const [favoriteList, setFavouriteList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleFilter = () => {
    const curr = [...Fav_List];
    const currList = [];
    for (let i in curr) {
      let name = curr[i]?.mentor_favourite?.[0]?.name?.toLocaleLowerCase();
      const value = searchValue?.toLocaleLowerCase();
      if (name == value || name?.includes(value) ) {
        currList.push(curr[i]);
      };
      console.log(name, searchValue);
    };

    setFavouriteList(currList);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View
          style={{
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
            width: '100%',
          }}>
          <SearchBar
            searchIcon={{ size: 24, color: osloGrey }}
            placeholder="Search here"
            placeholderTextColor={osloGrey}
            value={searchValue}
            onChangeText={(value) => { setSearchValue(value); }}
            onClear={() => { setFavouriteList(Fav_List); }}
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
            onSubmitEditing={() => { handleFilter(); }}
          />
        </View>
      ),
    });
  }, [searchValue]);

  useEffect(() => {
    dispatch(fetchFavoriteMentors());
    setFavouriteList(Fav_List);
  }, [])

  return (
    <VirtualizedListComp
      onRefresh={() => { dispatch(fetchFavoriteMentors()); }}
      style={styles.transactionsContainer}
    >

      {!Fav_List && <Text style={styles.noFavText} >No Favourite Added Yet</Text>}

      {loading ? (<><LoadingComp /></>) : (<>
        {(favoriteList?favoriteList : Fav_List)?.map((item, index) => {
          return (
            <>
              <TouchableOpacity key={item.id} style={styles.beautyFirstContainer} activeOpacity={0.8} onPress={() => { navigation.navigate('VetProfile', { data: item }) }}>
                <View style={styles.beautyFirstContainerBox}>
                  <View style={styles.beautyImgProfile}>
                    {(item?.mentor_favourite?.[0]?.profile_pic) ? (<>
                      <Image
                        source={{ uri: `${BASE_URL_IMAGE}${item?.mentor_favourite?.[0]?.profile_pic}` }}
                        style={{ width: 70, height: 70 }}
                      />
                    </>) : (<>
                      <FontAwesome5
                        name="user-circle"
                        size={45}
                        style={styles.appLogo}
                        color={black_1}
                      />
                    </>)}

                  </View>

                  <View style={{ width: "68%" }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.beautyName}>{item?.mentor_favourite?.[0]?.name}</Text>
                    </View>
                    <Text style={styles.beautySixteen}>{item?.mentor_favourite?.[0]?.mentor_specialist?.[0]?.specialist_name}</Text>
                  </View>

                </View>
              </TouchableOpacity>
            </>
          )
        })}

        {Fav_List?.length == 0 ? (<>
          <Text style={styles.noFavText} >No Favorite added yet !</Text>
        </>) : (<></>)}
      </>)}

    </VirtualizedListComp>
  );
};





export default Favourite;