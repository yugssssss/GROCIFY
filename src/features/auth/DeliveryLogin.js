import { View, Text, Alert, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { deleveryLogin } from '@service/authServices'
import { resetAndNavigate } from '@utils/NavigationUtils'
import CustomSafeAreaView from '../../Components/Global/CustomSafeAreaView.js'
import { Container } from 'postcss'
import { screenHeight } from '@utils/Scaling'
import LottieView from 'lottie-react-native'
import CustomText from '../../Components/ui/CustomText.js'
import { Fonts } from '@utils/Constants'
import CustomInput from '../../Components/ui/CustomInput.js'
import { RFValue } from 'react-native-responsive-fontsize'
import Icon from 'react-native-vector-icons/Ionicons'
import CustomButton from '../../Components/ui/CustomButton.js'
import { useAuthStore } from '../../state/authStore.ts'

const DeliveryLogin = () => {

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [loading, setloading] = useState(false)
const {user , setUser} = useAuthStore()

  const handleLogin = async () => {
    setloading(true)
    try {
      await deleveryLogin(email, password)
      if(user){
        console.log("delivery login :",user);
        
        resetAndNavigate("DeliveryDashboard")
      }
    } catch (error) {
      Alert.alert("Login failed")
    } finally {
      setloading(false)
    }
  }

  return (
    <CustomSafeAreaView>
      <ScrollView keyboardShouldPersistTaps='handled' keyboardDismissMode='on-drag'>
        <View style={styles.container}>
          <View style={styles.lottieContainer}>
            <LottieView autoPlay loop style={styles.lottie} source={require('@assets/animations/delivery_man.json')}
              hardwareAccelerationAndroid
            />
          </View>
          <CustomText varient='h3' fontFamily={Fonts.Bold}>
            Delivery Partner Portal
          </CustomText>
          <CustomText varient='h6' style={styles.text} fontFamily={Fonts.SemiBold}>
            Faster than Flash⚡
          </CustomText>

          <CustomInput
            onChangeText={setemail}
            value={email}
            left={
              <Icon name='mail'
                color='#F8890E'
                style={{ marginLeft: 10 }}
                size={RFValue(18)}
              />

            }
            placeholder='Email'
            inputMode='email'
            right={false}

          />
          <CustomInput
            onChangeText={setpassword}
            value={password}
            left={
              <Icon name='key-sharp'
                color='#F8890E'
                style={{ marginLeft: 10 }}
                size={RFValue(18)}
              />

            }
            placeholder='Password'
            secureTextEntry={true}
            inputMode='numeric'
            right={false}

          />
          <CustomButton
          disabled={email.length ==0 || password.length < 8}
          title='Login'
          onPress={handleLogin}
          loading={loading}
          />


        </View>
      </ScrollView>
    </CustomSafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  lottie: {
    height: '100%',
    width: '100%',

  },
  lottieContainer: {
    height: screenHeight * 0.12,
    width: '100%',

  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8
  },
})

export default DeliveryLogin