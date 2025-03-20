import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { formatPrice, formatDate } from '../utils/format';
const CardOrder = ({ order }) => {
    const navigation = useNavigation();
    const getOrderStatus = (status) => {
        const statusMapping = {
            ORDER_CANCELED: "Đơn hàng đã bị hủy",
            ORDER_CONFIRMED: "Hoàn thành"
        };

        return statusMapping[status] || "Theo dõi đơn hàng";
    };
    const handlePressOrder = (id, order_status) => {
        if (order_status !== 'ORDER_CANCELED') {
            navigation.navigate('OrderStatus', { orderId: id })
        }
    }
    return (
        <View style={styles.orderItem}>
            {/* Order header with date and status */}
            <View style={styles.orderHeader}>
                <Text style={styles.orderDate}>{formatDate(order.order_date)}</Text>
                <TouchableOpacity onPress={() => handlePressOrder(order.id, order.order_status)}><Text style={[styles.orderStatus, { color: order.order_status === 'ORDER_CONFIRMED' ? "#28a745" : "#FF0000" }]}>
                    {getOrderStatus(order.order_status)}
                </Text></TouchableOpacity>
            </View>

            {/* Order content with image and details */}
            <View style={styles.orderContent}>
                <Image
                    source={{ uri: order.Restaurant.image }}
                    style={styles.orderImage}
                />

                <View style={styles.orderDetails}>
                    <Text style={styles.orderRestaurant}>{order.Restaurant.name}</Text>
                    <Text style={styles.orderInfo}>{order.listCartItem.length} món</Text>
                    <Text style={styles.orderInfo}>Tổng giá: {formatPrice(order.price)}</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.reorderButtonContainer}
                onPress={() => { navigation.navigate('DetailOrder', { order: order }) }}
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
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    orderDate: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    orderStatus: {
        fontSize: 14,
        fontWeight: '500',
    },
    orderContent: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 15,
        marginBottom: 10
    },
    orderImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 15,
    },
    orderDetails: {
        flex: 1,
    },
    orderRestaurant: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    orderInfo: {
        fontSize: 14,
        color: '#666',
        marginVertical: 2,
    },
    reorderButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    viewOrder: {
        fontSize: 14,
        color: '#0066cc',
        fontWeight: '600',
    },
    reorderButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFF',
    },
    viewReorder: {
        backgroundColor: '#ff4d4d',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    }
});