import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import apiService from '../api/apiService';
import { setLocation } from '../store/currentLocationSlice';

const MapScreen = () => {
    const saveLocation = useSelector(state => state.currentLocation);
    console.log(saveLocation)
    const [search, setSearch] = useState('');
    const [region, setRegion] = useState({
        latitude: saveLocation.latitude,
        longitude: saveLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });
    const [address, setAddress] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        setAddress(saveLocation.address);
    }, [saveLocation]);

    const handleSearch = async () => {
        if (!search.trim()) {
            Alert.alert('Thông báo', 'Vui lòng nhập địa chỉ.');
            return;
        }
        try {
            const response = await apiService.searchAddress(search);
            if (response && response.length > 0) {
                const location = response[0];
                console.log("Locaiton", location)
                setRegion({
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
                dispatch(setLocation({
                    latitude: location.latitude,
                    longitude: location.longitude,
                    address: location.address
                }))
                console.log("address", response[0].address)
            } else {
                Alert.alert('Thông báo', 'Không tìm thấy địa chỉ nào.');
            }
        } catch (error) {
            console.log(error)
            // Alert.alert('Lỗi', 'Có lỗi xảy ra khi tìm kiếm địa chỉ.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchbox}>
                <TextInput
                    style={styles.input}
                    placeholder="Tìm kiếm địa chỉ"
                    value={search}
                    onChangeText={setSearch}
                />
                <TouchableOpacity onPress={handleSearch}>
                    <AntDesign name='search1' size={24} color="red" style={{ paddingEnd: 10 }} />
                </TouchableOpacity>
            </View>
            <MapView
                style={styles.map}
                region={region}
            >
                <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
            </MapView>
        </View>
    );
};

export default MapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    searchbox: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        alignItems: 'center',
        paddingLeft: 10,
        margin: 10,
        elevation: 5,
        borderRadius: 10,
        height: 45,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: 'black',
        marginLeft: 10,
    },
});