import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import userApi from '../api/userApi';
import { uploadUserImage } from '../utils/firebaseUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
const UserProfileScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({
        name: '',
        image: '',
        email: '',
        phone_number: '',
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
            try {
                const data = await userApi.getInfoUser(dispatch);
                if (data.profile) {
                    setUserInfo({
                        name: data.profile.name,
                        image: data.profile.image,
                        email: data.profile.mail,
                        phone_number: data.profile.phone_number,
                    });
                    // setAddress(data.address[0]);
                    setImageUri(data.profile.image);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
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

    const uploadFirebase = async (image) => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const imageUrl = await uploadUserImage(userId, image);
            return imageUrl;
        } catch (error) {
            console.error("Error uploading image:", error);
            return null;
        }
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSaveChanges = async () => {
        try {
            setIsLoading(true);
            let url = userInfo.image;
            if (imageUri !== userInfo.image) {
                url = await uploadFirebase(imageUri);
                if (!url) {
                    Alert.alert("Lỗi", "Không thể tải ảnh lên. Vui lòng thử lại.");
                    return;
                }
            }

            const profile = {
                ...userInfo,
                image: url,
            };

            // Gửi API cập nhật thông tin người dùng
            await userApi.updateUser(dispatch, profile, location);

            await userApi.updateUser(dispatch, profile, location);
            Alert.alert('Thành công', 'Thông tin của bạn đã được cập nhật.');
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi cập nhật thông tin. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
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

    return (
        <View style={styles.container}>
            {
                isLoading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size='large' color='#FF0000' />
                    </View>
                ) : (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.avatarContainer}>
                            <TouchableOpacity style={styles.imageContainer} onPress={openImagePicker}>
                                {imageUri ? (
                                    <Image source={{ uri: imageUri }} style={styles.profileImage} />
                                ) : (<FontAwesome name="user" size={60} color="black" style={{ paddingVertical: 6 }} />)}
                            </TouchableOpacity>
                        </View>

                        <View style={styles.infoContainer}>
                            <Text style={styles.label}>Tên:</Text>
                            <TextInput
                                style={styles.input}
                                value={userInfo.name}
                                onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
                                editable={isEditing}
                            />

                            <Text style={styles.label}>Email:</Text>
                            <TextInput
                                style={styles.input}
                                value={userInfo.email}
                                onChangeText={(text) => setUserInfo({ ...userInfo, email: text })}
                                editable={isEditing}
                            />

                            <Text style={styles.label}>Số điện thoại:</Text>
                            <TextInput
                                style={styles.input}
                                value={userInfo.phone_number.toString()}
                                onChangeText={(text) => setUserInfo({ ...userInfo, phone_number: text })}
                                editable={isEditing}
                            />

                            <Text style={styles.label}>Địa chỉ:</Text>
                            <TouchableOpacity
                                style={styles.input}
                                onPress={handlePressAddress}
                            >
                                <Text>{address.address_name}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.buttonContainer}>
                            {isEditing ? (
                                <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                                    <Text style={styles.buttonText}>Lưu thay đổi</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity style={styles.editButton} onPress={handleEditToggle}>
                                    <Text style={styles.buttonText}>Chỉnh sửa</Text>
                                </TouchableOpacity>
                            )}

                            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                                <Text style={styles.buttonText}>Đăng xuất</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                )
            }
        </View>
    );
};


export default UserProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    header: {
        backgroundColor: '#FF6347',
        paddingVertical: 20,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    avatarContainer: {
        backgroundColor: '#FFF',
        width: 120,
        height: 120,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#FF0000',
        elevation: 5
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderColor: '#FF6347',
        borderWidth: 2,
    },
    editAvatar: {
        position: 'absolute',
        bottom: 0,
        right: 10,
        backgroundColor: '#FF0000',
        padding: 5,
        borderRadius: 15,
    },
    infoContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    buttonContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    editButton: {
        backgroundColor: '#FF0000',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    saveButton: {
        backgroundColor: '#32CD32',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    logoutButton: {
        backgroundColor: '#FF0000',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
});