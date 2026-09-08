import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import {
  AntIcon,
  FontAwesome5,
} from '../../component/Icons';
import styles from './index.style';

const SpecialistComp = ({ list, onPress }) => {

  const [lastIndex, setLastIndex] = useState(9);
  const smallList = list.slice(0, lastIndex);

  return (
    <>
      <View style={styles.thirdContainer}>
        <View style={styles.availableHeading}>
          <Text style={styles.availableText}>
            Specialist In{' '}
            <Text style={{ fontSize: 10, fontWeight: 'normal' }}>
              (Additional Charges)
            </Text>
          </Text>
          {smallList?.length > 9 && <TouchableOpacity
            onPress={() => { lastIndex <= 9 ? setLastIndex(list.length + 1) : setLastIndex(9); }}>
            <Text style={styles.seeText}>{lastIndex <= 9 ? "See all" : "Show less"}</Text>
          </TouchableOpacity>}

        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
          {smallList.map((item, index) => {
            return (
              <View style={{ width: '18%', marginRight: 6 }} key={item?.id}>
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
                  {(item?.specialist_name).length < 6
                    ? item?.specialist_name
                    : (item?.specialist_name).slice(0, 8) + '...'}
                </Text>
              </View>
            );
          })}

          {lastIndex < list.length ? (<>
            <View style={{ width: '18%', marginRight: 6 }}>
              <TouchableOpacity style={styles.medicalIcons}>
                <AntIcon name="arrowright" size={20} style={styles.iconInner} />
              </TouchableOpacity>
              <Text style={styles.generalText}>See All</Text>
            </View></>) : (<></>)}

        </View>
      </View>
    </>
  );
};

export default SpecialistComp;
