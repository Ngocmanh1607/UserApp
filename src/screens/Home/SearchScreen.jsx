import React, { useState, useCallback } from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import restaurantApi from '../../api/restaurantApi';
import { useSelector } from 'react-redux';
import { debounce } from 'lodash'; // Nếu đã cài đặt lodash
import { formatPrice } from '../../utils/format';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.4;

const SearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const address = useSelector((state) => state.currentLocation);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRestaurants = useCallback(
    debounce(async (query) => {
      if (!query.trim()) {
        setProducts([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await restaurantApi.searchRestaurants(query);
        setIsLoading(false);
        console.log(response);

        setProducts(response);
      } catch (error) {
        console.error('Search error:', error);
        setIsLoading(false);
      }
    }, 2000),
    []
  );

  const handleSearchChange = (text) => {
    setSearchText(text);
    if (text.trim()) {
      searchRestaurants(text);
    } else {
      setProducts([]);
    }
  };

  const handleClearSearch = () => {
    setSearchText('');
    setProducts([]);
  };
  const handlePress = async (food) => {
    try {
      const [restaurantInfo, distance] = await Promise.all([
        restaurantApi.getInfoRestaurants(food.restaurant_id),
        restaurantApi.getDistance(
          address.latitude,
          address.longitude,
          food.restaurant_id
        ),
      ]);

      if (restaurantInfo.success && distance.success) {
        const restaurant = {
          ...restaurantInfo.data,
          distance: parseFloat(distance.data),
        };
        navigation.navigate('RestaurantDetail', { restaurant });
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể lấy thông tin nhà hàng');
    }
  };
  const FoodCard = ({ food, onPress }) => (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View style={styles.cardContent}>
        <Image source={{ uri: food.image }} style={styles.foodImage} />
        <View style={styles.contentContainer}>
          <Text style={styles.foodName} numberOfLines={1}>
            {food.name}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {food.descriptions}
          </Text>
          <Text style={styles.price}>{formatPrice(food.price)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <Icon name="search" size={24} color="#F00" />
          <TextInput
            style={styles.input}
            placeholder="Tìm kiếm món ăn..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={handleSearchChange}
            autoFocus={true}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={handleClearSearch}>
              <Icon name="close" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#e74c3c" />
        </View>
      ) : (
        <>
          {searchText.trim() === '' ? (
            <View style={styles.emptyStateContainer}>
              <Icon name="search" size={64} color="#ddd" />
              <Text style={styles.emptyStateText}>
                Nhập từ khóa để tìm kiếm món ăn
              </Text>
            </View>
          ) : products.length === 0 && !isLoading ? (
            <View style={styles.emptyStateContainer}>
              <Icon name="restaurant" size={64} color="#ddd" />
              <Text style={styles.emptyStateText}>
                Không tìm thấy món ăn phù hợp với "{searchText}"
              </Text>
            </View>
          ) : (
            <FlatList
              data={products}
              renderItem={({ item }) => (
                <FoodCard food={item} onPress={() => handlePress(item)} />
              )}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.listContent}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  backButton: {
    marginRight: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    height: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  emptyStateText: {
    marginTop: 10,
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  listContent: {
    padding: 10,
  },

  cardContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#eee',
  },

  cardContent: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },

  foodImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },

  contentContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },

  foodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },

  description: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
    lineHeight: 18,
  },

  price: {
    fontSize: 15,
    fontWeight: '700',
    color: '#e74c3c',
  },
});

export default SearchScreen;
