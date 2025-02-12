import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import userApi from '../../api/userApi';
import { uploadUserImage } from '../../utils/firebaseUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from 'react-native-snackbar';
import styles from '../../assets/css/RegisterInfStyle';
const RegisterInf = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const location = useSelector(state => state.defaultLocation);
    const [userInfo, setUserInfo] = useState({
        name: '',
        image: '',
        email: '',
        date: '',
        phone_number: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [imageUri, setImageUri] = useState(userInfo.image);

    const openImagePicker = () => {
        const options = {
            mediaType: 'photo',
        };
        launchImageLibrary(options, (res) => {
            if (res.assets && res.assets.length > 0) {
                setImageUri(res.assets[0].uri);
            }
        });
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
    const handlePressAddress = () => {
        navigation.navigate('MapScreen', { tempt: false });
    };

    const handleSaveChanges = async () => {
        try {
            setIsLoading(true);
            const url = await uploadFirebase(imageUri);
            if (!url) {
                Alert.alert("Lỗi", "Không thể tải ảnh lên. Vui lòng thử lại.");
                return;
            }
            const profile = {
                ...userInfo,
                image: url,
            };
            const response = await userApi.updateUser(dispatch, profile, location);
            if (response) {
                Snackbar.show({
                    text: 'Thông tin của bạn đã được cập nhật.',
                    duration: Snackbar.LENGTH_SHORT,
                });
                navigation.navigate('Main')
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi cập nhật thông tin. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
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
                            />

                            <Text style={styles.label}>Email:</Text>
                            <TextInput
                                style={styles.input}
                                value={userInfo.email}
                                onChangeText={(text) => setUserInfo({ ...userInfo, email: text })}
                            />

                            <Text style={styles.label}>Số điện thoại:</Text>
                            <TextInput
                                style={styles.input}
                                value={userInfo.phone_number.toString()}
                                onChangeText={(text) => setUserInfo({ ...userInfo, phone_number: text })}
                            />
                            <Text style={styles.label}>Năm sinh:</Text>
                            <TextInput
                                style={styles.input}
                                value={userInfo.date}
                                onChangeText={(text) => setUserInfo({ ...userInfo, date: text })}
                            />
                            <Text style={styles.label}>Địa chỉ:</Text>
                            <TouchableOpacity
                                style={styles.input}
                                onPress={handlePressAddress}
                            >
                                <Text>{location.address}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                                <Text style={styles.buttonText}>Lưu</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                )
            }
        </View>
    );
};


export default RegisterInf;

