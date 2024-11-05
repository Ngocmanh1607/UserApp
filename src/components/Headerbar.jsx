import { StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid, Platform } from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Geolocation from 'react-native-geolocation-service';
import { useDispatch, useSelector } from "react-redux";
import { setLocation, setError } from "../store/currentLocationSlice";
import { useNavigation } from "@react-navigation/native";
import apiService from "../api/apiService";

const Headerbar = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const address = useSelector(state => state.currentLocation.address);
    const error = useSelector(state => state.currentLocation.error);
    useEffect(() => {
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
                const data = await apiService.currentLocation(latitude, longitude)
                if (data) {
                    dispatch(setLocation({
                        latitude, longitude, address: data.address
                    }))
                }
                else {
                    dispatch(setError('Không thể tìm thấy vị trí'))
                }
            }
            catch (error) {
                console.error(error);
                dispatch(setError("Không thể tìm thấy vị trí"));
            }
        };
        requestLocationPermission();
    }, []);

    const handlePress = () => {
        navigation.navigate('MapScreen')
    }
    return (
        <View style={styles.container}>
            <View style={styles.locationContainer}>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={handlePress}>
                    <Ionicons name="location" size={25} color="#FF0000" style={{ paddingVertical: 6 }} />
                    <View>
                        <View>
                            <Text style={{ paddingRight: 3, fontSize: 16, fontWeight: '700' }}>Giao tới</Text>
                        </View>
                        <Text style={styles.text}>{
                            error ? error : address
                        }</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Headerbar;

const styles = StyleSheet.create({
    locationContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        height: 60,
        padding: 10,
    },
    container: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 5
    },
    text: {
        paddingRight: 10
    }
});
