import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { screenHeight } from '@utils/Scaling'
import { Colors } from '@utils/Constants'
import { useMapRefStore } from '@state/Mapstore'
import Icon from 'react-native-vector-icons/MaterialIcons'
import MapViewComponent from './MapViewComponent'
import { handleFitToPath } from '../../Components/map/Maputils'
import { RFValue } from 'react-native-responsive-fontsize'
const LiveMap = ({
    deliveryLocation,
    pickupLocation,
    deliveryPersonLocation,
    hasAccepted,
    hasPickUp
}) => {

    const { mapRef, setMapRef } = useMapRefStore()

    useEffect(() => {

        if (mapRef) {
            handleFitToPath(
                mapRef,
                deliveryLocation,
                pickupLocation,
                hasPickUp,
                hasAccepted,
                deliveryPersonLocation,
            )
        }
    }, [
        deliveryLocation,
        deliveryPersonLocation,
        hasAccepted,
        hasPickUp,
        mapRef
    ])


    return (
        <View style={styles.container}>
           
                    <MapViewComponent
                        mapRef={mapRef}
                        setMapRef={setMapRef}
                        hasAccepted={hasAccepted}
                        deliveryLocation={deliveryLocation}
                        pickupLocation={pickupLocation}
                        deliveryPersonLocation={deliveryPersonLocation}
                        hasPickUp={hasPickUp}
                        
                    />
               
            



            <TouchableOpacity
                style={styles.fitButton}
                onPress={() => {
                    handleFitToPath(
                        mapRef,
                        deliveryLocation,
                        pickupLocation,
                        hasPickUp,
                        hasAccepted,
                        deliveryPersonLocation,
                    );
                }}>
                <Icon name="zoom-out-map" size={RFValue(14)} color={Colors.text} />
            </TouchableOpacity>


        </View>
    )
}

export default LiveMap

const styles = StyleSheet.create({

    container: {
        flex:1,
        height: 400,
        width: '100%',
        borderRadius: 15,
        backgroundColor: 'white',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Colors.border,
        position: 'relative',
    },
    fitButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        padding: 5,
        backgroundColor: 'white',
        borderWidth: 0.8,
        borderColor: Colors.border,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowColor: 'black',
        elevation: 5,
        borderRadius: 35
    },
})