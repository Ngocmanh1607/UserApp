import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Animated, Alert, Button, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import { BlurView } from '@react-native-community/blur';
import AntDesign from 'react-native-vector-icons/AntDesign'
import ItemInCart from '../components/ItemInCart'
import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import CompleteOrder from './CompleteOrderScreen';
import { useDispatch, useSelector } from 'react-redux';
import formatPrice from '../utils/formatPrice';
import { orderApi } from '../api/orderApi';
import { clearCart, removeItem } from '../store/cartSlice';
import userApi from '../api/userApi';

const CartScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { restaurantId } = route.params;
    const selectedPaymentMethod = route.params?.selectedPaymentMethod || 'Tiền mặt';
    const dispatch = useDispatch();
    const [discount, setDiscount] = useState(null);
    const [showCompleteOrder, setShowCompleteOrder] = useState(false);
    const items = useSelector(state => state.cart.carts[restaurantId]);
    const userInfo = useSelector(state => state.user.userInfo);
    const address = useSelector(state => state.currentLocation);
    const error = useSelector(state => state.currentLocation.error);
    const sum = useSelector(state => state.cart.totalAmount[restaurantId].amount);
    const [note, setNote] = useState('');
    const slideAnim = useRef(new Animated.Value(500)).current;
    const [foodData, setFoodData] = useState(() => {
        if (items)
            return items.map(item => ({
                id: item.id,
                name: item.name,
                image: item.image,
                quantity: item.quantity,
                price: item.price,
                toppings: item.toppings,
                uniqueId: item.uniqueId
            }));
    });
    useEffect(() => {
        if (items) {
            setFoodData(items.map(item => ({
                id: item.id,
                name: item.name,
                image: item.image,
                quantity: item.quantity,
                price: item.price,
                toppings: item.toppings,
                uniqueId: item.uniqueId
            })));
        }
    }, [items]);
    useEffect(() => {
        const animation = Animated.timing(slideAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        });

        animation.start();

        // Clean up the animation
        return () => animation.stop();
    }, [slideAnim]);

    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ];
    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setShowCompleteOrder(false);
        });

        return unsubscribe;
    }, [navigation]);
    const handlePress = () => {
        navigation.navigate('MapScreen')
    };
    const handleOrder = () => {
        const delivery_fee = sum * 0.1;

        const fetchOrder = async (userInfo, address, items, selectedPaymentMethod, sum, note) => {
            try {
                const response = await orderApi.orderApi(userInfo, address, items, selectedPaymentMethod = 'ZALOPAY', sum, note, delivery_fee);

                if (response) {
                    setShowCompleteOrder(true);
                } else {
                    Alert.alert('Lỗi', 'Đặt hàng không thành công. Vui lòng thử lại.');
                }
            } catch (error) {
                console.error('Đã xảy ra lỗi khi đặt hàng:', error);
                Alert.alert('Lỗi', 'Đặt hàng không thành công. Vui lòng thử lại.');
            }
        };

        const fetchUserInfo = async () => {
            const response = await userApi.getInfoUser(dispatch);
            return response;
        };

        fetchUserInfo()
        if (userInfo.name == '' || userInfo.phone_number == '') {
            Alert.alert('Cập nhật thông tin ', 'Vui lòng cập nhật thông tin để có thể đặt hàng', [
                { text: 'Huỷ', style: 'cancel' },
                { text: 'Ok', onPress: () => navigation.navigate('Thông tin') },
            ]);
        }
        else {
            fetchOrder(userInfo, address, items, selectedPaymentMethod, sum, note);
        }
    };
    const handlePayment = () => {
        navigation.navigate('PaymentMethod', { restaurantId: restaurantId })
    }
    const CompleteOrderDisplay = () => (
        <Animated.View style={[styles.card, { transform: [{ translateY: slideAnim }] }]}>
            <CompleteOrder onComplete={() => setShowCompleteOrder(false)} restaurantId={restaurantId} />
        </Animated.View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headContainer}>
                <View style={styles.locationContainer}>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={handlePress}>
                        <Ionicons name="location" size={25} color="#FF0000" style={{ paddingVertical: 6 }} />
                        <View>
                            <View>
                                <Text style={{ paddingRight: 3, fontSize: 16, fontWeight: '700' }}>Giao tới</Text>
                            </View>
                            <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{
                                error ? error : address.address
                            }</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.mainContainer}>
                {items && items.length > 0 ? (
                    <ScrollView style={styles.scrollContainer}>
                        {foodData.map((food) => {
                            return <ItemInCart food={food} key={food.uniqueId} restaurantId={restaurantId} />
                        })}
                    </ScrollView>
                ) : (
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>Chưa có món ăn trong giỏ hàng</Text>
                )}
                <View style={styles.noteContainer}>
                    <TextInput placeholder='Ghi chú' style={styles.row} value={note} onChangeText={setNote}></TextInput>
                </View>
                <View style={styles.summaryContainer}>
                    <Text style={styles.textBold}>Chi tiết thanh toán</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Tạm tính</Text>
                        <Text style={styles.value}>{formatPrice(sum)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Phí áp dụng</Text>
                        <Text style={styles.value}>{formatPrice(sum * 0.1)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Giảm giá</Text>
                        <Text style={styles.value}>{formatPrice(0)}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.footerContainer}>
                <View style={styles.methodPaymentContainer}>
                    <TouchableOpacity style={styles.payment} onPress={handlePayment}>
                        <Text style={styles.paymentText}> {selectedPaymentMethod}</Text>
                    </TouchableOpacity>
                    <View style={styles.discount}>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            data={data}
                            labelField="label"
                            placeholder="Select discount"
                            value={discount}
                            onChange={item => {
                                setDiscount(item.value);
                            }}
                        />
                    </View>
                </View>
                <View style={[styles.row, { borderBlockColor: '#FFFFFF', borderBottomWidth: 1 }]}>
                    <Text style={[styles.label, styles.totalLabel]}>Tổng số tiền</Text>
                    <Text style={[styles.value, styles.totalValue]}>{formatPrice(sum)}</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => handleOrder()}>
                    <Text style={styles.buttonText}>Đặt món</Text>
                </TouchableOpacity>
            </View>

            {
                showCompleteOrder && (
                    <>
                        <BlurView
                            style={styles.absolute}
                            blurType="light"
                            blurAmount={1}
                            reducedTransparencyFallbackColor="white"
                        />
                        <CompleteOrderDisplay />
                    </>
                )
            }
        </SafeAreaView >
    )
}

export default CartScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#FFF',
    },
    headContainer: {
        margin: 5,
        backgroundColor: '#FFF',
        borderRadius: 10,
    },
    textHeader: {
        marginLeft: 10,
        fontSize: 20,
        fontWeight: '600',
        color: 'black',
    },
    mainContainer: {
        flex: 1,
        paddingHorizontal: 15,
        marginTop: 10,
    },
    scrollContainer: {
        height: 200
    },
    footerContainer: {
        backgroundColor: '#FF0000',
        borderRadius: 20,
        padding: 10,
        margin: 10,
    },
    summaryContainer: {
        backgroundColor: '#FFFF',
        borderRadius: 10,
        padding: 10,
        marginTop: 5,
        elevation: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        // height: 40
    },
    label: {
        fontWeight: '300',
        fontSize: 16,
        color: '#000',
    },
    value: {
        fontWeight: '300',
        fontSize: 16,
        color: '#000',
    },
    totalLabel: {
        fontWeight: 'bold',
        fontSize: 18,
        color: "#FFF"
    },
    totalValue: {
        fontWeight: 'bold',
        fontSize: 18,
        color: "#FFF"
    },
    button: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#FF3D00',
        fontSize: 18,
        fontWeight: 'bold',
    },
    textBold: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000'
    },
    methodPaymentContainer: {
        flexDirection: 'row'
    },
    payment: {
        width: '50%',
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    discount: {
        width: '50%'
    },
    locationContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        height: 50,
        padding: 10,
    },
    noteContainer: {
        backgroundColor: '#FFFF',
        borderRadius: 10,
        paddingLeft: 10,
        elevation: 10,
        height: 40
    },

    dropdown: {
        margin: 5,
        height: 40,
        borderBottomColor: '#fff',
        borderBottomWidth: 0.5,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '500'
    },
    selectedTextStyle: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: '500'
    },
    card: {
        flex: 1,
        top: "65%",
        position: 'absolute',
        left: 0,
        right: 0,
    },
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    text: {
        paddingRight: 10,
        width: 340,
    },
    paymentText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff'
    },
    image: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
})
