/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './index.style';
import {FontAwesome5} from '../../component/Icons';
import {black_1} from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {BASE_URL_IMAGE} from '../../constants/Host';
import {DateTimeFormat} from '../../helper/TimeFormat';

const RecentBookings = ({list}) => {
  const navigation = useNavigation();
  const [lastIndex, setLastIndex] = useState(4);
  const currList = list.slice(0, lastIndex);

  return (
    <>
      <View style={styles.secondContainer}>
        <View style={styles.availableHeading}>
          <Text style={styles.availableText}>Recent Appointment</Text>
          {currList?.length > 4 && (
            <TouchableOpacity
              onPress={() => {
                lastIndex < list.length
                  ? setLastIndex(list.length)
                  : setLastIndex(4);
              }}>
              <Text style={styles.seeText}>
                {lastIndex > 4 ? 'Show less' : 'See all'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {currList?.map(item => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PatientDetails', {data: item});
              }}
              style={styles.beautySecondContainer}>
              <View style={styles.beautyFirstContainerBox}>
                <View style={styles.beautyImgProfile}>
                  {item?.mentee_details?.[0]?.profile_pic ? (
                    <>
                      <Image
                        source={{
                          uri: `${BASE_URL_IMAGE}${item?.mentee_details?.[0]?.profile_pic}`,
                        }}
                        style={{width: 70, height: 70}}
                      />
                    </>
                  ) : (
                    <>
                      <FontAwesome5
                        name="user-circle"
                        size={45}
                        style={styles.appLogo}
                        color={black_1}
                      />
                    </>
                  )}
                </View>
                <View style={{width: '68%', marginLeft: 10}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.beautyName}>{item?.mentee_name}</Text>
                  </View>
                  <Text style={styles.beautySixteen}>
                    {DateTimeFormat(item?.start_time) +
                      ' To ' +
                      DateTimeFormat(item?.end_time) +
                      ' ( ' +
                      item?.booking_date +
                      ' )'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
        {currList.length == 0 && (
          <Text style={styles.noText}>No Recent Appointment</Text>
        )}
      </View>
    </>
  );
};

export default RecentBookings;
