import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geolocation from 'react-native-geolocation-service';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation, setError } from '../store/currentLocationSlice';
import { useNavigation } from '@react-navigation/native';
import apiService from '../api/apiService';

const Headerbar = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const address = useSelector((state) => state.currentLocation.address);
  const error = useSelector((state) => state.currentLocation.error);
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
              message:
                'Chúng tôi cần quyền truy cập vị trí của bạn để hiển thị các nhà hàng gần đây.',
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
            dispatch(setError('Quyền truy cập vị trí bị từ chối'));
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
          dispatch(setError('Quyền truy cập vị trí bị từ chối'));
        }
      }
    };

    const getLocation = () => {
      Geolocation.getCurrentPosition(
        (position) => {
          fetchAddressFromCoords(
            position.coords.latitude,
            position.coords.longitude
          );
          hasFetchedLocation.current = true; // Đánh dấu đã lấy vị trí
        },
        (error) => {
          console.error(error.code, error.message);
          dispatch(setError('Không thể lấy vị trí'));
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    const fetchAddressFromCoords = async (latitude, longitude) => {
      try {
        const data = await apiService.currentLocation(latitude, longitude);
        console.log(data);
        if (data) {
          dispatch(
            setLocation({
              latitude,
              longitude,
              address: data.address,
            })
          );
        } else {
          dispatch(setError('Không thể tìm thấy vị trí'));
        }
      } catch (error) {
        dispatch(setError('Không thể tìm thấy vị trí'));
      }
    };

    requestLocationPermission();
  }, []);

  const handlePress = () => {
    navigation.navigate('MapScreen');
  };

  return (
    <TouchableOpacity style={styles.addressContent} onPress={handlePress}>
      <View style={styles.iconContainer}>
        <Ionicons name="location" size={22} color="#e74c3c" />
      </View>
      <View style={styles.addressTextContainer}>
        <Text style={styles.addressLabel}>Giao tới</Text>
        <Text style={styles.addressText} numberOfLines={1} ellipsizeMode="tail">
          {error ? error : address}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#7f8c8d" />
    </TouchableOpacity>
  );
};

export default Headerbar;

const styles = StyleSheet.create({
  addressContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    backgroundColor: '#fef2f2',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  addressTextContainer: {
    flex: 1,
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  addressText: {
    fontSize: 16,
    color: '#666f70',
    marginTop: 2,
  },
});
