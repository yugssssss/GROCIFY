import React, { useCallback, useEffect, useState } from 'react';
import { useAuthStore } from '../../state/authStore';
import { confirmOrder, getOrderById, sendLiveOrderUpdates } from '../../service/OrderService';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Colors } from '@utils/Constants';
import LiveHeader from '../map/LiveHeader';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialIcons'
import CustomText from '../../Components/ui/CustomText';
import { Fonts } from '@utils/Constants';
import OrderSummary from '../map/OrderSummary';
import DeliveryDetails from '../map/DeliveryDetails';
import LiveMap from '../map/LiveMap';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import { hocStyles } from '../../Styles/GlobalStyles';
import CustomButton from '../../Components/ui/CustomButton';

const DeliveryMap = () => {

    const user = useAuthStore(state => state.user)
    const [orderData, setorderData] = useState(null)
    const [myLocation, setmyLocation] = useState(null)
    const route = useRoute()
    const orderDetails = route?.params

    const { currentOrder, setCurrentOrder } = useAuthStore();

    const fetchOrderDetails = async () => {
        const data = await getOrderById(orderDetails?._id);
        setorderData(data);
    };






    useEffect(() => {
        const watchId = Geolocation.watchPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                setmyLocation({ latitude, longitude });
            },
            (err) => console.log("Error Fetching GeoLocation ", err),
            { enableHighAccuracy: true, distanceFilter: 200 }
        );

        return () => Geolocation.clearWatch(watchId);
    }, []);



    useFocusEffect(
        useCallback(() => {
            fetchOrderDetails();
        }, [])
    );

    //   useFocusEffect(
    //     useCallback(() => {
    //       console.log("LiveTracking screen focused!");
    //       fetchOrderDetails();
    //     }, [])
    //   );


    const acceptOrder = async () => {
        const data = await confirmOrder(orderData?._id, myLocation, user?._id);
        if (data) {
            setCurrentOrder(data);
            Alert.alert('Order Accepted, Grab your package');
        } else {
            Alert.alert('There was an error');
        }
        fetchOrderDetails();
    };

    const orderPickedUp = async () => {
        const data = await sendLiveOrderUpdates(
            orderData?._id,
            myLocation,
            'arriving'
        );
        if (data) {
            setCurrentOrder(data);
            Alert.alert("Let's deliver it as soon as possible");
        } else {
            Alert.alert('There was an error');
        }
        fetchOrderDetails();
    };


    const orderDelivered = async () => {
        const data = await sendLiveOrderUpdates(
            orderData?._id,
            myLocation,
            'delivered'
        );
        if (data) {
            setCurrentOrder(null);
            Alert.alert("Woohoo you made it!!!😘😘");
        } else {
            Alert.alert('There was an error');
        }
        fetchOrderDetails();
    };


    let message = 'Start this order';

    if (
        orderData?.deliveryPartner?._id === user?._id &&
        orderData?.status === 'confirmed'
    ) {
        message = 'Grab your order';
    } else if (
        orderData?.deliveryPartner?._id === user?._id &&
        orderData?.status === 'arriving'
    ) {
        message = 'Complete your order';
    } else if (
        orderData?.deliveryPartner?._id === user?._id &&
        orderData?.status === 'delivered'
    ) {
        message = 'Your milestone';
    } else if (
        orderData?.deliveryPartner?._id === user?._id &&
        orderData?.status !== 'available'
    ) {
        message = 'You missed it!';
    }

    useEffect(() => {
        async function sendLiveUpdates() {
            if (
                orderData?.deliveryPartner?._id == user?._id &&
                orderData?.status !== 'delivered' &&
                orderData?.status !== 'cancelled'
            ) {
                await sendLiveOrderUpdates(
                    orderData?._id,
                    myLocation,
                    orderData?.status,
                );

                fetchOrderDetails();
            }
        }

        sendLiveUpdates();
    }, [myLocation]);



    return (
        <>
        {orderData?._id ? (

        <View style={styles.container}>
            <LiveHeader type="Delievry" title={message} secondTitle="Delivery in 10 Mins" />


            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {
                    orderData?.deliveryLocation && orderData?.pickupLocation && (

                        <LiveMap
                            deliveryLocation={orderData?.deliveryLocation || null}
                            pickupLocation={orderData?.pickupLocation || null}
                            deliveryPersonLocation={orderData?.deliveryPersonLocation || myLocation}
                            hasAccepted={orderData?.deliveryPartner?._id == user?._id && orderData?.status == 'confirmed'}
                            hasPickUp={orderData?.status == 'arriving'}
                        />
                    )
                }

                <DeliveryDetails details={orderData?.customer} />
                <OrderSummary order={orderData} />


            </ScrollView>


            {
                orderData?.status !== 'delivered' && orderData?.status !== 'cancelled' && (
                    <View style={[hocStyles.cartContainer, styles.btnContainer,{width:'100%'}]}>
                        {orderData?.status === 'available' && (
                            <CustomButton
                                disabled={false}
                                title="Accept Order"
                                onPress={acceptOrder}
                                loading={false}
                            />
                        )}

                        {orderData?.status === 'confirmed' &&
                            orderData?.deliveryPartner?._id === user?._id && (
                                <CustomButton
                                    disabled={false}
                                    title="Order Picked Up"
                                    onPress={orderPickedUp}
                                    loading={false}
                                />
                            )}
                        {orderData?.status === 'arriving' &&
                            orderData?.deliveryPartner?._id === user?._id && (
                                <CustomButton
                                    disabled={false}
                                    title="Delivered"
                                    onPress={orderDelivered}
                                    loading={false}
                                />
                            )}
                    </View>
                )
            }


        </View>

        ):<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size={'large'} color={'black'}/>
            </View>}
        </>
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
    btnContainer: {
        padding: 10,
        alignItems:'center'
    },
})


export default DeliveryMap;