import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        marginBottom: 10,
    },
    image: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
});