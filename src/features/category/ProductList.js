import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Container } from 'postcss'
import { Colors } from '@utils/Constants.tsx'
import ProductItmes from './ProductItmes.js'
const ProductList = ({data}) => {

const renderItem = ({item,index})=>{
    return <ProductItmes item={item} index={index}/>
}


  return (
   <FlatList
   data={data}
   keyExtractor={item => item._id}
   renderItem={renderItem}
   style={styles.Container}
   contentContainerStyle={styles.content}
   numColumns={2}
   removeClippedSubviews={false}
   />
  )
}

export default ProductList

const styles = StyleSheet.create({
    Container:{
        flex:1,
        height:'100%',
        borderRightColor:Colors.borderRightColor
    },
    content:{
        paddingVertical:10,
        paddingBottom:100,
    },
})