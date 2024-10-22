// OrderScreen.js
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign'
import CardOrder from '../components/CardOrder';
import { SafeAreaView } from 'react-native-safe-area-context';

const OrderScreen = () => {
    const [search, setSearch] = useState('')
    // Sample data for orders
    const [deliveredOrders, setDeliveredOrders] = useState([
        {
            id: '1',
            date: '28/08/2024, 19:20',
            restaurant: 'Mì Cay Sasin - 2 Lê Lợi',
            quantity: '2 phần',
            price: '93.000₫',
            image: 'https://link-to-your-image.com/mi-cay.jpg',
            status: 'Giao thành công',
        },
        {
            id: '2',
            date: '23/08/2024, 19:23',
            restaurant: 'Gà Nướng Cái Bang - Hồ Biểu Chánh',
            quantity: '2 phần',
            price: '109.000₫',
            image: 'https://link-to-your-image.com/ga-nuong.jpg',
            status: 'Giao thành công',
        },
    ]);

    const [undeliveredOrders, setUndeliveredOrders] = useState([]);

    // Render each order using the CardOrder component
    const renderOrderItem = ({ item }) => (
        <CardOrder order={item} />
    );

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                {/* Search Bar */}
                <View style={styles.searchbox}>
                    <TouchableOpacity>
                        <AntDesign name='search1' size={24} color="black" style={{ color: 'red', marginRight: 10 }} />
                    </TouchableOpacity>
                    <TextInput style={styles.input} placeholder="Tìm kiếm theo tên nhà hàng" value={search} onChangeText={setSearch} />
                </View>

                {/* Section for undelivered orders */}
                <Text style={styles.sectionHeader}>CHƯA GIAO ({undeliveredOrders.length})</Text>
                {undeliveredOrders.length === 0 ? (
                    <Text style={styles.noOrdersText}>Không có đơn hàng</Text>
                ) : (
                    <FlatList
                        data={undeliveredOrders}
                        keyExtractor={(item) => item.id}
                        renderItem={renderOrderItem}
                    />
                )}

                {/* Section for delivered orders */}
                <Text style={styles.sectionHeader}>ĐÃ GIAO</Text>
                <FlatList
                    data={deliveredOrders}
                    keyExtractor={(item) => item.id}
                    renderItem={renderOrderItem}
                />
            </View>
        </TouchableWithoutFeedback>
    );
}

export default OrderScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 10,
    },
    headerContainer: {
    },
    textHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 10
    },
    searchBar: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    searchInput: {
        height: 40,
        fontSize: 16,
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    noOrdersText: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
    },
    searchbox: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        marginVertical: 10,
        alignSelf: 'center',
        elevation: 3,
        borderRadius: 10,
        height: 45,
    },
    input: {
        width: '90%',
        fontSize: 16,
        color: 'black',
    },
});