import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import MapboxGL from '@rnmapbox/maps';

const OrderStatusScreen = () => {
    const navigation = useNavigation();
    const [orderStatus, setOrderStatus] = useState('confirmed');

    // Static coordinates (for demonstration purposes)
    const restaurantLocation = [105.8342, 21.0278]; // Hanoi
    const deliveryLocation = [105.8429, 21.0285]; // Nearby location in Hanoi
    const [route, setRoute] = useState(null);

    // Advance the order status
    const advanceOrderStatus = () => {
        if (orderStatus === 'confirmed') setOrderStatus('preparing');
        else if (orderStatus === 'preparing') setOrderStatus('delivering');
        else if (orderStatus === 'delivering') setOrderStatus('completed');
    };

    // Load the route data when order status changes to "delivering"
    useEffect(() => {
        if (orderStatus === 'delivering') {
            // Fetch route data here
            // Simulated route data for demonstration purposes
            setRoute({
                coordinates: [
                    restaurantLocation,
                    deliveryLocation
                ]
            });
        }
    }, [orderStatus]);

    return (
        <SafeAreaView style={styles.container}>
            {orderStatus === 'confirmed' ? (
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/Images/background2.png')}
                        style={styles.chefImage}
                        resizeMode="contain"
                    />
                </View>
            ) : (
                <MapboxGL.MapView style={styles.map}>
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
            )}

            <View style={styles.orderInfoContainer}>
                <Text style={styles.orderStatus}>
                    {orderStatus === 'confirmed' && 'Đơn hàng đã xác nhận'}
                    {orderStatus === 'preparing' && 'Đơn hàng đang được chuẩn bị'}
                    {orderStatus === 'delivering' && 'Đang giao hàng'}
                    {orderStatus === 'completed' && 'Đơn hàng đã hoàn thành'}
                </Text>

                <View style={styles.progressContainer}>
                    <View style={[styles.progressItem, orderStatus === 'confirmed' && styles.activeStep]}>
                        <Ionicons name="checkmark-circle-outline" size={24} color={orderStatus === 'confirmed' ? "#007AFF" : "#9E9E9E"} />
                        <Text style={styles.progressText}>Xác nhận</Text>
                    </View>
                    <TouchableOpacity style={[styles.progressItem, orderStatus === 'preparing' && styles.activeStep]}>
                        <Ionicons name="fast-food-outline" size={24} color={orderStatus === 'preparing' ? "#007AFF" : "#9E9E9E"} />
                        <Text style={styles.progressText}>Chuẩn bị món</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.progressItem, orderStatus === 'delivering' && styles.activeStep]}>
                        <Ionicons name="bicycle-outline" size={24} color={orderStatus === 'delivering' ? "#007AFF" : "#9E9E9E"} />
                        <Text style={styles.progressText}>Giao món</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.progressItem, orderStatus === 'completed' && styles.activeStep]}>
                        <Ionicons name="checkmark-done-circle-outline" size={24} color={orderStatus === 'completed' ? "#007AFF" : "#9E9E9E"} />
                        <Text style={styles.progressText}>Hoàn thành</Text>
                    </TouchableOpacity>
                </View>

                {orderStatus !== 'completed' && (
                    <TouchableOpacity style={styles.orderDetailsButton} onPress={advanceOrderStatus}>
                        <Text style={styles.orderDetailsText}>Tiến tới bước tiếp theo</Text>
                    </TouchableOpacity>
                )}
            </View>
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
