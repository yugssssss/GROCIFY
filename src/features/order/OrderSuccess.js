import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import LottieView from 'lottie-react-native'
import { screenWidth } from '@utils/Scaling'
import { Colors } from '@utils/Constants'
import { useAuthStore } from '@state/authStore'
import CustomText from '../../Components/ui/CustomText.js'
import { Fonts } from '@utils/Constants'
import { replace } from '@utils/NavigationUtils'

const OrderSuccess = () => {
const {user} = useAuthStore()

useEffect(()=>{
  const timeoutId = setTimeout(()=>{
    replace('LiveTracking')
  },2300);
  return ()=>clearTimeout(timeoutId)
},[])


  return (
    <View style={styles.container}>
      <LottieView
      source={require('@assets/animations/confirm.json')}
      autoPlay
      duration={2000}
      loop={false}
      speed={1}
      style={styles.LottieView}
      enableMergePathsAndroidForKitKatAndAbove
      hardwareAccelerationAndroid
      />

      <CustomText
      varient='h8'
      fontFamily={Fonts.SemiBold}
      style={styles.orderplaceText}
      >
        ORDER PLACED
      </CustomText>
      <View style={styles.deliveryContainer}>
        <CustomText
        varient='h4'
        fontFamily={Fonts.SemiBold}
        style={styles.deliveryText}
        >
          Delivering to Home
        </CustomText>
        
      </View>
     <CustomText
     varient='h8'
     style={styles.addressText}
     fontFamily={Fonts.Medium}
     >
      {user?.address || 'Somewhere , Knowwhere😘'}
     </CustomText>
      
    </View>
  )
}

export default OrderSuccess

const styles = StyleSheet.create({
  container:{
    justifyContent:'center',
    alignItems:'center',
    flex:1,
  },
  LottieView:{
    width:screenWidth*0.6,
    height:150,
  },
  deliveryContainer:{
    borderBottomWidth:2,
    paddingBottom:4,
    marginBottom:5,

  },
  deliveryText:{
    marginTop:15,
    borderColor:Colors.secondary,
  },
  addressText:{
    opacity:0.8,
    width:'80%',
    textAlign:'center',
    marginTop:10
  },
  orderplaceText:{
    opacity:0.4
  },
})