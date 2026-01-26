import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { navigate } from '@utils/NavigationUtils'
import CustomText from '../ui/CustomText.js'
import { Fonts } from '@utils/Constants.tsx'

const CategoryContainer = ({data}) => {


const renderItems=(items)=>{
return(
    <>
    {items?.map((item,index)=>{
        return(
            <TouchableOpacity style={styles.item} key={index} onPress={()=>navigate("ProductCatagories")}>
                <View style={styles.imageContainer}>
                    <Image source={item?.image} style={styles.image}/>

                </View>
                <CustomText style={styles.text} varient='h8' fontFamily={Fonts.Medium}>{item?.name}</CustomText>
            </TouchableOpacity>
        )
    })}
    </>
)
}

  return (
    <View style={styles.container}>
        <View style={styles.row}>
            {renderItems(data?.slice(0,4))}

        </View>
        <View style={styles.row}>
            {renderItems(data?.slice(4))}

        </View>
    </View>
  )
}

export default CategoryContainer

const styles = StyleSheet.create({
    container:{
        marginVertical:15,
        marginHorizontal:10,
       
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-start',
        marginBottom:25

    },
    text:{
        textAlign:'center',
    },
    item:{
        width:'22%',
        justifyContent:"center",
        alignItems:'center',
        // height:100,
        flexGrow:1,
        

    },
    imageContainer:{
        width:'100%',
        height:80,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        padding:6,
        backgroundColor:'#E5F3F3',
        marginBottom:8,
    },
    image:{
        width:'100%',
        height:'100%',
        resizeMode:'contain'
    },
})