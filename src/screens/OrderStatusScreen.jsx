import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapboxGL from '@rnmapbox/maps';
import RatingCard from '../components/RatingCard';
import { io } from "socket.io-client";

const OrderStatusScreen = () => {
    const route = useRoute();
    const orderId = route.params?.orderId;
    const [orderStatus, setOrderStatus] = useState('PAID');
    const [loading, setLoading] = useState(true);
    const restaurantLocation = [105.8342, 21.0278];
    const deliveryLocation = [105.8429, 21.0285];
    const [router, setRouter] = useState(null);

    // Load the route data when order status changes to "delivering"
    // useEffect(() => {
    //     if (orderStatus === 'delivering') {
    //         // Fetch route data here
    //         // Simulated route data for demonstration purposes
    //         setRouter({
    //             coordinates: [
    //                 restaurantLocation,
    //                 deliveryLocation
    //             ]
    //         });
    //     }
    // }, [orderStatus]);

    useEffect(() => {
        // Tạo kết nối socket
        const socket = io("https://lh30mlhb-3000.asse.devtunnels.ms/");
        socket.emit("joinOrder", orderId);

        socket.on("orderStatusUpdate", ({ orderId, status, detailDriver }) => {
            console.log("Order status updated:", orderId, status, detailDriver);
            setOrderStatus(status);
            setLoading(false);
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected");
        });

        return () => {
            socket.disconnect();
        };
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                // Hiển thị loader hoặc thông báo khi đang chờ dữ liệu
                <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                    <Text style={styles.loadingText}>Đang tải trạng thái đơn hàng...</Text>
                </View>
            ) : (
                <>
                    {
                        orderStatus === 'ORDER_CONFIRMED' ? (
                            <View style={styles.container}>
                                <RatingCard order_id={orderId} />
                            </View>
                        ) : (
                            <View style={styles.imageContainer}>
                                <Image
                                    source={require('../assets/Images/background2.png')}
                                    style={styles.chefImage}
                                    resizeMode="contain"
                                />
                            </View>
                        )
                    }
                    {/* {orderStatus === 'PAID' ? (
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/Images/background2.png')}
                        style={styles.chefImage}
                        resizeMode="contain"
                    />
                </View>
            ) : (
                orderStatus === 'completed' && (
                    <View style={styles.container}>
                        <RatingCard />
                    </View>
                ))} */}

                    {/* <MapboxGL.MapView style={styles.map} >
                <MapboxGL.Camera
                    zoomLevel={13}
                    centerCoordinate={restaurantLocation}
                />
                <MapboxGL.PointAnnotation coordinate={restaurantLocation} id="restaurant">
                    <View style={styles.marker}>
                        <Ionicons name="restaurant" size={24} color="#FF6347" />
                    </View>
                </MapboxGL.PointAnnotation>
                <MapboxGL.PointAnnotation coordinate={deliveryLocation} id="delivery">
                    <View style={styles.marker}>
                        <MaterialCommunityIcons name="motorbike" size={24} color="#007AFF" />
                    </View>
                </MapboxGL.PointAnnotation>
                {route && (
                    <MapboxGL.ShapeSource id="routeSource" shape={{
                        type: 'Feature',
                        geometry: {
                            type: 'LineString',
                            coordinates: route.coordinates
                        }
                    }}>
                        <MapboxGL.LineLayer
                            id="routeLayer"
                            style={{ lineWidth: 5, lineColor: '#007AFF' }}
                        />
                    </MapboxGL.ShapeSource>
                )}
            </MapboxGL.MapView> */}


                    <View View style={styles.orderInfoContainer}>
                        <Text style={styles.orderStatus}>
                            {orderStatus === 'UNPAID' && 'Đơn hàng chưa được thanh toán'}
                            {orderStatus === 'PAID' && 'Đơn hàng đã thanh toán'}
                            {orderStatus === 'PREPARING_ORDER' && 'Nhà hàng đang chuẩn bị món'}
                            {orderStatus === 'DELIVERING' && 'Shipper đã nhận đơn'}
                            {orderStatus === 'GIVED ORDER' && 'Đang giao hàng'}
                            {orderStatus === 'ORDER_CONFIRMED' && 'Đơn hàng đã hoàn thành'}
                            {orderStatus === 'ORDER_CANCELED' && 'Đơn hàng đã bị hủy'}
                        </Text>

                        <View style={styles.progressContainer}>
                            <View style={[styles.progressItem, orderStatus === 'PAID' && styles.activeStep]}>
                                <Ionicons name="checkmark-circle-outline" size={24} color={orderStatus === 'PAID' ? "#007AFF" : "#9E9E9E"} />
                                <Text style={styles.progressText}>Xác nhận</Text>
                            </View>
                            <TouchableOpacity style={[styles.progressItem, orderStatus === 'DELIVERING' || orderStatus === 'PREPARING_ORDER' && styles.activeStep]}>
                                <Ionicons name="fast-food-outline" size={24} color={orderStatus === 'DELIVERING' ? "#007AFF" : "#9E9E9E"} />
                                <Text style={styles.progressText}>Chuẩn bị món</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.progressItem, orderStatus === 'GIVED ORDER' && styles.activeStep]}>
                                <Ionicons name="bicycle-outline" size={24} color={orderStatus === 'GIVED ORDER' ? "#007AFF" : "#9E9E9E"} />
                                <Text style={styles.progressText}>Giao món</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.progressItem, orderStatus === 'ORDER_CONFIRMED' && styles.activeStep]}>
                                <Ionicons name="checkmark-done-circle-outline" size={24} color={orderStatus === 'completed' ? "#007AFF" : "#9E9E9E"} />
                                <Text style={styles.progressText}>Hoàn thành</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>)}
        </SafeAreaView>
    );
};

export default OrderStatusScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 1,
        backgroundColor: '#fff'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    imageContainer: {
        flex: 2,
        alignItems: 'center',
        marginTop: 50,
    },
    chefImage: {
        width: 300,
        height: 300,
    },
    map: {
        flex: 2,
    },
    marker: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    orderInfoContainer: {

        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 20,
        elevation: 3,
        borderWidth: 1
    },
    orderStatus: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    progressItem: {
        alignItems: 'center',
    },
    progressText: {
        marginTop: 5,
        fontSize: 14,
        color: '#9E9E9E',
    },
    activeStep: {
        backgroundColor: '#E3F2FD',
        borderRadius: 10,
        padding: 10,
        borderColor: '#007AFF',
        borderWidth: 1,
    },
    orderDetailsButton: {
        alignItems: 'center',
        marginTop: 10,
    },
    orderDetailsText: {
        color: '#007AFF',
        fontWeight: 'bold',
    },
});
