import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import userApi from '../../api/userApi';
import { useDispatch } from 'react-redux';
import styles from '../../assets/css/SignUpRouterStyle';
const SignUpRouter = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const dispatch = useDispatch();
    const validate = () => {
        let valid = true;
        let errors = {};
        if (!email) {
            valid = false;
            errors.email = 'Email là bắt buộc';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            valid = false;
            errors.email = 'Email không đúng định dạng';
        }

        if (!password) {
            valid = false;
            errors.password = 'Mật khẩu là bắt buộc';
        } else if (password.length < 6) {
            valid = false;
            errors.password = 'Mật khẩu chứa ít nhất 6 kí tự';
        }
        // Validate confirmPassword
        if (!confirmPassword) {
            valid = false;
            errors.confirmPassword = 'Xác nhận mật khẩu là bắt buộc';
        } else if (password !== confirmPassword) {
            valid = false;
            errors.confirmPassword = 'Mật khẩu không khớp';
        }
        setErrors(errors);
        return valid;
    };
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState);
    };
    const handleSignUp = async () => {
        if (!validate()) {
            return;
        }
        try {
            const data = await userApi.signupApi(dispatch, email, password);
            if (data === true) {
                navigation.navigate('RegisterInf');
            }
        } catch (error) {
            Alert.alert('Đăng ký thất bại ',error.message);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.loginContainer}>
                    <View style={styles.inputSignContainer}>
                        <Fontisto name="email" color="#9a9a9a" size={22} style={styles.inputIcon} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Email"
                            placeholderTextColor="#A9A9A9"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                    <View style={styles.inputSignContainer}>
                        <Fontisto name="locked" color="#9a9a9a" size={24} style={styles.inputIcon} />
                        <TextInput
                            style={styles.textInput}
                            placeholder='Password'
                            secureTextEntry={!isPasswordVisible}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            placeholderTextColor='#A9A9A9'
                        />
                        <TouchableOpacity onPress={togglePasswordVisibility}>
                            <Ionicons
                                name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
                                color="#9a9a9a"
                                size={24}
                                style={styles.inputPassIcon}
                            />
                        </TouchableOpacity>
                    </View>
                    {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                    <View style={styles.inputSignContainer}>
                        <Fontisto name="locked" color="#9a9a9a" size={24} style={styles.inputIcon} />
                        <TextInput
                            style={styles.textInput}
                            placeholder='Confirm Password'
                            secureTextEntry={!isPasswordVisible}
                            value={confirmPassword}
                            onChangeText={(text) => setConfirmPassword(text)}
                            placeholderTextColor='#A9A9A9'
                        />
                        <TouchableOpacity onPress={togglePasswordVisibility}>
                            <Ionicons
                                name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
                                color="#9a9a9a"
                                size={24}
                                style={styles.inputPassIcon}
                            />
                        </TouchableOpacity>
                    </View>
                    {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
                    <View style={styles.loginContainer}>
                        <TouchableOpacity style={styles.loginButtonContainer} onPress={handleSignUp}>
                            <Text style={styles.textLogin}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>

    );
};

export default SignUpRouter;