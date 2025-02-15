
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from "react-native";
import { orderApi } from "../../api/orderApi";
import styles from "../../assets/css/CouponStyle";
const CouponPage = ({onSelectCoupon}) => {
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
            <Text style={styles.couponTitle}>{item.cupon_name}</Text>
            <Text style={styles.couponCode}>Mã: {item.cupon_code}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
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
