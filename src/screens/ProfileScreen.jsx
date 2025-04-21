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
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';

import userApi from '../api/userApi';
import styles from '../assets/css/ProfileStyle';
import { formatDate } from '../utils/format';
import { uploadImageToCloudinary } from '../utils/cloudinaryUtils';

const UserProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const location = useSelector((state) => state.currentLocation);

  // State Management
  const [userInfo, setUserInfo] = useState({
    name: '',
    image: '',
    gender: '',
    phone_number: '',
    date: '',
    email: '',
  });
  const [address, setAddress] = useState({
    address_name: '',
    address_x: '',
    address_y: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUri, setImageUri] = useState('');

  const nameInputRef = React.useRef(null);
  const dateInputRef = React.useRef(null);
  const genderInputRef = React.useRef(null);
  const phoneInputRef = React.useRef(null);
  const addressInputRef = React.useRef(null);
  const blurAllInputs = () => {
    nameInputRef.current?.blur();
    dateInputRef.current?.blur();
    genderInputRef.current?.blur();
    phoneInputRef.current?.blur();
    addressInputRef.current?.blur();
  };
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
          email: profile.mail,
          phone_number: profile.phone_number,
          date: formatDate(profile.date),
          gender: profile.gender,
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
    blurAllInputs();
    setIsEditing(false);
    fetchUserData();
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

              if (!response.success) {
                throw new Error(response.message || 'Cập nhật thất bại');
              }

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

  // Render Components
  const LoadingOverlay = () => (
    <Modal transparent visible={isLoading} animationType="fade">
      <View style={styles.loadingOverlay}>
        <ActivityIndicator size="large" color="#FF4B3A" />
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.avatarContainer}>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={openImagePicker}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.profileImage} />
            ) : (
              <FontAwesome
                name="user"
                size={60}
                color="black"
                style={{ paddingVertical: 6 }}
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.mainContainer}>
          <View style={styles.infoContainer}>
            <TextInput
              ref={nameInputRef}
              label="Tên"
              mode="outlined"
              style={styles.input}
              value={userInfo.name}
              onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
              editable={isEditing}
              activeOutlineColor="#FF4B3A"
            />

            <View style={styles.row}>
              <TextInput
                ref={dateInputRef}
                label="Năm sinh"
                mode="outlined"
                style={[styles.input, { width: '64%' }]}
                value={userInfo.date}
                onChangeText={(text) =>
                  setUserInfo({ ...userInfo, date: text })
                }
                editable={isEditing}
                activeOutlineColor="#FF4B3A"
              />
              <TextInput
                ref={genderInputRef}
                label="Giới tính"
                mode="outlined"
                style={[styles.input, { width: '34%' }]}
                value={userInfo.gender}
                onChangeText={(text) =>
                  setUserInfo({ ...userInfo, gender: text })
                }
                editable={isEditing}
                activeOutlineColor="#FF4B3A"
              />
            </View>

            <TextInput
              ref={phoneInputRef}
              label="Số điện thoại"
              mode="outlined"
              style={styles.input}
              value={userInfo.phone_number.toString()}
              onChangeText={(text) =>
                setUserInfo({ ...userInfo, phone_number: text })
              }
              editable={isEditing}
              activeOutlineColor="#FF4B3A"
            />

            <TextInput
              ref={addressInputRef}
              label="Địa chỉ"
              mode="outlined"
              style={[styles.input, { height: 55 }]}
              value={address.address_name}
              editable={false}
              onPressIn={() =>
                isEditing && navigation.navigate('MapScreen', { tempt: false })
              }
              activeOutlineColor="#FF4B3A"
            />
          </View>

          {isEditing ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveChanges}>
                <Text style={styles.buttonText}>Lưu</Text>
                <Icon
                  name="save"
                  size={18}
                  color="#fff"
                  style={styles.logoutIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}>
                <Text style={styles.buttonText}>Huỷ</Text>
                <Icon
                  name="times"
                  size={18}
                  color="#fff"
                  style={styles.logoutIcon}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setIsEditing(true)}>
                <Text style={styles.buttonText}>Chỉnh sửa</Text>
                <Icon
                  name="edit"
                  size={18}
                  color="#fff"
                  style={styles.logoutIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}>
                <Text style={styles.buttonText}>Đăng xuất</Text>
                <Icon
                  name="sign-out-alt"
                  size={18}
                  color="#fff"
                  style={styles.logoutIcon}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
      <LoadingOverlay />
    </View>
  );
};

export default UserProfileScreen;
