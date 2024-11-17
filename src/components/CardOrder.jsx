import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const CardOrder = ({ order }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.orderItem}>
            {/* Order header with date and status */}
            <View style={styles.orderHeader}>
                <Text style={styles.orderDate}>{order.date}</Text>
                <TouchableOpacity onPress={() => (navigation.navigate('OrderStatus'))}><Text style={styles.orderStatus}>
                    {order.status}
                </Text></TouchableOpacity>
            </View>

            {/* Order content with image and details */}
            <View style={styles.orderContent}>
                {console.log(order.image)}
                {/* <Image
                    source={order.image ? { uri: order.image } : require('../assets/Images/pizza.png')}
                    style={styles.orderImage}
                /> */}
                <Image
                    source={require('../assets/Images/pizza.png')}
                    style={styles.orderImage}
                />

                <View style={styles.orderDetails}>
                    <Text style={styles.orderRestaurant}>{order.restaurant}</Text>
                    <Text style={styles.orderInfo}>{order.quantity} • {order.price}</Text>
                </View>
            </View>

            {/* Touchable area with the options to reorder or view details */}
            <TouchableOpacity
                style={styles.reorderButtonContainer}
                onPress={() => { navigation.navigate('DetailOrder') }}
            >
                {/* "Xem chi tiết đơn hàng" and "Đặt lại" in a row */}
                <Text style={styles.viewOrder}>Xem chi tiết đơn hàng</Text>
                <View style={styles.viewReorder}>
                    <Text style={styles.reorderButtonText}>Đặt lại</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default CardOrder;

const styles = StyleSheet.create({
    orderItem: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    orderDate: {
        fontSize: 14,
        color: '#555',
    },
    orderStatus: {
        fontSize: 14,
        color: '#28a745',
    },
    orderContent: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        paddingBottom: 15
    },
    orderImage: {
        width: 50,
        height: 50,
        borderRadius: 4,
        marginRight: 10,
    },
    orderDetails: {
        flex: 1,
    },
    orderRestaurant: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    orderInfo: {
        fontSize: 14,
        color: '#777',
        marginVertical: 2,
    },
    reorderButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 5,
        borderRadius: 4,
    },
    viewOrder: {
        fontSize: 14,
        color: '#007bff',
        fontWeight: '500',
    },
    reorderButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
    },
    viewReorder: {
        backgroundColor: '#FF0000',
        padding: 5,
        borderRadius: 10,
        width: 75,
        alignItems: 'center',
        justifyContent: 'center'
    }
});