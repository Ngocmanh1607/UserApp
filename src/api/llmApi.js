import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import apiClient from "./apiClient";
const apiKey = '123'
const llmApi = async (query) => {
    try {
        const userId = await AsyncStorage.getItem('userId');
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (!userId || !accessToken) {
            Alert.alert(accessToken)
        }
        const response = await apiClient.post(`/llm`,
            {
                query: query
            },
            {
                headers: {
                    "x-api-key": apiKey,
                    "authorization": accessToken,
                    "x-client-id": userId,
                }
            })
        return response.data.metadata;
    }
    catch (error) {
        console.log(error)
    }
}
export default llmApi;