// OrderScreen.js
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign'
import CardOrder from '../../components/CardOrder';
import { orderApi } from '../../api/orderApi';
import { useFocusEffect } from '@react-navigation/native';

const OrderScreen = () => {
    const [search, setSearch] = useState('');
    const [orders, setOrders] = useState();
    const [filteredOrders, setFilteredOrders] = useState([]);
    useFocusEffect(
        useCallback(() => {
            const fetchOrder = async () => {
                const response = await orderApi.getOrder();
                console.log(response);
                setOrders(response);
                setFilteredOrders(response);
            };
            fetchOrder();
        }, [])
    );

    useEffect(() => {
        if (search.trim() === '') {
            setFilteredOrders(orders);
        } else {
            const filtered = orders.filter(order =>
                removeAccents(order.Restaurant.name).includes(removeAccents(search))
            );
            setFilteredOrders(filtered);
        }
    }, [search, orders]);

    const removeAccents = (str) => {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    };
    const renderOrderItem = ({ item }) => (
        <CardOrder order={item} />
    );

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                {/* Thanh tìm kiếm */}
                <View style={styles.searchbox}>
                    <TouchableOpacity>
                        <AntDesign name='search1' size={24} color="red" style={{ marginRight: 10 }} />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        placeholder="Tìm kiếm theo tên nhà hàng"
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>
                <FlatList
                    data={filteredOrders}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderOrderItem}
                    ListEmptyComponent={
                        <Text style={styles.noOrdersText}>
                            Không tìm thấy đơn hàng nào.
                        </Text>
                    }
                />
            </View>
        </TouchableWithoutFeedback>
    );
};


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