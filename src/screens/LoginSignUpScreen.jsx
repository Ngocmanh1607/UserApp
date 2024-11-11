import React, { useState } from 'react';
import { useWindowDimensions, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert, TouchableWithoutFeedback, Keyboard, LogBox } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import userApi from '../api/userApi';
import { useDispatch } from 'react-redux';

//Screen login
const LoginRoute = () => {
    const navigation = useNavigation();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState);
    };

    const validate = () => {
        let valid = true;
        let errors = {};

        // Validate email
        if (!email) {
            valid = false;
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            valid = false;
            errors.email = 'Email address is invalid';
        }

        // Validate password
        if (!password) {
            valid = false;
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            valid = false;
            errors.password = 'Password must be at least 6 characters';
        }

        setErrors(errors);
        return valid;
    };

    const handleSubmit = async () => {
        if (validate()) {
            const data = await userApi.loginApi(email, password, dispatch);
            if (data == true) {
                Alert.alert('Login Successful', `Welcome, ${email}!`);
                navigation.navigate('Main');
            }
        } else {
            Alert.alert('Validation Error', 'Please check your input.');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View >
                    <View style={styles.inputSignContainer}>

                        <Fontisto name="email" color="#9a9a9a" size={22} style={styles.inputIcon} />
                        <TextInput
                            style={styles.textInput}
                            placeholder='Email'
                            placeholderTextColor='#A9A9A9'
                            value={email}
                            onChangeText={(text) => setEmail(text)}
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
                    <TouchableOpacity>
                        <Text style={styles.forgotPassText}>Forget password?</Text>
                    </TouchableOpacity>
                </View>

                <View >
                    <TouchableOpacity
                        style={styles.loginButtonContainer}
                        onPress={() => {
                            handleSubmit(email, password);
                        }}>
                        <Text style={styles.textLogin}>Login</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.horizontalLine} />

                {/* <View>
                    <TouchableOpacity style={styles.googleButtonContainer}>
                        <Image source={require("../assets/Images/ic_google.png")} style={styles.topImage} />
                        <Text style={styles.textLoginGoogle}>Login with Google</Text>
                    </TouchableOpacity>
                </View> */}
            </View>
        </TouchableWithoutFeedback>

    );
};


//Screen Signup
const SignUpRoute = () => {
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

        // Validate email
        if (!email) {
            valid = false;
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            valid = false;
            errors.email = 'Email address is invalid';
        }

        if (!password) {
            valid = false;
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            valid = false;
            errors.password = 'Password must be at least 6 characters';
        }

        // Validate confirmPassword
        if (!confirmPassword) {
            valid = false;
            errors.confirmPassword = 'Confirm Password is required';
        } else if (password !== confirmPassword) {
            valid = false;
            errors.confirmPassword = 'Passwords do not match';
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
            const data = await userApi.signupApi(dispatch, email, password)
            if (data == true) {
                Alert.alert('Success', `Sign Up successful for ${email}!`);
                navigation.navigate('Main')
            }
        } catch (error) {

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
const renderScene = SceneMap({
    login: LoginRoute,
    signup: SignUpRoute,
});

const LoginSignUpScreen = () => {
    // Tắt cảnh báo liên quan đến key
    LogBox.ignoreLogs([
        'A props object containing a "key" prop is being spread into JSX'
    ]);
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'login', title: 'Login' },
        { key: 'signup', title: 'Sign Up' },
    ]);

    const renderTabBar = props => {
        const { key, ...restProps } = props;
        return (
            <TabBar
                {...restProps}
                indicatorStyle={styles.indicator}
                style={styles.tabBar}
                renderLabel={({ route, focused }) => (
                    <Text style={[styles.label, { color: focused ? '#FF0000' : 'black' }]}>
                        {route.title}
                    </Text>
                )}
            />
        )
    };

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
        />
    );
};


export default LoginSignUpScreen

const styles = StyleSheet.create({
    indicator: {
        backgroundColor: "#FF0000",
        width: '30%',
        marginHorizontal: '10%'
    },
    tabBar: {
        backgroundColor: "#FFFFFF",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',

    },
    loginContainer: {
        flex: 1,

    },
    container: {
        flex: 1,
    },
    inputContainer: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderRadius: 10,
        marginHorizontal: 40,
        marginVertical: 20,
        elevation: 10,
        alignItems: 'center',
        height: 50,
    },
    inputIcon: {
        marginLeft: 15,
        marginRight: 5,
    },
    textInput: {
        flex: 1,
        color: "#222222"
    },
    forgotPassText: {
        color: "#FF0000",
        textAlign: 'right',
        width: '90%',
        fontSize: 15,
        marginVertical: 10,
    },
    loginButtonContainer: {
        width: '70%',
        height: 50,
        backgroundColor: "#FF0000",
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 20,
        borderRadius: 10,
        elevation: 5
    },
    textLogin: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',

    },

    horizontalLine: {
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,
        width: '40%',
        alignSelf: 'center'
    },

    googleButtonContainer: {
        flexDirection: 'row',
        width: '70%',
        height: 50,
        backgroundColor: "#F4F4F4",
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 20,
        borderRadius: 10,
        elevation: 5,
    },
    textLoginGoogle: {
        color: '#222222',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 10,
    },
    googleIcon: {
        marginRight: 10,
        color: 'red',
    },
    inputSignContainer: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderRadius: 10,
        marginHorizontal: 40,
        marginVertical: 10,
        elevation: 10,
        alignItems: 'center',
        height: 50,
    },
    inputPassIcon: {
        marginLeft: 5,
        marginRight: 15,
    },
    errorText: {
        marginStart: 50,
        color: 'red',
        fontSize: 14
    },
});