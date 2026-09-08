import { PaymentIntent, SetupIntent } from '@stripe/stripe-react-native';
import React, { useState } from 'react';
import { Alert, StyleSheet, TextInput, View } from 'react-native';
import {
  useConfirmSetupIntent,
  verifyMicrodepositsForSetup,
  VerifyMicrodepositsParams,
  collectBankAccountForSetup,
} from '@stripe/stripe-react-native';
import Button from './Button';
import PaymentScreen from './PaymentScreen';
import { colors } from './colors';
import { PostAPIRequest } from '../../../API/Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ACHSetupScreenProps {
  navigation: any;
}
// const clientSecret =
//   'seti_1Nc1oDIJ7KEtTXoaVj3tE0S4_secret_OOpTQWYn2oYd1clGj1P0XBb4u4zMTsg';

export default function ACHSetupScreen({ navigation }: ACHSetupScreenProps) {
  const [name, setName] = useState('Anil Saini');
  const [email, setEmail] = useState('anilsainik10@gmail.com');

  const [accountNumber, setaccountNumber] = useState('000123456789');
  const [routingNumber, setroutingNumber] = useState('110000000');

  const { confirmSetupIntent, loading } = useConfirmSetupIntent();
  const [secret, setSecret] = useState('');
  const [canConfirm, setCanConfirm] = useState(false);

  const [awaitingVerification, setAwaitingVerification] = useState(false);
  const [verificationText, setVerificationText] = useState('32,45');

  const fetchSetupIntentClientSecret = async () => {
    try {
      const response = await fetch(
        `https://chirpvet.com:3000/api/v1/mentee/create-intent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            payment_method_types: 'us_bank_account',
          }),
        },
      );

      console.log("response", response)
      const { data, error } = await response.json();
      const { clientSecret, publishableKey } = data;
      return { clientSecret, error };

    } catch (error) {
      // console.log("response", response)
      console.log('Error while fetching client secret', error)
      return {};
    }
  };

  const handleCollectBankAccountPress = async () => {
    const { clientSecret, error: clientSecretError } =
      await fetchSetupIntentClientSecret();

    if (clientSecretError) {
      Alert.alert(`Error`, clientSecretError);
      return;
    }
    console.log('data', clientSecret)

    try {

      const { setupIntent, error } = await collectBankAccountForSetup(
        clientSecret,
        {
          paymentMethodType: 'USBankAccount',
          paymentMethodData: {
            billingDetails: {
              name,
              email,
            },
          },
        },
      );

      console.log(
        'PaymentIntent-handle-Collect-BankAccount-Press ------------->',
        // PaymentIntent,
        setupIntent
      );
      setSecret(clientSecret);

      if (error) {
        console.log(error);
        Alert.alert(`Error code: ${error.code}`, error.message);
      } else if (setupIntent) {
        if (setupIntent.status === SetupIntent.Status.RequiresConfirmation) {
          Alert.alert(
            'Requires Confirmation',
            "You may now press the first 'Confirm' button.",
          );
        } else {
          if (
            setupIntent.status === SetupIntent.Status.RequiresAction &&
            setupIntent?.nextAction?.type === 'verifyWithMicrodeposits'
          ) {
            setAwaitingVerification(true);
          }
          Alert.alert('Setup status:', setupIntent.status);
        }
        setCanConfirm(true);
      }

    } catch (error) {
      console.log("Error", error);
    }

  };

  const handleConfirmPress = async () => {
    const { error, setupIntent } = await confirmSetupIntent(secret, {
      paymentMethodType: 'USBankAccount',
    });
    console.log(
      'setupIntent-handle-confirm-press ------------->',
      PaymentIntent,
    );

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else if (setupIntent) {
      if (setupIntent.status === SetupIntent.Status.Processing) {
        Alert.alert(
          'Processing',
          `The setup has been successfully submitted and is now processing.`,
        );
      } else if (setupIntent.status === SetupIntent.Status.Succeeded) {
        Alert.alert('Success', `The setup was confirmed successfully!`);
      } else if (
        setupIntent.status === SetupIntent.Status.RequiresAction &&
        setupIntent?.nextAction?.type === 'verifyWithMicrodeposits'
      ) {
        setAwaitingVerification(true);
        Alert.alert(
          'Awaiting verification',
          'The setup must be verified. Please provide the verification input values below.',
        );
      } else {
        Alert.alert('Setup status:', setupIntent.status);
      }
      setCanConfirm(false);
    }
  };

  const handleConfirmManualBankAccountParamsPress = async () => {
    const { clientSecret, error: clientSecretError } =
      await fetchSetupIntentClientSecret();

    if (clientSecretError) {
      Alert.alert(`Error`, clientSecretError);
      return;
    }
    setSecret(clientSecret);
    // setSecret('seti_1NcKBPIJ7KEtTXoaxDrODnKs_secret_OP8SMpeRwTcSgDUGgaNtZG5kZdDwPEE');
    // console.log('data.client_secret', data.client_secret)
    const { error, setupIntent } = await confirmSetupIntent(secret, {
      paymentMethodType: 'USBankAccount',
      paymentMethodData: {
        accountNumber: accountNumber,
        routingNumber: routingNumber,
        billingDetails: {
          name: name,
          email: email,
        },
      },
    });
    console.log(
      'setupIntent-handle-Confirm-Manual-BankAccount-Params-Press-------->',
      PaymentIntent,
    );
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else if (setupIntent) {
      if (setupIntent.status === SetupIntent.Status.Processing) {
        Alert.alert(
          'Processing',
          `The setup has been successfully submitted and is now processing.`,
        );
      } else if (setupIntent.status === SetupIntent.Status.Succeeded) {
        Alert.alert('Success', `The setup was confirmed successfully!`);
      } else if (
        setupIntent.status === SetupIntent.Status.RequiresAction &&
        setupIntent?.nextAction?.type === 'verifyWithMicrodeposits'
      ) {
        setAwaitingVerification(true);
        Alert.alert(
          'Awaiting verification',
          'The setup must be verified. Please provide the verification input values below.',
        );
      } else {
        Alert.alert('Setup status:', setupIntent.status);
      }
    }
  };

  const hanldeVerifyPress = async () => {
    const params: VerifyMicrodepositsParams = verificationText
      .replace(/\s+/g, '')
      .includes(',')
      ? {
        amounts: verificationText.split(',').map(v => parseInt(v, 10)),
      }
      : { descriptorCode: verificationText };

    const { setupIntent, error } = await verifyMicrodepositsForSetup(
      secret,
      params,
    );
    console.log(
      'setupIntent-hanlde-Verify-Press-------->',
      PaymentIntent,
      'params',
      params,
    );
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else if (setupIntent) {
      Alert.alert('Setup status:', setupIntent.status);
      setAwaitingVerification(false);
    }
  };

  const handleCreatePayment = async () => {

    const token = await AsyncStorage.getItem("tokens");
    const formData = new FormData();
    formData.append("customer_id", "cus_OPBxOjwlhU8AYD");
    formData.append("paymentDescription", "test description");
    let res = await PostAPIRequest({formData: formData, endpoint:"/mentee/autodebit", token: null});
    
    console.log(res?.data);
  }

  return (
    <PaymentScreen>
      <View>
        <TextInput
          placeholder="Name"
          // defaultValue="Anil Saini"
          onChange={value => setName(value.nativeEvent.text)}
          style={styles.input}
        />
        <TextInput
          // defaultValue="anil.saini@blockcod.com"
          onChange={value => setEmail(value.nativeEvent.text)}
          style={styles.input}
        />
        <Button
          variant="primary"
          onPress={handleCollectBankAccountPress}
          title="Collect bank account"
          accessibilityLabel="Collect bank account"
        />
        <Button
          variant="primary"
          onPress={handleConfirmPress}
          title="Confirm"
          disabled={!canConfirm}
          accessibilityLabel="Confirm"
          loading={loading}
        />

        {/* <TextInput
          placeholder="Name"
          defaultValue="Anshite Varyani"
          onChange={value => setName(value.nativeEvent.text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          defaultValue="anshita.varyani@blockcod.com"
          onChange={value => setEmail(value.nativeEvent.text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Account Number"
          defaultValue="000123456789"
          onChange={value => setaccountNumber(value.nativeEvent.text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Routing Number"
          defaultValue="110000000"
          onChange={value => setroutingNumber(value.nativeEvent.text)}
          style={styles.input}
        />
        <Button
          variant="primary"
          onPress={handleConfirmManualBankAccountParamsPress}
          title="Confirm (pass bank account details directly)"
          accessibilityLabel="Confirm-manual"
          loading={loading}
        /> */}
      </View>
      {awaitingVerification && (
        <View>
          <TextInput
            placeholder="Descriptor code or comma-separated amounts"
            onChange={value => setVerificationText(value.nativeEvent.text)}
            style={styles.input}
          />
          <Button
            variant="primary"
            onPress={hanldeVerifyPress}
            title="Verify microdeposit"
            accessibilityLabel="Verify microdeposit"
          />
        </View>
      )}

      <View>
        <Button
          variant="primary"
          onPress={() => { handleCreatePayment(); }}
          title="Create a Payment"
          // accessibilityLabel="Verify microdeposit"
        />
      </View>
      <View>
        <Button
          title="Go to Home"
          onPress={() => { navigation.navigate('HomeScreen') }}
        />
      </View>
    </PaymentScreen>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
  },
  input: {
    height: 44,
    borderBottomColor: colors.slate,
    borderBottomWidth: 1.5,
    marginBottom: 20,
  },
  link: { color: 'blue' },
});
