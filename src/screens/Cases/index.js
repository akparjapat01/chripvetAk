import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TopTab from '../../navigator/TopTab';
import { porcelain } from '../../constants/colors';

const Cases = props => {
  const navigation = useNavigation();

  return (
    <View style={styles.transactionsContainer}>
      <TopTab />
    </View>
  );
};
export default Cases;
const styles = StyleSheet.create({
  transactionsContainer: {
    backgroundColor: porcelain,
    paddingTop: 15,
    paddingHorizontal: 12,
    width: '100%',
    height: '100%',
  },
});
