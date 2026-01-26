import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@utils/Constants'
import { useAuthStore } from '../../state/authStore'
import Geolocation from '@react-native-community/geolocation'
import { sendLiveOrderUpdates } from '../../service/OrderService'
import { hocStyles } from '../../Styles/GlobalStyles'
import CustomText from '../../Components/ui/CustomText'
import { Fonts } from '@utils/Constants'
import { navigate } from '@utils/NavigationUtils'

const WithLiveOrder = (WrappedComponent) => {
    const WithLiveComponent = (props) => {
        const { currentOrder, user } = useAuthStore()
        const [myLocation, setmyLocation] = useState(null)

        useEffect(() => {

            if (currentOrder) {
                const watchId = Geolocation.watchPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords
                        console.log("Live Trackingg 🔴🔴", "Lat :", new Date().toLocaleDateString(), latitude.toFixed(3), "Long :", longitude.toFixed(3));
                        setmyLocation({ latitude, longitude })
                    },
                    (error) => console.log("error fetching Location  ", error),
                    { enableHighAccuracy: true, distanceFilter: 200 }

                )
                return () => Geolocation.clearWatch(watchId)

            }
        }, [currentOrder])

        useEffect(() => {

            async function sendLiveUpdates() {
                if (currentOrder?.deliveryPartner?.id == user?._id && currentOrder?.status != "delivered" && currentOrder?.status != 'cancelled') {
                    sendLiveOrderUpdates(currentOrder?._id, myLocation, currentOrder?.status)
                }
            }
            sendLiveUpdates()
        }, [myLocation])

        return (
            <View style={styles.container}>
                <WrappedComponent {...props} />
                {
                    currentOrder && (
                        <View style={[hocStyles.cartContainer, { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 ,width:'100%'}]}>
                            <View style={styles.flexRow}>
                                <View style={styles.img}>
                                    <Image
                                    source={require('../../assets/icons/bucket.png')}
                                    style={{width:20,height:20}}
                                    />

                                </View>
                               <View style={{width:'62%'}}>
                                <CustomText varient='h6' fontFamily={Fonts.SemiBold}>
                                    #{currentOrder?.orderId}
                                </CustomText>

                                <CustomText varient='h9' fontFamily={Fonts.Medium}>
                                    #{currentOrder?.deliveryLocation?.address}{' '}
                                </CustomText>


                                </View> 

                                <TouchableOpacity
                                onPress={()=>
                                    navigate('DeliveryMap',{
                                        ...currentOrder
                                    })
                                }
                                style={styles.btn}
                                >
                                    <CustomText
                                    varient='h8'
                                    style={{colors:Colors.secondary}}
                                    fontFamily={Fonts.Medium}
                                    >
                                        Countinue
                                    </CustomText>

                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }
            </View>
        )

    }
    return WithLiveComponent
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderRadius: 15,
        marginBottom: 15,
        paddingVertical: 10,
        padding: 10
    },
    img: {
        backgroundColor: Colors.backgroundSecondary,
        borderRadius: 100,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 0.7,
        borderColor: Colors.secondary,
        borderRadius: 5
    }
});

export default WithLiveOrder
