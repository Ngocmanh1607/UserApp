import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
  Text,
  Modal,
  SafeAreaView,
} from 'react-native';
import Headerbar from '../../components/Headerbar';
import OfferSlider from '../../components/OfferSlider';
import Categories from '../../components/Categories';
import CardRestaurant from '../../components/CardRestaurant';
import Icon from 'react-native-vector-icons/MaterialIcons';
import restaurantApi from '../../api/restaurantApi';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../assets/css/HomeStyle';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import RenderListFavorite from '../../components/RenderListFavorite';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const address = useSelector((state) => state.currentLocation);
  const navigation = useNavigation();

  useEffect(() => {
    if (address.address && address.address !== 'Đang lấy vị trí...') {
      fetchRestaurantData(1, false);
    }
  }, [address]);

  const fetchRestaurantData = async (pageNumber = 1, isLoadMore = false) => {
    try {
      if (!hasMore || loadingMore) return;
      if (!isLoadMore) setLoading(true);
      else setLoadingMore(true);

      const response = await restaurantApi.getAllRestaurant(
        address,
        pageNumber
      );

      setLoading(false);
      setLoadingMore(false);

      if (response.success) {
        if (response.data.length === 0) {
          setHasMore(false);
        } else {
          setRestaurants((prevRestaurants) =>
            isLoadMore ? [...prevRestaurants, ...response.data] : response.data
          );
          setPage(pageNumber);
        }
      }
    } catch (error) {
      setLoading(false);
      setLoadingMore(false);
      setHasMore(false);
    }
  };

  const handleLoadMore = () => {
    fetchRestaurantData(page + 1, true);
  };

  const goToSearchScreen = () => {
    navigation.navigate('SearchScreen');
  };
  const SearchBar = () => (
    <TouchableOpacity
      style={styles.searchContainer}
      onPress={goToSearchScreen}
      activeOpacity={0.7}>
      <View style={styles.searchbox}>
        <Icon name="search" size={24} color="#F00" />
        <Text style={styles.searchPlaceholder}>Tìm kiếm nhà hàng...</Text>
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
          <Text style={styles.sectionTitle}>Danh mục</Text>
        </View>
        <Categories />
      </View>

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
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.2}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
        ListFooterComponent={() =>
          loadingMore && (
            <View style={styles.loadingMoreContainer}>
              <ActivityIndicator size="small" color="#007AFF" />
            </View>
          )
        }
        contentContainerStyle={styles.flatListContent}
      />

      {/* Floating Cart Button */}
      <TouchableOpacity style={styles.cartContainer}>
        <SimpleLineIcons name="handbag" size={24} color="#FFF" />
        <View style={styles.cartBadge}>
          <Text style={styles.cartBadgeText}>3</Text>
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
