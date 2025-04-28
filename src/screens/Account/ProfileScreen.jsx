import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
  SafeAreaView,
  TextInput,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import userApi from '../../api/userApi';
import { uploadImageToCloudinary } from '../utils/cloudinaryUtils';
import styles from '../../assets/css/ProfileStyle';
const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const location = useSelector((state) => state.currentLocation);

  // State Management
  const [userInfo, setUserInfo] = useState({
    name: '',
    image: '',
    phone_number: '',
  });
  const [address, setAddress] = useState({
    address_name: '',
    address_x: '',
    address_y: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Validation Functions
  const validateUserInfo = () => {
    if (!userInfo.name.trim()) {
      throw new Error('Tên không được để trống');
    }
    if (isNaN(userInfo.phone_number) || userInfo.phone_number.length < 10) {
      throw new Error('Số điện thoại phải là số hợp lệ và ít nhất 10 ký tự');
    }
    return true;
  };

  // API Functions
  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const response = await userApi.getInfoUser(dispatch);

      if (!response.success) {
        if (response.message === 500) {
          Alert.alert('Lỗi', 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại');
          navigation.reset({
            index: 0,
            routes: [{ name: 'Auth' }],
          });
          return;
        }
        throw new Error(response.message);
      }

      if (response.data.profile) {
        const { profile } = response.data;
        setUserInfo({
          name: profile.name,
          image: profile.image,
          phone_number: profile.phone_number,
        });
        setImageUri(profile.image);
      }
    } catch (error) {
      Alert.alert('Lỗi', error.message || 'Không thể tải thông tin người dùng');
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImage = async (image) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      return await uploadImageToCloudinary(userId, image, 'avatar_user');
    } catch (error) {
      throw new Error('Không thể tải ảnh lên');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    fetchUserData();
  };

  const handleChangePassword = async () => {
    try {
      if (!passwordForm.currentPassword.trim()) {
        Alert.alert('Lỗi', 'Vui lòng nhập mật khẩu hiện tại');
        return;
      }
      if (!passwordForm.newPassword.trim()) {
        Alert.alert('Lỗi', 'Vui lòng nhập mật khẩu mới');
        return;
      }
      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp');
        return;
      }
      if (passwordForm.newPassword.length < 6) {
        Alert.alert('Lỗi', 'Mật khẩu mới phải có ít nhất 6 ký tự');
        return;
      }

      setIsLoading(true);
      const response = await userApi.changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      if (response.success) {
        Alert.alert('Thành công', 'Đổi mật khẩu thành công');
        setShowPasswordModal(false);
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      } else {
        Alert.alert('Lỗi', response.message || 'Đổi mật khẩu thất bại');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể đổi mật khẩu. Vui lòng thử lại sau');
    } finally {
      setIsLoading(false);
    }
  };

  // Add toggle password visibility handler
  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Event Handlers
  const handleSaveChanges = async () => {
    try {
      validateUserInfo();

      Alert.alert('Xác nhận', 'Bạn có chắc chắn muốn lưu thay đổi?', [
        {
          text: 'Hủy',
          onPress: fetchUserData,
          style: 'cancel',
        },
        {
          text: 'Lưu',
          onPress: async () => {
            try {
              setIsLoading(true);
              let url = userInfo.image;

              if (imageUri !== userInfo.image) {
                url = await uploadImage(imageUri);
                if (!url) throw new Error('Không thể tải ảnh lên');
              }

              const profile = {
                ...userInfo,
                image: url,
              };

              const response = await userApi.updateUser(
                dispatch,
                profile,
                location
              );
              Alert.alert('Thành công', 'Thông tin của bạn đã được cập nhật');
              setIsEditing(false);
              await fetchUserData();
            } catch (error) {
              Alert.alert(
                'Lỗi',
                error.message || 'Không thể cập nhật thông tin'
              );
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Lỗi', error.message);
    }
  };

  const handleLogout = () => {
    Alert.alert('Đăng xuất', 'Bạn có chắc chắn muốn đăng xuất không?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Đăng xuất',
        onPress: async () => {
          try {
            await AsyncStorage.multiRemove(['userId', 'userInfo']);
            navigation.reset({
              index: 0,
              routes: [{ name: 'Auth' }],
            });
          } catch (error) {
            Alert.alert('Lỗi', 'Không thể đăng xuất. Vui lòng thử lại');
          }
        },
      },
    ]);
  };

  const openImagePicker = () => {
    if (!isEditing) return;

    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets?.[0]?.uri) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  // Effects
  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (location) {
      setAddress({
        address_name: location.address,
        address_x: location.latitude,
        address_y: location.longitude,
      });
    }
  }, [location]);

  const PasswordChangeModal = () => (
    <Modal
      visible={showPasswordModal}
      transparent
      animationType="slide"
      onRequestClose={() => setShowPasswordModal(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Đổi Mật Khẩu</Text>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setShowPasswordModal(false)}>
              <FontAwesome5 name="times" size={22} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.passwordInputContainer}>
            <View style={styles.passwordInputWrapper}>
              <Text style={styles.passwordInputLabel}>Mật khẩu hiện tại</Text>
              <View style={styles.passwordInputField}>
                <TextInput
                  style={styles.passwordInput}
                  secureTextEntry={!showPasswords.current}
                  value={passwordForm.currentPassword}
                  onChangeText={(text) =>
                    setPasswordForm((prev) => ({
                      ...prev,
                      currentPassword: text,
                    }))
                  }
                  placeholder="Nhập mật khẩu hiện tại"
                  placeholderTextColor="#9CA3AF"
                />
                <TouchableOpacity
                  onPress={() => togglePasswordVisibility('current')}
                  style={styles.eyeIconButton}>
                  <FontAwesome5
                    name={showPasswords.current ? 'eye' : 'eye-slash'}
                    size={18}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.passwordInputWrapper}>
              <Text style={styles.passwordInputLabel}>Mật khẩu mới</Text>
              <View style={styles.passwordInputField}>
                <TextInput
                  style={styles.passwordInput}
                  secureTextEntry={!showPasswords.new}
                  value={passwordForm.newPassword}
                  onChangeText={(text) =>
                    setPasswordForm((prev) => ({ ...prev, newPassword: text }))
                  }
                  placeholder="Nhập mật khẩu mới"
                  placeholderTextColor="#9CA3AF"
                />
                <TouchableOpacity
                  onPress={() => togglePasswordVisibility('new')}
                  style={styles.eyeIconButton}>
                  <FontAwesome5
                    name={showPasswords.new ? 'eye' : 'eye-slash'}
                    size={18}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.passwordInputWrapper}>
              <Text style={styles.passwordInputLabel}>Xác nhận mật khẩu</Text>
              <View style={styles.passwordInputField}>
                <TextInput
                  style={styles.passwordInput}
                  secureTextEntry={!showPasswords.confirm}
                  value={passwordForm.confirmPassword}
                  onChangeText={(text) =>
                    setPasswordForm((prev) => ({
                      ...prev,
                      confirmPassword: text,
                    }))
                  }
                  placeholder="Nhập lại mật khẩu mới"
                  placeholderTextColor="#9CA3AF"
                />
                <TouchableOpacity
                  onPress={() => togglePasswordVisibility('confirm')}
                  style={styles.eyeIconButton}>
                  <FontAwesome5
                    name={showPasswords.confirm ? 'eye' : 'eye-slash'}
                    size={18}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.cancelModalButton}
              onPress={() => setShowPasswordModal(false)}>
              <Text style={styles.cancelModalButtonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmPasswordButton}
              onPress={handleChangePassword}>
              <Text style={styles.confirmPasswordButtonText}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // Render Components
  const LoadingOverlay = () => (
    <Modal transparent visible={isLoading} animationType="fade">
      <View style={styles.loadingOverlay}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text style={styles.loadingText}>Đang xử lý...</Text>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <View style={styles.profileHeaderContainer}>
            <View style={styles.profileHeader}>
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={openImagePicker}
                activeOpacity={0.8}>
                {imageUri ? (
                  <Image
                    source={{ uri: imageUri }}
                    style={styles.profileImage}
                  />
                ) : (
                  <View style={styles.placeholderImage}>
                    <FontAwesome name="user" size={50} color="#3B82F6" />
                  </View>
                )}
                {isEditing && (
                  <View style={styles.editImageOverlay}>
                    <FontAwesome name="camera" size={22} color="#fff" />
                  </View>
                )}
              </TouchableOpacity>
              {!isEditing && (
                <Text style={styles.userName}>
                  {userInfo.name || 'Người dùng'}
                </Text>
              )}
            </View>
          </View>

          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <FontAwesome5 name="user-circle" size={18} color="#3B82F6" />
                <Text style={styles.cardTitle}>Thông tin cá nhân</Text>
              </View>

              <View style={styles.cardContent}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Tên</Text>
                  <View style={styles.inputContainer}>
                    <FontAwesome5
                      name="user"
                      size={18}
                      color="#6B7280"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      value={userInfo.name}
                      onChangeText={(text) =>
                        setUserInfo({ ...userInfo, name: text })
                      }
                      editable={isEditing}
                      placeholder="Nhập tên của bạn"
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Số điện thoại</Text>
                  <View style={styles.inputContainer}>
                    <FontAwesome5
                      name="phone"
                      size={18}
                      color="#6B7280"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      value={userInfo.phone_number.toString()}
                      onChangeText={(text) =>
                        setUserInfo({ ...userInfo, phone_number: text })
                      }
                      editable={isEditing}
                      keyboardType="phone-pad"
                      placeholder="Nhập số điện thoại"
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Địa chỉ</Text>
                  <View style={styles.inputContainer}>
                    <FontAwesome5
                      name="map-marker-alt"
                      size={18}
                      color="#6B7280"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={[styles.input, styles.addressInput]}
                      value={address.address_name}
                      editable={false}
                      onPressIn={() =>
                        isEditing &&
                        navigation.navigate('MapScreen', { tempt: false })
                      }
                      placeholder="Chọn địa chỉ"
                      placeholderTextColor="#9CA3AF"
                    />
                    {isEditing && (
                      <FontAwesome5
                        name="chevron-right"
                        size={18}
                        color="#6B7280"
                        style={styles.inputIconRight}
                      />
                    )}
                  </View>
                </View>
              </View>
            </View>

            {isEditing ? (
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSaveChanges}
                  activeOpacity={0.8}>
                  <FontAwesome5
                    name="save"
                    size={16}
                    color="#fff"
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleCancel}
                  activeOpacity={0.8}>
                  <FontAwesome5
                    name="times"
                    size={16}
                    color="#fff"
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.cancelButtonText}>Hủy</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => setIsEditing(true)}
                  activeOpacity={0.8}>
                  <FontAwesome5
                    name="edit"
                    size={16}
                    color="#fff"
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.editButtonText}>Chỉnh sửa</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.passwordButton}
                  onPress={() => setShowPasswordModal(true)}
                  activeOpacity={0.8}>
                  <FontAwesome5
                    name="key"
                    size={16}
                    color="#fff"
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.passwordButtonText}>Đổi mật khẩu</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.logoutButton}
                  onPress={handleLogout}
                  activeOpacity={0.8}>
                  <FontAwesome5
                    name="sign-out-alt"
                    size={16}
                    color="#fff"
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.logoutButtonText}>Đăng xuất</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
        <PasswordChangeModal />
        <LoadingOverlay />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
