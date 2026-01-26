import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '../../Components/ui/CustomHeader.js'
import { Colors } from '@utils/Constants.tsx'
import Sidebar from './Sidebar.js'
import { getAllCategories, getProductsBycategoryId } from '../../service/productservices.js'
import ProductList from './ProductList.js'
import { BASE_URL } from 'src/service/config.js'
import withCart from '../cart/WithCart.js'

const ProductCatagories = () => {

const [categories, setcategories] = useState([])
const [selectedCategories, setselectedCategories] = useState(null)
const [products, setproducts] = useState([])
const [categoriesLoading, setcategoriesLoading] = useState(false)
const [productsLoading, setproductsLoading] = useState(false)



useEffect(()=>{

    const fetchCategories = async()=>{
        try {
            setcategoriesLoading(true)
            const data = await getAllCategories();
            
            
            setcategories(data)
            console.log(data);
            
            if(data && data.categories?.length > 0 ){
                setselectedCategories(data.categories[0])
            }
        } catch (error) {
            console.log(error);
            setcategoriesLoading(false)
            
        }finally{
            setcategoriesLoading(false)

        }
    }

    fetchCategories()
},[])


useEffect(()=>{

const fetchProducts = async(categoryId)=>{
    try {
        setproductsLoading(true)
        const data = await getProductsBycategoryId(categoryId)
       console.log(data);
       
        
        setproducts(data.Products)
    } catch (error) {
        console.log(error);
        
    }finally{
        setproductsLoading(false)
    }
}

    if(selectedCategories?._id){
        fetchProducts(selectedCategories?._id)
    }
},[selectedCategories])


  return (
    <View style={styles.mainContainer}>
        <CustomHeader title={selectedCategories?.name || "Categories"} search/>
        <View style={styles.subContainer}>
            {
                categoriesLoading?(

                    <ActivityIndicator size="small" color={Colors.border}/>
                ):(
                    <Sidebar
                    categories={categories}
                    selectedCategories={selectedCategories}
                    onCategoryPress={(category)=>setselectedCategories(category)}
                    />
            )}

            {
                productsLoading?(
                    <ActivityIndicator size="large" color={Colors.border} style={styles.center}/>
                ):(
                    <ProductList data={products || []}/>
                )
            }
        </View>
    </View>
  )
}

export default withCart(ProductCatagories)

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:'#f5f6fb',
    },
    subContainer:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
    },
    center:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    center:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
})