import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

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
                    source={require('../Images/background2.png')}
                    style={styles.image}
                />
            </View>

            {/* Phần văn bản */}
            <View style={styles.textContainer}>
                <Text style={styles.title}>Thưởng thức món ngon</Text>
                <Text style={styles.title}>với giá phải chăng</Text>
                <View style={styles.subtitleContainer}>
                    <Text style={styles.subtitle}>
                        Bạn có thể trải nghiệm ẩm thực cao cấp
                        mà không cần lo lắng về giá cả
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        padding: 20,
    },
    imageContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    textContainer: {
        flex: 2,
        alignItems: 'center',

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black'
    },
    subtitleContainer: {
        width: '70%',
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        color: '#666',
        marginTop: 10,
        paddingHorizontal: 30,
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    nextButton: {
        width: "30%",
        height: 40,
        borderRadius: 10,
        backgroundColor: '#FF0000',
        alignItems: 'center',
        justifyContent: 'center',

    },
    nextButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#FFFFFF'
    }
});
