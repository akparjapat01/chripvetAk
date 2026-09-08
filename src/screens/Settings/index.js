import React, { useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { AntIcon, MaterialCommunityIcon } from "../../component/Icons";
import PropTypes from "prop-types";
import Switches from "../../component/Switches";
import styles from "./index.style";
import { color_11 } from "../../constants/colors";

const Settings = (props) => {
  const { navigation } = props;
  const [notification, setNotification] = useState(false);
  const toggleNotification = () => {
    setNotification((previousState) => !previousState);
  };

  return (
    
    <View style={styles.settingContainer}>
        <ImageBackground
        source={require('../../assets/backgroundImage.png')}
        style={styles.background}
        resizeMode="contain">
      <Text style={styles.generalSetting}>General Settings</Text>
      <View>
        <TouchableOpacity
          style={styles.settingButtonContainer}
          underlayColor={color_11}
          onPress={() => {
            navigation.navigate("ChangePassword");
          }}
        >
          <View style={styles.settingMain}>
            <View style={styles.iconAndHeading}>
              <View style={styles.iconBorder}>
                <MaterialCommunityIcon
                  name="lock-outline"
                  size={23}
                  style={styles.iconInner}
                />
              </View>
              <Text style={styles.settingHeading}>Change Password</Text>
            </View>
            <View style={styles.secondSection}>
              <AntIcon
                  name="right"
                  size={23}
                  style={styles.settingSymbol}
                />
            </View>
          </View>
          <View style={styles.horizontalLine} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingButtonContainer}
          underlayColor={color_11}
        >
          <View style={styles.settingMain}>
            <View style={styles.iconAndHeading}>
              <View style={styles.iconBorder}>
                <MaterialCommunityIcon
                  name="bell-outline"
                  size={23}
                  style={styles.iconInner}
                />
              </View>
              <Text style={styles.settingHeading}>Notifications</Text>
            </View>
            <View style={styles.secondSection}>
              <Text style={styles.settingSymbol}>
                <Switches
                  isEnabled={notification}
                  toggleSwitch={toggleNotification}
                />
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
    </View>
  );
};
export default Settings;
Settings.propTypes = {
  onPress: PropTypes.func,
};
