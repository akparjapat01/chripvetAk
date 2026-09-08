import React from 'react';
import {View, StyleSheet} from 'react-native';
import AvabilityTopTab from '../../navigator/AvalabilityTopTab';
import { porcelain } from '../../constants/colors';

const Avalability = props => {

  return (
    <View style={styles.transactionsContainer}>
      <AvabilityTopTab />
    </View>
  );
};

export default Avalability;
const styles = StyleSheet.create({
  transactionsContainer: {
    backgroundColor: porcelain,
    paddingTop: 15,
    paddingHorizontal: 12,
    width: '100%',
    height: '100%',
  },
});
