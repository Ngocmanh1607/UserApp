import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Fontisto from 'react-native-vector-icons/Fontisto'
import React, { useState } from 'react'
import DatePicker from 'react-native-date-picker'
import DropDownPicker from 'react-native-dropdown-picker';

const ProfileScreen = () => {
    const [date, setDate] = useState(new Date());
    const [openBith, setOpenBith] = useState(false);
    const [openSex, setOpenSex] = useState(false);
    const [gender, setGender] = useState(0);
    const [items, setItems] = useState([
        { label: 'Nam', value: 'nam' },
        { label: 'Nữ', value: 'nu' },
    ]);
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.textHeader}>Profile</Text>
                </View>
                <TouchableOpacity style={styles.imageContainer}>
                    <FontAwesome name="user" size={60} color="black" style={{ paddingVertical: 6 }} />
                </TouchableOpacity>
                <View style={styles.loginContainer}>
                    <View style={styles.inputSignContainer}>
                        <FontAwesome name="user" color="#9a9a9a" size={24} style={styles.inputIcon} />
                        <TextInput style={styles.textInput} placeholder='Full Name' placeholderTextColor='#A9A9A9' />
                    </View>

                    <View style={styles.inputSignContainer}>
                        <Fontisto name="email" color="#9a9a9a" size={22} style={styles.inputIcon} />
                        <TextInput style={styles.textInput} placeholder='Email' placeholderTextColor='#A9A9A9' />
                    </View>

                    <View style={styles.infContainer}>
                        <View style={styles.datePickerContainer}>
                            <TouchableOpacity onPress={() => setOpenBith(true)}>
                                <Text style={styles.dateText}>
                                    {date.toDateString()}
                                </Text>
                            </TouchableOpacity>
                            <DatePicker
                                modal
                                open={openBith}
                                date={date}
                                mode="date"
                                onConfirm={(selectedDate) => {
                                    setOpenBith(false);
                                    setDate(selectedDate);
                                }}
                                onCancel={() => setOpenBith(false)}
                            />
                        </View>

                        <View style={styles.dropdownContainer}>
                            <DropDownPicker
                                open={openSex}
                                value={gender}
                                items={items}
                                setOpen={setOpenSex}
                                setValue={setGender}
                                setItems={setItems}
                                placeholder="Chọn giới tính"
                                style={styles.dropdown}
                                containerStyle={styles.dropdownContainerStyle}
                                textStyle={styles.dropdownText}
                            />
                        </View>
                    </View>
                    <View style={styles.inputSignContainer}>
                        <Fontisto name="phone" color="#9a9a9a" size={22} style={styles.inputIcon} />
                        <TextInput style={styles.textInput} placeholder='Phone number' secureTextEntry placeholderTextColor='#A9A9A9' />
                    </View>
                    <View style={styles.loginContainer}>
                        <TouchableOpacity style={styles.loginButtonContainer}>
                            <Text style={styles.textLogin}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        flex: 1,
        backgroundColor: '#f5f5f5', // Màu nền nhạt để các phần tử nổi bật
    },
    header: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textHeader: {
        fontSize: 26,
        fontWeight: '700',
        color: '#333',
    },
    imageContainer: {
        backgroundColor: '#FFF',
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#FF0000',
        elevation: 5
    },
    inputSignContainer: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderRadius: 12,
        marginHorizontal: 20,
        marginVertical: 10,
        elevation: 5,
        alignItems: 'center',
        height: 50,
        paddingHorizontal: 10,
    },
    inputIcon: {
        marginRight: 10,
    },
    textInput: {
        flex: 1,
        color: "#333333",
        fontSize: 16
    },
    infContainer: {
        flexDirection: 'row',
        marginHorizontal: 40,
        marginVertical: 20,
    },
    datePickerContainer: {
        flex: 1,
    },
    dateText: {
        color: '#333333',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#cccccc',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#FFF',
    },
    dropdownContainer: {
        flex: 1,
        marginLeft: 10
    },
    dropdown: {
        height: 50,
        borderRadius: 10,
        position: 'absolute'
    },
    dropdownContainerStyle: {
        height: 50,
        position: 'absolute'
    },
    dropdownText: {
        fontSize: 16,
        color: '#333333',
    },
    loginButtonContainer: {
        width: '70%',
        height: 50,
        backgroundColor: "#FF0000",
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 20,
        borderRadius: 25,
        elevation: 10,
    },
    textLogin: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
        textTransform: 'uppercase', // Chữ in hoa
    },
});