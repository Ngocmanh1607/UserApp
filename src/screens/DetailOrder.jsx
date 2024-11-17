import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
const OrderDetailScreen = () => {
    const navigation = useNavigation()
    const orderDetails = {
        driver: {
            name: 'Pham Trung Kien',
            rating: 5.0,
            vehicle: 'Yamaha | Nozza',
            licensePlate: '68T1-572.84',
            driverImage: 'https://link-to-driver-image.com/driver.jpg', // Replace with a real image
        },
        items: [
            {
                name: 'Mì Soyum bò Mỹ',
                price: '70.000₫',
                quantity: 1,
                options: [
                    'Chọn cách chế biến I: Nấu Chín (Phí hộp đựng muỗng đũa)',
                    'Chọn cấp độ cay: Cấp 2',
                    'nhiều nước chấm muối ớt xanh'
                ],
                image: 'https://link-to-item-image.com/item1.jpg', // Replace with a real image
            },
            {
                name: 'Mì Kim chi bò Mỹ',
                price: '70.000₫',
                quantity: 1,
                options: [
                    'Chọn cách chế biến I: Nấu Chín (Phí hộp đựng muỗng đũa)',
                    'Chọn cấp độ cay: Cấp 2'
                ],
                image: 'https://link-to-item-image.com/item2.jpg', // Replace with a real image
            },
        ],
        total: '93.000₫',
        paymentMethod: 'MoMo',
        orderId: '29270933',
        orderTime: '28/08/2024 | 19:20',
    };

    return (
        <View style={styles.container}>
            <ScrollView >
                {/* Order completion message */}
                <View style={styles.orderCompleteContainer}>
                    <Text style={styles.orderCompleteText}>Đơn hàng của bạn đã hoàn tất</Text>
                    <Image// Replace with a real image
                        style={styles.orderCompleteIcon}
                    />
                </View>

                {/* Driver Information */}
                <View style={styles.driverInfoContainer}>
                    <Text style={styles.licensePlate}>{orderDetails.driver.licensePlate}</Text>
                    <Text>{orderDetails.driver.vehicle}</Text>
                    <View style={styles.driverDetails}>
                        <Image source={require('../assets/Images/Shipper.webp')} style={styles.driverImage} />
                        <View style={styles.driverInfo}>
                            <Text style={styles.driverName}>{orderDetails.driver.name}</Text>
                            <Text style={styles.driverRating}>⭐ {orderDetails.driver.rating}</Text>
                        </View>
                    </View>
                </View>

                {/* Ordered Items */}
                {orderDetails.items.map((item, index) => (
                    <View key={index} style={styles.orderItemContainer}>
                        <View style={styles.orderItemDetails}>
                            <Image source={require('../assets/Images/pizza1.jpg')} style={styles.orderItemImage} />
                            <View style={styles.orderItemText}>
                                <Text style={styles.orderItemName}>{item.name}</Text>
                                {item.options.map((option, optIndex) => (
                                    <Text key={optIndex} style={styles.orderItemOption}>{option}</Text>
                                ))}
                            </View>
                        </View>
                        <Text style={styles.orderItemPrice}>{item.price}</Text>
                    </View>
                ))}

                {/* Payment Information */}
                <View style={styles.paymentInfoContainer}>
                    <Text style={styles.paymentMethod}>Trả qua {orderDetails.paymentMethod}</Text>
                    <Text style={styles.orderTotal}>{orderDetails.total}</Text>
                </View>

                {/* Order ID */}
                <View style={styles.orderIdContainer}>
                    <Text style={styles.orderId}>Mã đơn: {orderDetails.orderId}</Text>
                    <Text style={styles.orderTime}>{orderDetails.orderTime}</Text>
                </View>

                {/* Reorder Button */}
                <TouchableOpacity style={styles.reorderButton}>
                    <Text style={styles.reorderButtonText}>Đặt lại món</Text>
                </TouchableOpacity>
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
        borderRadius: 20,
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
        width: 50,
        height: 50,
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
        fontSize: 18,
        fontWeight: 'bold',
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
});