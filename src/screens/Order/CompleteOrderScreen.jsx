import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../assets/css/CompleteOrderStyle';

const CompleteOrder = ({ onComplete, restaurantId }) => {
  const navigation = useNavigation();
  const handleOrderComplete = () => {
    navigation.navigate('Main');
  };
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <View style={styles.icon}>
          <Text style={styles.iconText}>✔️</Text>
        </View>
        <Text style={styles.thankYouText}>Cảm ơn bạn đã đặt hàng.</Text>
        <Text style={styles.subText}>
          Bạn có thể theo dõi đơn hàng trong phần "Đơn hàng".
        </Text>
      </View>
      <TouchableOpacity
        style={styles.trackOrderButton}
        onPress={() => handleOrderComplete()}>
        <Text style={styles.buttonText}>Quay lại trang chủ</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CompleteOrder;
