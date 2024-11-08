import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import userApi from '../api/userApi';
import { uploadUserImage } from '../utils/firebaseUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
const UserProfileScreen = () => {
    const navigation = useNavigation();
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
    const location = useSelector(state => state.defaultLocation)
    console.log(address)
    const [isEditing, setIsEditing] = useState(false);
    const [imageUri, setImageUri] = useState(null)
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await userApi.getInfoUser()
                console.log(data)
                if (data) { setUserInfo(data) }
            } catch (error) {
                console.error(error);
            }
        }
        fetchUserData()
    }, [])
    const openImagePicker = () => {
        if (isEditing) {
            const options = {
                mediaType: 'photo'
            }
            launchImageLibrary(options, (res) => {
                if (res.assets && res.assets.length > 0) {
                    setImageUri(res.assets[0].uri);
                }
            })
        }
    }
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
            const url = await uploadFirebase(imageUri);
            if (!url) {
                Alert.alert("Lỗi", "Không thể tải ảnh lên. Vui lòng thử lại.");
                return;
            }
            const profile = {
                ...userInfo,
                image: url,
            };
            console.log(url);
            await userApi.updateUser(profile, location);
            Alert.alert('Thành công', 'Thông tin của bạn đã được cập nhật.');
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi cập nhật thông tin. Vui lòng thử lại.');
        }
    };
    const handlePressAddress = () => {
        navigation.navigate('MapScreen', { tempt: false })
    };
    const handleLogout = () => {
        Alert.alert('Đăng xuất', 'Bạn có chắc chắn muốn đăng xuất không?', [
            { text: 'Hủy', style: 'cancel' },
            { text: 'Đăng xuất', onPress: () => navigation.navigate('Auth') },
        ])
    };

    return (
        <View style={styles.container}>
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
                        value={userInfo.phone_number}
                        onChangeText={(text) => setUserInfo({ ...userInfo, phone_number: text })}
                        editable={isEditing}
                    />

                    <Text style={styles.label}>Địa chỉ:</Text>
                    <TouchableOpacity
                        style={styles.input}
                        value={userInfo.address}
                        onPress={() => handlePressAddress()}
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