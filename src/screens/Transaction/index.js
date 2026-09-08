import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcon } from "../../component/Icons";
import { LineChart } from "react-native-chart-kit";
import styles from "./index.style";
import { color_12, color_2, dune, havlockBlue, porcelain, whiteHex } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

function Transaction(props) {

  const navigation = useNavigation();
  const [weekValue, setWeekValue] = useState(true);
  const [monthValue, setMonthValue] = useState(true);
  const [yearValue, setYearValue] = useState(true);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [text, setText] = useState("April 2022");
  const [modes, setMode] = useState("date");
  
  const changeSelectedDate = (event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);
    const tempDate = new Date(currentDate);
    const fDate = tempDate.getMonth() + 1 + "/" + tempDate.getFullYear();
    setText(fDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const weekFunction = () => {
    setWeekValue(!weekValue);
    setMonthValue(true);
    setYearValue(true);
  };
  const monthFunction = () => {
    setMonthValue(!monthValue);
    setWeekValue(false);
    setYearValue(true);
  };
  const yearFunction = () => {
    setYearValue(!yearValue);
    setMonthValue(true);
    setWeekValue(false);
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={'handled'}
      style={styles.transactionsContainer}
    >
      
      <Text style={styles.earningText}>Total Earnings</Text>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.dollarText}>$236,770</Text>
        <View style={styles.weekSection}>
          <TouchableOpacity
            onPress={() => {
              // weekFunction();
              navigation.navigate("PaymentMethod");
            }}
            style={weekValue ? styles.clickStyle : styles.noClickStyle}
          >
            <Text style={weekValue ? styles.wStyle : styles.noWStyle}>W</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={monthFunction}
            style={monthValue ? styles.noClickStyle : styles.clickStyle}
          >
            <Text style={monthValue ? styles.noWStyle : styles.wStyle}>M</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={yearFunction}
            style={yearValue ? styles.noClickStyle : styles.clickStyle}
          >
            <Text style={yearValue ? styles.noWStyle : styles.wStyle}>Y</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={() => showMode("date")} activeOpacity={0.8}>
        <View
          style={styles.lessThenIconContainer}
        >
          <MaterialCommunityIcon
            name="less-than"
            size={22}
            style={styles.lessThanIcon}
          />
          <Text style={{ color: dune, fontWeight: "bold", fontSize: 15 }}>
            {text}
          </Text>

          <MaterialCommunityIcon
            name="greater-than"
            size={22}
            style={styles.greaterThanIcon}
          />
        </View>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={modes}
          is24Hour={true}
          display="default"
          onChange={changeSelectedDate}
          confirmBtnText="OK"
          cancelBtnText="Cancel"
          dateFormat="MM-YYYY"
        />
      )}
      <LineChart
        data={{
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          datasets: [
            {
              data: [410, 790, 240, 600, 450, 630, 420],
            },
          ],
        }}
        width={Dimensions.get("window").width}
        height={220}
        yAxisLabel={"$"}
        chartConfig={{
          backgroundGradientFrom: havlockBlue,
          backgroundGradientFromOpacity: '0',
          backgroundGradientTo: "rgba(92, 150, 208, 0)",
          backgroundGradientToOpacity: '104%',
          decimalPlaces: 0,
          color: (opacity = 255) => {color_2},
          propsForDots: {
            r: "0",
            strokeWidth: "0",
          },
          propsForBackgroundLines: {
            opacity: 0,
          },
        }}
        bezier
        style={{
          marginTop: 25,
        }}
      />
      <Text style={styles.historyText}>Transactions History</Text>
      <View style={styles.beautyFirstContainer}>
        <View style={styles.beautyFirstContainerBox}>
          <View style={styles.beautyImgProfile}>
          <Image
              source={require("../../assets/transactionImage.png")}
              style={styles.image}
            />
          </View>
          <View style={{ width: "58%" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.beautyName}>Gretchen Siphron</Text>
            </View>
            <Text style={styles.beautySixteen}>06 April 2022</Text>
          </View>
          <View style={{ width: "20%" }}>
            <Text style={styles.text_1} >$59.99 </Text>
          </View>
        </View>
      </View>
      <View style={styles.beautyFirstContainer}>
        <View style={styles.beautyFirstContainerBox}>
          <View style={styles.beautyImgProfile}>
            <Image
               source={require("../../assets/transactionImage.png")}
              style={styles.image}
            />
          </View>
          <View style={{ width: "58%" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.beautyName}>Gretchen Siphron</Text>
            </View>
            <Text style={styles.beautySixteen}>06 April 2022</Text>
          </View>
          <View style={{ width: "20%" }}>
            <Text
              style={styles.text_1}
            >
              $59.99
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.beautyFirstContainer}>
        <View style={styles.beautyFirstContainerBox}>
          <View style={styles.beautyImgProfile}>
          <Image
               source={require("../../assets/transactionImage.png")}
              style={styles.image}
            />
          </View>
          <View style={{ width: "58%" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.beautyName}>Gretchen Siphron</Text>
            </View>
            <Text style={styles.beautySixteen}>06 April 2022</Text>
          </View>
          <View style={{ width: "20%" }}>
            <Text
              style={styles.text_1}
            >
              $59.99
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.beautyFirstContainer}>
        <View style={styles.beautyFirstContainerBox}>
          <View style={styles.beautyImgProfile}>
          <Image
               source={require("../../assets/transactionImage.png")}
              style={{ width: 57, height: 57 }}
            />
          </View>
          <View style={{ width: "58%" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.beautyName}>Gretchen Siphron</Text>
            </View>
            <Text style={styles.beautySixteen}>06 April 2022</Text>
          </View>
          <View style={{ width: "20%" }}>
            <Text
              style={styles.text_1}
            >
              $59.99
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.beautyFirstContainer}>
        <View style={styles.beautyFirstContainerBox}>
          <View style={styles.beautyImgProfile}>
          <Image
               source={require("../../assets/transactionImage.png")}
              style={{ width: 57, height: 57 }}
            />
          </View>
          <View style={{ width: "58%" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.beautyName}>Gretchen Siphron</Text>
            </View>
            <Text style={styles.beautySixteen}>06 April 2022</Text>
          </View>
          <View style={{ width: "20%" }}>
            <Text
              style={styles.text_1}
            >
              $59.99
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.beautyFirstContainer}>
        <View style={styles.beautyFirstContainerBox}>
          <View style={styles.beautyImgProfile}>
          <Image
               source={require("../../assets/transactionImage.png")}
              style={styles.image}
            />
          </View>
          <View style={{ width: "58%" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.beautyName}>Gretchen Siphron</Text>
            </View>
            <Text style={styles.beautySixteen}>06 April 2022</Text>
          </View>
          <View style={{ width: "20%" }}>
            <Text
              style={styles.text_1}
            >
              $59.99
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.beautyFirstContainer}>
        <View style={styles.beautyFirstContainerBox}>
          <View style={styles.beautyImgProfile}>
          <Image
               source={require("../../assets/transactionImage.png")}
              style={styles.image}
            />
          </View>
          <View style={{ width: "58%" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.beautyName}>Gretchen Siphron</Text>
            </View>
            <Text style={styles.beautySixteen}>06 April 2022</Text>
          </View>
          <View style={{ width: "20%" }}>
            <Text style={styles.text_1}>$59.99</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
export default Transaction;
