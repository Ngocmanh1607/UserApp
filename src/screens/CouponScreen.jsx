
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from "react-native";
import { orderApi } from "../api/orderApi";

const CouponPage = () => {
    const route = useRoute();
    const { restaurantId } = route.params;
    const navigation = useNavigation();
    const [coupons, setCoupons] = useState([]);
    useEffect(() => {
        const fetchCoupon = async () => {
            const response = await orderApi.getCoupon();
            setCoupons(response);
        }
        fetchCoupon();
    }, [])
    const handleCouponClick = (coupon) => {
        navigation.navigate('CartScreen', { discount: coupon, restaurantId: restaurantId });
    };

    const renderCoupon = ({ item }) => (
        <TouchableOpacity
            style={styles.couponCard}
            onPress={() => handleCouponClick(item)}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        padding: 20,
    },
    listContainer: {
        paddingBottom: 20,
    },
    couponCard: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    couponTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    couponCode: {
        fontSize: 14,
        color: "#555",
        marginTop: 5,
    },
});

export default CouponPage;
