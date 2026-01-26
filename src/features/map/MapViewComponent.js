import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { customMapStyle } from '../../utils/CustomMap.tsx'
import MapView, { Marker, Polyline } from 'react-native-maps'
import Markers from './Markers.js'
import { getPoints } from '../../utils/getPoints.js'
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAP_API } from '../../service/config'
import { Colors } from '@utils/Constants'
import { handleFitToPath } from '../../Maputils.js'

const MapViewComponent = ({
  mapRef,
  setMapRef,
  hasAccepted,
  deliveryLocation,
  pickupLocation,
  deliveryPersonLocation,
  hasPickUp,
  camera
}) => {

  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    setMapKey(prev => prev + 1);
  }, [pickupLocation, deliveryLocation]); // or any props that change

  // useEffect(() => {
  //   console.log(pickupLocation.latitude,pickupLocation.longitude,);

  // }, [])

  const isValidLocation = (loc) =>
    loc && typeof loc.latitude === 'number' && typeof loc.longitude === 'number';

  const safeDeliveryPersonLocation = isValidLocation(deliveryPersonLocation)
    ? {
      latitude: deliveryPersonLocation.latitude,
      longitude: deliveryPersonLocation.longitude,
    }
    : null;

  useEffect(() => {
    console.log("📍 Props in MapViewComponent", {
      deliveryLocation,
      pickupLocation,
      deliveryPersonLocation,
    });
  }, [deliveryLocation, pickupLocation, deliveryPersonLocation]);

  const [mapIsReady, setMapIsReady] = useState(false);

  const handleMapLayout = () => {
    console.log("🟢 Map Layout Complete");
    setTimeout(() => {
      console.log("🟢 Simulated Map Ready");
      setMapIsReady(true);
      // handleFitToPath(); // fit once map is 'ready'
    }, 1000); // wait 1 sec for map internals to load
  };


  return (
    <View style={{ flex: 1 }}>

      <MapView
        ref={setMapRef}
        key={mapKey}

        style={StyleSheet.absoluteFillObject}
        onMapReady={() => {
          console.log("🔴 onMapReady triggered");
          setMapIsReady(true);
        }}
        provider="google"

        customMapStyle={customMapStyle}
        showsUserLocation={true}
        userLocationCalloutEnabled={true}
        userLocationPriority="high"
        // showsTraffic={false} 
        // pitchEnabled={false}
        // followsUserLocation={true}
        // showsCompass={true}
        // showsBuildings={false}
        // showsIndoors={false}
        // showsScale={false}
        // showsIndoorLevelPicker={false}
        onLayout={handleMapLayout}
      >

        {deliveryPersonLocation && (hasPickUp || hasAccepted) && (
          <MapViewDirections
            origin={{
              latitude: deliveryPersonLocation?.latitude,
              longitude: deliveryPersonLocation?.longitude

            }}
            destination={hasAccepted ? {
              latitude: pickupLocation.latitude,
              longitude: pickupLocation.longitude
            } : {
              latitude: deliveryLocation.latitude,
              longitude: deliveryLocation.longitude
            }}
            precision="high"
            apikey={GOOGLE_MAP_API}
            strokeColor="#2871F2"
            strokeWidth={5}
            onError={err => {
              console.log(err);
            }}
          />
        )}

        {/* {

        console.log("🟡 Rendering Markers with:", {
          deliveryPersonLocation: safeDeliveryPersonLocation,
          deliveryLocation,
          pickupLocation
        })
      } */}



        {/* {console.log("📦 Rendering Delivery Marker at:", deliveryLocation.latitude, deliveryLocation.longitude)} */}

        {isValidLocation(pickupLocation) && (
          <Marker
            coordinate={{
              latitude: pickupLocation.latitude,
              longitude: pickupLocation.longitude,
            }}
            title="Pickup Location"
            pinColor="orange"
          />
        )}

        {isValidLocation(deliveryLocation) && (
          <Marker
            coordinate={{
              latitude: deliveryLocation.latitude,
              longitude: deliveryLocation.longitude,
            }}
            title="Delivery Location"
            pinColor="green"
          />
        )}

        {isValidLocation(deliveryPersonLocation) && (
          <Marker
            coordinate={{
              latitude: deliveryPersonLocation.latitude,
              longitude: deliveryPersonLocation.longitude,
            }}
            title="Delivery Person"
            pinColor="blue"
          />
        )}




        {!hasPickUp && deliveryLocation && pickupLocation && (
          <Polyline
            coordinates={getPoints([pickupLocation, deliveryLocation])}
            strokeColor={Colors.text}
            strokeWidth={2}
            geodesic={true}
            lineDashPattern={[12, 10]}
          />
        )}

      </MapView>
    </View>

  )
}

export default MapViewComponent

const styles = StyleSheet.create({})