import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        padding: 20,
    },
    listContainer: {
        paddingBottom: 20,
    },
    couponCard: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    couponTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    couponCode: {
        fontSize: 14,
        color: "#555",
        marginTop: 5,
    },
});
export default styles;