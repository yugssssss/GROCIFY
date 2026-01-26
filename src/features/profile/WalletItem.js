

import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors, Fonts } from '@utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize'; // ✅ CORRECT
import CustomText from '../../Components/ui/CustomText';

const WalletItem = ({ icon, label }) => {
  return (
    <View style={styles.walletItemContainer}>
      <Icon name={icon} color='#363636' size={RFValue(20)} />
      <CustomText variant="h8" fontFamily={Fonts.Medium}>
        {label}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  walletItemContainer: {
    alignItems: 'center'
  }
});

export default WalletItem;
