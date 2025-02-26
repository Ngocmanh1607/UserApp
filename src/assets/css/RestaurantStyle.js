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
    heartContainer: {
        position: 'absolute',
        top: 80,
        right: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        width: '95%',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        marginTop: -30,
        borderRadius: 10,
        elevation: 5,
    },
    summaryContainer: {
        width: '95%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    text: {
        fontSize: 22,
        fontWeight: '500',
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
        marginVertical: 5,
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
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
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