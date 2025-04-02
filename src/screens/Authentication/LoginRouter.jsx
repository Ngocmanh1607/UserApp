import {
  Alert,
  Keyboard,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../assets/css/LoginRouterStyle';
import userApi from '../../api/userApi';
import Loading from '../../components/Loading';
const LoginRouter = () => {
  const navigation = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const validate = () => {
    let valid = true;
    let errors = {};

    // Validate email
    if (!email) {
      valid = false;
      errors.email = 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      valid = false;
      errors.email = 'Email không đúng định dạng';
    }

    // Validate password
    if (!password) {
      valid = false;
      errors.password = 'Mật khẩu là bắt buộc';
    } else if (password.length < 6) {
      valid = false;
      errors.password = 'Mật khẩu phải lớn hơn 6 ký tự';
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async () => {
    if (validate()) {
      setLoading(true);
      try {
        const data = await userApi.loginApi(email, password, dispatch);
        if (data === true) {
          navigation.navigate('Main');
        }
      } catch (error) {
        Alert.alert('Lỗi', 'Đăng nhập thất bại');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View>
          <View style={styles.inputLoginContainer}>
            <Fontisto
              name="email"
              color="#9a9a9a"
              size={22}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              placeholderTextColor="#A9A9A9"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          <View style={styles.inputLoginContainer}>
            <Fontisto
              name="locked"
              color="#9a9a9a"
              size={24}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Mật khẩu"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholderTextColor="#A9A9A9"
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Ionicons
                name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                color="#9a9a9a"
                size={24}
                style={styles.inputPassIcon}
              />
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
          <TouchableOpacity>
            <Text style={styles.forgotPassText}>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={styles.loginButtonContainer}
            onPress={() => {
              handleSubmit(email, password);
            }}>
            <Text style={styles.textLogin}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.horizontalLine} />

        <View>
          <TouchableOpacity style={styles.googleButtonContainer}>
            <Image
              source={require('../../assets/Images/ic_google.png')}
              style={styles.topImage}
            />
            <Text style={styles.textLoginGoogle}>Đăng nhập với Google</Text>
          </TouchableOpacity>
        </View>
        {loading && <Loading />}
      </View>
    </TouchableWithoutFeedback>
  );
};
export default LoginRouter;
