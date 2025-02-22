import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    headContainer: {
        marginHorizontal: 5,
    },
    searchbox: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        marginBottom: 5,
        alignSelf: 'center',
        elevation: 3,
        borderRadius: 10,
        height: 45,
    },
    input: {
        width: '85%',
        fontSize: 16,
        color: 'black',
    },
    scrollContainer: {
        marginBottom: 95,
    },
    cartContainer: {
        width: 50,
        height: 50,
        backgroundColor: "#fff",
        position: 'absolute',
        zIndex: 1,
        right: 10,
        bottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 5,
    },
    textErrol: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 20,
    },
});
export default styles;