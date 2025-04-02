import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import styles from '../../assets/css/Thumbnail2Style';
const ReviewScreen2 = () => {
  const navigation = useNavigation();
  const handlePressNext = () => {
    navigation.replace('Auth');
  };
  return (
    <View style={styles.container}>
      {/* Phần tiêu đề và hình ảnh */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/Images/background2.png')}
          style={styles.image}
        />
      </View>

      {/* Phần văn bản */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Thưởng thức món ngon</Text>
        <Text style={styles.title}>với giá phải chăng</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>
            Bạn có thể trải nghiệm ẩm thực cao cấp mà không cần lo lắng về giá
            cả
          </Text>
        </View>
      </View>

      {/* Phần nút bấm */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handlePressNext}>
          <Text style={styles.nextButtonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReviewScreen2;
