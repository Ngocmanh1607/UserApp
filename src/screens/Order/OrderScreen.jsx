// OrderScreen.js
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign'
import CardOrder from '../../components/CardOrder';
import { orderApi } from '../../api/orderApi';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import styles from '../../assets/css/OrderStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
const OrderScreen = () => {
    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const [orders, setOrders] = useState();
    const [filteredOrders, setFilteredOrders] = useState([]);
    useFocusEffect(
        useCallback(() => {
            const fetchOrder = async () => {
                const response = await orderApi.getOrder();
                if (response.success) {
                    setOrders(response.data);
                    setFilteredOrders(response.data);
                } else {
                    if (response.message === 500) {
                        Alert.alert('Có lỗi xảy ra', 'Hết phiên làm việc, vui lòng đăng nhập lại', {
                            text: 'Đăng nhập lại',
                            onPress: () => {
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Auth' }],
                                });
                            }
                        });
                        return;
                    }
                    Alert.alert('Có lỗi xảy ra', response.message);

                }
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
    const renderHeader = () => (
        < View style={styles.searchbox} >
            <TouchableOpacity>
                <AntDesign name='search1' size={24} color="red" style={{ marginRight: 10 }} />
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Tìm kiếm theo tên nhà hàng"
                placeholderTextColor="#333"
                value={search}
                onChangeText={setSearch}
            />
        </ View >);
    return (
        <View style={styles.container}>
            <FlatList
                data={filteredOrders}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderOrderItem}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={
                    <Text style={styles.noOrdersText}>
                        Không tìm thấy đơn hàng nào.
                    </Text>
                }
            />
        </View>
    );
};


export default OrderScreen;
