import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@utils/Constants'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { goBack } from '../../utils/NavigationUtils.tsx'
import { RFValue } from 'react-native-responsive-fontsize'
import CustomText from './CustomText'
import { Fonts } from '@utils/Constants'
const CustomHeader = ({title,search}) => {
  return (
    <SafeAreaView>
        <View style={styles.flexRow}>
            <Pressable onPress={goBack}>
                <Icon name="arrow-back-ios" color={'#363636'} size={RFValue(16)}/>
            </Pressable>
            <CustomText style={styles.text} varient='h5' fontFamily={Fonts.SemiBold}>
                {title}
            </CustomText>
            <View>
                {search && (
                    <Icon name="search" color={'#363636'} size={RFValue(19)}/>
                )}
            </View>
        </View>
    </SafeAreaView>
  )
}

export default CustomHeader

const styles = StyleSheet.create({
    flexRow:{
        padding:10,
        justifyContent:'space-between',
        height:60,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'white',
        borderBottomWidth:0.6,
        borderColor:Colors.border
    },
    text:{
        textAlign:'center',
    },
})