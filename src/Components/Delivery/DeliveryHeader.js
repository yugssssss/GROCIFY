import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import CustomText from '../ui/CustomText';
import { storage, tokenStorage } from '../../state/Storage';
import { resetAndNavigate } from '@utils/NavigationUtils';
import { useAuthStore } from '@state/authStore.ts';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Colors } from '@utils/Constants';
import { Fonts } from '@utils/Constants';


const DeliveryHeader = ({name,email}) => {


const {logout} = useAuthStore()




    return (
        <View style={styles.flexRow}>
          <View style={styles.imgContainer}>
            <Image
              source={require('@assets/images/delivery_boy.png')}
              style={styles.img}
            />
          </View>
          <View style={styles.infoContainer}>
            <CustomText variant="h4" fontFamily={Fonts.SemiBold}>
              Hello {name}!
            </CustomText>
            <CustomText variant="h8" fontFamily={Fonts.Medium}>
              {email}
            </CustomText>
          </View>
    
          <TouchableOpacity
           onPress={() => {
            setTimeout(() => {
              resetAndNavigate('CustomerLogin');
               logout()
               tokenStorage.clearAll()
               storage.clearAll()
            }, 100); // Delay of 100 milliseconds
          }}
          >
           <Icon name="logout" size={30} color="black"/>
          </TouchableOpacity>
        </View>
      );
}

export default DeliveryHeader

const styles = StyleSheet.create({
    flexRow: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row', 
        padding: 10
    },
    imgContainer: {
        padding: 4,
        borderRadius: 100,
        height: 60,
        width: 60,
        overflow: 'hidden',
        backgroundColor: Colors.backgroundSecondary
    },
    img: {
        width: '100%',
        bottom: -8,
        height: '100%',
        resizeMode: 'contain'
    },
    infoContainer: {
        width: '70%',
    }
}) 