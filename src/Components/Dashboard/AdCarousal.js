import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Carousel from 'react-native-reanimated-carousel'
import { screenWidth } from '@utils/Scaling'
import { screenHeight } from '@utils/Scaling'
import { adData } from '@utils/dummyData'
// import { Image } from 'react-native-reanimated/lib/typescript/Animated'
const AdCarousal = () => {

const baseoptions={
    vertical:false,
    width:screenWidth,
    height:screenHeight,
}

  return (
    <View style={{marginBottom:20 ,height:200}}>
      <Carousel
      {...baseoptions}
      loop
      pagingEnabled
      snapEnabled
      autoPlay
      autoPlayInterval={3000}
      mode='parallax'
      data={adData}
      modeConfig={{
        parallaxScrollingOffset:0,
        parallaxScrollingScale:0.94
      }}
      renderItem={({item})=>{
        return(
            <View style={{width:'100%',height:'25%'}}>

                <Image source={item} style={{width:'100%',height:'100%',resizeMode:'cover',borderRadius:20}}/>
            </View>
        )
      }}

      />
    </View>
  )
}

export default AdCarousal

const styles = StyleSheet.create({})