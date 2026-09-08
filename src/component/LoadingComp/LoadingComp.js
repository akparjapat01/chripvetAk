import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { cobalt } from "../../constants/colors";

const LoadingComp = () => {

    return (
        <>
            <View>
                <ActivityIndicator size={"large"} color={cobalt} style={{ alignSelf: "center" }} />
            </View>
        </>
    );
};


export default LoadingComp;

const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:"100%",
        justifyContent:"center",
        flex:1,
        alignItems:"center"
    }
})