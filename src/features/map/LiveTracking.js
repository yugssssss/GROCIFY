import React, { useCallback, useEffect } from 'react';
import { useAuthStore } from '../../state/authStore';
import { getOrderById } from '../../service/OrderService';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Colors } from '@utils/Constants';
import LiveHeader from './LiveHeader';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialIcons'
import CustomText from '../../Components/ui/CustomText';
import { Fonts } from '@utils/Constants';
import OrderSummary from './OrderSummary';
import DeliveryDetails from './DeliveryDetails';
import LiveMap from './LiveMap';
import { useFocusEffect } from '@react-navigation/native';

const LiveTracking = () => {
  const { currentOrder, setCurrentOrder } = useAuthStore();

  const fetchOrderDetails = async () => {
    const data = await getOrderById(currentOrder?._id);
    setCurrentOrder(data);
  };

  useFocusEffect(
    useCallback(() => {
      fetchOrderDetails();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      console.log("LiveTracking screen focused!");
      fetchOrderDetails();
    }, [])
  );

  let msg = "Packing your order";
  let time = "Arriving in 10 minutes";

  if (currentOrder?.status === 'confirmed') {
    msg = 'Arriving Soon';
    time = 'Arriving in 8 minutes';
  } else if (currentOrder?.status === 'arriving') {
    msg = 'Order Picked Up';
    time = 'Arriving in 6 minutes';
  } else if (currentOrder?.status === 'delivered') {
    msg = 'Order Delivered';
    time = 'Fastest Delivery';
  }

  return (
    <View style={styles.container}>
      <LiveHeader type="Customer" title={msg} secondTitle={time} />


      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      > 

        <LiveMap
          deliveryLocation={currentOrder?.deliveryLocation}
          pickupLocation={currentOrder?.pickupLocation}
          deliveryPersonLocation={currentOrder?.deliveryPersonLocation}
          hasAccepted={currentOrder?.status == 'confirmed'}
          hasPickUp={currentOrder?.status == 'arriving'}
        />
        <View style={styles.flexRow}>
          <View style={styles.iconContainer}>

            <Icon
              name={currentOrder?.deliveryPartner ? 'phone' : 'shopping-bag'}
              color={Colors.disabled}
              size={RFValue(20)}
            />
          </View>
          <View style={{ width: '82%' }}>
            <CustomText
              numberOfLines={1}
              varient='h7'
              fontFamily={Fonts.SemiBold}
            >
              {
                currentOrder?.deliveryPartner?.name ||
                'We will soon assign delivery partner'
              }

            </CustomText>
            <CustomText varient='h7' fontFamily={Fonts.Medium}>
              {currentOrder?.deliveryPartner?.phone}
            </CustomText>
            <CustomText varient='h9' fontFamily={Fonts.Medium}>
              {currentOrder?.deliveryPartner ? 'For Delivery instructions you can contact here' : msg}
            </CustomText>
          </View>
        </View>
        <DeliveryDetails details={currentOrder?.customer} />
        <OrderSummary order={currentOrder} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#007200"
  },
  scrollContent: {
    paddingBottom: 150,
    backgroundColor: Colors.backgroundSecondary,
    padding: 15
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    borderRadius: 15,
    marginTop: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 0.7,
    borderColor: Colors.border
  },
  iconContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
})


export default LiveTracking;