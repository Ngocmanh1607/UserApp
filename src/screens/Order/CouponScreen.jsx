
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from "react-native";
import { orderApi } from "../../api/orderApi";
import styles from "../../assets/css/CouponStyle";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { formatPrice } from "../../utils/format";
const CouponPage = ({ onSelectCoupon }) => {
    const [coupons, setCoupons] = useState([]);
    useEffect(() => {
        const fetchCoupon = async () => {
            const response = await orderApi.getCoupon();
            setCoupons(response);
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
