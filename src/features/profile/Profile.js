import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../../state/authStore.ts';
import { useCartStore } from '../../state/CartStore.js';
import { fetchCustomerOrders } from '../../service/OrderService.js';
import CustomHeader from '../../Components/ui/CustomHeader.js';
import ProfileOrderItem from './ProfileOrderItem.js';
import CustomText from '../../Components/ui/CustomText.js';
import ActionButton from './ActionButton.js';
import { storage, tokenStorage } from '@state/Storage.ts';
import { resetAndNavigate } from '@utils/NavigationUtils.tsx';
import WalletSection from './WalletSection.js';
import { Fonts } from '@utils/Constants.tsx';

const Profile = () => {

    const [orders, setOrders] = useState([]);
    const { logout, user } = useAuthStore();
    const { clearCart } = useCartStore();
    
    const fetchOrders = async () => {
      const data = await fetchCustomerOrders(user?._id);
      setOrders(data);
      console.log("customers orders.....", data);
      
    };
    
    useEffect(() => {
      fetchOrders();
    }, []);
    
    const renderHeader = () => {
        return (
          <View>
            <CustomText variant="h3" fontFamily={Fonts.SemiBold}>
              Your account
            </CustomText>
            
            <CustomText variant="h7" fontFamily={Fonts.Medium}>
              {user?.phone}
            </CustomText>
      
            <WalletSection />
      
            <CustomText variant="h8" style={styles.informativeText}>
              YOUR INFORMATION
            </CustomText>
      
            <ActionButton icon="book" label="Address book" />
            <ActionButton icon="information-outline" label="About us" />
            <ActionButton 
              icon="log-out-outline" 
              label="Logout"
              onPress={() => {
                clearCart();
                logout();
               tokenStorage.clearAll();
               storage.clearAll();
               resetAndNavigate('CustomerLogin');
              }}
            />
            <CustomText
            varient='h8'
            style={styles.pastText}
            >PAST ORDERS</CustomText>

          </View>
        );
      };
      


const renderOrders = ({item,index})=>{
    return (
        <ProfileOrderItem item={item} index={index}/>
    )
}


  return ( 
    <View style={styles.container}>
        <CustomHeader title="Profile"/>

        <FlatList
        data={orders}
        ListHeaderComponent={renderHeader}
        renderItem={renderOrders}
        keyExtractor={(item)=>item?.orderId}
        contentContainerStyle={styles.scrollViewContent}
        removeClippedSubviews={false}

        />
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    scrollViewContent: {
      padding: 10,
      paddingTop: 20,
      paddingBottom: 100
    },
    informativeText: {
      opacity: 0.7,
      marginBottom: 20
    },
    pastText: {
      marginVertical: 20,
      opacity: 0.7
    }
  });
  