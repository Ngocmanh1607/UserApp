import apiClient from "./apiClient";

const apiKey = '123'
const foodApi = {
    getCategories: async () => {
        try {
            const response = await apiClient.get('/categories',
                {
                    headers: {
                        "x-api-key": apiKey,
                    }
                })
            return response.data.metadata;
        } catch (error) {
            console.log(error)
        }
    },
    getFoodInCate: async (cateId) => {
        try {
            const response = await apiClient.get(`/categories/${cateId}/products`,
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
                        "x-api-key": apiKey,
                    }
                })
            return response.data.metadata;
        } catch (error) {
            console.log(error)
        }
    }
}
export { foodApi }