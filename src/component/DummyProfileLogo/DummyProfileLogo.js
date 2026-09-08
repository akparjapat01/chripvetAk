import React from "react";
import { FontAwesome5 } from "../Icons";
import { StyleSheet } from "react-native";
import { black_1 } from "../../constants/colors";

const DummyProfileLogo = () => {

    return (
        <>
                <FontAwesome5
                    name="user-circle"
                    size={50}
                    style={styles.appLogo}
                    color={black_1}
                />
        </>
    );
};

export default DummyProfileLogo;

const styles = StyleSheet.create({
    appLogo: {
        borderRadius: 32,
        alignSelf:"center",
        alignItems:"center"
    },
})