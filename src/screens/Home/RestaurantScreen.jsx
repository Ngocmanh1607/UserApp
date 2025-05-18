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
import Snackbar from 'react-native-snackbar';
import { useNavigation } from '@react-navigation/native';

import CardFood2 from '../../components/CardFood2';
import restaurantApi from '../../api/restaurantApi';
import styles from '../../assets/css/RestaurantStyle';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartCount, fetchAllCartItems } from '../../store/cartSlice';
import userApi from '../../api/userApi';
import {
  checkIsOpen,
  getCurrentDaySchedule,
  formatTime,
} from '../../utils/restaurantHelpers';

const RestaurantScreen = ({ route }) => {
  const navigation = useNavigation();
  const { restaurant } = route.params;

  const restaurantId = restaurant.id;
  const dispatch = useDispatch();
  const { cartCount } = useSelector((state) => state.cart);

  const [loading, setLoading] = useState(true);
  const [restaurantData, setRestaurantData] = useState([]);
  const [isFavorite, setIsFavorite] = useState();
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);
  const schedule = getCurrentDaySchedule(restaurant.opening_hours) || false;
  const isOpen = checkIsOpen(schedule) || false;
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
  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}`;
  };
  // state lấy dữ liêu từ api
  useEffect(() => {
    if (!isOpen) {
      Alert.alert(
        'Nhà hàng đã đóng cửa',
        schedule
          ? `Nhà hàng sẽ mở cửa lại vào ${formatTime(schedule.open)}${
              getCurrentTime() > schedule.close ? ' ngày mai' : ''
            }`
          : 'Nhà hàng hiện đang đóng cửa',
        [
          {
            text: 'Quay lại',
            onPress: () => navigation.goBack(),
            style: 'default',
          },
        ]
      );
      return;
    }
    const fetchRestaurantData = async () => {
      setLoading(true);
      const cate = [];
      try {
        const data = await restaurantApi.getFoodsCateInRes(restaurantId);
        if (data.success) {
          const uniqueFlashItemIds = new Set();
          const flashItems = [];

          data.data.forEach((category) => {
            category.products.forEach((product) => {
              if (product.is_flash_sale) {
                if (!uniqueFlashItemIds.has(product.product_id)) {
                  uniqueFlashItemIds.add(product.product_id);
                  flashItems.push({
                    id: product.product_id,
                    name: product.product_name,
                    price: product.original_price,
                    image: product.image,
                    descriptions: product.product_description,
                    quantity: product.product_quantity,
                    toppings: product.toppings,
                    discountPrice: product.product_price,
                    is_flash_sale: product.is_flash_sale,
                    is_available: product.is_available,
                  });
                }
              }
            });
          });

          const sections = [];
          if (flashItems.length > 0) {
            sections.push({
              title: 'Flash Sale 🔥',
              data: flashItems,
            });
            cate.push({
              id: 'flash_sale',
              name: 'Flash Sale 🔥',
            });
          }

          // Add regular categories
          data.data.forEach((category) => {
            cate.push({
              id: category.category_id,
              name: category.category_name,
            });
            console.log(category);

            sections.push({
              title: category.category_name,
              data: category.products.map((product) => ({
                id: product.product_id,
                name: product.product_name,
                price: product.original_price,
                image: product.image,
                descriptions: product.product_description,
                quantity: product.product_quantity,
                toppings: product.toppings,
                discountPrice: product.product_price,
                is_flash_sale: product.is_flash_sale,
                is_available: product.is_available,
              })),
            });
          });

          setRestaurantData(sections);
          setCategories(cate);
        } else {
          if (data.message === 'invalid signature') {
            Alert.alert('Lỗi', 'Hết phiên làm việc.Vui lòng đăng nhập lại', [
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
          Alert.alert('Lỗi', data.message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
    dispatch(fetchCartCount(restaurantId));
  }, [restaurantId, isOpen, schedule]);
  //check Favorite
  useEffect(() => {
    const fetchFavorite = async () => {
      const result = await restaurantApi.checkResInFavo(restaurantId);
      setIsFavorite(result);
    };
    fetchFavorite();
  }, [restaurantId]);

  const handleFavoriteToggle = async () => {
    try {
      setLoading(true);
      await userApi.handleFavorite(restaurantId, navigation);
    } catch (error) {
      if (data.message === 'invalid signature') {
        Alert.alert('Lỗi', 'Hết phiên làm việc.Vui lòng đăng nhập lại', [
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
      Alert.alert('Lỗi', data.message);
    } finally {
      Snackbar.show({
        text: isFavorite
          ? 'Đã xóa khỏi danh sách yêu thích'
          : 'Đã thêm vào danh sách yêu thích',
        duration: Snackbar.LENGTH_SHORT,
      });
      setLoading(false);
      setIsFavorite(!isFavorite);
    }
  };

  const handlePress = () => {
    navigation.navigate('ReviewScreen', {
      restaurantId,
      restaurantName: restaurant.name,
    });
  };
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
  const renderOpeningHours = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const currentTimeMinutes = currentHour * 60 + currentMinute;

    // Calculate remaining time
    let remainingText = '';
    if (schedule) {
      const [openHour, openMin] = schedule.open.split(':').map(Number);
      const [closeHour, closeMin] = schedule.close.split(':').map(Number);
      const openTimeMinutes = openHour * 60 + openMin;
      const closeTimeMinutes = closeHour * 60 + closeMin;

      if (isOpen) {
        const minutesUntilClose = closeTimeMinutes - currentTimeMinutes;
        const hoursUntilClose = Math.floor(minutesUntilClose / 60);
        const minsUntilClose = minutesUntilClose % 60;
        remainingText = `Đóng cửa sau ${hoursUntilClose}h${minsUntilClose}p`;
      } else {
        if (currentTimeMinutes < openTimeMinutes) {
          const minutesUntilOpen = openTimeMinutes - currentTimeMinutes;
          const hoursUntilOpen = Math.floor(minutesUntilOpen / 60);
          const minsUntilOpen = minutesUntilOpen % 60;
          remainingText = `Mở cửa sau ${hoursUntilOpen}h${minsUntilOpen}p`;
        } else {
          remainingText = `Mở cửa vào ${schedule.open} ngày mai`;
        }
      }
    }

    return (
      <View style={styles.openingHoursContainer}>
        <View style={styles.openingHoursHeader}>
          <View style={styles.headerLeft}>
            <MaterialIcons name="access-time" size={20} color="#666" />
            <Text style={styles.openingHoursTitle}>Giờ hoạt động hôm nay</Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: isOpen ? '#ecfdf5' : '#fef2f2' },
            ]}>
            <View style={styles.statusDot} />
            <Text
              style={[
                styles.statusText,
                { color: isOpen ? '#059669' : '#dc2626' },
              ]}>
              {isOpen ? 'Đang mở cửa' : 'Đã đóng cửa'}
            </Text>
          </View>
        </View>
        {schedule && (
          <View style={styles.timeDetailsContainer}>
            <View style={styles.timeRow}>
              <MaterialIcons name="schedule" size={16} color="#666" />
              <Text style={styles.timeValue}>
                {formatTime(schedule.open)} - {formatTime(schedule.close)}
              </Text>
            </View>
            <View style={styles.remainingContainer}>
              <Text
                style={[
                  styles.remainingTime,
                  { color: isOpen ? '#059669' : '#dc2626' },
                ]}>
                {remainingText}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
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
          onPress={() => {
            dispatch(fetchAllCartItems());
            navigation.goBack();
          }}>
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
        {renderOpeningHours()}
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <CardFood2 food={item} restaurant={restaurant} />
  );
  const renderFoodList = () => (
    <View style={styles.foodListContainer}>
      <View style={styles.categoryListContainer}>
        <ScrollView
          ref={scrollRef}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}>
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
      </View>

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
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        stickySectionHeadersEnabled={false}
        style={styles.sectionFood}
      />
    </View>
  );
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        {renderRestaurantHeader()}
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
