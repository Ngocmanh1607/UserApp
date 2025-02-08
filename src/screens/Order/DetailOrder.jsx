import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import formatPrice from '../../utils/formatPrice';
import { useNavigation, useRoute } from '@react-navigation/native';
const OrderDetailScreen = () => {
    const route = useRoute();
    const order = route.params?.order || {};
    return (
        <View style={styles.container}>
            <ScrollView >
                {/* Order completion message */}
                {/* <View style={styles.orderCompleteContainer}>
                    <Text style={styles.orderCompleteText}>Đơn hàng của bạn đã hoàn tất</Text>
                    <Image// Replace with a real image
                        style={styles.orderCompleteIcon}
                    />
                </View> */}

                {/* Driver Information */}
                {
                    order.Driver && (
                        <View style={styles.driverInfoContainer}>
                            <Text style={styles.licensePlate}>{order.Driver.license_plate}</Text>
                            <Text>{order.Driver.car_name}</Text>
                            <View style={styles.driverDetails}>
                                <Image source={{ uri: order.Driver.Profile.image }} style={styles.driverImage} />

                                <View style={styles.driverInfo}>
                                    <Text style={styles.driverName}>{order.Driver.Profile.name}</Text>
                                    <Text style={styles.driverRating}>⭐ 5</Text>
                                </View>

                            </View>
                        </View>
                    )
                }
                {/* Order ID */}
                <View style={styles.orderIdContainer}>
                    <Text style={styles.orderId}>Mã đơn: {order.id}</Text>
                    <Text style={styles.orderTime}>{order.order_date}</Text>
                </View>
                {/* Ordered Items */}
                {order.listCartItem.map((item, index) => (
                    <View key={index} style={styles.orderItemContainer}>
                        <View style={styles.orderItemDetails}>
                            <Image source={{ uri: item.image }} style={styles.orderItemImage} />
                            <View style={styles.orderItemText}>
                                <Text style={styles.orderItemName}>{item.name}</Text>
                                <Text style={styles.orderItemOption}>Mô tả: {item.descriptions}</Text>
                                {
                                    item.toppings && (item.toppings.map((option, optIndex) => (
                                        <Text key={optIndex} style={styles.orderItemOption}>{option.topping_name}</Text>
                                    )))}
                                <Text style={styles.orderItemOption}>Số lượng: {item.quantity}</Text>
                                <Text style={styles.orderItemPrice}>Giá: {item.price}</Text>
                            </View>
                        </View>
                    </View>
                ))}

                {/* Payment Information */}
                <View style={styles.summaryContainer}>
                    {/* <Text style={styles.textBold}>Chi tiết thanh toán</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Tạm tính</Text>
                        <Text style={styles.value}>{formatPrice(order.price)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Phí áp dụng</Text>
                        <Text style={styles.value}>{formatPrice(order.delivery_fee)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Giảm giá</Text>
                        <Text style={styles.value}>{formatPrice(0)}</Text>
                    </View> */}
                    <View style={styles.row}>
                        <Text style={styles.paymentMethod}>Trả qua: {order.order_pay}</Text>
                        <Text style={styles.orderTotal}>{formatPrice(order.price)}</Text>
                    </View>
                </View>

                {/* Reorder Button */}
                {/* <TouchableOpacity style={styles.reorderButton}>
                    <Text style={styles.reorderButtonText}>Đặt lại món</Text>
                </TouchableOpacity> */}
            </ScrollView>
        </View>
    );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
    },
    headerTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    orderCompleteContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 15,
    },
    orderCompleteText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    orderCompleteSubText: {
        color: '#888',
        marginTop: 5,
    },
    orderCompleteIcon: {
        width: 40,
        height: 40,
    },
    driverInfoContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
    },
    licensePlate: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    driverDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    driverImage: {
        width: 40,
        height: 40,
        borderRadius: 5,
    },
    driverInfo: {
        marginLeft: 10,
    },
    driverName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    driverRating: {
        color: '#888',
    },
    orderItemContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
    },
    orderItemDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    orderItemImage: {
        width: 60,
        height: 60,
        borderRadius: 5,
        marginRight: 10,
    },
    orderItemText: {
        flex: 1,
    },
    orderItemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    orderItemOption: {
        color: '#888',
        fontSize: 14,
    },
    orderItemPrice: {
        marginTop: 10,
        fontWeight: 'bold',
    },
    paymentInfoContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
    },
    paymentMethod: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    orderTotal: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 5,
    },
    orderIdContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    orderId: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    orderTime: {
        fontSize: 14,
        color: '#888',
    },
    reorderButton: {
        backgroundColor: '#FF0000',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    reorderButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    summaryContainer: {
        backgroundColor: '#FFFF',
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
        elevation: 10,
    },
    textBold: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        // height: 40
    },
    label: {
        fontWeight: '300',
        fontSize: 16,
        color: '#000',
    },
    value: {
        fontWeight: '300',
        fontSize: 16,
        color: '#000',
    },
    totalLabel: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    totalValue: {
        fontWeight: 'bold',
        fontSize: 18,
        color: "#FFF"
    },
});