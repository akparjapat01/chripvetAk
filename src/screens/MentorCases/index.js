import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MentorTopTab from '../../navigator/MentorTopTab';
import styles from './index.style';

const MentorCases = props => {
  const navigation = useNavigation();

  return (
    <View style={styles.transactionsContainer}>
      <MentorTopTab />
    </View>
  );
};
export default MentorCases;
