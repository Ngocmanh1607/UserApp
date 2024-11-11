import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { foodApi } from '../api/foodApi';
import CardFoodInCate from '../components/CardFoodInCate';

const FoodCategory = ({ route }) => {
    const { categoryId } = route.params;
    const [isLoading, setIsLoading] = useState(false);
    const [foodData, setFoodData] = useState([]);
    const [isNull, setIsNull] = useState(false);
    useEffect(() => {
        const fetchFoodInCategory = async (categoryId) => {
            try {
                setIsLoading(true);
                const data = await foodApi.getFoodInCate(categoryId);
                console.log(data)
                if (data && Array.isArray(data) && data.length > 0) {
                    setFoodData(data);
                    setIsNull(data.length === 0);
                }
                else {
                    setIsNull(true)
                }
            } catch (error) {
                setFoodData([]);
                setIsNull(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFoodInCategory(categoryId);
    }, []);
    return (
        <ScrollView style={styles.container}>
            {foodData.map((food) => <CardFoodInCate food={food} key={food.productId} />)}
        </ScrollView>
    )
}

export default FoodCategory

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
})