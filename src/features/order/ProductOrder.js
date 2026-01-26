import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomHeader from '../../Components/ui/CustomHeader.js'
import { ScrollView } from 'react-native-gesture-handler'
import { Colors } from '@utils/Constants.tsx'
import OrderList from './OrderList.js'
import BillDetails from './BillDetails.js'
import { useCartStore } from '@state/CartStore.js'
import { hocStyles } from '../../Styles/GlobalStyles.js'
import CustomText from '../../Components/ui/CustomText.js'
import { Fonts } from '@utils/Constants.tsx'
import { useAuthStore } from '@state/authStore.ts'
import { RFValue } from 'react-native-responsive-fontsize'
import ArrowButton from '../../Components/ui/ArrowButton.js'
import {CreateOrderFunction}  from '../../service/OrderService.js'
import { navigate } from '@utils/NavigationUtils.tsx'
const ProductOrder = () => {

  const { getTotalPrice, cart, clearCart } = useCartStore()
  const { user, setCurrentOrder, currentOrder } = useAuthStore()
  const totalItemPrice = getTotalPrice()
  const [loading, setloading] = useState(false)

  const handlePlaceOrder = async () => {
    if (currentOrder !== null) {
      Alert.alert("Let Your first Order be Delivered")
      return
    }
    console.log("currentOrder is", currentOrder);
    
    const formattedData = cart.map((item) => {
      return {
        id: item._id,
        item: item._id,
        count: item.count
      };
    });
console.log("user  ",user);



    if(formattedData.length == 0 ){
      Alert.alert("Add any item to Place the Order")
      console.log("hello jiiii");
      
      return
    }

    setloading(true)
    console.log("about to call CreateOrderFunction");

    const data = await CreateOrderFunction(formattedData,totalItemPrice,user);

    if(data !=null){
      console.log(data);
      
      setCurrentOrder(data)
      clearCart()
      navigate('OrderSuccess',{...data})
    }else{
      Alert.alert("there iss a error",error)
    }
    setloading(false)
  }

  return (
    <View style={styles.container}>
      <CustomHeader title="Checkout" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <OrderList />

        <BillDetails totalItemPrice={totalItemPrice} />

      </ScrollView>

      <View style={hocStyles.cartContainer}>
        <View style={styles.absoluteContainer}>
          <View style={styles.addressContainer}>
            <View style={styles.flexRow}>
              <Image
                source={require('@assets/icons/home.png')}
                style={{ width: 20, height: 20 }}
              />
              <View style={{ width: '100%' }}>
                <CustomText varient='h8' fontFamily={Fonts.Medium}>
                  Delivering to Home
                </CustomText>
                <CustomText varient='h9' numberOfLines={2} style={{ opacity: 0.6 }}>
                  {user?.address}
                </CustomText>

              </View>
            </View>

          </View>

          <View style={styles.paymentGateway}>
            <View style={{ width: '30%' }}>
              <CustomText fontSize={RFValue(6)} fontFamily={Fonts.Regular}>
                💵 PAY USING
              </CustomText>
              <CustomText
                fontFamily={Fonts.Regular}
                varient='h9'
                style={{ marginTop: 2 }}
              >
                Cash On Delivery
              </CustomText>

            </View>
            <ArrowButton
              loading={loading}
              price={totalItemPrice}
              title="Place Order"
              onPress={handlePlaceOrder}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default ProductOrder

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  scrollContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    paddingBottom: 250,
  },
  paymentGateway: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 14,
    paddingTop: 10,
  },
  addressContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.7,
    borderColor: Colors.border
  },
  absoluteContainer: {
    marginVertical: 15,
    marginBottom: 10,
    width: '100%'
  },
  flexRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
})