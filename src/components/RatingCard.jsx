import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome"

const RatingCard = () => {
    const [restaurantRating, setRestaurantRating] = useState(0);
    const [shipperRating, setShipperRating] = useState(0);
    const [comment, setComment] = useState("");

    const renderStars = (rating, setRating) => {
        return Array(5)
            .fill(0)
            .map((_, index) => (
                <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
                    <FontAwesome
                        name={index < rating ? "star" : "star-o"}
                        size={30}
                        color="#FFD700"
                        style={styles.star}
                    />
                </TouchableOpacity>
            ));
    };

    const handleSubmit = () => {
        // Handle submission logic here
        console.log({
            restaurantRating,
            shipperRating,
            comment,
        });
        alert("Cảm ơn bạn đã đánh giá!");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đánh Giá Dịch Vụ</Text>

            {/* Đánh giá nhà hàng */}
            <Text style={styles.label}>Nhà hàng:</Text>
            <View style={styles.starsContainer}>{renderStars(restaurantRating, setRestaurantRating)}</View>

            {/* Đánh giá shipper */}
            <Text style={styles.label}>Shipper:</Text>
            <View style={styles.starsContainer}>{renderStars(shipperRating, setShipperRating)}</View>

            {/* Nhận xét */}
            <Text style={styles.label}>Nhận xét:</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập nhận xét của bạn..."
                multiline
                value={comment}
                onChangeText={setComment}
            />

            {/* Nút Gửi */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Gửi Đánh Giá</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        margin: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    label: {
        fontSize: 16,
        marginVertical: 10,
    },
    starsContainer: {
        flexDirection: "row",
        marginBottom: 15,
    },
    star: {
        marginHorizontal: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        textAlignVertical: "top",
        height: 80,
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#FF0000",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default RatingCard;
