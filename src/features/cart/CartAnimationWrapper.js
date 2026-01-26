import { Animated, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { hocStyles } from '../../Styles/GlobalStyles.js'

const CartAnimationWrapper = ({cartCount,children}) => {


    const slideAnim = useRef(new Animated.Value(0)).current;
    const [hasAnimated, setHasAnimated] = useState(false);
  

    useEffect(() => {
        if (cartCount > 0 && !hasAnimated) {
          Animated.timing(slideAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            setHasAnimated(true);
          });
        } else if (cartCount === 0 && hasAnimated) {
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            setHasAnimated(false);
          });
        }
      }, [cartCount, hasAnimated]);


    const slideUpStyle = {
      transform: [
        {
          translateY: slideAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [100, 0],
          }),
        },
      ],
      opacity: slideAnim,
    };


  return (
    <Animated.View style={[hocStyles.cartContainer,slideUpStyle]}>
            {children}
    </Animated.View>
  )
}

export default CartAnimationWrapper

const styles = StyleSheet.create({})