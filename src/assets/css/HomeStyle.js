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
        marginTop: 10,
        marginBottom: 10,
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
        marginBottom: 110,
    },
    cartContainer: {
        width: 50,
        height: 50,
        backgroundColor: "#FFFFFF",
        position: 'absolute',
        zIndex: 1,
        right: 10,
        bottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#333',
    },
    textErrol: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 20,
    },
});
export default styles;