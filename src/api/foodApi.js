import apiClient from "./apiClient";
import axios from 'axios'
const apiKey = '123'
//d3e004aa8a4f5f2f2f0df447c397ba8024c27407563ca7809e50520f01f670b7206d42b17b6b01afc124a0f3d1d93fc9e033df72f67aba2f89da961104cb06de
const foodApi = {
    getCategories: async () => {
        try {
            const response = await apiClient.get('/categories',
                {
                    headers: {
                        "x-api-key": "d3e004aa8a4f5f2f2f0df447c397ba8024c27407563ca7809e50520f01f670b7206d42b17b6b01afc124a0f3d1d93fc9e033df72f67aba2f89da961104cb06de",
                    }
                })
            return response.data.metadata;
        } catch (error) {
            console.log(error)
        }
    },
    getFoodInCate: async (cateId) => {
        try {
            // const response = await apiClient.get(`/categories/${cateId}/products`,

            const response = await axios.get(`https://ddaa-183-80-67-137.ngrok-free.app/v1/api/categories/${cateId}/products`,
                {
                    headers: {
                        "x-api-key": apiKey,
                    }
                })
            return response.data.metadata.products
        } catch (error) {
            console.log(error)
        }
    },
    getFoodTopping: async (foodId) => {
        try {
            const response = await apiClient.get(`/topping/getall/${foodId}`,
                {
                    headers: {
                        "x-api-key": "d3e004aa8a4f5f2f2f0df447c397ba8024c27407563ca7809e50520f01f670b7206d42b17b6b01afc124a0f3d1d93fc9e033df72f67aba2f89da961104cb06de",
                    }
                })
            return response.data.metadata;
        } catch (error) {
            console.log(error)
        }
    }
}
export { foodApi }