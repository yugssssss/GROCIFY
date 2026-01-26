import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useMemo } from 'react'
import { imageData } from '../../utils/dummyData.tsx';
import AutoScroll  from '@homielab/react-native-auto-scroll'
import { screenWidth } from '../../utils/Scaling.tsx';
const ProductSlider = () => {

const rows = useMemo(()=>{
  const result = [];
  for(let i=0; i< imageData.length ; i+=4)
  {
     result.push(imageData.slice(i,i+4))
  }
  return result
},[])
  

  return (
    <View pointerEvents='none' style={styles.container}>
      <AutoScroll duration={10000} endPaddingWidth={0} style={styles.autoScroll}>
        <View className='justify-center items-center overflow-visible'>
            {rows?.map((row,rowindex)=>{
              return(
                <MemorizedRow key={rowindex} row={row} rowIndex={rowindex} />
              )
            })}
        </View>
      </AutoScroll>
    </View>
  )
} 


const Row =({row,rowIndex})=>{
  return (
    <View style={styles.row}>
       {row?.map((image,index)=>{
        const horizontalSwift = rowIndex%2===0 ?-18 :18
        return(
          <View key={index} style={[styles.itemContainer,{translateX:horizontalSwift}]}>
           <Image source={image} className='w-full h-full'/>
          </View>
        )
       })}
    </View>
  )
}

const MemorizedRow = React.memo(Row)

const styles = StyleSheet.create({
  autoScroll:{
    position : 'absolute',
    zIndex:-2,
  },
  container:{
    height:'57%',
    width:'100%'
  },
  itemContainer:{
   marginBottom:12,
   marginHorizontal:10,
   width:screenWidth * 0.26,
   height:screenWidth* 0.26,
   backgroundColor:'#f4f4f4',
   justifyContent:'center',
   alignItems:'center',
   borderRadius:25,


  },
  row:{
    flexDirection:'row',
    marginBottom:10,
  },
})
export default ProductSlider