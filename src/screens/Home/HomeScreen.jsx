import React, { useEffect, useState } from 'react';
import {
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
  Alert,
  Text,
  SafeAreaView,
} from 'react-native';
import Headerbar from '../../components/Headerbar';
import CardSlider from '../../components/CardSlider';
import OfferSlider from '../../components/OfferSlider';
import Categories from '../../components/Categories';
import CardRestaurant from '../../components/CardRestaurant';
import Icon from 'react-native-vector-icons/MaterialIcons';
import restaurantApi from '../../api/restaurantApi';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../assets/css/HomeStyle';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
const HomeScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // Kiểm tra còn dữ liệu để tải không
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const address = useSelector((state) => state.currentLocation);
  useEffect(() => {
    console.log('load do address');
    if (address.address && address.address !== 'Đang lấy vị trí...') {
      fetchRestaurantData(1, false);
    }
  }, [address]);
  const fetchRestaurantData = async (pageNumber = 1, isLoadMore = false) => {
    if (!hasMore || loadingMore) return;

    if (!isLoadMore) setLoading(true);
    else setLoadingMore(true);
    const response = await restaurantApi.getAllRestaurant(address, pageNumber);
    setLoading(false);
    setLoadingMore(false);
    if (response.success) {
      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setRestaurants((prevRestaurants) =>
          isLoadMore ? [...prevRestaurants, ...response.data] : response.data
        );
        setFilteredRestaurants((prevRestaurants) =>
          isLoadMore ? [...prevRestaurants, ...response.data] : response.data
        );
        setPage(pageNumber);
      }
    } else {
      console.log(response.message);
      if (response.message !== 500) {
        Alert.alert('Lỗi', response.message);
        return;
      }
    }
  };

  const handleSearch = (query) => {
    setSearch(query);
    if (query.length > 0) {
      setIsSearch(true);
      const results = restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredRestaurants(results);
    } else {
      setIsSearch(false);
      setFilteredRestaurants(restaurants);
    }
  };

  const handelPress = () => {
    navigation.navigate('CartResScreen');
  };
  const handleLoadMore = () => {
    if (!isSearch) {
      fetchRestaurantData(page + 1, true);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Header*/}
      <View style={styles.header}>
        <Headerbar />
      </View>
      {/* Nội dung chính */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <FlatList
          data={filteredRestaurants} // Giữ nguyên data của bạn
          ListHeaderComponent={() => (
            <>
              {/* Phần tìm kiếm */}
              <View style={styles.searchContainer}>
                <View style={styles.searchbox}>
                  <Icon name="search" size={22} color="#999" />
                  <TextInput
                    style={styles.input}
                    placeholder="Tìm kiếm sản phẩm..."
                    placeholderTextColor="#999"
                    value={searchText}
                    onChangeText={setSearchText}
                  />
                  {searchText ? (
                    <TouchableOpacity onPress={() => setSearchText('')}>
                      <Icon name="close" size={22} color="#999" />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
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
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>
                    Nhà hàng bạn yêu thích
                  </Text>
                </View>
                <CardSlider />
              </View>

              {/* Latest Products */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Các quán gần đây</Text>
                </View>
              </View>
            </>
          )}
          renderItem={({ item }) => <CardRestaurant restaurant={item} />}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.2}
          initialNumToRender={10} // Render trước 10 item
          maxToRenderPerBatch={10} // Render trước 10 item
          windowSize={5} // Chỉ giữ 5 * batch trong bộ nhớ
          ListFooterComponent={() =>
            loadingMore && (
              <View style={styles.loadingMoreContainer}>
                <ActivityIndicator size="small" color="#007AFF" />
              </View>
            )
          }
          contentContainerStyle={styles.flatListContent}
        />
      )}

      {/* Floating Cart Button */}
      <TouchableOpacity style={styles.cartContainer}>
        <SimpleLineIcons name="handbag" size={24} color="#FFF" />
        <View style={styles.cartBadge}>
          <Text style={styles.cartBadgeText}>3</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
