import { FC, ReactNode } from "react";
import { SafeAreaView, StyleSheet, View, ViewStyle } from "react-native";



const CustomSafeAreaView = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <View style={[styles.container, style]}>

        {children}

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default CustomSafeAreaView;
