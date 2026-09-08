
import React, { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useStripe } from '@stripe/stripe-react-native';
import {
  Linking,
  StyleSheet,
  View,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { colors } from './colors';
import Button from './Button';
import { Collapse } from './Collapse';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { handleURLCallback } = useStripe();

  const handleDeepLink = useCallback(
    
    async (url: string | null) => {
      if (url) {
        const stripeHandled = await handleURLCallback(url);
        if (stripeHandled) {
          console.log("2222222222222222222222222222222222222222222222222")
          navigation.navigate('PaymentResultScreen', { url });
        }
      }
    },
    [navigation, handleURLCallback]
  );

  useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      handleDeepLink(initialUrl);
    };

    getUrlAsync();

    const deepLinkListener = Linking.addEventListener(
      'url',
      (event: { url: string }) => {
        handleDeepLink(event.url);
      }
    );

    return () => deepLinkListener.remove();
  }, [handleDeepLink]);

  return (
    <ScrollView accessibilityLabel="app-root" style={styles.container}>

      <Collapse title="Bank Debits">
        <>
          <View style={styles.buttonContainer}>
            <Button
              title="ACH setup"
              onPress={() => {
                navigation.navigate('ACHSetupScreen');
              }}
            />
          </View>
        </>
      </Collapse>
  
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomColor: colors.blurple,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});