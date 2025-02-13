import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardResInCart from '../../components/CardResInCart';

const CartResScreen = () => {
    const carts = useSelector(state => state.cart.totalAmount);

    return (
        <View style={styles.container}>
            {carts.length > 0 ? (
                Object.entries(carts).map(([id, restaurant]) => (
                    <CardResInCart key={id} restaurant={restaurant} restaurantId={id} />
                ))
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Chưa có món nào trong giỏ hàng</Text>
                </View>
            )}
        </View>
    );
};

export default CartResScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#555',
    },
});