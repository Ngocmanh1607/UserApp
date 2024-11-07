import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardResInCart from '../components/CardResInCart';

const CartResScreen = () => {
    const carts = useSelector(state => state.cart.totalAmount);
    return (
        <View>
            {Object.entries(carts).map(([id, restaurant]) => (
                <CardResInCart key={id} restaurant={restaurant} restaurantId={id} />
            ))}
        </View>
    )
}

export default CartResScreen

const styles = StyleSheet.create({})