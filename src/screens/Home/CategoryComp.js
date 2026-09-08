import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './index.style';
import { AntIcon, FontAwesome5 } from '../../component/Icons';
import { useNavigation } from '@react-navigation/native';

// Pass the list of category in component from parent comp.
const CategoryComp = ({ list, onPress }) => {

  const [lastIndex, setLastIndex] = useState(9);
  const smallList = list.slice(0, lastIndex);
  const navigation = useNavigation();
  
  return (
    <>
      <View style={styles.secondContainer}>
        
        <View style={styles.availableHeading}>
          <Text style={styles.availableText}>General Practice In</Text>
          {smallList?.length > 9 && <TouchableOpacity
            onPress={() => { lastIndex <= 9 ? setLastIndex(list.length + 1) : setLastIndex(9); }}>
            <Text style={styles.seeText}>{lastIndex <= 9 ? "See all" : "Show less"}</Text>
          </TouchableOpacity>}
          
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
          {smallList?.map(item => {
            return (
              <>
                <View
                  style={{ width: '18%', marginRight: 6 }}
                  activeOpacity={0.8}
                  key={item.id}>
                  <TouchableOpacity
                    onPress={() => {
                      onPress(item);
                    }}
                    style={styles.medicalIcons}>
                    {item?.image ? (
                      <>
                        <Image
                          source={{ uri: item.image }}
                          style={styles.categoryImage}
                        />
                      </>
                    ) : (
                      <>
                        <FontAwesome5
                          name="stethoscope"
                          size={20}
                          style={styles.iconInner}
                        />
                      </>
                    )}
                  </TouchableOpacity>
                  <Text style={styles.generalText}>
                    {(item?.category_name).length < 6
                      ? item.category_name
                      : item.category_name.slice(0, 9) + '...'}
                  </Text>
                </View>
              </>
            );
          })}

          {lastIndex < list.length ? (<>
            <View style={{ width: '18%', marginRight: 6 }}>
              <TouchableOpacity onPress={() => { setLastIndex(list.length + 1) }} style={styles.medicalIcons}>
                <AntIcon name="arrowright" size={20} style={styles.iconInner} />
              </TouchableOpacity>
              <View>
                <Text style={styles.generalText}>See All</Text>
              </View>
            </View></>) : (<></>)}

        </View>
      </View>
    </>
  );
};

export default CategoryComp;
