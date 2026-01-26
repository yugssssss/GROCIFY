import { PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Geolocation from '@react-native-community/geolocation'
import CustomSafeAreaView from '../../Components/Global/CustomSafeAreaView'
import Content from '../../Components/Dashboard/Content'
import withCart from '../cart/WithCart.js'
import { useAuthStore } from '../../state/authStore.ts'
import { reverseGeocode } from '../../service/mapService.js'
import WithLiveStatus from '../map/WithLiveStatus.js'

Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true,
  locationProvider: 'auto'
});


const ProductDashboard = () => {

const {user , setUser} = useAuthStore()
const [location, setLocation] = useState(null);


useEffect(() => {
  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'App needs access to your location.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.warn('Location permission denied');
          return;
        }
      }

      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          console.log('User Location:', latitude, longitude);
          reverseGeocode(latitude,longitude,setUser,user)

        },
        error => {
          console.error('Location Error:', error);
        },
        {
          enableHighAccuracy: false,
          timeout: 15000,
          maximumAge: 10000,
        }
      );
    } catch (err) {
      console.warn(err);
    }
  };

  requestLocationPermission();
}, []);

  return (
   <>
          <Content user={user}/>     
         
   </>
    
  )
}

export default WithLiveStatus(withCart(ProductDashboard))
 
const styles = StyleSheet.create({
  // panelContainer: {
  //   flex: 1
  // },
  // transparent: {
  //   backgroundColor: "transparent"
  // },
  backToTopButton: {
    position: "absolute",
    alignSelf: "center",
    top: Platform.OS === "ios" ? screenHeight * 0.18 : 100,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "black",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 999,
    backgroundColor: "#D3D3D3",
  }
});
