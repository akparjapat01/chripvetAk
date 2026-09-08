import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import styles from './index.style';
import { BASE_URL_IMAGE } from '../../constants/Host';
import { FontAwesome5 } from '../../component/Icons';
import { black_1 } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';

const MentorListComp = ({ list, onPress }) => {

    const navigation = useNavigation();

    const [lastIndex, setLastIndex] = useState(4);
    const currList = list.slice(0, lastIndex);

    return (
        <>
            <View style={styles.mainContainer}>
                <View style={styles.availableHeading}>
                    <Text style={styles.availableText}>Available Now</Text>
                    {currList?.length > 4 && <TouchableOpacity onPress={() => { navigation.navigate("AllMentorListComp", {data: list}) }} >
                        <Text style={styles.seeText}>{lastIndex < list?.length ? "Show less" : "See all"}</Text>
                    </TouchableOpacity>}
                    
                </View>
                <FlatList
                    data={currList}
                    keyExtractor={(item) => item.id}
                    vertical={false}
                    nestedScrollEnabled={true}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                style={styles.beautyFirstContainer}
                                activeOpacity={0.8}
                                onPress={() => {
                                    onPress(item);
                                }}>
                                <View style={styles.beautyFirstContainerBox}>
                                    <TouchableOpacity
                                        style={styles.beautyImgProfile}
                                        activeOpacity={0.8}>
                                        {(item?.mentor_details[0]?.profile_pic) ? (<>
                                            <Image
                                                source={{ uri: `${BASE_URL_IMAGE}${item?.mentor_details[0]?.profile_pic}` }}
                                                style={{ width: 80, height: 80 }}
                                            />
                                        </>) :
                                            (<>
                                                <FontAwesome5
                                                    name="user-circle"
                                                    size={55}
                                                    style={styles.appLogo}
                                                    color={black_1}
                                                /></>)}

                                        <View style={styles.greenCircle} ></View>
                                    </TouchableOpacity>
                                    <View style={{ width: '68%', marginLeft: 10 }}>
                                        <TouchableOpacity
                                            style={{ flexDirection: 'row' }}
                                            activeOpacity={0.8}>
                                            <Text style={styles.beautyName}>{item?.mentor_details[0]?.name}</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.beautySixteen}>
                                            {(((item?.mentor_details[0]?.mentor_specialist?.[0]?.specialist_name) ? item?.mentor_details[0]?.mentor_specialist?.[0]?.specialist_name : "") + (item?.mentor_details[0]?.mentor_specialist?.[1]?.specialist_name ? ", " + item?.mentor_details[0]?.mentor_specialist?.[1]?.specialist_name : ""))}
                                        </Text>
                                        <View style={styles.callBox}>
                                            <Text style={styles.callText}>Contact Now</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
                {list.length == 0 ? (<>
                    <Text style={styles.noMentorText} >No mentor is available now !</Text>
                </>) : (<></>)}
            </View>
        </>
    );
};

export default MentorListComp;
