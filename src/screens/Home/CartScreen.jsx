import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  Linking,
  AppState,
  ActivityIndicator,
  Modal,
  FlatList,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ItemInCart from '../../components/ItemInCart';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import CompleteOrder from '../Order/CompleteOrderScreen';
import { useDispatch, useSelector } from 'react-redux';
import { formatPrice } from '../../utils/format';
import { orderApi } from '../../api/orderApi';
import userApi from '../../api/userApi';
import styles from '../../assets/css/CartStyle';
import PaymentMethodScreen from '../Order/PaymentMethodScreen';
import CouponPage from '../Order/CouponScreen';
import { cart } from '../../api/cartOrder';
import { fetchCartCount } from '../../store/cartSlice';

const CartScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { restaurantId } = route.params;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('ZALOPAY');
  const [coupons, setCoupons] = useState([]);
  const [modalPayment, setModalPayment] = useState(false);
  const [showCompleteOrder, setShowCompleteOrder] = useState(false);
  const address = useSelector((state) => state.currentLocation);
  const errorAddress = useSelector((state) => state.currentLocation.error);
  const [cost, setCost] = useState();
  const [discountCost, setDiscountCost] = useState(0);
  const [note, setNote] = useState('');
  const [transactionId, setTransactionId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [foodData, setFoodData] = useState([]);
  const [cartID, setCartID] = useState(null);

  const fetchCartData = async () => {
    setIsLoading(true);
    const cartData = await cart.getCart(restaurantId);
    setIsLoading(false);
    if (cartData.success) {
      const items = cartData.data.map((item) => item.description);
      setCartID(cartData.cart_item_id);
      setFoodData(items);
    } else {
      if (cartData.message === 500) {
        Alert.alert('Lỗi', 'Hết phiên làm việc.Vui lòng đăng nhập lại', {
          text: 'OK',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Auth' }],
            });
          },
        });
      } else {
        Alert.alert('Đã xảy ra lỗi', cartData.message);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCartData();
    }, [])
  );

  const calculateTotalDiscount = () => {
    let totalDiscount = 0;
    const subtotal = cost?.totalFoodPrice || 0;
    const sortedCoupons = [...coupons].sort((a, b) => {
      // Apply restaurant coupons before admin coupons
      if (a.type === 'RESTAURANT' && b.type === 'ADMIN') return -1;
      if (a.type === 'ADMIN' && b.type === 'RESTAURANT') return 1;
      return 0;
    });

    let remainingAmount = subtotal;
    sortedCoupons.forEach((coupon) => {
      // Skip if remaining amount is 0
      if (remainingAmount <= 0) return;

      let discountAmount = 0;

      if (coupon.discount_type === 'PERCENTAGE') {
        // Calculate percentage discount
        discountAmount =
          (remainingAmount * parseFloat(coupon.discount_value)) / 100;

        if (coupon.max_discount_amount) {
          discountAmount = Math.min(
            discountAmount,
            parseFloat(coupon.max_discount_amount)
          );
        }
      } else {
        // Fixed amount discount
        discountAmount = Math.min(
          parseFloat(coupon.discount_value),
          remainingAmount
        );
      }

      // Update total discount and remaining amount
      totalDiscount += discountAmount;
      remainingAmount -= discountAmount;
    });

    // Round to nearest 1000 VND
    return Math.floor(totalDiscount / 1000) * 1000;
  };

  useEffect(() => {
    const discount = calculateTotalDiscount();
    setDiscountCost(discount);
  }, [coupons, cost]);

  useEffect(() => {
    handleGetPrice();
  }, [foodData, address, discountCost, coupons]);

  // Lắng nghe khi người dùng quay lại app bằng cách sử dụng AppState
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'active' && transactionId) {
        const checkPaymentStatus = async () => {
          const statusData = await orderApi.orderCheckStatus(transactionId);
          if (statusData === 'Giao dịch thành công') {
            setShowCompleteOrder(true);
          } else {
            Alert.alert('Thanh toán', 'Giao dịch thất bại. Vui lòng thử lại');
          }
        };
        checkPaymentStatus();
      }
    };

    // Thêm listener cho AppState
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );
    // Dọn dẹp listener khi component unmount
    return () => {
      subscription.remove();
    };
  }, [transactionId]);
  const handlePress = () => {
    navigation.navigate('MapScreen');
  };

  // Thêm sản phẩm
  const handleAdd = async (id, description) => {
    setIsLoading(true);
    const response = await cart.addItem(restaurantId, id, description);
    setIsLoading(false);
    if (response.success) {
      const items = response.data.map((item) => item.description);
      dispatch(fetchCartCount(restaurantId));
      setFoodData(items);
    } else {
      Alert.alert('Đã xảy ra lỗi', response.message);
    }
  };

  const handleOrder = async () => {
    if (foodData.length === 0) {
      return Alert.alert('Lỗi', 'Giỏ hàng của bạn đang trống');
    }
    setIsLoading(true);
    const userInfoResponse = await userApi.getInfoUser(dispatch);
    setIsLoading(false);

    if (!userInfoResponse.data.profile) {
      Alert.alert('Lỗi', 'Vui lòng cập nhật thông tin cá nhân', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('Profile');
          },
        },
      ]);
      return;
    }

    if (!userInfoResponse.success) {
      if (userInfoResponse.message == 'JsonWebTokenError') {
        Alert.alert('Lỗi', 'Hết phiên làm việc.Vui lòng đăng nhập lại', {
          text: 'OK',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Auth' }],
            });
          },
        });
        return;
      } else {
        Alert.alert('Lỗi', userInfoResponse.message);
        return;
      }
    }

    const info = userInfoResponse.data;
    const totalPrice = Math.ceil(cost?.totalPrice / 1000) * 1000 || 0;
    const shipePrice = Math.floor(cost.shippingCost) || 0;

    const response = await orderApi.orderApi(
      info,
      address,
      foodData,
      selectedPaymentMethod,
      totalPrice,
      shipePrice,
      note
    );

    setIsLoading(false);
    if (!response.success) {
      Alert.alert('Lỗi', response.message);
      return;
    }

    setTransactionId(response.data.app_trans_id);
    if (selectedPaymentMethod === 'ZALOPAY') {
      if (response.data.url) {
        await Linking.openURL(response.data.url);
      }
    } else {
      Alert.alert('Đặt hàng thành công', 'Cảm ơn bạn đã đặt hàng', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Main'),
        },
      ]);
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
    navigation.navigate('Coupon', {
      onSelectCoupon: handleSelectCoupon,
      total: cost?.totalFoodPrice + cost?.shippingCost,
    });
  };

  const handleSelectCoupon = (newCoupon) => {
    if (!newCoupon) return;
    // Check if coupon already exists
    const isCouponExists = coupons.some((coupon) => coupon.id === newCoupon.id);
    if (isCouponExists) {
      Alert.alert('Thông báo', 'Mã giảm giá này đã được áp dụng');
      return;
    }
    // Check coupon type limit
    const isAdminCoupon = newCoupon.type === 'ADMIN';
    const existingAdminCoupon = coupons.find(
      (coupon) => coupon.type === 'ADMIN'
    );
    const existingRestaurantCoupon = coupons.find(
      (coupon) => coupon.type === 'RESTAURANT'
    );
    if (isAdminCoupon && existingAdminCoupon) {
      Alert.alert('Thông báo', 'Chỉ được áp dụng 1 mã giảm giá từ Yummy');
      return;
    }
    if (!isAdminCoupon && existingRestaurantCoupon) {
      Alert.alert('Thông báo', 'Chỉ được áp dụng 1 mã giảm giá từ nhà hàng');
      return;
    }

    // Add new coupon
    setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
  };

  const handleGetPrice = async () => {
    setIsLoading(true);
    let response;
    if (foodData.length > 0) {
      response = await orderApi.getPrice(
        address.latitude,
        address.longitude,
        restaurantId,
        foodData,
        discountCost
      );
      setIsLoading(false);
    }
    if (!response || !response.success) {
      if (response && response.message === 'JsonWebTokenError') {
        Alert.alert('Lỗi', 'Hết phiên làm việc.Vui lòng đăng nhập lại', {
          text: 'OK',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Auth' }],
            });
          },
        });
        return;
      }
    }
    setCost(response.data);
  };

  const renderHeader = () => {
    return (
      <View style={styles.headContainer}>
        <Text style={styles.sectionTitle}>Địa chỉ giao hàng</Text>
        <TouchableOpacity style={styles.addressButton} onPress={handlePress}>
          <View style={styles.addressContent}>
            <View style={styles.iconContainer}>
              <Ionicons name="location" size={22} color="#e74c3c" />
            </View>
            <View style={styles.addressTextContainer}>
              <Text
                style={styles.addressText}
                numberOfLines={1}
                ellipsizeMode="tail">
                {errorAddress ? errorAddress : address.address}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#7f8c8d" />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {/* Note Input */}
        <View style={styles.noteContainer}>
          <View style={styles.noteInputWrapper}>
            <Ionicons
              name="create-outline"
              size={20}
              color="#7f8c8d"
              style={styles.noteIcon}
            />
            <TextInput
              placeholder="Ghi chú cho đơn hàng"
              placeholderTextColor="#7f8c8d"
              style={styles.noteInput}
              value={note}
              onChangeText={setNote}
            />
          </View>
        </View>

        {/* Coupon Button */}
        <TouchableOpacity
          style={styles.couponContainer}
          onPress={handleDiscount}>
          <View style={styles.couponLeftContent}>
            <Ionicons
              name="ticket-outline"
              size={20}
              color="#e74c3c"
              style={styles.couponIcon}
            />
            <Text style={styles.paymentText}>Mã giảm giá</Text>
          </View>
          <View style={styles.couponRightContent}>
            {coupons.length > 0 ? (
              <View style={styles.appliedCouponsContainer}>
                <Text style={styles.discountText}>
                  {coupons.length} mã được áp dụng
                </Text>
                <Text style={styles.addMoreText}>+ Thêm</Text>
              </View>
            ) : (
              <Text style={styles.noCouponText}>Chọn hoặc nhập mã</Text>
            )}
            <Ionicons name="chevron-forward" size={18} color="#7f8c8d" />
          </View>
        </TouchableOpacity>

        {/* section lits coupon */}
        {coupons.length > 0 && (
          <View style={styles.appliedCouponsList}>
            {coupons.map((coupon, index) => (
              <View
                key={index}
                style={[
                  styles.appliedCouponItem,
                  coupon.type === 'ADMIN'
                    ? styles.adminCoupon
                    : styles.restaurantCoupon,
                ]}>
                <View style={styles.couponBadgeContainer}>
                  <Text style={styles.couponBadge}>
                    {coupon.type === 'ADMIN' ? 'Yummy' : 'Nhà hàng'}
                  </Text>
                </View>
                <Text style={styles.couponCode}>{coupon.coupon_code}</Text>
                <Text style={styles.couponValue}>
                  {coupon.discount_type === 'PERCENTAGE'
                    ? `${coupon.discount_value}%`
                    : `- ${formatPrice(coupon.discount_value)}`}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    setCoupons((prev) => prev.filter((c) => c.id !== coupon.id))
                  }
                  style={styles.removeCouponButton}>
                  <Ionicons name="close-circle" size={20} color="#e74c3c" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Order Summary */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Chi tiết thanh toán</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tạm tính</Text>
            <Text style={styles.summaryValue}>
              {formatPrice(cost ? cost.totalFoodPrice : 0)}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Phí vận chuyển</Text>
            <Text style={styles.summaryValue}>
              {formatPrice(cost ? cost.shippingCost : 0)}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Giảm giá</Text>
            <Text style={styles.discountValue}>
              {discountCost > 0
                ? `- ${formatPrice(discountCost)}`
                : formatPrice(0)}
            </Text>
          </View>

          <View style={styles.divider}></View>

          <View style={styles.totalSummaryRow}>
            <Text style={styles.totalSummaryLabel}>Tổng thanh toán</Text>
            <Text style={styles.totalSummaryValue}>
              {formatPrice(cost?.totalPrice || 0)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={foodData}
        renderItem={({ item }) => (
          <ItemInCart
            food={item}
            onAdd={handleAdd}
            restaurantId={restaurantId}
          />
        )}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        style={styles.flatListContainer}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
      />
      {/* Footer Container with Order Summary */}
      <View style={styles.footerContainer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Tổng số tiền</Text>
          <Text style={styles.totalValue}>
            {formatPrice(Math.ceil(cost?.totalPrice / 1000) * 1000 || 0)}
          </Text>
        </View>

        {/* Payment Method Selection */}
        <TouchableOpacity
          style={styles.methodPaymentContainer}
          onPress={handlePayment}>
          <View style={styles.couponLeftContent}>
            <Ionicons
              name="wallet-outline"
              size={20}
              color="#2c3e50"
              style={styles.couponIcon}
            />
            <Text style={styles.paymentText}>Phương thức thanh toán</Text>
          </View>
          <View style={styles.couponRightContent}>
            <Text style={styles.paymentText}>{selectedPaymentMethod}</Text>
            <Ionicons
              name="chevron-forward"
              size={18}
              color="#7f8c8d"
              style={{ marginLeft: 6 }}
            />
          </View>
        </TouchableOpacity>

        {/* Payment Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalPayment}
          onRequestClose={() => setModalPayment(false)}>
          <PaymentMethodScreen
            onSelectMethod={handleSelectPaymentMethod}
            onClose={() => setModalPayment(false)}
          />
        </Modal>

        {/* Order Button */}
        <TouchableOpacity style={styles.button} onPress={() => handleOrder()}>
          <Text style={styles.buttonText}>Đặt món</Text>
        </TouchableOpacity>
      </View>

      {/* Complete Order Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCompleteOrder}
        onRequestClose={() => setShowCompleteOrder(false)}>
        <View style={styles.overlay}>
          <CompleteOrder
            onComplete={() => setShowCompleteOrder(false)}
            restaurantId={restaurantId}
          />
        </View>
      </Modal>

      {/* Loading Overlay */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isLoading}
        onRequestClose={() => {}}>
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#e74c3c" />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CartScreen;
