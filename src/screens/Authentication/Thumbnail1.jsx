import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
        marginTop: 10,
        paddingHorizontal: 30,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    skipButton: {
        flex: 1,
    },
    skipText: {
        fontSize: 16,
        color: '#333',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
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
