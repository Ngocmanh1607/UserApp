import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        width: '100%',
        height: 180,
        resizeMode: 'cover',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 1,
        padding: 10,
        zIndex: 1,
    },
    headerContainer: {
        width: '95%',
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        marginTop: 10,
        borderRadius: 10,
        elevation: 3,
    },
    text: {
        fontSize: 22,
        fontWeight: '600',
        color: "#000",
    },
    bottomContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    ratingText: {
        marginLeft: 4,
        fontSize: 16,
        color: '#000',
    },
    disContainer: {
        justifyContent: 'center',
    },
    textDis: {
        fontSize: 16,
        color: '#666',
    },
    heart: {
        justifyContent: 'flex-end',
        marginLeft: 20,
    },
    searchbox: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFF',
        alignItems: 'center',
        marginVertical: 10,
        alignSelf: 'center',
        elevation: 3,
        borderRadius: 10,
        height: 45,
        margin: 10
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        color: '#333',
    },
    mainInContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartContainer: {
        width: 50,
        height: 50,
        backgroundColor: "#FFFFFF",
        position: 'absolute',
        zIndex: 1,
        right: 20,
        bottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 5,
    },
    foodScrollView: {
        flex: 1,
        marginHorizontal: 10,
    },
});
export default styles;