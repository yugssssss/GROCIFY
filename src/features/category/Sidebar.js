import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import CustomText from '../../Components/ui/CustomText.js'

const Sidebar = ({selectedCategories , categories , onCategoryPress}) => {

// useEffect(()=>{
// console.log(categories);

// },[])

  return (
    <View style={styles.sideBar}>
      <GestureHandlerRootView>

        <ScrollView
        contentContainerStyle={{paddingBottom:50}}
        showsVerticalScrollIndicator={false}
        >
         
        <View>
          {
            categories.categories?.map((category , index)=>{
              return(
                
                <TouchableOpacity
                key={index}
                activeOpacity={1}
                style={[styles.categorybutton , selectedCategories?._id === category?._id ?{borderRightWidth:4,borderRightColor:'green',borderTopRightRadius:5,borderBottomRightRadius:5}:null]}
                onPress={()=> onCategoryPress(category)}
                >
                  <View style={[styles.imageContainer,
                    selectedCategories?._id === category?._id && 
                    styles.selectedImageContainer
                  ]}>
                   <Image source={{uri:category?.image}}
                   style={[styles.image]}
                   />     
                  </View>
                  <CustomText>
                    {category.name}
                  </CustomText>
                </TouchableOpacity>
               
              )
            })
          }
        </View>
        </ScrollView>
      </GestureHandlerRootView>

    </View>
  )
}

export default Sidebar

const styles = StyleSheet.create({
sideBar:{
    width:'24%',
    backgroundColor:'white',
    borderRightWidth:0.8,
    borderRightColor:'#eee',
    position:'relative',
},
categorybutton:{
  padding:10,
  height:100,
  paddingVertical:0,
  justifyContent:'center',
  alignItems:'center',
  width:'100%',
 
},
image:{
  width:'80%',
  height:'80%',
  resizeMode:'contain',
},
imageContainer:{
  borderRadius:100,
  height:'50%',
  marginBottom:10,
  width:'75%',
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'#F3F4F7',
  overflow:'hidden'
},
selectedImageContainer:{
  backgroundColor:'#CFFFDB'
},


})