
import React, { useEffect, useState } from "react";
import { Alert, Text, View, FlatList, TouchableOpacity, TextInput } from "react-native";
import { orderApi } from "../../api/orderApi";
import styles from "../../assets/css/CouponStyle";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { formatPrice } from "../../utils/format";
import AntDesign from 'react-native-vector-icons/AntDesign';

const CouponPage = ({ onSelectCoupon, total }) => {
    const [coupons, setCoupons] = useState([]);
    const [search, setSearch] = useState('');
    const handleSearch = (text) => {
        setSearch(text);
    }
    useEffect(() => {
        const fetchCoupon = async () => {
            const response = await orderApi.getCoupon(total);
            if (!response.success) {
                return Alert.alert('Lỗi', response.message);
            }
            setCoupons(response.data);
        }
        fetchCoupon();
    }, [])
    const renderCoupon = ({ item }) => (
        <TouchableOpacity
            style={styles.couponCard}
            onPress={() => onSelectCoupon(item)}
        >
            <Text style={styles.couponTitle}>{item.coupon_name}</Text>
            <Text style={styles.couponCode}>Mã: {item.coupon_code}</Text>
            <Text style={styles.couponCode}>Giảm: {formatPrice(item.discount_value)}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    zIndex: 10,
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    borderRadius: 20,
                    padding: 8,

                }}
                onPress={() => onSelectCoupon(null)}
            >
                <Ionicons name="close" size={24} color="#FF0000" />
            </TouchableOpacity>
            <Text style={styles.title}>Chọn mã giảm giá</Text>
            <View style={styles.searchbox}>
                <TouchableOpacity>
                    <AntDesign name='search1' size={24} color="red" style={{ marginHorizontal: 5, }} />
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholder="Tìm kiếm theo tên nhà hàng"
                    placeholderTextColor="#333"
                    value={search}
                    onChangeText={handleSearch}
                />
            </View>
            <FlatList
                data={coupons}
                renderItem={renderCoupon}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

export default CouponPage;
