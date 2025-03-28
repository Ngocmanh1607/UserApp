import { Text, View, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Animated, Alert, Linking, AppState, ActivityIndicator, Modal, FlatList } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import ItemInCart from '../../components/ItemInCart';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import CompleteOrder from '../Order/CompleteOrderScreen';
import { useDispatch, useSelector } from 'react-redux';
import { formatPrice } from '../../utils/format';
import { orderApi } from '../../api/orderApi';
import userApi from '../../api/userApi';
import styles from '../../assets/css/CartStyle';
import PaymentMethodScreen from '../Order/PaymentMethodScreen';
import CouponPage from '../Order/CouponScreen';
import { HandleApiError } from '../../utils/handleError';
import { SearchBar } from 'react-native-screens';
const CartScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { restaurantId } = route.params;
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('ZALOPAY');
    const [coupon, setCoupon] = useState('');

    const [modalPayment, setModalPayment] = useState(false);
    const [modalCoupon, setModalCoupon] = useState(false);

    const [showCompleteOrder, setShowCompleteOrder] = useState(false);
    const items = useSelector(state => state.cart.carts[restaurantId]);
    const address = useSelector(state => state.currentLocation);
    const errorAddress = useSelector(state => state.currentLocation.error);
    const [cost, setCost] = useState();
    const [note, setNote] = useState('');
    const [transactionId, setTransactionId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
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

    // Lắng nghe khi người dùng quay lại app bằng cách sử dụng AppState
    useEffect(() => {
        const handleAppStateChange = (nextAppState) => {
            if (nextAppState === 'active' && transactionId) {
                const checkPaymentStatus = async () => {
                    const statusData = await orderApi.orderCheckStatus(transactionId);
                    if (statusData === 'Giao dịch thành công') {
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
    const handleOrder = async () => {
        if (items.length === 0) {
            return Alert.alert('Lỗi', 'Giỏ hàng của bạn đang trống');
        }
        setIsLoading(true);
        const userInfoResponse = await userApi.getInfoUser(dispatch);
        setIsLoading(false);
        if (!userInfoResponse.success) {
            if (userInfoResponse.message === 500) {
                Alert.alert('Lỗi', 'Hết phiên làm việc.Vui lòng đăng nhập lại',
                    {
                        text: 'OK',
                        onPress: () => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Auth' }]
                            })
                        }
                    }
                );
                return;
            }
            else {
                Alert.alert('Lỗi', userInfoResponse.message);
                return;
            }
        }
        const totalCost = cost.totalFoodPrice + cost.shippingCost - (coupon?.discount_value ?? 0);
        const couponid = coupon.id;
        const info = userInfoResponse.data;
        const response = await orderApi.orderApi(
            info,
            address,
            items,
            'ZALOPAY',
            cost.totalFoodPrice,
            cost.shippingCost,
            note,
            couponid
        );
        setIsLoading(false);
        if (!response.success) {
            Alert.alert('Lỗi', response.message);
            return;
        }
        setTransactionId(response.data.app_trans_id);
        if (response.data.url) {
            await Linking.openURL(response.data.url);
        }

    };
    const handlePayment = () => {
        setModalPayment(true);
    };
    const handleSelectPaymentMethod = (method) => {
        setSelectedPaymentMethod(method);
        setModalPayment(false);
    };

    const handleDiscount = () => {
        setModalCoupon(true);
    };
    const handleSelectCoupon = (coupon) => {
        setCoupon(coupon);
        setModalCoupon(false);
    };
    const handleGetPrice = async () => {
        setIsLoading(true);
        const response = await orderApi.getPrice(address.latitude, address.longitude, restaurantId, items);
        setIsLoading(false);
        if (!response.success) {
            if (response.message === 500) {
                Alert.alert('Lỗi', 'Hết phiên làm việc.Vui lòng đăng nhập lại',
                    {
                        text: 'OK',
                        onPress: () => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Auth' }]
                            })
                        }
                    }
                );
            }
            return Alert.alert('Lỗi', response.message);
        }
        setCost(response.data);
    }
    const renderHeader = () => {
        return (
            <View style={styles.headContainer}>
                <View style={styles.locationContainer}>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={handlePress}>
                        <Ionicons name="location" size={25} color="#FF0000" style={{ paddingVertical: 6 }} />
                        <View>
                            <View>
                                <Text style={{ paddingRight: 3, fontSize: 16, fontWeight: '700', color: '#333' }}>Giao tới</Text>
                            </View>
                            <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{
                                errorAddress ? errorAddress : address.address
                            }</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
    const renderFooter = () => {
        return (
            <View >
                <View style={styles.noteContainer}>
                    <TextInput
                        placeholder='Ghi chú'
                        placeholderTextColor="#7f8c8d"
                        style={[styles.row, {
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#333',
                            fontSize: 16
                        }]}
                        value={note}
                        onChangeText={setNote}
                    />
                </View>
                <TouchableOpacity style={styles.couponContainer} onPress={() => handleDiscount()}>
                    <Text style={styles.paymentText}>Mã giảm giá</Text>
                    <Text style={styles.discountText}>{coupon && coupon.coupon_code}</Text>
                </TouchableOpacity>

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
                        <Text style={styles.value}>{formatPrice(coupon && coupon.discount_value)}</Text>
                    </View>
                </View>
            </View>
        );
    }
    return (
        isLoading ? (
            <Modal transparent={true} animationType="fade">
                <View style={styles.overlay}>
                    <ActivityIndicator size="large" color="#f00" />
                </View>
            </Modal>
        ) : (
            <SafeAreaView style={styles.container}>
                <FlatList
                    ListHeaderComponent={renderHeader}
                    data={foodData}
                    renderItem={({ item }) => (
                        <ItemInCart food={item} key={item.uniqueId} restaurantId={restaurantId} />
                    )}
                    style={{ paddingHorizontal: 10 }}
                    keyExtractor={item => item.uniqueId}
                    ListFooterComponent={renderFooter}
                />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalCoupon}
                    onRequestClose={() => setModalCoupon(false)}
                >
                    <CouponPage onSelectCoupon={handleSelectCoupon} total={cost && cost.totalFoodPrice + cost.shippingCost} />
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showCompleteOrder}
                    onRequestClose={() => setShowCompleteOrder(false)}
                >
                    <View style={styles.overlay}>
                        <CompleteOrder onComplete={() => setShowCompleteOrder(false)} restaurantId={restaurantId} />
                    </View>
                </Modal>
                <View style={styles.footerContainer}>
                    <View style={[styles.row, { borderBottomWidth: 1, padding: 10, borderBottomColor: '#666' }]}>
                        <Text style={[styles.label, { fontWeight: '500' }]}>Tổng số tiền</Text>
                        <Text style={[styles.value,]}>{formatPrice(cost ? (cost.totalFoodPrice + cost.shippingCost - (coupon?.discount_value ?? 0)) : 0)}</Text>
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
                        visible={modalPayment}
                        onRequestClose={() => setModalPayment(false)}
                    >
                        <PaymentMethodScreen onSelectMethod={handleSelectPaymentMethod} />
                    </Modal>
                    <TouchableOpacity style={styles.button} onPress={() => handleOrder()}>
                        <Text style={styles.buttonText}>Đặt món</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView >
        )
    )
}

export default CartScreen;
