import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { orderApi } from '../api/orderApi';

const RatingCard = ({ order_id }) => {
  const [restaurantRating, setRestaurantRating] = useState(0);
  const [shipperRating, setShipperRating] = useState(0);
  const [commentRes, setCommentRes] = useState('');
  const [commentShipper, setCommentShipper] = useState('');
  const renderStars = (rating, setRating) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
          <FontAwesome
            name={index < rating ? 'star' : 'star-o'}
            size={30}
            color="#FFD700"
            style={styles.star}
          />
        </TouchableOpacity>
      ));
  };

  const handleSubmit = async () => {
    const response = await orderApi.review(
      order_id,
      restaurantRating,
      commentRes,
      shipperRating,
      commentShipper
    );
    if (!response.success) {
      return Alert.alert('Có lỗi xảy ra!', response.message);
    }
    Alert.alert('Cảm ơn bạn đã đánh giá!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đánh Giá Dịch Vụ</Text>

      {/* Đánh giá nhà hàng */}
      <Text style={styles.label}>Nhà hàng:</Text>
      <View style={styles.starsContainer}>
        {renderStars(restaurantRating, setRestaurantRating)}
      </View>

      {/* Nhận xét */}
      <Text style={styles.label}>Nhận xét nhà hàng:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập nhận xét của bạn..."
        multiline
        value={commentRes}
        onChangeText={setCommentRes}
      />

      {/* Đánh giá shipper */}
      <Text style={styles.label}>Shipper:</Text>
      <View style={styles.starsContainer}>
        {renderStars(shipperRating, setShipperRating)}
      </View>

      {/* Nhận xét */}
      <Text style={styles.label}>Nhận xét tài xế:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập nhận xét của bạn..."
        multiline
        value={commentShipper}
        onChangeText={setCommentShipper}
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
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  star: {
    marginHorizontal: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top',
    height: 80,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF0000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RatingCard;
