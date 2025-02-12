import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import apiService from '../../api/apiService';
import { setLocation } from '../../store/currentLocationSlice';
import { useNavigation } from '@react-navigation/native';
import { debounce } from 'lodash';
import { useRoute } from '@react-navigation/native';
import { setDefaultLocation } from '../../store/defaultLocationSlice';
import styles from '../../assets/css/MapStyle';

const MapScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const saveLocation = useSelector(state => state.currentLocation);
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
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

    const handleSearch = useCallback(
        debounce(async (query) => {
            if (!query.trim()) {
                setResults([]);
                return;
            }
            try {
                const response = await apiService.searchAddress(query);
                setResults(response || []);
            } catch (error) {
                console.log(error);
                Alert.alert('Lỗi', 'Có lỗi xảy ra khi tìm kiếm địa chỉ.');
            }
        }, 500),
        []
    );

    const handleChangeText = (value) => {
        setSearch(value);
        handleSearch(value);
    };

    const handlePress = (location) => {
        try {
            setRegion({
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
            const tempt = route.params?.tempt ?? true;
            if (tempt) {
                dispatch(setLocation({
                    latitude: location.latitude,
                    longitude: location.longitude,
                    address: location.address,
                }));
            }
            else {
                dispatch(setDefaultLocation({
                    latitude: location.latitude,
                    longitude: location.longitude,
                    address: location.address,
                }))
            }
            navigation.goBack();
        } catch (error) {
            console.log(error);
            Alert.alert('Lỗi', 'Có lỗi xảy ra khi chọn địa chỉ.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchbox}>
                <TouchableOpacity>
                    <AntDesign name='search1' size={24} color="red" />
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholder="Tìm kiếm địa chỉ"
                    value={search}
                    onChangeText={handleChangeText}
                />
            </View>
            <FlatList
                data={results}
                keyExtractor={(item) => `${item.latitude}-${item.longitude}`}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.textContainer}
                        onPress={() => handlePress(item)}
                    >
                        <Text>{item.address}</Text>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={<Text style={styles.noResultsText}>Không tìm thấy địa chỉ nào</Text>}
            />
        </View>
    );
};

export default MapScreen;


