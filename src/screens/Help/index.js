import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Text,
  ImageBackground,
  ActivityIndicator,
  Linking
} from 'react-native';
import {MaterialCommunityIcon, IonIcon} from '../../component/Icons';
import {useDispatch, useSelector} from 'react-redux';
import {fetchFaqData, fetchContactData} from '../../redux/authaction';
import styles from './index.style';

const Help = () => {
  const [contactData, setContactData] = useState([]);
  const [faqData, setFaqData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const faqsData = useSelector(state => state.bothFaqData);
  const contactsData = useSelector(state => state.bothContactData);
  const dispatch = useDispatch();

  const toggleDropdownOne = value => {
    if (activeIndex === value) {
      setActiveIndex(null);
    } else {
      setActiveIndex(value);
    }
  };
  
  const renderDropdownOne = (value, value2) => {
    if (value2 === activeIndex) {
      return <Text style={styles.subscriptionPara}>{value}</Text>;
    }
  };

  const dialCall = number => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(`tel:${"+"+phoneNumber}`);
  };

  useEffect(() => {
    if (faqsData && faqsData.data && faqsData.data.data) {
      setFaqData(faqsData.data.data);
      setLoading(false);
    } else if (faqsData && faqsData.error) {
      console.log(faqsData.error);
      setLoading(false);
    }
  }, [faqsData]);

  useEffect(() => {
    dispatch(fetchFaqData());
  }, [dispatch]);

  useEffect(() => {
    if (contactsData && contactsData.data && contactsData.data.data) {
      setContactData(contactsData.data.data);
    } else if (contactsData && contactsData.error) {
      console.log(contactsData.error);
    }
  }, [contactsData]);

  useEffect(() => {
    dispatch(fetchContactData());
  }, [dispatch]);

  if (loading)
    return (
      <View style={styles.loadingStyle}>
        <ActivityIndicator />
      </View>
    );
  else
  return (
    <ScrollView
      style={styles.scroll}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={'handled'}>
      <View style={styles.support}>
        <ImageBackground
          source={require('../../assets/backgroundImage.png')}
          style={styles.background}
          resizeMode="contain">
          <Text style={styles.query}>Frequently Asked Questions</Text>

           {faqData?.map((item, index) => {
          return (
            <TouchableOpacity
              style={styles.subscriptionMain}
              onPress={() => toggleDropdownOne(index)}
              key={index}>
              <View style={styles.subscriptionContent}>
                <Text style={styles.subscriptionHeading}>{item.question}</Text>
                {index === activeIndex ? (
                  <MaterialCommunityIcon
                    name="chevron-up"
                    size={20}
                    style={styles.arrowUp}
                  />
                ) : (
                  <MaterialCommunityIcon
                    name="chevron-down"
                    size={20}
                    style={styles.arrowUp}
                  />
                )}
              </View>
              {renderDropdownOne(item.answer, index)}
            </TouchableOpacity>
          );
        })}

          <View style={styles.horizontalLines} />

          {contactData.length === 0 ? (
          <ActivityIndicator />
        ) : (<View>
          <View>
            <View style={styles.mailBox}>
              <MaterialCommunityIcon
                name="email-outline"
                size={30}
                style={styles.chatBox}
              />
              <Text style={styles.chatHead}>CHATS TO US</Text>
            </View>
            <Pressable
                onPress={() =>
                  Linking.openURL(`mailto:${contactData[0].chat}`)
                }>
                <Text style={styles.mailId}>{contactData[0].chat}</Text>
              </Pressable>
          </View>
          <View>
            <View style={styles.mailBox}>
              <IonIcon name="location-outline" size={30} style={styles.chatBox} />
              <Text style={styles.chatHead}>OFFICE</Text>
            </View>
            <Text style={styles.mailId} selectable={true}>
            {contactData[0].office}
            </Text>
          </View>
          <View>
            <View style={styles.mailBox}>
              <MaterialCommunityIcon
                name="phone-outline"
                size={30}
                style={styles.chatBox}
              />
              <Text style={styles.chatHead}>PHONE</Text>
            </View>
            <Pressable
                onPress={() => {
                  if (contactData.length > 0 && contactData[0].phone_number) {
                    dialCall(contactData[0].phone_number);
                  }
                }}>
                <Text style={styles.mailId}>{contactData[0].phone_number}</Text>
              </Pressable>
          </View>
        </View>)}
        </ImageBackground>
      </View>
    </ScrollView>
  );
};
export default Help;

