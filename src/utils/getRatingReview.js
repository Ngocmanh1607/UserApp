import restaurantApi from '../api/restaurantApi';
export default async function getRatingReview(restaurantId) {
  const response = await restaurantApi.getReview(restaurantId);
  if (response.success) {
    const reviews = response.data;
    const total = reviews?.length;
    const sumRatings = reviews.reduce(
      (sum, review) => (sum += review.res_rating),
      0
    );
    return total === 0 ? 5 : (sumRatings / total).toFixed(1);
  } else {
    return 0;
  }
}
