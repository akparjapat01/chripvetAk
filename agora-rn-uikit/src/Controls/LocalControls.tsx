import React, {useContext} from 'react';
import {View} from 'react-native';
import styles from '../Style';
import EndCall from './Local/EndCall';
import LocalAudioMute from './Local/LocalAudioMute';
import LocalVideoMute from './Local/LocalVideoMute';
import SwitchCamera from './Local/SwitchCamera';
import RemoteControls from './RemoteControls';
import {MaxUidConsumer} from '../Contexts/MaxUidContext';
import PropsContext, {Layout} from '../Contexts/PropsContext';
import {ClientRoleType} from 'react-native-agora';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

interface ControlsPropsInterface {
  showButton?: boolean;
  Extrabutn?: any;
}

const Controls: React.FC<ControlsPropsInterface> = props => {
  const {styleProps, rtcProps} = useContext(PropsContext);
  const {localBtnContainer} = styleProps || {};
  const showButton = props.showButton !== undefined ? props.showButton : true;
  const navigation = useNavigation();

  return (
    <>
      <View style={{...styles.Controls, ...(localBtnContainer as object)}}>
        {rtcProps.role !== ClientRoleType.ClientRoleAudience && (
          <>
            <Icon
              name="chat"
              color={'#fff'}
              onPress={() => navigation.goBack()}
              containerStyle={{
                backgroundColor: '#007aff',
                height: 48,
                width: 48,
                borderRadius: 23,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}
            />
            <LocalAudioMute />
            <LocalVideoMute />
            <SwitchCamera />
          </>
        )}
        <EndCall />
      </View>
      {showButton ? (
        <MaxUidConsumer>
          {users => (
            <View
              style={{
                ...styles.Controls,
                bottom: styles.Controls.bottom + 70,
              }}>
              {rtcProps.layout !== Layout.Grid && (
                <RemoteControls user={users[0]} showRemoteSwap={false} />
              )}
            </View>
          )}
        </MaxUidConsumer>
      ) : (
        <></>
      )}
    </>
  );
};

export default Controls;
