import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {black_1, gray_light_2} from '../../../constants/colors';
import {Image} from 'react-native-elements';
import {BASE_URL_IMAGE} from '../../../constants/Host';
import {DateTimeFormat} from '../../../helper/TimeFormat';

const PatientIDDetails = props => {
  const data = props?.route?.params?.data;

  return (
    <>
      <View style={styles.topMainContainer}>
        <Text style={styles.id}>Case ID: {data?.case_id}</Text>
        <Helper
          title1={'Pet Name'}
          value1={data?.patient_name}
          title2={'Breed'}
          value2={data?.breed}
        />
        <Helper
          title1={'Start Time'}
          value1={DateTimeFormat(data?.start_time)}
          title2={'End Time'}
          value2={DateTimeFormat(data?.end_time)}
        />
        <Helper
          title1={'Date'}
          value1={data?.date}
          title2={'Weight'}
          value2={data?.weight}
        />

        <Text style={styles.title}>Summary</Text>
        <Text style={styles.value}>{data?.summary}</Text>

        <Text style={styles.title}>Mentee</Text>

        <TouchableOpacity
          style={styles.mentorContainer}
          onPress={() =>
            props.navigation.navigate(
              'FilePreview',
              `${BASE_URL_IMAGE}${data?.mentee_details?.[0]?.profile_pic}`,
            )
          }>
          <Image
            source={{
              uri: `${BASE_URL_IMAGE}${data?.mentee_details?.[0]?.profile_pic}`,
            }}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{data?.mentee_details?.[0]?.name}</Text>
            {/* <Text style={styles.specialist} >Name</Text> */}
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const Helper = ({title1, value1, title2, value2}) => {
  return (
    <>
      <View style={styles.helperContainer}>
        <View style={styles.helperContiner2}>
          <Text style={styles.title}>{title1}</Text>
          <Text style={styles.value}>{value1}</Text>
        </View>
        <View style={styles.helperContiner2}>
          <Text style={styles.title}>{title2}</Text>
          <Text style={styles.value}>{value2}</Text>
        </View>
      </View>
    </>
  );
};

export default PatientIDDetails;

const styles = StyleSheet.create({
  topMainContainer: {
    paddingHorizontal: '4%',
    paddingVertical: 10,
  },
  id: {
    fontWeight: '500',
    fontSize: 20,
    color: black_1,
  },
  helperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  helperContiner2: {
    width: '50%',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: black_1,
    marginVertical: 6,
  },
  value: {
    fontSize: 16,
    fontWeight: '300',
    color: gray_light_2,
  },
  image: {
    width: 80,
    height: 80,
  },
  mentorContainer: {
    flexDirection: 'row',
  },
  textContainer: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    color: black_1,
    fontWeight: 600,
  },
  specialist: {
    fontSize: 14,
    fontWeight: '400',
    color: gray_light_2,
  },
});
