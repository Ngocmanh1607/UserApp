import React, { useState, useCallback } from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CardRestaurant from '../../components/CardRestaurant';
import restaurantApi from '../../api/restaurantApi';
import { useSelector } from 'react-redux';
import { debounce } from 'lodash'; // Nếu đã cài đặt lodash

const SearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const address = useSelector((state) => state.currentLocation);

  // Hàm tìm kiếm với debounce để tránh gọi API liên tục
  const searchRestaurants = useCallback(
    debounce(async (query) => {
      if (!query.trim()) {
        setRestaurants([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        // Gọi API tìm kiếm
        const response = await restaurantApi.searchRestaurants(address, query);
        setIsLoading(false);

        if (response.success) {
          setRestaurants(response.data);
        }
      } catch (error) {
        console.error('Search error:', error);
        setIsLoading(false);
      }
    }, 1000),
    [address]
  );

  const handleSearchChange = (text) => {
    setSearchText(text);
    if (text.trim()) {
      searchRestaurants(text);
    } else {
      setRestaurants([]);
    }
  };

  const handleClearSearch = () => {
    setSearchText('');
    setRestaurants([]);
  };

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
            placeholder="Tìm kiếm nhà hàng..."
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
                Nhập từ khóa để tìm kiếm nhà hàng
              </Text>
            </View>
          ) : restaurants.length === 0 && !isLoading ? (
            <View style={styles.emptyStateContainer}>
              <Icon name="restaurant" size={64} color="#ddd" />
              <Text style={styles.emptyStateText}>
                Không tìm thấy nhà hàng phù hợp với "{searchText}"
              </Text>
            </View>
          ) : (
            <FlatList
              data={restaurants}
              renderItem={({ item }) => <CardRestaurant restaurant={item} />}
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
    paddingVertical: 10,
  },
});

export default SearchScreen;
