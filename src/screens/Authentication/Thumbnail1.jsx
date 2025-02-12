import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../assets/css/Thumbnail1Style';
const ReviewScreen1 = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            {/* Phần tiêu đề và hình ảnh */}
            <View style={styles.imageContainer}>
                <Image
                    source={require('../../assets/Images/background.png')}
                    style={styles.image}
                />
            </View>

            {/* Phần văn bản */}
            <View style={styles.textContainer}>
                <Text style={styles.title}>Chọn</Text>
                <Text style={styles.title}>Thực đơn yêu thích</Text>
                <Text style={styles.subtitle}>
                    Ăn ngon mà không cần rời khỏi nhà, bạn có thể chọn món ăn yêu thích chỉ với một cú nhấp
                </Text>
            </View>

            {/* Phần nút bấm */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('thumbnail2')}>
                    <Text style={styles.nextButtonText}>Tiếp theo</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('Auth')}>
                    <Text style={styles.skipText}>Bỏ qua</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ReviewScreen1;
