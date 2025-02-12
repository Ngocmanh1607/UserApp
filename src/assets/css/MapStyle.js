import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchbox: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        alignItems: 'center',
        paddingLeft: 10,
        margin: 10,
        elevation: 5,
        borderRadius: 10,
        height: 45,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: 'black',
        marginLeft: 10,
    },
    textContainer: {
        backgroundColor: '#fff',
        marginHorizontal: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
    },
    noResultsText: {
        textAlign: 'center',
        color: 'gray',
        marginTop: 10,
    },
});
export default styles;