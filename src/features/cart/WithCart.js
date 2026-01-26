import { StyleSheet, View } from "react-native"
import { useCartStore } from "../../state/CartStore.js"
import CartAnimationWrapper from "./CartAnimationWrapper.js"
import CartSummary from "./CartSummary.js"


const withCart =(WrappedComponet)=>{
const WithCartComponent =(props)=>{
    const cart = useCartStore(state => state.cart)
    const cartCount = cart.reduce((acc,item)=>acc+ item.count,0)

    return(
        <View style={styles.contaienr}>
            <WrappedComponet {...props}/>

            <CartAnimationWrapper cartCount={cartCount}>
                <CartSummary
                cartCount={cartCount}
                cartImage={cart[0]?.item?.image}
                />
            </CartAnimationWrapper>

        </View>
    )
  }
  return WithCartComponent
}

const styles = StyleSheet.create({
  contaienr:{
    flex:1,
  },
})

export default withCart