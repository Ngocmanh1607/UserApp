import { StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid, Platform } from "react-native";
import React, { useEffect, useRef } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geolocation from 'react-native-geolocation-service';
import { useDispatch, useSelector } from "react-redux";
import { setLocation, setError } from "../store/currentLocationSlice";
import { useNavigation } from "@react-navigation/native";
import apiService from "../api/apiService";

const Headerbar = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const address = useSelector(state => state.currentLocation.address);
    const error = useSelector(state => state.currentLocation.error);
    const hasFetchedLocation = useRef(false);

    useEffect(() => {
        if (hasFetchedLocation.current) return;

        const requestLocationPermission = async () => {
            if (Platform.OS === 'android') {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: 'Quyền Truy Cập Vị Trí',
                            message: 'Chúng tôi cần quyền truy cập vị trí của bạn để hiển thị các nhà hàng gần đây.',
                            buttonNeutral: 'Hỏi Sau',
                            buttonNegative: 'Hủy',
                            buttonPositive: 'Đồng Ý',
                        }
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        console.log('Quyền truy cập vị trí đã được cấp');
                        getLocation();
                    } else {
                        console.log('Quyền truy cập vị trí bị từ chối');
                        dispatch(setError("Quyền truy cập vị trí bị từ chối"));
                    }
                } catch (err) {
                    console.warn(err);
                }
            } else if (Platform.OS === 'ios') {
                const auth = await Geolocation.requestAuthorization('whenInUse');
                if (auth === 'granted') {
                    getLocation();
                } else {
                    console.log('Quyền truy cập vị trí bị từ chối');
                    dispatch(setError("Quyền truy cập vị trí bị từ chối"));
                }
            }
        };

        const getLocation = () => {
            Geolocation.getCurrentPosition(
                (position) => {
                    fetchAddressFromCoords(position.coords.latitude, position.coords.longitude);
                    hasFetchedLocation.current = true; // Đánh dấu đã lấy vị trí
                },
                (error) => {
                    console.error(error.code, error.message);
                    dispatch(setError("Không thể lấy vị trí"));
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        };

        const fetchAddressFromCoords = async (latitude, longitude) => {
            try {
                const data = await apiService.currentLocation(latitude, longitude);
                console.log(data)
                if (data) {
                    dispatch(setLocation({
                        latitude, longitude, address: data.address
                    }));
                } else {
                    dispatch(setError('Không thể tìm thấy vị trí'));
                }
            } catch (error) {

                dispatch(setError("Không thể tìm thấy vị trí"));
            }
        };

        requestLocationPermission();
    }, []);

    const handlePress = () => {
        navigation.navigate('MapScreen');
    };

    return (
        <View style={styles.container}>
            <View style={styles.locationContainer}>
                <TouchableOpacity style={styles.locationButton} onPress={handlePress}>
                    <Ionicons name="location" size={25} color="#FF0000" style={styles.locationIcon} />
                    <View>
                        <Text style={styles.deliveryText}>Giao tới</Text>
                        <Text style={styles.addressText} numberOfLines={1} ellipsizeMode="tail">
                            {error ? error : address}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Headerbar;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 5,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    locationContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 50,
        padding: 10,
        flex: 1,
    },
    locationButton: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    locationIcon: {
        paddingVertical: 6,
        marginRight: 8,
    },
    deliveryText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#222',
        marginBottom: 2,
    },
    addressText: {
        fontSize: 14,
        color: '#666',
        width: '95%',
        paddingRight: 10,
    }
});
