/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, ScrollView, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './index.style.js';
import { BASE_URL_IMAGE } from '../../constants/Host.js';

const CaseDetails = props => {
  const navigation = useNavigation();

  const data = props?.route?.params?.data;
  const booking_details = data?.booking_cases?.[0];
  console.log(booking_details);

  return (
    <ScrollView
      style={styles.signInPage}
      keyboardShouldPersistTaps={'handled'}
      showsHorizontalScrollIndicator={false}>
      <ImageBackground
        source={require('../../assets/backgroundImage.png')}
        style={styles.background}
        resizeMode="contain">
        <Text style={styles.caseId}>Case ID #{data?.case_id}</Text>

        <HorizontalComp
          title={'Pet Name, Last Name'}
          value={booking_details?.patient_name}
          title2={'Sex'}
          value2={booking_details?.patient_sex}
        />
        <HorizontalComp
          title={'Breed'}
          value={booking_details?.breed}
          title2={'Age'}
          value2={booking_details?.patient_age}
        />
        <HorizontalComp
          title={'Weight'}
          value={booking_details?.weight}
        // title2={'Patient History'}
        // value2={
        //   booking_details?.summary?.length == 0 || !booking_details?.summary
        //     ? 'No History'
        //     : booking_details?.summary
        // }
        />

        <View style={styles.petDetails}>
          <View style={[styles.titleContainer, { width: "100%" }]}>
            <Text style={styles.petName}>Problem List</Text>
            <Text style={styles.details}>{
              booking_details?.problem
                ? booking_details.problem
                : 'No problem list added'
            }</Text>
          </View>
        </View>
        <View style={styles.petDetails}>
          <View style={[styles.titleContainer, { width: "100%" }]}>
            <Text style={styles.petName}>Patient History</Text>
            <Text style={styles.details}>{
              booking_details?.summary?.length == 0 || !booking_details?.summary ? 'No History' : booking_details?.summary}</Text>
          </View>
        </View>

        <View style={styles.imageContainer}>
          <Text style={styles.summaryHeading}>Pictures</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {data?.pictures?.split(',')?.map(item => {
              return (
                <TouchableOpacity onPress={() =>
                  props.navigation.navigate(
                    'FilePreview',
                    `${BASE_URL_IMAGE}${item}`,
                  )
                }>
                  <Image
                    source={{ uri: `${BASE_URL_IMAGE}${item}` }}
                    style={styles.image}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const HorizontalComp = ({ title, value, title2, value2 }) => {
  return (
    <>
      <View style={styles.petDetails}>
        <View style={styles.titleContainer}>
          <Text style={styles.petName}>{title}</Text>
          <Text style={styles.details}>{value}</Text>
        </View>
        {title2 && (
          <View style={styles.titleContainer}>
            <Text style={[styles.petName, styles.ageDetails]}>{title2}</Text>
            <Text style={[styles.details, styles.ageDetails]}>{value2}</Text>
          </View>
        )}
      </View>
    </>
  );
};

export default CaseDetails;
