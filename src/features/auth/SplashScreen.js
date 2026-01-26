import { View, Text, Image, Alert, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import Logo from '@assets/images/logo.jpeg'
import { navigate } from '@utils/NavigationUtils'
import GeoLocation from '@react-native-community/geolocation'
import { useAuthStore } from '@state/authStore'
import { tokenStorage } from '@state/Storage'
import { resetAndNavigate } from '@utils/NavigationUtils'
// import { PermissionsAndroid, Platform } from 'react-native';

import {jwtDecode} from 'jwt-decode'
// import { reverseGeocode } from 'src/service/mapService'
// import Geolocation from '@react-native-community/geolocation'


GeoLocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true,
  locationProvider: 'auto'
});




const SplashScreen = () => {

const {user , setUser} = useAuthStore()
const [location, setLocation] = useState(null);
const tokenCheck = async()=>{

   const accesstoken = tokenStorage.getString('accesstoken') 
   if(accesstoken){ 
     const decodedaccesstoken = jwtDecode(accesstoken)
     console.log("spalsh screen user :::",user);
     
       if(user?.role === "Customer"){
        resetAndNavigate("ProductDashboard")
       }else {
        resetAndNavigate("DeliveryDashboard")
       }
       return true
   }
   
   resetAndNavigate("CustomerLogin")
}


// useEffect(() => {
//   const requestLocationPermission = async () => {
//     try {
//       if (Platform.OS === 'android') {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Location Permission',
//             message: 'App needs access to your location.',
//             buttonPositive: 'OK',
//             buttonNegative: 'Cancel',
//           }
//         );

//         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//           console.warn('Location permission denied');
//           return;
//         }
//       }

//       Geolocation.getCurrentPosition(
//         position => {
//           const { latitude, longitude } = position.coords;
//           setLocation({ latitude, longitude });
//           console.log('User Location:', latitude, longitude);
//           reverseGeocode(location.latitude,location.longitude,setUser,user)

//         },
//         error => {
//           console.error('Location Error:', error);
//         },
//         {
//           enableHighAccuracy: false,
//           timeout: 15000,
//           maximumAge: 10000,
//         }
//       );
//     } catch (err) {
//       console.warn(err);
//     }
//   };

//   requestLocationPermission();
// }, []);


useEffect(()=>{

const navigateUser = async()=>{
  try {
   
    tokenCheck()
  } catch (error) {
    Alert.alert("Sorry we need location service to give you better shopping experience")
  }
}

  const timeoutid = setTimeout(navigateUser,1000)

  return ()=>clearTimeout(timeoutid)
},[])




  return (
    <View className="flex-1 bg-yellow-400 justify-center items-center ">
     <Image className="h-64 w-64 " source={Logo}/>
    </View>
  )
}

export default SplashScreen