import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { clearCart } from '../store/cartSlice';
const CompleteOrder = ({ onComplete, restaurantId }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const handleOrderComplete = () => {
        // Gọi callback onComplete để tắt BlurView trước khi điều hướng
        if (onComplete) {
            onComplete();
        }
        // dispatch(clearCart({ restaurantId }));
        navigation.navigate('OrderStatus');
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.iconWrapper}>
                <View style={styles.icon}>
                    <Text style={styles.iconText}>✔️</Text>
                </View>
                <Text style={styles.thankYouText}>Cảm ơn bạn đã đặt hàng.</Text>
                <Text style={styles.subText}>Bạn có thể theo dõi đơn hàng trong phần "Đơn hàng".</Text>
            </View>
            <TouchableOpacity
                style={styles.trackOrderButton}
                onPress={handleOrderComplete}>
                <Text style={styles.buttonText}>Theo dõi đơn hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.orderAgainContainer} onPress={() => { navigation.navigate('Main') }} >
                <Text style={styles.orderAgainText}>Quay lại trang chủ</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        elevation: 5,
        marginBottom: 20
    },
    iconWrapper: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20
    },
    icon: {
        backgroundColor: '#FFEB3B',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        fontSize: 30,
        color: '#FF0000',
    },
    thankYouText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FF0000',
        marginVertical: 10,
    },
    subText: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginBottom: 10,
    },
    trackOrderButton: {
        backgroundColor: '#FF0000',
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 20
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    orderAgainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    orderAgainText: {
        color: '#333',
        fontSize: 16,
    },
});

export default CompleteOrder;
