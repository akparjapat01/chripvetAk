import React, {useRef, useEffect, useState} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import PagerView from 'react-native-pager-view';
import Page from '../../component/Page';
import Footer from '../../component/Footer';
import {useNavigation} from '@react-navigation/native';
import styles from './index.style';
import { whiteHex } from '../../constants/colors';

const OnBoarding = props => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false)
  const pagerRef = useRef(null);
  const handlePageChange = pageNumber => {
    pagerRef.current.setPage(pageNumber);
  };

  
  if (loading === true)
  return (
    <View style={styles.loadingStyle}>
      <ActivityIndicator />
    </View>
  );
else
  return (
    <View style={styles.main_view}>
      <PagerView style={styles.pager_view} initialPage={0} ref={pagerRef}>
        <View key="1">
          <Page
            backgroundColor={whiteHex}
            pics={require('../../assets/onBoardingfirst.png')}
            title="Lorem ipsum dolor sit amet"
            subtitle="Lorem ipsum dolor sit amet elit, consectetur adipiscing elit."
          />
          <Footer
            pageNo="1"
            backgroundColor={whiteHex}
            rightButtonLabel="arrowright"
            rightButtonPress={() => {
              handlePageChange(1);
            }}
          />
        </View>
        <View key="2">
          <Page
            backgroundColor={whiteHex}
            pics={require('../../assets/onBoardingsecond.png')}
            title="Lorem ipsum dolor sit amet"
            subtitle="Lorem ipsum dolor sit amet elit, consectetur adipiscing elit."
          />
          <Footer
            pageNo="2"
            backgroundColor={whiteHex}
            rightButtonLabel="arrowright"
            rightButtonPress={() => {
              handlePageChange(2);
            }}
          />
        </View>
        <View key="3">
          <Page
            backgroundColor={whiteHex}
            pics={require('../../assets/onBoardingthird.png')}
            title="Lorem ipsum dolor sit amet"
            subtitle="Lorem ipsum dolor sit amet elit, consectetur adipiscing elit."
          />
          <Footer
            pageNo="3"
            backgroundColor={whiteHex}
            rightButtonLabel="arrowright"
            rightButtonPress={() => {
              navigation.navigate('LogInAs');
            }}
          />
        </View>
      </PagerView>
    </View>
  );
};

export default OnBoarding;


