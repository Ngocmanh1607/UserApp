import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import CardFood2 from '../../components/CardFood2';
import { useNavigation } from '@react-navigation/native';
import restaurantApi from '../../api/restaurantApi';
import styles from '../../assets/css/RestaurantStyle';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartCount } from '../../store/cartSlice';
const RestaurantScreen = ({ route }) => {
  const navigation = useNavigation();
  const { restaurant } = route.params;
  const restaurantId = restaurant.id;
  const [loading, setLoading] = useState(true);
  const [restaurantData, setRestaurantData] = useState([]);
  const dispatch = useDispatch();
  const { cartCount } = useSelector((state) => state.cart);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    const fetchRestaurantData = async () => {
      setLoading(true);
      try {
        const data = await restaurantApi.getFoodsRestaurant(restaurantId);
        const data2 = await restaurantApi.getFoodsCateInRes(restaurantId);
        console.log(data2.data.products);

        setLoading(false);
        if (data.success) {
          setRestaurantData(data.data);
          setFilteredData(data.data);
        } else {
          Alert.alert('Lỗi', data.message);
        }
      } catch (error) {
        setLoading(false);
        HandleApiError(error);
      }
    };
    fetchRestaurantData();
    dispatch(fetchCartCount(restaurantId));
  }, [restaurantId]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredData(restaurantData);
    } else {
      const filtered = restaurantData.filter((food) =>
        food.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  const handlePress = () => {
    navigation.navigate('ReviewScreen', {
      restaurantId,
      restaurantName: restaurant.name,
    });
  };

  const renderRestaurantHeader = () => (
    <View style={styles.restaurantHeaderContainer}>
      <View style={styles.restaurantImageWrapper}>
        <Image
          source={{ uri: restaurant.image }}
          style={styles.restaurantImage}
        />
        <View style={styles.imageOverlay} />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleFavoriteToggle}>
          <Feather
            name={isFavorite ? 'heart' : 'heart'}
            size={22}
            color={isFavorite ? '#FF3B30' : '#FFF'}
            style={isFavorite ? styles.heartFilled : styles.heart}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.restaurantInfoCard}>
        <Text style={styles.restaurantName}>{restaurant.name}</Text>
        <Text style={styles.restaurantDes}>
          Mô tả : {restaurant.description}
        </Text>
        <View style={styles.ratingRow}>
          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={18} color="#FF8C00" />
            <Text style={styles.ratingText}>{restaurant.rating || 5}</Text>
          </View>
          <View style={styles.distanceContainer}>
            <MaterialIcons name="place" size={18} color="#666" />
            <Text style={styles.distanceText}>
              {(restaurant.distance || 0).toFixed(2)} km
            </Text>
          </View>
          <TouchableOpacity style={styles.reviewButton} onPress={handlePress}>
            <Text style={styles.reviewButtonText}>Đánh giá</Text>
            <FontAwesome name="chevron-right" size={14} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderSearchBar = () => (
    <View style={styles.searchBarContainer}>
      <View style={styles.searchInputWrapper}>
        <AntDesign
          name="search1"
          size={20}
          color="#888"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm món ăn"
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor="#999"
        />
        {searchQuery !== '' && (
          <TouchableOpacity onPress={() => handleSearch('')}>
            <AntDesign
              name="close"
              size={20}
              color="#888"
              style={styles.clearIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderFoodList = () => (
    <FlatList
      data={filteredData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <CardFood2 food={item} restaurant={restaurant} />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.foodListContainer}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Feather name="alert-circle" size={50} color="#ccc" />
          <Text style={styles.emptyText}>Không tìm thấy món ăn nào</Text>
        </View>
      }
    />
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        {renderRestaurantHeader()}
        {renderSearchBar()}
        {renderFoodList()}
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => {
            navigation.navigate('CartScreen', { restaurantId: restaurantId });
          }}>
          <SimpleLineIcons name="handbag" size={24} color="#FFF" />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{cartCount}</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default RestaurantScreen;
