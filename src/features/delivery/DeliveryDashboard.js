import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useAuthStore } from '../../state/authStore'
import DeliveryHeader from '../../Components/Delivery/DeliveryHeader'
import TabBar from '../../Components/Delivery/TabBar'
import Geolocation from '@react-native-community/geolocation'
import { reverseGeocode } from '../../service/mapService'
import { fetchOrders } from '../../service/OrderService'
import DeliveryOrderItem from './DeliveryOrderItem'
import CustomText from '../../Components/ui/CustomText'
import WithLiveOrder from './WithLiveOrder'
import { Colors } from '@utils/Constants'
import { Fonts } from '@utils/Constants'

const DeliveryDashboard = () => {

  const [selectedTab, setSelectedTab] = useState('available')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const { user, setUser } = useAuthStore()
  const isMounted = useRef(true);
  
  const updateUser = () => {


    Geolocation.getCurrentPosition(
      position => {
       
        const { latitude, longitude } = position.coords;
        reverseGeocode(latitude, longitude, setUser, user);
      },
      err => console.log(err),
      {
        enableHighAccuracy: false,
        timeout: 15000,
      }
    );
  };

  useEffect(() => {

    if (user && user._id) {

      updateUser();
    }
    else {

      console.log("user not available ..............");
    }



  }, [user?._id]);


  const fetchData = async () => {
    setData([]);
    setRefreshing(true);
    setLoading(true);
   
   

      // console.log("fetch data order console ::", user);

      const data = await fetchOrders(selectedTab, user?._id, user?.branch);
      setData(data);
      setRefreshing(false);
      setLoading(false);


  };

  useEffect(() => {


   

    if (user?._id) {
      fetchData();   
    }
    
   

  }, [selectedTab,user._id]);

  const RenderOrderItem = ({ item, index }) => {
    return (
      <DeliveryOrderItem derItem index={index} item={item} />
    )
  }




  return (
    <View style={styles.container}>
      <SafeAreaView>
        {
          user && user != null && (

            <DeliveryHeader name={user?.name} email={user?.email} />
          )
        }
      </SafeAreaView>
      <View style={styles.subContainer}>
        <TabBar selectedTab={selectedTab} onTabChange={setSelectedTab} />
        {
          user && user != null && (

            <FlatList
              data={data}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={async () => await fetchData()}
                />
              }
              ListEmptyComponent={() => {
                if (loading) {
                  return (
                    <View style={styles.center}>
                      <ActivityIndicator color={Colors.secondary} size="small" />
                    </View>
                  );
                }

                return (
                  <View style={styles.center}>
                    <CustomText>No Orders found yet!</CustomText>
                  </View>
                );
              }}
              renderItem={RenderOrderItem}
              keyExtractor={(item) => item.orderId}
              removeClippedSubviews={false}
              contentContainerStyle={styles.flatListContainer}
            />
          )
        }

      </View>
    </View>
  )
}

export default WithLiveOrder(DeliveryDashboard)

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1
  },
  subContainer: {
    backgroundColor: Colors.backgroundSecondary,
    flex: 1,
    padding: 6
  },
  flatListContainer: {
    padding: 2,
  },
  center: {
    flex: 1,
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center'
  }
});