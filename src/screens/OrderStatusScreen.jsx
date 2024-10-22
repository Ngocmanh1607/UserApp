
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const OrderStatusScreen = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.navigate('Main') }}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.newOrderButton}>
                    <Text style={styles.newOrderText}>+ Tạo đơn mới</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/Images/background2.png')}
                    style={styles.chefImage}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.orderInfoContainer}>
                <Text style={styles.orderStatus}>Đơn hàng đang được chuẩn bị</Text>
                <Text style={styles.orderDescription}>
                    Món ăn của bạn đang được chuẩn bị để giao cho tài xế
                </Text>

                <View style={styles.progressContainer}>
                    <TouchableOpacity style={[styles.progressItem, styles.activeStep]}>
                        <Ionicons name="checkmark-circle-outline" size={24} color="#007AFF" />
                        <Text style={styles.progressText}>Xác nhận</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.progressItem}>
                        <Ionicons name="fast-food-outline" size={24} color="#007AFF" />
                        <Text style={styles.progressText}>Chuẩn bị món</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.progressItem}>
                        <Ionicons name="bicycle-outline" size={24} color="#9E9E9E" />
                        <Text style={styles.progressText}>Giao món</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.progressItem}>
                        <Ionicons name="checkmark-done-circle-outline" size={24} color="#9E9E9E" />
                        <Text style={styles.progressText}>Hoàn thành</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.orderDetailsButton}>
                    <Text style={styles.orderDetailsText}>Chi tiết đơn hàng</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default OrderStatusScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 1
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    newOrderButton: {
        backgroundColor: '#F1F1F1',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    newOrderText: {
        color: '#007AFF',
        fontWeight: 'bold',
    },
    imageContainer: {
        flex: 2,
        alignItems: 'center',
        marginTop: 50,
    },
    chefImage: {
        width: 300,
        height: 300,
    },
    orderInfoContainer: {
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 20,
        elevation: 3,
        borderWidth: 1
    },
    orderStatus: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    orderDescription: {
        fontSize: 16,
        textAlign: 'center',
        color: '#9E9E9E',
        marginBottom: 20,
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    progressItem: {
        alignItems: 'center',
    },
    progressText: {
        marginTop: 5,
        fontSize: 14,
        color: '#9E9E9E',
    },
    activeStep: {
        backgroundColor: '#E3F2FD',
        borderRadius: 10,
        padding: 10,
        borderColor: '#007AFF',
        borderWidth: 1,
    },

    orderDetailsButton: {
        marginHorizontal: 10,
        alignItems: 'center',
    },
    orderDetailsText: {
        color: '#007AFF',
        fontWeight: 'bold',
    },
});
