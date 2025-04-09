import React, { useEffect, useState, useRef } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
  SectionList,
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
  const dispatch = useDispatch();
  const { cartCount } = useSelector((state) => state.cart);

  const [loading, setLoading] = useState(true);
  const [restaurantData, setRestaurantData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);

  const scrollRef = useRef(null);
  const sectionListRef = useRef();
  const itemLayouts = useRef({}); // lưu toạ độ x và width của từng item (theo index)
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };
  // Hàm này sẽ được gọi khi các mục trong SectionList thay đổi trạng thái hiển thị
  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0 && viewableItems[0].section) {
      const sectionIndex = restaurantData.findIndex(
        (section) => section.title === viewableItems[0].section.title
      );
      if (sectionIndex !== -1) {
        setActiveCategory(sectionIndex);
        const layout = itemLayouts.current[sectionIndex];
        if (layout) {
          scrollRef.current?.scrollTo({
            x: layout.x - 20,
            animated: true,
          });
        }
      }
    }
  };
  // Dùng onLayout để lấy x và width từng item khi nó được render lần đầu.
  const handleLayout = (event, index) => {
    const { x } = event.nativeEvent.layout;
    itemLayouts.current[index] = { x };
  };

  // state lấy dữ liêu từ api
  useEffect(() => {
    const fetchRestaurantData = async () => {
      setLoading(true);
      const cate = [];
      try {
        const data = await restaurantApi.getFoodsCateInRes(restaurantId);
        if (data.success) {
          const sections = data.data.map((category) => {
            cate.push({
              id: category.category_id,
              name: category.category_name,
            });
            return {
              title: category.category_name,
              data: category.products.map((product) => ({
                id: product.product_id,
                name: product.product_name,
                price: product.product_price,
                image: product.image,
                descriptions: product.product_description,
                quantity: product.product_quantity,
                toppings: product.toppings,
              })),
            };
          });
          setRestaurantData(sections);
          setCategories(cate);
        } else {
          Alert.alert('Lỗi', data.message);
        }
        setLoading(false);
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

  const renderItem = ({ item }) => (
    <CardFood2 food={item} restaurant={restaurant} />
  );
  const handleCategoryPress = (index) => {
    if (index !== activeCategory) {
      // setActiveCategory(index);
      const layout = itemLayouts.current[index];
      if (layout) {
        scrollRef.current?.scrollTo({
          x: layout.x - 20, // scroll hơi lệch trái cho đẹp
          animated: true,
        });
      }
      if (sectionListRef.current) {
        sectionListRef.current.scrollToLocation({
          sectionIndex: index,
          itemIndex: 0,
          animated: true,
          viewPosition: 0,
        });
      }
    }
  };
  const renderFoodList = () => (
    <View style={styles.foodListContainer}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryListContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={item.id.toString()}
            onLayout={(event) => handleLayout(event, index)}
            style={[
              styles.categoryItem,
              activeCategory === index && styles.activeCategoryItem,
            ]}
            onPress={() => handleCategoryPress(index)}>
            <Text
              style={[
                styles.categoryText,
                activeCategory === index && styles.activeCategoryText,
              ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <SectionList
        ref={sectionListRef}
        sections={restaurantData}
        keyExtractor={(item, index) => item.id + index}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="alert-circle" size={50} color="#ccc" />
            <Text style={styles.emptyText}>Không tìm thấy món ăn nào</Text>
          </View>
        }
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        {renderRestaurantHeader()}
        {/* {renderSearchBar()} */}
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
