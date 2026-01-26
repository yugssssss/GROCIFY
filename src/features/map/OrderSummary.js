import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Colors } from '@utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '../../Components/ui/CustomText';
import { Fonts } from '@utils/Constants';
import BillDetails from '../order/BillDetails';

const OrderSummary = ({ order }) => {
    const totalPrice =
        order?.items?.reduce(
            (total, cartItem) =>
                total + cartItem.item.price * cartItem.count,
            0
        ) || 0;

    return (
        <View style={styles.container}>
            <View style={styles.flexRow}>
                <View style={styles.iconContainer}>
                    <Icon name="shopping-bag" size={RFValue(20)} color={Colors.disabled} />
                </View>
                <View>
                    <CustomText varient='h7' fontFamily={Fonts.SemiBold}>
                        Order summary

                    </CustomText>
                    <CustomText varient='h9' fontFamily={Fonts.Medium}>
                        Order ID - #{order?.orderId}

                    </CustomText>

                </View>
            </View>

            {order?.items?.map((item, index) => {
                return (
                    <View style={styles.flexRow} key={index}>
                        <View style={styles.imgContainer}>
                            <Image source={{ uri: item?.item?.image }} style={styles.img} />
                        </View>

                        <View style={{ width: '55%' }}>
                            <CustomText
                                numberOfLines={2}
                                variant="h8"
                                fontFamily={Fonts.Medium}>
                                {item.item.name}
                            </CustomText>
                            <CustomText variant="h9">{item.item.quantity}</CustomText>
                        </View>

                        <View style={{ width: '20%', alignItems: 'flex-end' }}>
                            <CustomText
                                variant="h8"
                                fontFamily={Fonts.Medium}
                                style={{ alignSelf: 'flex-end', marginTop: 4 }}>
                                ₹{item.count * item.item.price}
                            </CustomText>
                            <CustomText
                                variant="h8"
                                fontFamily={Fonts.Medium}
                                style={{ alignSelf: 'flex-end', marginTop: 4 }}>
                                {item.count}X
                            </CustomText>
                        </View> 
                    </View>
                );
            })}

            <BillDetails totalItemPrice={totalPrice} />


        </View>
    );
};

const styles = StyleSheet.create({
    img: {
        widht: 40,
        height: 40,
    },
    imgContainer: {
        backgroundColor: Colors.backgroundSecondary,
        padding: 10,
        borderRadius: 15,
        width: '17%'
    },
    container: {
        width: '100%',
        borderRadius: 15,
        marginVertical: 15,
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    iconContainer: {
        backgroundColor: Colors.backgroundSecondary,
        borderRadius: 100,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 10,
        borderBottomWidth: 0.7,
        borderColor: Colors.border,
    },

});

export default OrderSummary;
