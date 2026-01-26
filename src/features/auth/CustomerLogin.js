import { View, Text, SafeAreaView, StyleSheet, Image, Keyboard, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import CustomSafeAreaView from '../../Components/Global/CustomSafeAreaView.js'
import ProductSlider from '../../Components/Login/ProductSlider.js'
import CustomText from '../../Components/ui/CustomText.js'
import { RFValue } from 'react-native-responsive-fontsize'
import { Animated } from 'react-native'
import useKeyboardOffsetHeight from '../../utils/useKeyboardOffsetHeight.tsx'
import { Fonts } from '../../utils/Constants.tsx'
import CustomInput from '../../Components/ui/CustomInput.js'
import CustomButton from '../../Components/ui/CustomButton.js'
import { customerLogin } from '../../service/authServices.js'
import { resetAndNavigate } from '../../utils/NavigationUtils.tsx'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useAuthStore } from '../../state/authStore.ts'
const CustomerLogin = () => {
  const [phoneNumber, setphoneNumber] = useState('');
  const [loading, setloading] = useState(false)
const {user , setUser} = useAuthStore()

  const animatedValue = useRef(new Animated.Value(0)).current;

  const keyboardOffsetHeight = useKeyboardOffsetHeight()

  useEffect(() => {
    if (keyboardOffsetHeight === 0) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }).start()
    }
    else {
      Animated.timing(animatedValue, {
        toValue: -keyboardOffsetHeight * 0.84,
        duration: 1000,
        useNativeDriver: true
      }).start()
    }

  }, [keyboardOffsetHeight])


  const handleAuth = async () => {
    
    Keyboard.dismiss()
    console.log("hello");
    setloading(true)
    try {
      await customerLogin(phoneNumber)
if(user){

  resetAndNavigate('ProductDashboard')
}
    } catch (error) {
      Alert.alert("Login Failed")
    } finally {
      setloading(false)
    }
  }


  return (
    <View className='flex-1 '>
      <CustomSafeAreaView>
        <ProductSlider />
        <Animated.ScrollView
          bounces={false}
          style={{ transform: [{ translateY: animatedValue }] }}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.subContainer}
        >
          <View className='justify-center items-center w-full bg-white  pb-5'>
            <Image className='h-20 w-20 rounded-full mb-5 mt-2' source={require('@assets/images/logo.jpeg')} />
            <CustomText varient='h2' fontFamily={Fonts.Bold}>
              Grocery Delivery App
            </CustomText>
            <CustomText varient='h5' fontFamily={Fonts.SemiBold} style={styles.text}>
              Log in or Sign up
            </CustomText>


            <CustomInput
              onChangeText={text => setphoneNumber(text)}
              onClear={() => setphoneNumber('')}
              value={phoneNumber}
              inputMode="numeric"
              placeholder="Enter Mobile number"
              left={
                <CustomText
                  style={styles.phoneText}
                  varient={'h6'}
                  fontFamily={Fonts.SemiBold}

                >
                  +91
                </CustomText>}
            />
            <CustomButton
              disabled={phoneNumber?.length != 10}
              onPress={() => handleAuth()}
              loading={loading}
              title='Continue'
            />


          </View>

        </Animated.ScrollView>
      </CustomSafeAreaView>

      <View className='border-t-1 border-gray-900   z-20 absolute bottom-0 justify-center items-center p-7 bg-gray-200 w-full'>
        <SafeAreaView />
        <CustomText varient={'h9'}>
          By Continuing, you agree to our terms of Service & Privacy Policy
        </CustomText>
        <SafeAreaView />

      </View>

      <TouchableOpacity style={styles.absoluteDELIVERY} onPress={()=>resetAndNavigate('DeliveryLogin')}>
        <Icon name='directions-bike' color='#000' size={RFValue(15)}/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,

  },
  phoneText: { marginLeft: 10 },
  text: {
    marginTop: 2,
    marginBottom: 7,
    opacity: 0.8,
  },
  absoluteDELIVERY:{
    position:'absolute',
    top:20,
    zIndex:90,
    backgroundColor:'white',
    shadowColor:'#000',
    shadowOffset:{width:1,height:1},
    shadowOpacity:0.9,
    shadowRadius:12,
    elevation:10,
    padding:20,
    borderRadius:50,
    height:60,
    width:60,
    right:10,
    justifyContent:'center',
    alignItems:'center'
  },
})

export default CustomerLogin 