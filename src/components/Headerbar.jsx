import { StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid, Platform } from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Geolocation from 'react-native-geolocation-service';
import { useDispatch, useSelector } from "react-redux";
import { setLocation, setError } from "../store/currentLocationSlice";

const Headerbar = () => {
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
                            title: 'Location Permission',
                            message: 'We need access to your location to show nearby restaurants.',
                            buttonNeutral: 'Ask Me Later',
                            buttonNegative: 'Cancel',
                            buttonPositive: 'OK',
                        }
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        console.log('Location permission granted');
                        getLocation();
                    } else {
                        console.log('Location permission denied');
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
                    console.log('Location permission denied');
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
        const fetchAddressFromCoords = (latitude, longitude) => {
            fetch(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&lang=en-US&apiKey=7sef-qPLms2vVRE4COs57FGzk4LuYC20NtU6TCd13kU`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.items && data.items.length > 0) {
                        dispatch(setLocation({
                            latitude: latitude,
                            longitude: longitude,
                            address: data.items[0].address.label,
                        }));
                        console.log(data.items[0].address.label)
                    } else {
                        dispatch(setError("Không thể tìm thấy vị trí"));
                    }
                })
                .catch((error) => {
                    console.error(error);
                    dispatch(setError("Không thể tìm thấy vị trí"));
                });
        };
        requestLocationPermission();
    }, [dispatch]);


    return (
        <View style={styles.container}>
            <View style={styles.locationContainer}>
                <TouchableOpacity style={{ flexDirection: 'row' }}>
                    <Ionicons name="location" size={25} color="#FF0000" style={{ paddingVertical: 6 }} />
                    <View>
                        <View>
                            <Text style={{ paddingRight: 3, fontSize: 16, fontWeight: '700' }}>Location</Text>
                        </View>
                        <Text>{
                            error ? error : address
                        }</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.notificationContainer}>
                <MaterialIcons name="notifications" size={25} />
            </TouchableOpacity>
        </View>
    );
}

export default Headerbar;

const styles = StyleSheet.create({
    locationContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        height: 60,
        paddingVertical: 10,
        width: '80%',
    },
    container: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        paddingBottom: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    notificationContainer: {
        justifyContent: 'flex-end',
    },
});
