import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Animated, Alert, Button, Image, Linking, AppState, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
    const selectedPaymentMethod = route.params?.selectedPaymentMethod || 'ZALOPAY';
    const dispatch = useDispatch();
    const [discount, setDiscount] = useState(null);
    const [showCompleteOrder, setShowCompleteOrder] = useState(false);
    const items = useSelector(state => state.cart.carts[restaurantId]);
    const userInfo = useSelector(state => state.user.userInfo);
    const address = useSelector(state => state.currentLocation);
    const error = useSelector(state => state.currentLocation.error);
    const sum = useSelector(state => state.cart.totalAmount?.[restaurantId]?.amount) || 0;
    const [note, setNote] = useState('');
    const [transactionId, setTransactionId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
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
    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setShowCompleteOrder(false);
        });

        return unsubscribe;
    }, [navigation]);
    // Lắng nghe khi người dùng quay lại app bằng cách sử dụng AppState
    useEffect(() => {
        const handleAppStateChange = (nextAppState) => {
            if (nextAppState === 'active' && transactionId) {
                // Khi ứng dụng trở về trạng thái "active", kiểm tra trạng thái thanh toán
                const checkPaymentStatus = async () => {
                    const statusData = await orderApi.orderCheckStatus(transactionId);
                    if (statusData == 'Giao dịch thành công') {
                        Alert.alert('Thanh toán', 'Giao dịch thành công')
                        setShowCompleteOrder(true)
                    }
                    else {
                        Alert.alert('Thanh toán', 'Giao dịch thất bại. Vui lòng thử lại')
                    }
                };
                checkPaymentStatus();
            }
        };

        // Thêm listener cho AppState
        const subscription = AppState.addEventListener('change', handleAppStateChange);
        // Dọn dẹp listener khi component unmount
        return () => {
            subscription.remove();
        };
    }, [transactionId]);
    const handlePress = () => {
        navigation.navigate('MapScreen')
    };
    const handleOrder = () => {
        const delivery_fee = sum * 0.1;

        const fetchOrder = async (userInfo, address, items, selectedPaymentMethod, sum, note) => {
            try {
                setIsLoading(true)
                const response = await orderApi.orderApi(userInfo, address, items, selectedPaymentMethod = 'ZALOPAY', sum, note, delivery_fee);
                setTransactionId(response.app_trans_id);
                console.log(response.url)
                if (response.url) {
                    await Linking.openURL(response.url);
                }
                setIsLoading(false)
            } catch (error) {
                console.error('Đã xảy ra lỗi khi đặt hàng:', error);
                Alert.alert('Lỗi', 'Đặt hàng không thành công. Vui lòng thử lại.');
            }
        };
        const fetchUserInfo = async () => {
            const response = await userApi.getInfoUser(dispatch);
            console.log(response);
        };

        fetchUserInfo()
        if (userInfo.name == '' || userInfo.phone_number == '' || userInfo == 'null') {
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
        isLoading ? (<View style={styles.loaderContainer} >
            <ActivityIndicator size="large" color="#FF0000" />
        </View>
        ) : (
            <SafeAreaView style={styles.container} >
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
                            {foodData.map((food) => (
                                <ItemInCart food={food} key={food.uniqueId} restaurantId={restaurantId} />)
                            )}
                        </ScrollView>
                    ) : (
                        <View style={styles.scrollContainer}>
                            <Text style={{ textAlign: 'center', marginTop: 20 }}>Chưa có món ăn trong giỏ hàng</Text>
                        </View>
                    )}
                    <View style={styles.noteContainer}>
                        <TextInput placeholder='Ghi chú' style={[styles.row, { alignItems: 'center', justifyContent: 'center' }]} value={note} onChangeText={setNote}></TextInput>
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
                <View style={styles.methodPaymentContainer}>
                    <Text style={styles.paymentText}> Phương thức thanh toán</Text>
                    <TouchableOpacity style={styles.payment} onPress={handlePayment}>
                        <Text style={styles.paymentText}> {selectedPaymentMethod}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footerContainer}>
                    <View style={[styles.row, { borderBlockColor: '#FFFFFF', borderBottomWidth: 1 }]}>
                        <Text style={[styles.label, { fontWeight: '500' }]}>Tổng số tiền</Text>
                        <Text style={[styles.value, { fontWeight: '500' }]}>{formatPrice(sum)}</Text>
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
            </SafeAreaView>
        )
    )
}

export default CartScreen

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
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
        height: 350
    },
    footerContainer: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 15,
        marginVertical: 5
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
        fontSize: 16,
    },
    totalValue: {
        fontWeight: 'bold',
        fontSize: 18,
        color: "#FFF"
    },
    button: {
        backgroundColor: '#FF0000',
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    textBold: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000'
    },
    methodPaymentContainer: {
        backgroundColor: '#FFF',
        marginHorizontal: 15,
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
        height: 40,
        padding: 10
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
    },
    image: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
})
