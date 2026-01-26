import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuthStore } from '@state/authStore';
import { navigate } from '@utils/NavigationUtils.tsx';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '../../Components/ui/CustomText';
import { Fonts } from '@utils/Constants';
import { goBack } from '@utils/NavigationUtils';
const LiveHeader = ({ type, title, secondTitle }) => {

    const isCustomer = type === 'Customer';

    const { currentOrder, setCurrentOrder } = useAuthStore()

    return (
        <SafeAreaView>
            <View style={styles.headerContainer}>
                <Pressable
                    style={styles.backButton}
                    onPress={() => {
                        if (isCustomer) {
                            goBack()

                            if (currentOrder?.status == 'delivered') {
                                setCurrentOrder(null)
                            }
                            return
                        }
                        navigate('DeliveryDashboard')
                    }}
                >
                    <Icon
                        name="arrow-back-ios"
                        size={RFValue(16)}
                        color={isCustomer ? '#fff' : '000'}
                    />
                </Pressable>
                <View style={{justifyContent:'center', alignItems:'center'}}>

                <CustomText
                varient='h8'
                fontFamily={Fonts.Medium}
                style={isCustomer?styles.titleTextWhite :styles.titleTextBlack}
                >
                    {title}
                </CustomText>
                <CustomText
                varient='h4'
                fontFamily={Fonts.SemiBold}
                style={isCustomer?styles.titleTextWhite :styles.titleTextBlack}
                >
                    {secondTitle}
                </CustomText>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default LiveHeader

const styles = StyleSheet.create({
    headerContainer: {
        justifyContent: 'center',
        paddingVertical: 10,
        alignItems: 'center',
        flexDirection:'row'
    },
    backButton: {
        position: 'absolute',
        left: 20,
    },
    titleTextBlack: {
        color: 'black'
    },
    titleTextWhite: {
        color: 'white'
    },

})