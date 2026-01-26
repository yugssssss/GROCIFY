import { Animated, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import CustomText from '../ui/CustomText.js'
import { Fonts } from '@utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { screenWidth } from '../../utils/Scaling.tsx'
import RollingBar from 'react-native-rolling-bar'
import { adData } from '@utils/dummyData.tsx'
import AdCarousal from './AdCarousal.js'
import { categories } from '@utils/dummyData.tsx'
import CategoryContainer from './CategoryContainer.js'
import { navigate } from '@utils/NavigationUtils.tsx'

const Content = ({user}) => {


  const [showButton, setShowButton] = useState(false);
  const scrollY = new Animated.Value(0);
  const scrollViewRef = useRef(null);
  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowButton(offsetY > 200); // Show button after scrolling 200px
  };

  const scrollToTop = () => {
    console.log("hello");

    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true }); // Scroll to top
    }
  };




  return (
    <View style={styles.container}>

      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        ref={scrollViewRef}
        removeClippedSubviews={false}
      >



        <LinearGradient
          colors={["#ffd60a", "#f2cc8f"]} // Top color is yellow, bottom is white
          start={{ x: 0, y: 0 }} // Start at the top
          end={{ x: 0, y: 1 }} // End at the bottom

        >
          <StatusBar backgroundColor="#FFD60A" barStyle="dark-content" />
          <View style={styles.upper_header}>

            <View className='p-3'>
              <CustomText varient='h7' fontFamily={Fonts.Medium} fontSize={RFValue(10)}>
                Grocify in
              </CustomText>
              <CustomText varient='h3' fontFamily={Fonts.Bold} fontSize={RFValue(16)} style={styles.txt1}>
                10 minutes
              </CustomText>
              <CustomText varient='h3' fontFamily={Fonts.Medium} fontSize={RFValue(10)} >
                {user?.address}
              </CustomText>
            </View>
            <TouchableOpacity className='items-center mt-9' onPress={()=>navigate("Profile")}>
              <Icon name='supervised-user-circle' color='#000' size={RFValue(34)} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity className='h-14 bg-white rounded-2xl flex-row p-3 self-center mb-5 gap-2' style={styles.searchContainer}>
            <Icon name='search' color='#adb5bd' size={RFValue(20)} style={styles.search} />
            <CustomText varient='h6' fontFamily={Fonts.Medium} style={styles.search}>Search</CustomText>
            <RollingBar interval={3000} defaultStyle={false} customStyle={styles.textContainer}>
              <CustomText varient='h6' fontFamily={Fonts.Medium}>"milk"</CustomText>
              <CustomText varient='h6' fontFamily={Fonts.Medium}>"chips"</CustomText>
              <CustomText varient='h6' fontFamily={Fonts.Medium}>"pooja thali"</CustomText>
              <CustomText varient='h6' fontFamily={Fonts.Medium}>"ata, dal, coke"</CustomText>

            </RollingBar>
          </TouchableOpacity>
        </LinearGradient>
        <View style={styles.content}>
          <AdCarousal adData={adData} />
          <View>

            <CustomText varient='h5' fontFamily={Fonts.SemiBold} style={{
              marginHorizontal: 10,
            }}>Grocery & Kitchen</CustomText>
            <CategoryContainer data={categories} />
            <CustomText varient='h5' fontFamily={Fonts.SemiBold} style={{
              marginHorizontal: 10,
            }}>Bestsellers</CustomText>
            <CategoryContainer data={categories} />
            <CustomText varient='h5' fontFamily={Fonts.SemiBold} style={{
              marginHorizontal: 10,
            }}>Snacks and Drinks</CustomText>
            <CategoryContainer data={categories} />
            <CustomText varient='h5' fontFamily={Fonts.SemiBold} style={{
              marginHorizontal: 10,
            }}>Electronics</CustomText>
            <CategoryContainer data={categories} />
          </View>
        </View>

      </ScrollView>
      {showButton && (
        <TouchableOpacity style={styles.backToTop} onPress={scrollToTop}>
          <Icon name="keyboard-arrow-up" size={24} color="black" />
          <CustomText varient='h9' fontFamily={Fonts.SemiBold}>Back to top</CustomText>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default Content

const styles = StyleSheet.create({
  container: {

    // flex: 1,
    flexGrow: 1,

  },
  upper_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 140,
  },
  txt1: {
    fontWeight: '800'
  },
  searchContainer: {
    width: screenWidth * 0.9
  },
  search: {
    alignSelf: 'center'
  },
  content: {
    gap: 60,

  },
  backToTop: {
    position: "absolute",
    top: "20%", // Moves the button to the upper center of the screen
    left: "45%",
    transform: [{ translateX: -25 }], // Center it horizontally
    width: 110,
    height: 30,
    backgroundColor: "#D3D3D3",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    flexDirection: 'row'
  },
})