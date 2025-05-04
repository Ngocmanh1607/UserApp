import {
  Alert,
  Keyboard,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Modal,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../assets/css/LoginRouterStyle';
import userApi from '../../api/userApi';
import Loading from '../../components/Loading';
import extractErrorMessageFromHTML from '../../utils/errorHTML';
const LoginRouter = () => {
  const navigation = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const [isResetModalVisible, setResetModalVisible] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetErrors, setResetErrors] = useState({});

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
        const data = await userApi.loginApi(email, password);
        if (data === true) {
          navigation.navigate('Main');
        }
      } catch (error) {
        // Trường hợp backend trả HTML (text)
        const html = error.response.data;
        const errorMsg = extractErrorMessageFromHTML(html);
        Alert.alert('Lỗi', errorMsg);
      } finally {
        setLoading(false);
      }
    }
  };
  const handleResetPassword = async () => {
    // Validate inputs
    let valid = true;
    let errors = {};

    if (!resetEmail) {
      valid = false;
      errors.resetEmail = 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(resetEmail)) {
      valid = false;
      errors.resetEmail = 'Địa chỉ email không hợp lệ';
    }

    if (!newPassword) {
      valid = false;
      errors.newPassword = 'Mật khẩu mới là bắt buộc';
    } else if (newPassword.length < 6) {
      valid = false;
      errors.newPassword = 'Mật khẩu phải chứa ít nhất 6 kí tự';
    }

    setResetErrors(errors);

    if (valid) {
      setLoading(true);
      try {
        await userApi.resetPasswordApi(resetEmail, newPassword);
        Alert.alert('Thành công', 'Mật khẩu đã được cập nhật');
        setResetModalVisible(false);
        setResetEmail('');
        setNewPassword('');
      } catch (error) {
        Alert.alert('Lỗi', 'Không thể đặt lại mật khẩu. Vui lòng thử lại sau');
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <>
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
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
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
            <TouchableOpacity onPress={() => setResetModalVisible(true)}>
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
          <Modal
            visible={isResetModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setResetModalVisible(false)}>
            <TouchableWithoutFeedback
              onPress={() => setResetModalVisible(false)}>
              <View style={styles.modalOverlay}>
                <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                  <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                      <Text style={styles.modalTitle}>Đặt lại mật khẩu</Text>
                      <TouchableOpacity
                        onPress={() => setResetModalVisible(false)}>
                        <Fontisto name="close" size={20} color="#666" />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={[
                        styles.inputLoginContainer,
                        { marginHorizontal: 10 },
                      ]}>
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
                        value={resetEmail}
                        onChangeText={setResetEmail}
                      />
                    </View>
                    {resetErrors.resetEmail && (
                      <Text style={styles.errorText}>
                        {resetErrors.resetEmail}
                      </Text>
                    )}
                    <View
                      style={[
                        styles.inputLoginContainer,
                        { marginHorizontal: 10 },
                      ]}>
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
                        value={newPassword}
                        onChangeText={(text) => setNewPassword(text)}
                        placeholderTextColor="#A9A9A9"
                      />
                      <TouchableOpacity onPress={togglePasswordVisibility}>
                        <Ionicons
                          name={
                            isPasswordVisible
                              ? 'eye-outline'
                              : 'eye-off-outline'
                          }
                          color="#9a9a9a"
                          size={24}
                          style={styles.inputPassIcon}
                        />
                      </TouchableOpacity>
                    </View>
                    {resetErrors.newPassword && (
                      <Text style={styles.errorText}>
                        {resetErrors.newPassword}
                      </Text>
                    )}
                    <TouchableOpacity
                      style={styles.resetButton}
                      onPress={handleResetPassword}>
                      <Text style={styles.resetButtonText}>
                        Đặt lại mật khẩu
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
      {loading && (
        <View style={styles.absoluteOverlay}>
          <Loading />
        </View>
      )}
    </>
  );
};
export default LoginRouter;
