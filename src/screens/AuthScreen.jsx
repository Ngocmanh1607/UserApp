import { Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import LoginSignUpScreen from './LoginSignUpScreen';

const AuthScreen = () => {
    const slideAnim = useRef(new Animated.Value(1000)).current; // Bắt đầu từ vị trí ngoài màn hình (dưới)

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [slideAnim]);
    return (
        <View style={styles.container}>
            <View style={styles.topImageContainer}>
                <Image source={require("../assets/Images/background2.png")} style={styles.topImage} />
            </View>
            <Animated.View style={[styles.animatedContainer, { transform: [{ translateY: slideAnim }] }]}>
                <LoginSignUpScreen />
            </Animated.View>
        </View>

    );
};

export default AuthScreen;
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        flex: 1,
        zIndex: 0,
    },
    topImageContainer: {
        height: "35%",
        flexDirection: 'row',
        justifyContent: 'center',
    },
    topImage: {
        width: "100%",
        height: "100%",
        resizeMode: 'cover', // Đảm bảo hình ảnh phủ kín phần trên
    },
    animatedContainer: {
        flex: 1,
        left: 0,
        right: 0,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        zIndex: 1,
    },
});