import React, { useEffect, useState, useCallback } from 'react';
import {
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
  Text,
  Modal,
  SafeAreaView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Headerbar from '../../components/Headerbar';
import OfferSlider from '../../components/OfferSlider';
import Categories from '../../components/Categories';
import CardRestaurant from '../../components/CardRestaurant';
import styles from '../../assets/css/HomeStyle';
import restaurantApi from '../../api/restaurantApi';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import RenderListFavorite from '../../components/RenderListFavorite';
import {
  selectCartItemCount,
  fetchAllCartItems,
  fetchCartCount,
} from '../../store/cartSlice';
import { foodApi } from '../../api/foodApi';
import FlashSaleCard from '../../components/FlashSaleCard';

const HomeScreen = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const address = useSelector((state) => state.currentLocation);
  const navigation = useNavigation();
  const cartItemCount = useSelector(selectCartItemCount);
  const [flashSaleItems, setFlashSaleItems] = useState([]);
  const dispatch = useDispatch();
  const fetchRestaurantData = useCallback(async () => {
    try {
      if (!address || !address.address) return;
      setLoading(true);
      const response = await restaurantApi.getAllRestaurant(address);
      setLoading(false);

      if (response.success) {
        setRestaurants(response.data);
      } else {
        Alert.alert(
          'Lỗi',
          response.message || 'Đã có lỗi xảy ra khi tải dữ liệu',
          [
            {
              text: 'Thử lại',
              onPress: () => fetchRestaurantData(),
            },
            {
              text: 'Đóng',
              style: 'cancel',
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert('Lỗi', error.message || 'Đã có lỗi xảy ra khi tải dữ liệu', [
        {
          text: 'Thử lại',
          onPress: () => fetchRestaurantData(),
        },
        {
          text: 'Đóng',
          style: 'cancel',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [address]);
  const fetchFlashSaleData = async () => {
    try {
      const response = await foodApi.getFlashSale();
      if (response.success) {
        setFlashSaleItems(response.data);
      } else {
        throw new Error(response.message || 'Không thể tải flash sale');
      }
    } catch (error) {
      Alert.alert('Thông báo', 'Không thể tải danh sách flash sale', [
        {
          text: 'OK',
          style: 'cancel',
        },
      ]);
    }
  };
  useEffect(() => {
    if (
      address &&
      address.address &&
      address.address !== 'Đang lấy vị trí...'
    ) {
      fetchRestaurantData();
    }
    fetchFlashSaleData();
  }, [address, fetchRestaurantData]);
  useFocusEffect(
    useCallback(() => {
      dispatch(fetchCartCount());
      dispatch(fetchAllCartItems());
    }, [dispatch])
  );
  const goToSearchScreen = () => {
    navigation.navigate('SearchScreen');
  };
  const handlePressRes = () => {
    navigation.navigate('CartResScreen');
  };
  const SearchBar = () => (
    <TouchableOpacity
      style={styles.searchContainer}
      onPress={goToSearchScreen}
      activeOpacity={0.7}>
      <View style={styles.searchbox}>
        <Icon name="search" size={24} color="#F00" />
        <Text style={styles.searchPlaceholder}>Tìm kiếm món ăn...</Text>
      </View>
    </TouchableOpacity>
  );

  // Component Header cố định
  const HeaderComponent = React.memo(() => (
    <>
      {/* Search Bar */}
      <SearchBar />
      {/* Banner Slider */}
      <View style={styles.section}>
        <OfferSlider />
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Danh mục sản phẩm</Text>
        </View>
        <Categories />
      </View>
      {flashSaleItems.length > 0 && (
        <View style={styles.flashSaleSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.flashSaleTitle}>
              <Text style={styles.sectionTitle}>Flash Sale</Text>
              <MaterialIcons name="flash-on" size={24} color="#FF3B30" />
            </View>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={flashSaleItems}
            renderItem={({ item }) => (
              <FlashSaleCard item={item} restaurantId={item.restaurant_id} />
            )}
            keyExtractor={(item) => item.product_id.toString()}
            contentContainerStyle={styles.flashSaleList}
          />
        </View>
      )}
      {/* Popular Products */}
      <RenderListFavorite />
      {/* Latest Products */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Các quán gần đây</Text>
        </View>
      </View>
    </>
  ));

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Headerbar />
      </View>
      <FlatList
        data={restaurants}
        ListHeaderComponent={<HeaderComponent />}
        renderItem={({ item }) => <CardRestaurant restaurant={item} />}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
        contentContainerStyle={styles.flatListContent}
      />

      {/* Floating Cart Button */}
      <TouchableOpacity style={styles.cartContainer} onPress={handlePressRes}>
        <SimpleLineIcons name="handbag" size={24} color="#FFF" />
        <View style={styles.cartBadge}>
          <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
        </View>
      </TouchableOpacity>

      <Modal visible={loading} transparent={true} animationType="fade">
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#e74c3c" />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default React.memo(HomeScreen);
