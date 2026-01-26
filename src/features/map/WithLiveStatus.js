import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "@utils/Constants";
import { useAuthStore } from "@state/authStore.ts";
import { useNavigationState } from "@react-navigation/native";
import { View } from "react-native";
import { useEffect } from "react";
import { SOCKET_URL } from "@service/config";
import { transform } from "@babel/core";
import { ConfirmOrder } from "Server/controllers/order/order";
import { hocStyles } from "../../Styles/GlobalStyles";
import CustomText from "../../Components/ui/CustomText";
import { Fonts } from "@utils/Constants.tsx";
import { navigate } from "@utils/NavigationUtils.tsx";
import { getOrderById } from "../../service/OrderService.js";
import { io } from 'socket.io-client';


const WithLiveStatus = (WrappedComponent) => {

    const WithLiveStatusComponent = (props) => {

        const { currentOrder, setCurrentOrder } = useAuthStore()
        const routeName = useNavigationState(state => state.routes[state.index]?.name)
        const fetchOrderDetails = async () => {
            const data = await getOrderById(currentOrder?._id)
            setCurrentOrder(data)
        }

        useEffect(() => {
            if (currentOrder) {
                const socketInstance = io(SOCKET_URL, {
                    transports: ['websocket'],
                    withCredentials: true
                })
                socketInstance.emit('joinRoom', currentOrder?.id)
                socketInstance?.on('liveTrackingUpdates', (updatedOrder) => {
                    fetchOrderDetails()
                    console.log("recivING Live UPDATES ❤️❤️❤️ ");

                })

                socketInstance.on("orderConfirmed", (ConfirmOrder) => {
                    fetchOrderDetails()
                    console.log("ORDER cONFIRMATION lIVE UPDATES 😍😍😍😍");

                })
                return () => {
                    socketInstance.disconnect()
                }
            }

        }, [currentOrder])


        return (
            <View style={styles.container}>
                <WrappedComponent {...props} />
                {
                    currentOrder && routeName === "ProductDashboard" && (
                        <View style={[hocStyles.cartContainer, { flexDirection: 'row', alignItems: 'center' ,width:'100%'}]}>
                            <View style={styles.flexRow}>
                                <View style={styles.img}>
                                    <Image
                                        source={require('@assets/icons/bucket.png')}
                                        style={{ width: 20, height: 20 }}
                                    />

                                </View>
                                <View style={{ width: '68%' }}>
                                    <CustomText
                                        varient='h7'
                                        fontFamily={Fonts.SemiBold}
                                    >
                                        {currentOrder?.items[0]?.item.name +
                                            (
                                                currentOrder?.items?.length - 1 > 0
                                                    ? `and ${currentOrder?.items?.length - 1} + items`
                                                    : ''
                                            )}

                                    </CustomText>

                                </View>


                            </View>
                            <TouchableOpacity
                            
                            onPress={()=>navigate('LiveTracking')}
                            style={styles.btn}
                            >
                                <CustomText
                                fontFamily={Fonts.Medium}
                                varient='h8'
                                style={{
                                    color:Colors.secondary
                                }}
                                >
                                    View
                                </CustomText>
                                    
                            </TouchableOpacity>
                        </View>

                    )
                }
            </View>
        )
    }
    return WithLiveStatusComponent

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:'100%'
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

 export default WithLiveStatus