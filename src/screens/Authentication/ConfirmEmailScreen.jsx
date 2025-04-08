import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import styles from '../../assets/css/ConfirmEmailStyle';
const ConfirmEmailScreen = ({ navigation }) => {
  const [isResending, setIsResending] = useState(false);

  // Xử lý gửi lại email xác nhận
  const handleResendEmail = async () => {
    setIsResending(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      Alert.alert('Thành công', 'Email xác nhận đã được gửi lại!');
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể gửi lại email. Vui lòng thử lại sau.');
    }
    setIsResending(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topImageContainer}>
        <Image
          source={require('../../assets/Images/background.png')}
          style={styles.topImage}
        />
      </View>
      <Text style={styles.title}>Xác nhận Email</Text>
      <Text style={styles.message}>
        Bạn cần xác nhận email trước khi đăng nhập. Vui lòng kiểm tra hộp thư
        của bạn.
      </Text>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate('Auth')}>
        <Text style={styles.linkText}>Tôi đã xác nhận</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmEmailScreen;
