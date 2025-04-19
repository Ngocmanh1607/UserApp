import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { orderApi } from '../../api/orderApi';
import { formatPrice } from '../../utils/format';
import styles from '../../assets/css/CouponStyle';

const CouponScreen = ({ onSelectCoupon, total }) => {
  const [loading, setLoading] = useState(true);
  const [coupons, setCoupons] = useState({
    adminCoupons: [],
    restaurantCoupons: [],
  });
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await orderApi.getCoupon(total);
      if (!response.success) {
        Alert.alert('Lỗi', response.message);
        return;
      }
      setCoupons(response.data);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể tải mã giảm giá');
    } finally {
      setLoading(false);
    }
  };

  const renderCouponItem = ({ item }) => {
    const coupon = item.coupon;
    if (!coupon || item.error) return null;

    return (
      <TouchableOpacity
        style={styles.couponCard}
        onPress={() => onSelectCoupon(coupon)}>
        <View style={styles.couponHeader}>
          <MaterialIcons name="local-offer" size={24} color="#FF3B30" />
          <Text style={styles.couponTitle}>{coupon.coupon_name}</Text>
        </View>
        <Text style={styles.couponCode}>Mã: {coupon.coupon_code}</Text>
        <Text style={styles.discountValue}>
          Giảm: {formatPrice(coupon.discount_value)}
        </Text>
        <Text style={styles.minOrder}>
          Đơn tối thiểu: {formatPrice(coupon.min_order_value)}
        </Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF3B30" />
      </View>
    );
  }

  const validCoupons = [
    ...coupons.adminCoupons,
    ...coupons.restaurantCoupons.filter((item) => !item.error),
  ];

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm mã giảm giá..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={validCoupons}
        renderItem={renderCouponItem}
        keyExtractor={(item) => item.coupon?.id?.toString()}
        contentContainerStyle={styles.couponList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Không có mã giảm giá khả dụng</Text>
          </View>
        }
      />
    </View>
  );
};

export default CouponScreen;
