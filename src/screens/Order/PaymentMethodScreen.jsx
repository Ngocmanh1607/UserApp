import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../../assets/css/PaymentMethodStyle';
const PaymentMethodScreen = () => {
    const route = useRoute();
    const { restaurantId } = route.params;
    const navigation = useNavigation();
    const handleSelectPaymentMethod = (method) => {
        navigation.navigate('CartScreen', { selectedPaymentMethod: method, restaurantId: restaurantId });
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Phương thức thanh toán</Text>

            <Text style={styles.sectionTitle}>Ví điện tử</Text>
            <TouchableOpacity style={styles.paymentOption} onPress={() => handleSelectPaymentMethod('ZALOPAY')}>
                <Image source={require('../../assets/Images/zalo.png')} style={styles.image} />
                <Text>Zalopay</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentOption} onPress={() => handleSelectPaymentMethod('MoMo')}>
                <Image source={require('../../assets/Images/momo.png')} style={styles.image} />
                <Text>MoMo</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Phương thức thanh toán khác</Text>
            <TouchableOpacity style={styles.paymentOption} onPress={() => handleSelectPaymentMethod('Tiền mặt')}>
                <Image source={require('../../assets/Images/money.jpeg')} style={styles.image} />
                <Text>Tiền mặt</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default PaymentMethodScreen;
