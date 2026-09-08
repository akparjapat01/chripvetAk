import React from "react";
import { View, Switch, Text } from "react-native";
import { havlockBlue, porcelain, whiteHex } from "../../constants/colors";

const Switches = (props) => {
  const { isEnabled, toggleSwitch } = props;

  return (
    <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
      <Switch
        trackColor={{ false: porcelain, true: havlockBlue }}
        thumbColor={whiteHex}
        ios_backgroundColor={havlockBlue}
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
      />
       <Text style={{fontSize: 9, alignSelf: 'center', marginLeft: 10}}>{isEnabled ? 'ON' : 'OFF'}</Text>
    </View>
  );
};
export default Switches;
