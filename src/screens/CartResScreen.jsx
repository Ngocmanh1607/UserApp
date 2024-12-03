import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardResInCart from '../components/CardResInCart';

const CartResScreen = () => {
    const carts = useSelector(state => state.cart.totalAmount);
    return (
        <View>
            {
                carts.length > 0 ? (Object.entries(carts).map(([id, restaurant]) => (
                    <CardResInCart key={id} restaurant={restaurant} restaurantId={id} />
                ))) : (
                    <View style={styles.container}>
                        <Text>Chưa có món nào trong giỏ hàng</Text>
                    </View>
                )
            }
        </View>
    )
}

export default CartResScreen

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 5,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
})