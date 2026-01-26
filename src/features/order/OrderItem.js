import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@utils/Constants'
import CustomText from '../../Components/ui/CustomText.js'
import { Fonts } from '@utils/Constants'
import UniversalAdd from '../../Components/ui/UniversalAdd.js'
const OrderItem = ({item}) => {
  return (
    <View style={styles.flexRow}>
      <View style={styles.imgContainer}>
        <Image  source={{uri:item?.item?.image}} style={styles.img}/>
      </View>

      <View style={{width:'55%'}}>
            <CustomText numberOfLines={2} varient='h8' fontFamily={Fonts.Medium}>
                {item.item.name}
            </CustomText>
            <CustomText varient='h9'>{item.item.quantity}</CustomText>
      </View>
      <View style={{width:'20%',alignItems:'flex-end'}}>
            <UniversalAdd item={item.item}/>
            <CustomText
            varient='h8'
            fontFamily={Fonts.Medium}
            style={{alignSelf :'flex-end', marginTop :4}}
            >
                ₹{item.count * item.item.price}

            </CustomText>
      </View>
    </View>
  )
}

export default OrderItem

const styles = StyleSheet.create({
    img: {
      width: 40,
      height: 40,
    },
    imgContainer: {
      backgroundColor: Colors.backgroundSecondary,
      padding: 10,
      borderRadius: 15,
      width: '17%',
    },
    flexRow: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 12,
      paddingHorizontal: 10,
      paddingVertical: 12,
      borderTopWidth: 0.6,
      borderTopColor: Colors.border,
    },
  });
  