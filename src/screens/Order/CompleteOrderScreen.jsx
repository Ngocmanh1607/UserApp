import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../store/cartSlice';
import styles from '../../assets/css/CompleteOrderStyle';

const CompleteOrder = ({ onComplete, restaurantId }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const handleOrderComplete = () => {
        dispatch(clearCart({ restaurantId }));
        navigation.navigate('Main');
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.iconWrapper}>
                <View style={styles.icon}>
                    <Text style={styles.iconText}>✔️</Text>
                </View>
                <Text style={styles.thankYouText}>Cảm ơn bạn đã đặt hàng.</Text>
                <Text style={styles.subText}>Bạn có thể theo dõi đơn hàng trong phần "Đơn hàng".</Text>
            </View>
            <TouchableOpacity style={styles.trackOrderButton} onPress={() => handleOrderComplete()} >
                <Text style={styles.buttonText}>Quay lại trang chủ</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default CompleteOrder;
