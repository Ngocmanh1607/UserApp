import { View, Text, FlatList, ActivityIndicator, Alert } from 'react-native';
import React, { useMemo, useState, useEffect } from 'react';
import styles from '../../assets/css/ReviewStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';
import ReviewItem from '../../components/ReviewItem';
import restaurantApi from '../../api/restaurantApi';
import { HandleApiError } from '../../utils/handleError';
const ReviewScreen = ({ route }) => {
  const { restaurantId } = route.params;
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      const response = await restaurantApi.getReview(restaurantId);
      setIsLoading(false);
      if (response.success) {
        setReviews(response.data);
      } else {
        Alert.alert('Lỗi', response.message);
      }
    };

    fetchReviews();
  }, [restaurantId]);
  const { ratingsData, totalReviews, averageRating } = useMemo(() => {
    const ratings = [0, 0, 0, 0, 0];
    let total = reviews?.length;
    let sumRatings = 0;
    if (reviews) {
      reviews.forEach(({ res_rating }) => {
        ratings[res_rating - 1]++;
        sumRatings += res_rating;
      });
    }
    console.log(sumRatings);
    return {
      ratingsData: ratings
        .map((count, index) => ({
          stars: index + 1,
          count,
        }))
        .reverse(),
      totalReviews: total,
      averageRating: (sumRatings / total).toFixed(1),
    };
  }, [reviews]);

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="red" />
        </View>
      )}
      {reviews?.length > 0 ? (
        <>
          <View style={styles.headerContainer}>
            <View style={styles.ratingContainer}>
              <Text style={styles.averageRating}>{averageRating}</Text>
              <View style={styles.starsRow}>
                {[...Array(5)].map((_, index) => (
                  <FontAwesome key={index} name="star" size={20} color="gold" />
                ))}
              </View>
              <Text style={styles.totalReviews}>{totalReviews} đánh giá</Text>
            </View>

            <View style={styles.ratingList}>
              {ratingsData.map((item) => (
                <View key={item.stars} style={styles.ratingRow}>
                  <Text style={styles.starText}>
                    {item.stars}{' '}
                    <FontAwesome name="star" size={14} color="gold" />
                  </Text>
                  <Progress.Bar
                    progress={item.count / totalReviews}
                    width={150}
                    height={8}
                    color="gold"
                    unfilledColor="#ddd"
                    borderWidth={0}
                  />
                  <Text style={styles.countText}>{item.count}</Text>
                </View>
              ))}
            </View>
          </View>
          <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
      ) : (
        <View style={styles.noReviewsContainer}>
          <Text style={styles.noReviewsText}>Chưa có đánh giá nào</Text>
        </View>
      )}
    </View>
  );
};
export default ReviewScreen;
