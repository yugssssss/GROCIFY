import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '../../utils/Constants.tsx'
import CustomText from './CustomText'

const CustomButton = ({onPress,loading,title,disabled}) => {
  return (
    <TouchableOpacity
    onPress={() => {
      console.log("CustomButton Pressed");  // Check if button press is detected
      if (!disabled) {
        onPress();
      }
    }}
    disabled={disabled}
    activeOpacity={0.8}
    style={[styles.btn,{
      backgroundColor:disabled ? '#9197a6' :'#490D83'
    }]}
    >
      {
        loading ?
        <ActivityIndicator color='#fff' size='small'/>:
        <CustomText style={styles.text} varient='h6' fontFamily={Fonts.SemiBold}>
          {title}
        </CustomText>

      }
      
    </TouchableOpacity>
  )
}

const styles= StyleSheet.create({
  btn:{
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    padding:15,
    marginVertical:15,
    width:'90%',
  },
  text:{
    color:'#fff'
  },
})

export default CustomButton