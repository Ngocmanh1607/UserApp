
import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from "react-native";

const CouponPage = () => {
    const [coupons, setCoupons] = useState([
        { id: "1", title: "Giảm 10% cho đơn hàng đầu tiên", code: "WELCOME10" },
        { id: "2", title: "Freeship cho đơn hàng trên 100k", code: "FREESHIP100" },
        { id: "3", title: "Giảm 20% cho đơn hàng trên 200k", code: "SAVE20" },
        { id: "4", title: "Tặng 50k cho đơn hàng đầu tiên", code: "FIRST50" },
    ]);

    const handleCouponClick = (coupon) => {
        Alert.alert("Mã Coupon", `Bạn đã nhận được mã: ${coupon.code}`);
    };

    const renderCoupon = ({ item }) => (
        <TouchableOpacity
            style={styles.couponCard}
            onPress={() => handleCouponClick(item)}
        >
            <Text style={styles.couponTitle}>{item.title}</Text>
            <Text style={styles.couponCode}>Mã: {item.code}</Text>
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
