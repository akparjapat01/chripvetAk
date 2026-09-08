import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { Input } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import CountryPicker from 'react-native-country-picker-modal';
import { black, black_1, color_2, white } from '../../constants/colors';
import styles from './index.style';

const PatientForm = props => {

  const data = props?.route?.params?.data;
  console.log(data);

  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [breed, setBreed] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryIso2, setCountryIso2] = useState('');
  const [callingCode, setCallingCode] = useState('');
  const [problem, setProblem] = useState('');
  const [selectType, setSelectType] = useState('');

  const handleOnChangeCountry = country => {
    setCountryIso2(country);
    setCallingCode(`+${country.callingCode[0]}`);
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps={'handled'}
      showsVerticalScrollIndicator={false}
      style={styles.profileContainer}>
      <ImageBackground
        source={require('../../assets/backgroundImage.png')}
        style={styles.background}
        resizeMode="contain">
        <View style={styles.uploadMain}>
          <View style={styles.personalContainer}>
            <Text style={styles.labelName}>PATIENT'S NAME</Text>
            <TextInput
              style={styles.inputContainer}
              value={name}
              onChangeText={text => setName(text.replace(/[^a-zA-Z\s]/g, ''))}
              placeholder="Enter Your Name"
              placeholderTextColor={black_1}
            />
          </View>
          <View>
            <Text style={styles.signInLabel}>AGE</Text>
            <View
              style={{
                overflow: 'hidden',
                borderBottomColor: black_1,
                borderBottomWidth: 1,
              }}>
              <Picker
                style={styles.dropGender}
                dropdownIconColor={color_2}
                selectedValue={age}
                onValueChange={itemValue => {
                  setAge(itemValue);
                }}>
                {/* <Picker.Item label="Select Gender" value="Select Gender" /> */}
                <Picker.Item label="04" value="04" style={{ backgroundColor: white }} color={black} />
                <Picker.Item label="03" value="03" style={{ backgroundColor: white }} color={black} />
              </Picker>
            </View>
          </View>
          <View style={styles.personalContainer}>
            <Text style={styles.labelName}>SEX</Text>
            <TextInput
              style={styles.inputContainer}
              value={gender}
              onChangeText={text => setGender(text)}
              placeholder="Enter Your Gender"
              placeholderTextColor={black_1}
            />
          </View>
          <View style={styles.personalContainer}>
            <Text style={styles.labelName}>PATIENT'S BREED</Text>
            <TextInput
              style={styles.inputContainer}
              value={breed}
              onChangeText={text => setBreed(text)}
              placeholder="Enter Patient breed"
              placeholderTextColor={black_1}
            />
          </View>

          {/* <View style={styles.personalContainer}>
            <Text style={styles.labelName}>PARENT'S PHONE NUMBER</Text>
            <Input
              placeholder="Mobile Number"
              value={phoneNumber}
              leftIcon={
                <CountryPicker
                  countryCode={countryIso2}
                  withFlag
                  withFilter
                  withAlphaFilter
                  withCountryNameButton
                  withCallingCode
                  onSelect={country => console.log(country.callingCode[0])}
                />
              }
              onChangeText={value => setPhoneNumber(value)}
              keyboardType={'number-pad'}
              containerStyle={{height: 50}}
            />
          </View> */}

          <View style={styles.personalContainer}>
            <Text style={styles.labelName}>PROBLEM</Text>
            <TextInput
              style={styles.inputContainer}
              value={problem}
              onChangeText={setProblem}
              placeholder="Enter patient's problem list, if applicable"
              placeholderTextColor={black_1}
            />
          </View>
          <View>
            <Text style={styles.signInLabel}>SELECT TYPE</Text>
            <View
              style={{
                overflow: 'hidden',
                borderBottomColor: black_1,
                borderBottomWidth: 1,
              }}>
              <Picker
                style={styles.dropGender}
                dropdownIconColor={color_2}
                selectedValue={selectType}
                onValueChange={itemValue => {
                  setSelectType(itemValue);
                }}>
                <Picker.Item label="Surgery" value="Surgery" style={{ backgroundColor: white, fontSize: 15 }} color={black} />
                <Picker.Item label="Surgery" value="Surgery" style={{ backgroundColor: white, fontSize: 15 }} color={black} />
              </Picker>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.signUpButton}
            onPress={() => {
              navigation.navigate('Schedule');
            }}>
            <Text style={styles.signText}>Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('Schedule');
            }}>
            <Text style={styles.skipText}>Skip For Now</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};
export default PatientForm;
