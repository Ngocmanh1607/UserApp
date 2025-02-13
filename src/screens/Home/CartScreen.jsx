import { Text, View, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Animated, Alert, Linking, AppState, ActivityIndicator, Modal } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { BlurView } from '@react-native-community/blur';
import ItemInCart from '../../components/ItemInCart';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import CompleteOrder from '../Order/CompleteOrderScreen';
import { useDispatch, useSelector } from 'react-redux';
import formatPrice from '../../utils/formatPrice';
import { orderApi } from '../../api/orderApi';
import userApi from '../../api/userApi';
import styles from '../../assets/css/CartStyle';
import PaymentMethodScreen from '../Order/PaymentMethodScreen';
const CartScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { restaurantId } = route.params;
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('ZALOPAY');
    const discount = route.params?.discount;
    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = useState(false);

    const [showCompleteOrder, setShowCompleteOrder] = useState(false);
    const items = useSelector(state => state.cart.carts[restaurantId]);
    const userInfo = useSelector(state => state.user.userInfo);
    const address = useSelector(state => state.currentLocation);
    const error = useSelector(state => state.currentLocation.error);
    const [cost, setCost] = useState();
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
        if (items && items.length > 0) {
            setFoodData(items.map(item => ({
                id: item.id,
                name: item.name,
                image: item.image,
                quantity: item.quantity,
                price: item.price,
                toppings: item.toppings,
                uniqueId: item.uniqueId,
            })));
            handleGetPrice();
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
                const checkPaymentStatus = async () => {
                    const statusData = await orderApi.orderCheckStatus(transactionId);
                    if (statusData === 'Giao dịch thành công') {
                        Alert.alert('Thanh toán', 'Giao dịch thành công');
                        setShowCompleteOrder(true);
                    }
                    else {
                        Alert.alert('Thanh toán', 'Giao dịch thất bại. Vui lòng thử lại');
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
        navigation.navigate('MapScreen');
    };
    const handleOrder = () => {
        const fetchOrder = async (userInfo, address, items, selectedPaymentMethod, note) => {
            setIsLoading(true)
            const cuponid = discount?.id;
            const response = await orderApi.orderApi(userInfo, address, items, selectedPaymentMethod = 'ZALOPAY', cost.totalPrice, cost.shippingCost, note, cuponid, navigation);
            setTransactionId(response.app_trans_id);
            console.log(response.url);
            if (response.url) {
                await Linking.openURL(response.url);
            }
            setIsLoading(false)
        };
        const fetchUserInfo = async () => {
            const response = await userApi.getInfoUser(dispatch, navigation);
            console.log(response);
        };

        fetchUserInfo()
        if (userInfo.name === '' || userInfo.phone_number === '' || userInfo === 'null') {
            Alert.alert('Cập nhật thông tin ', 'Vui lòng cập nhật thông tin để có thể đặt hàng', [
                { text: 'Huỷ', style: 'cancel' },
                { text: 'Ok', onPress: () => navigation.navigate('Thông tin') },
            ]);
        }
        else {
            fetchOrder(userInfo, address, items, selectedPaymentMethod, note);
        }
    };
    const handlePayment = () => {
        // navigation.navigate('PaymentMethod', { restaurantId: restaurantId });
        setModalVisible(true);
    };
    const handleSelectPaymentMethod = (method) => {
        setSelectedPaymentMethod(method);
        setModalVisible(false); // Đóng modal sau khi chọn
    };

    const handleDiscount = () => {
        navigation.navigate('CouponScreen', { restaurantId: restaurantId });
    };
    const handleGetPrice = async () => {
        setIsLoading(true);
        try {
            const response = await orderApi.getPrice(address.latitude, address.longitude, restaurantId, items);
            setCost(response);
        } catch (error) {
            Alert.alert('Lỗi', error);
        } finally {
            setIsLoading(false);
        }
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
                        <View style={styles.subContainer}>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>Chưa có món ăn trong giỏ hàng</Text>
                        </View>
                    )}
                    <View style={styles.noteContainer}>
                        <TextInput placeholder='Ghi chú' style={[styles.row, { alignItems: 'center', justifyContent: 'center' }]} value={note} onChangeText={setNote}></TextInput>
                    </View>
                    <View style={styles.couponContainer}>
                        <Text style={styles.paymentText}>Mã giảm giá</Text>
                        <TouchableOpacity style={styles.payment} onPress={() => handleDiscount()}>
                            <Text style={styles.discountText}>{discount ? discount.cupon_code : 'Chọn mã giảm giá'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.summaryContainer}>
                        <Text style={styles.textBold}>Chi tiết thanh toán</Text>
                        <View style={styles.row}>
                            <Text style={styles.label}>Tạm tính</Text>
                            <Text style={styles.value}>{formatPrice(cost ? cost.totalFoodPrice : 0)}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Phí áp dụng</Text>
                            <Text style={styles.value}>{formatPrice(cost ? cost.shippingCost : 0)}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Giảm giá</Text>
                            <Text style={styles.value}>{formatPrice(discount && discount.price)}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.methodPaymentContainer} onPress={handlePayment}>
                    <Text style={styles.paymentText}> Phương thức thanh toán</Text>
                    <TouchableOpacity style={styles.payment} onPress={handlePayment}>
                        <Text style={styles.paymentText}> {selectedPaymentMethod}</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}>
                    <PaymentMethodScreen onSelectMethod={handleSelectPaymentMethod} />
                </Modal>

                <View style={styles.footerContainer}>
                    <View style={[styles.row, { borderBlockColor: '#FFFFFF', borderBottomWidth: 1 }]}>
                        <Text style={[styles.label, { fontWeight: '500' }]}>Tổng số tiền</Text>
                        <Text style={[styles.value, { fontWeight: '500' }]}>{formatPrice(cost ? (cost.totalPrice - (discount?.price ?? 0)) : 0)}</Text>
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

export default CartScreen;

