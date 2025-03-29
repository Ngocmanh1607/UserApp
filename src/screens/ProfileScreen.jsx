import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Modal } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import userApi from '../api/userApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../assets/css/ProfileStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TextInput } from 'react-native-paper';
import { formatDate } from '../utils/format';
import { uploadImageToCloudinary } from '../utils/cloudinaryUtils';
const UserProfileScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({
        name: '',
        image: '',
        gender: '',
        phone_number: '',
        date: ''
    });
    const [address, setAddress] = useState({
        address_name: '',
        address_x: '',
        address_y: '',
    });
    const location = useSelector(state => state.currentLocation);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [imageUri, setImageUri] = useState(userInfo.image);

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            const response = await userApi.getInfoUser(dispatch);
            setIsLoading(false);
            if (!response.success) {
                if (response.message === 500) {
                    Alert.alert('Lỗi', 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Auth' }],
                    });
                }
                else {
                    Alert.alert('Lỗi', response.message);
                }
                return;
            }
            if (response.data.profile) {
                const data = response.data;
                setUserInfo({
                    name: data.profile.name,
                    image: data.profile.image,
                    email: data.profile.mail,
                    phone_number: data.profile.phone_number,
                    date: data.profile.date,
                });
                // setAddress(data.address[0]);
                setImageUri(data.profile.image);
            }
        };
        fetchUserData();
    }, []);

    // Update address when location changes
    useEffect(() => {
        if (location) {
            setAddress({
                address_name: location.address,
                address_x: location.latitude,
                address_y: location.longitude,
            });
        }
    }, [location]);

    const openImagePicker = () => {
        if (isEditing) {
            const options = {
                mediaType: 'photo',
            };
            launchImageLibrary(options, (res) => {
                if (res.assets && res.assets.length > 0) {
                    setImageUri(res.assets[0].uri);
                }
            });
        }
    };

    const uploadImage = async (image) => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const downloadURL = await uploadImageToCloudinary(userId, image, 'avatar_user');
            return downloadURL;
        } catch (error) {
            Alert.alert('Lỗi', error.message);
            return null;
        }
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSaveChanges = async () => {
        if (!userInfo.name.trim()) {
            Alert.alert('Lỗi', 'Tên không được để trống.');
            return;
        }
        if (isNaN(userInfo.phone_number) || userInfo.phone_number.length < 10) {
            Alert.alert('Lỗi', 'Số điện thoại phải là số hợp lệ và ít nhất 10 ký tự.');
            return;
        }

        Alert.alert(
            'Xác nhận',
            'Bạn có chắc chắn muốn lưu thay đổi?',
            [
                {
                    text: 'Hủy',
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
                            }

                            const profile = {
                                ...userInfo,
                                image: url,
                            };

                            await userApi.updateUser(dispatch, profile, location);
                            Alert.alert('Thành công', 'Thông tin của bạn đã được cập nhật.');
                            setIsEditing(false);
                        } catch (error) {
                            console.error('Error saving changes:', error);
                            Alert.alert('Lỗi', 'Không thể cập nhật thông tin. Vui lòng thử lại.');
                        } finally {
                            setIsLoading(false);
                        }
                    },
                },
            ]
        );
    };

    const handlePressAddress = () => {
        if (isEditing) {
            navigation.navigate('MapScreen', { tempt: false });
        }
    };

    const handleLogout = () => {
        Alert.alert('Đăng xuất', 'Bạn có chắc chắn muốn đăng xuất không?', [
            { text: 'Hủy', style: 'cancel' },
            {
                text: 'Đăng xuất',
                onPress: async () => {
                    try {
                        await AsyncStorage.removeItem('userId');
                        await AsyncStorage.removeItem('userInfo');
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Auth' }],
                        });
                    } catch (error) {
                        console.error("Error logging out:", error);
                        Alert.alert('Lỗi', 'Không thể đăng xuất. Vui lòng thử lại.');
                    }
                },
            },
        ]);
    };
    const handleCancel = () => setIsEditing(!isEditing);
    return (
        <View style={styles.container}>
            {
                isLoading ? (
                    <Modal transparent={true} animationType="fade">
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size='large' color='#FF0000' />
                        </View>
                    </Modal>
                ) : (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.avatarContainer}>
                            <TouchableOpacity style={styles.imageContainer} onPress={openImagePicker}>
                                {imageUri ? (
                                    <Image source={{ uri: imageUri }} style={styles.profileImage} />
                                ) : (<FontAwesome name="user" size={60} color="black" style={{ paddingVertical: 6 }} />)}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.mainContainer}>
                            <View style={styles.infoContainer}>
                                <TextInput
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
                                        label="Năm sinh"
                                        mode="outlined"
                                        style={[styles.input, { width: '64%' }]}
                                        value={formatDate(userInfo.date)}
                                        onChangeText={(text) => setUserInfo({ ...userInfo, date: text })}
                                        editable={isEditing}
                                        activeOutlineColor="#FF4B3A"
                                    />
                                    <TextInput
                                        label="Giới tính"
                                        mode="outlined"
                                        style={[styles.input, { width: '34%' }]}
                                        value={userInfo.gender}
                                        onChangeText={(text) => setUserInfo({ ...userInfo, gender: text })}
                                        editable={isEditing}
                                        activeOutlineColor="#FF4B3A"
                                    />
                                </View>
                                <TextInput
                                    label="Số điện thoại"
                                    mode="outlined"
                                    style={styles.input}
                                    value={userInfo.phone_number.toString()}
                                    onChangeText={(text) => setUserInfo({ ...userInfo, phone_number: text })}
                                    editable={isEditing}
                                    activeOutlineColor="#FF4B3A"
                                />

                                <TextInput
                                    label="Địa chỉ"
                                    mode="outlined"
                                    style={{ ...styles.input, height: 55 }}
                                    value={address.address_name}
                                    editable={false}
                                    onPressIn={handlePressAddress}
                                    activeOutlineColor="#FF4B3A"
                                />
                            </View>
                            {isEditing ? (
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                                        <Text style={styles.buttonText}>Lưu</Text>
                                        <Icon name="save" size={18} color="#fff" style={styles.logoutIcon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                                        <Text style={styles.buttonText}>Huỷ</Text>
                                        <Icon name="times" size={18} color="#fff" style={styles.logoutIcon} />
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.editButton} onPress={handleEditToggle}>
                                        <Text style={styles.buttonText}>Chỉnh sửa</Text>
                                        <Icon name="edit" size={18} color="#fff" style={styles.logoutIcon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                                        <Text style={styles.buttonText}>Đăng xuất</Text>
                                        <Icon name="sign-out-alt" size={18} color="#fff" style={styles.logoutIcon} />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </ScrollView>
                )
            }
        </View >
    );
};
export default UserProfileScreen;