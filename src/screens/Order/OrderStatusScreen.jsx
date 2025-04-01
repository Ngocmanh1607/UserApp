import React, { useState, useEffect, useMemo } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import RatingCard from '../../components/RatingCard';
import { io } from "socket.io-client";
import styles from '../../assets/css/OrderStatusStyle';
import MapboxGL from '@rnmapbox/maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const OrderStatusScreen = () => {
    const route = useRoute();
    const orderId = route.params?.orderId;
    const customerId = route.params?.customerId;
    const [orderStatus, setOrderStatus] = useState('PAID');
    const [driverId, setDriverId] = useState();
    const userLocation = useSelector(state => state.currentLocation, (prev, next) =>
        prev.latitude === next.latitude && prev.longitude === next.longitude
    );
    const [shipperLocation, setShipperLocation] = useState(null);
    const [router, setRouter] = useState(null);
    useEffect(() => {
        const socket = io("http://localhost:3000");
        socket.emit("joinOrder", orderId);

        socket.on("orderStatusUpdate", ({ orderId, status, detailDriver }) => {
            setDriverId(detailDriver.Profile.id);
            setOrderStatus(status);
            if (status === "ORDER_CONFIRMED")
                clearRoutesFromStorage();
        });

        // Only add listener if in the correct state
        if (orderStatus === 'ORDER_RECEIVED') {
            socket.on("sendLocationToCustomer", (data) => {
                if (customerId === data?.customer_id) {
                    console.log("Vị trí tài xế gửi đến khách hàng:", data);
                    setShipperLocation(data.location);
                    getRoute(data.location, userLocation);
                }
            });
        }

        return () => {
            socket.disconnect();
        };
    }, [orderId, customerId, orderStatus, userLocation]);
    // Lưu tuyến đường và vị trí vào bộ nhớ
    useEffect(() => {
        const saveUpdatedRoutes = async () => {
            try {
                if (router && router.length > 0) {
                    await AsyncStorage.setItem(
                        'routes',
                        JSON.stringify({
                            router,
                            shipperLocation,
                        })
                    );
                    console.log('Đã lưu tuyến đường và vị trí thành công');
                }
            } catch (error) {
                console.error('Lỗi khi lưu tuyến đường và vị trí:', error);
            }
        };
        saveUpdatedRoutes();
    }, [router]);

    // Khôi phục tuyến đường và vị trí từ bộ nhớ
    useEffect(() => {
        const restoreRoutesFromStorage = async () => {
            try {
                const savedRoutes = await AsyncStorage.getItem('routes');
                if (savedRoutes) {
                    const {
                        router: savedRoute1 = [],
                        shipperLocation: savedShipperLocation
                    } = JSON.parse(savedRoutes);

                    setRouter(Array.isArray(savedRoute1) ? savedRoute1 : []);
                    if (savedShipperLocation) setShipperLocation(savedShipperLocation);
                }
            } catch (error) {
                console.error('Lỗi khi khôi phục tuyến đường và vị trí:', error);
            }
        };

        restoreRoutesFromStorage();
    }, []);
    const clearRoutesFromStorage = async () => {
        try {
            await AsyncStorage.removeItem('routes');
        } catch (error) {
            console.error('Lỗi khi xóa tuyến đường:', error);
        }
    };
    const getRoute = async (origin, destination) => {
        try {
            if (shipperLocation !== null) {
                const response = await axios.get(
                    `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?geometries=geojson&access_token=sk.eyJ1IjoibmdvY21hbmgxNjA3IiwiYSI6ImNtM2N5bzY5dDFxbDIyanIxbDEycXg0bGwifQ.M2rY0iFiThl6Crjp6kr_GQ`
                );
                const routeCoordinates = response.data.routes[0].geometry.coordinates.map(
                    (point) => ({ latitude: point[1], longitude: point[0] })
                );
                setRouter(routeCoordinates);
            }
        } catch (error) {
            console.error('Lỗi khi lấy tuyến đường:', error);
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            {
                orderStatus === 'ORDER_CONFIRMED' ? (

                    <View View style={styles.container}>
                        <RatingCard order_id={orderId} />
                    </View>
                ) : (
                    orderStatus === 'ORDER_RECEIVED' && router ? (
                        <MapboxGL.MapView style={styles.map}>
                            <MapboxGL.Camera
                                zoomLevel={17}
                                animationDuration={1000}
                                centerCoordinate={shipperLocation ? [shipperLocation.longitude, shipperLocation.latitude] : [0, 0]}
                            />

                            {userLocation && userLocation.latitude && userLocation.longitude && (
                                <MapboxGL.PointAnnotation coordinate={[userLocation.longitude, userLocation.latitude]} id="userLocation">
                                    <View style={styles.marker}>
                                        <Text style={styles.markerText}>📍</Text>
                                    </View>
                                </MapboxGL.PointAnnotation>
                            )}

                            {shipperLocation && shipperLocation.latitude && shipperLocation.longitude && (
                                <MapboxGL.PointAnnotation coordinate={[shipperLocation.longitude, shipperLocation.latitude]} id="delivery">
                                    <View style={styles.marker}>
                                        <MaterialCommunityIcons name="motorbike" size={24} color="#007AFF" />
                                    </View>
                                </MapboxGL.PointAnnotation>
                            )}

                            {router && Array.isArray(router) && router.length > 0 && (
                                <MapboxGL.ShapeSource
                                    id="routeSource"
                                    shape={{
                                        type: 'Feature',
                                        geometry: {
                                            type: 'LineString',
                                            coordinates: router.map(coord => [coord.longitude, coord.latitude])
                                        }
                                    }}
                                >
                                    <MapboxGL.LineLayer
                                        id="lineLayer2"
                                        style={{
                                            lineColor: "#33FF57",
                                            lineWidth: 3,
                                            lineCap: 'round',
                                            lineJoin: 'round',
                                        }}
                                    />
                                </MapboxGL.ShapeSource>
                            )}
                        </MapboxGL.MapView>
                    ) : (
                        <View style={styles.imageContainer}>
                            <Image
                                source={require('../../assets/Images/background2.png')}
                                style={styles.chefImage}
                                resizeMode="contain"
                            />
                        </View>
                    )
                )
            }

            <View View style={styles.orderInfoContainer}>
                <Text style={styles.orderStatus}>
                    {orderStatus === 'UNPAID' && 'Đơn hàng chưa được thanh toán'}
                    {orderStatus === 'PAID' && 'Đơn hàng đã thanh toán'}
                    {orderStatus === 'PREPARING_ORDER' && 'Nhà hàng đang chuẩn bị món'}
                    {orderStatus === 'DELIVERING' && 'Shipper đang tới lấy đơn'}
                    {orderStatus === 'ORDER_RECEIVED' && 'Shipper đang giao hàng'}
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
                    <TouchableOpacity style={[styles.progressItem, orderStatus === 'ORDER_RECEIVED' && styles.activeStep]}>
                        <Ionicons name="bicycle-outline" size={24} color={orderStatus === 'ORDER_RECEIVED' ? "#007AFF" : "#9E9E9E"} />
                        <Text style={styles.progressText}>Giao món</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.progressItem, orderStatus === 'ORDER_CONFIRMED' && styles.activeStep]}>
                        <Ionicons name="checkmark-done-circle-outline" size={24} color={orderStatus === 'completed' ? "#007AFF" : "#9E9E9E"} />
                        <Text style={styles.progressText}>Hoàn thành</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    );
};

export default OrderStatusScreen;
