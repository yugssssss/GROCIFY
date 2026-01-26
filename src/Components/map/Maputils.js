export const handleFitToPath = (
  
  mapRef,
  deliveryLocation,
  pickupLocation,
  hasPickUp,
  hasAccepted,
  deliveryPersonLocation
) => {
  if (mapRef && deliveryLocation && pickupLocation) {
    mapRef.fitToCoordinates(
      [
        hasAccepted ? {
          latitude:deliveryPersonLocation.latitude,
          longitude:deliveryPersonLocation.longitude
        } : {
          latitude:deliveryLocation.latitude,
          longitude:deliveryLocation.longitude
        },
        hasPickUp ? {
          latitude:deliveryPersonLocation.latitude,
          longitude:deliveryPersonLocation.longitude
        } : {
          latitude:pickupLocation.latitude,
          longitude:pickupLocation.longitude
        }
      ],
      {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true
      }
    );
  }
};