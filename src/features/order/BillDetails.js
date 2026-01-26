import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@utils/Constants'
import CustomText from '../../Components/ui/CustomText.js'
import { Fonts } from '@utils/Constants'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { RFValue } from 'react-native-responsive-fontsize'
const BillDetails = ({ totalItemPrice }) => {

  const ReportItem = ({ iconName, underline, title, price }) => {

    return (
      <View style={[styles.flexRowBetween, { marginBottom: 10 }]}>
        <View style={styles.flexRow}>
          <Icon
            name={iconName}
            style={{ opacity: 0.7 }}
            size={RFValue(12)}
            color={Colors.text}
          />
          <CustomText
            style={{
              textDecorationLine: underline ? 'underline' : 'none',
              textDecorationStyle: 'dashed',
            }}
            variant="h8"
          >
            {title}
          </CustomText>
        </View>
        <CustomText variant="h8">₹{price}</CustomText>
      </View>
    );

  }

  return (
    <View style={styles.container}>
      <CustomText
        style={styles.text}
        fontFamily={Fonts.SemiBold}
      >
        Bill Details
      </CustomText>
      <View style={styles.billContainer}>

        <ReportItem
          iconName="article"
          title="Items total"
          price={totalItemPrice}
        />
        <ReportItem
          iconName="pedal-bike"
          title="Delivery charge"
          price={29}
        /> <ReportItem
          iconName="shopping-bag"
          title="Handling charge"
          price={2}
        /> <ReportItem
          iconName="cloudy-snowing"
          title="Surge charge"
          price={3}
        />
      </View>
      <View style={[styles.flexRowBetween, { marginBottom: 15 }]}>
        <CustomText
          varient='h7'
          style={styles.text}
          fontFamily={Fonts.SemiBold}>
          Grand Total
        </CustomText>
        <Text>₹{totalItemPrice+34} </Text>
      </View>

    </View>
  )
}

export default BillDetails

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginVertical: 15,
  },
  text: {
    marginHorizontal: 10,
    marginTop: 15,
  },
  billContainer: {
    padding: 10,
    paddingBottom: 0,
    borderBottomColor: Colors.border,
    borderBottomWidth: 0.7,
  },
  flexRowBetween: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
