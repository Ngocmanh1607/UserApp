import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: '#fff',
    },
    listContainer: {
        paddingBottom: 5,
    },
    couponCard: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 8,
        marginBottom: 5,
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