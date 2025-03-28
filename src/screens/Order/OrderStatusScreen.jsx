import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import RatingCard from '../../components/RatingCard';
import { io } from "socket.io-client";
import styles from '../../assets/css/OrderStatusStyle';
import MapboxGL from '@rnmapbox/maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const OrderStatusScreen = () => {
    const route = useRoute();
    const orderId = route.params?.orderId;
    const [orderStatus, setOrderStatus] = useState('PAID');
    const restaurantLocation = [105.8342, 21.0278];
    const deliveryLocation = [105.8429, 21.0285];
    const [router, setRouter] = useState(null);

    useEffect(() => {
        // Tạo kết nối socket
        // const socket = io("https://lh30mlhb-3000.asse.devtunnels.ms/");
        const socket = io("http://localhost:3000");
        socket.emit("joinOrder", orderId);
        socket.on("orderStatusUpdate", ({ orderId, status, detailDriver }) => {
            console.log("Order status updated:", orderId, status, detailDriver);
            setOrderStatus(status);
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
            {
                orderStatus === 'ORDER_CONFIRMED' ? (
                    <View style={styles.container}>
                        <RatingCard order_id={orderId} />
                    </View>
                ) : (
                    orderStatus === 'PAID' ? (
                        <View style={styles.imageContainer}>
                            <Image
                                source={require('../../assets/Images/background2.png')}
                                style={styles.chefImage}
                                resizeMode="contain"
                            />
                        </View>
                    ) : (
                        <MapboxGL.MapView style={styles.map} >
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
                        </MapboxGL.MapView>
                    )
                )
            }

            <View View style={styles.orderInfoContainer}>
                <Text style={styles.orderStatus}>
                    {orderStatus === 'UNPAID' && 'Đơn hàng chưa được thanh toán'}
                    {orderStatus === 'PAID' && 'Đơn hàng đã thanh toán'}
                    {orderStatus === 'PREPARING_ORDER' && 'Nhà hàng đang chuẩn bị món'}
                    {orderStatus === 'DELIVERING' && 'Shipper đang tới lấy đơn'}
                    {orderStatus === 'GIVED ORDER' && 'Shipper đang giao hàng'}
                    {orderStatus === 'ORDER_CONFIRMED' && 'Đơn hàng đã hoàn thành'}
                    {orderStatus === 'ORDER_CANCELED' && 'Đơn hàng đã bị hủy'}
                </Text>

                <View style={styles.progressContainer}>
                    <View style={[styles.progressItem, orderStatus === 'PAID' && styles.activeStep]}>
                        <Ionicons name="checkmark-circle-outline" size={24} color={orderStatus === 'PAID' ? "#007AFF" : "#9E9E9E"} />
                        <Text style={styles.progressText}>Xác nhận</Text>
                    </View>
                    <TouchableOpacity style={[styles.progressItem, orderStatus === 'DELIVERING' && styles.activeStep || orderStatus === 'PREPARING_ORDER' && styles.activeStep]}>
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
        </SafeAreaView>
    );
};

export default OrderStatusScreen;
