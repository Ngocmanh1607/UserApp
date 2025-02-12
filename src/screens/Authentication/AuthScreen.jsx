import { Animated, Image,View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import LoginSignUpScreen from './LoginSignUpScreen';
import styles from '../../assets/css/AuthStyle';
const AuthScreen = () => {
    const slideAnim = useRef(new Animated.Value(1000)).current;

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
                <Image source={require('../../assets/Images/background2.png')} style={styles.topImage} />
            </View>
            <Animated.View style={[styles.animatedContainer, { transform: [{ translateY: slideAnim }] }]}>
                <LoginSignUpScreen />
            </Animated.View>
        </View>

    );
};
export default AuthScreen;
