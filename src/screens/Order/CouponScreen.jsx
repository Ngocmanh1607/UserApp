import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { orderApi } from '../../api/orderApi';
import { formatPrice } from '../../utils/format';
import styles from '../../assets/css/CouponStyle';
import { useNavigation, useRoute } from '@react-navigation/native';

const CouponScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { onSelectCoupon, total } = route.params;

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
      console.log(response.data.restaurantCoupons);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể tải mã giảm giá');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCoupon = (coupon) => {
    navigation.goBack();
    onSelectCoupon(coupon);
  };

  const renderCouponItem = ({ item }) => {
    const coupon = item.coupon;
    if (!coupon || item.error) return null;

    return (
      <TouchableOpacity
        style={styles.couponCard}
        onPress={() => handleSelectCoupon(coupon)}>
        <View style={styles.couponHeader}>
          <MaterialIcons name="local-offer" size={18} color="#FF3B30" />
          <Text style={styles.couponTitle} numberOfLines={1}>
            {coupon.coupon_name}
          </Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Khả dụng</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <MaterialIcons
              name="vpn-key"
              size={14}
              color="#666"
              style={styles.infoIcon}
            />
            <Text style={styles.infoText}>{coupon.coupon_code}</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialIcons
              name="loyalty"
              size={14}
              color="#FF3B30"
              style={styles.infoIcon}
            />
            <Text
              style={[
                styles.infoText,
                { color: '#FF3B30', fontWeight: '500' },
              ]}>
              {formatPrice(coupon.discount_value)}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <MaterialIcons
              name="shopping-bag"
              size={14}
              color="#666"
              style={styles.infoIcon}
            />
            <Text style={styles.infoText}>
              Tối thiểu: {formatPrice(coupon.min_order_value)}
            </Text>
          </View>
        </View>

        <View style={styles.couponFooter}>
          <Text style={styles.expiryText}>Hết hạn: 30/04/2025</Text>
          <TouchableOpacity style={styles.applyButton}>
            <MaterialIcons name="check" size={12} color="#fff" />
            <Text style={styles.applyButtonText}>Áp dụng</Text>
          </TouchableOpacity>
        </View>
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
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
};

export default CouponScreen;
