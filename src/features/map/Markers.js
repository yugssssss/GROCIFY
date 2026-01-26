import React, { useEffect } from 'react';
import { Marker } from 'react-native-maps';

const Markers = ({
  deliveryLocation,
  pickupLocation,
  deliveryPersonLocation
}) => {

  useEffect(() => {
    console.log("📍 Marker Props Updated:", {
      deliveryLocation,
      pickupLocation,
      deliveryPersonLocation,
    });
  }, [deliveryLocation, pickupLocation, deliveryPersonLocation]);

  const isValid = (loc) =>
    loc && typeof loc.latitude === 'number' && typeof loc.longitude === 'number';

  return (
    <>
      {isValid(deliveryLocation) && (
        <Marker
          coordinate={deliveryLocation}
          title="Delivery Location"
          pinColor="green"
        />
      )}

      {isValid(pickupLocation) && (
        <Marker
          coordinate={pickupLocation}
          title="Pickup Location"
          pinColor="orange"
        />
      )}

      {isValid(deliveryPersonLocation) && (
        <Marker
          coordinate={deliveryPersonLocation}
          title="Delivery Person"
          pinColor="blue"
        />
      )}
    </>
  );
};

export default Markers;
