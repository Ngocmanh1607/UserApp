import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SectionList,
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
        if (response.message === 'invalid signature') {
          Alert.alert('Lỗi', 'Hết phiên làm việc. Vui lòng đăng nhập lại', [
            {
              text: 'OK',
              onPress: () => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Auth' }],
                });
              },
            },
          ]);
          return;
        }
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

  const handleSelectCoupon = (coupon) => {
    onSelectCoupon(coupon);
    navigation.goBack();
  };

  const formatDiscount = (coupon) => {
    if (coupon.discount_type === 'PERCENTAGE') {
      return `${coupon.discount_value}%`;
    }
    return formatPrice(coupon.discount_value);
  };

  const getDiscountDescription = (coupon) => {
    if (coupon.discount_type === 'PERCENTAGE') {
      return `Giảm ${coupon.discount_value}% (tối đa ${formatPrice(
        coupon.max_discount_amount
      )})`;
    }
    return `Giảm ${formatPrice(coupon.discount_value)}`;
  };

  const renderCouponItem = ({ item }) => {
    const coupon = item.coupon;
    if (!coupon || item.error) return null;

    if (
      search &&
      !coupon.coupon_name.toLowerCase().includes(search.toLowerCase()) &&
      !coupon.coupon_code.toLowerCase().includes(search.toLowerCase())
    ) {
      return null;
    }

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
            <Text style={[styles.infoText, styles.discountText]}>
              {getDiscountDescription(coupon)}
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
          <Text style={styles.expiryText}>
            Hết hạn: {new Date(coupon.end_date).toLocaleDateString('vi-VN')}
          </Text>
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

  const sections = [
    {
      title: 'Mã giảm giá từ Yummy',
      data: coupons.adminCoupons.filter((item) => !item.error),
    },
    {
      title: 'Mã giảm giá từ nhà hàng',
      data: coupons.restaurantCoupons.filter((item) => !item.error),
    },
  ].filter((section) => section.data.length > 0);

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

      <SectionList
        sections={sections}
        renderItem={renderCouponItem}
        renderSectionHeader={({ section: { title, data } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <Text style={styles.couponCount}>{data.length} mã giảm giá</Text>
          </View>
        )}
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
