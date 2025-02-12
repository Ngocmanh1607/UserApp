import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
    inputLoginContainer: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderRadius: 10,
        marginHorizontal: 40,
        marginVertical: 10,
        // elevation: 10,
        alignItems: 'center',
        height: 50,
    },
    inputIcon: {
        marginLeft: 15,
        marginRight: 5,
    },
    textInput: {
        flex: 1,
        fontSize: 14,
        color: "#222"
    },
    errorText: {
        marginStart: 50,
        color: 'red',
        fontSize: 14,
    },
    inputPassIcon: {
        marginLeft: 5,
        marginRight: 15,
    },
    forgotPassText: {
        color: "#FF0000",
        textAlign: 'right',
        width: '90%',
        fontSize: 16,
        marginVertical: 10,
    },
    loginButtonContainer: {
        width: '70%',
        height: 50,
        backgroundColor: "#FF0000",
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 15,
        borderRadius: 10,
        elevation: 5
    },

    inputContainer: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderRadius: 10,
        marginHorizontal: 40,
        marginVertical: 20,
        elevation: 10,
        alignItems: 'center',
        height: 50,
    },
    textLogin: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    horizontalLine: {
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,
        width: '40%',
        alignSelf: 'center'
    },
    googleButtonContainer: {
        flexDirection: 'row',
        width: '70%',
        height: 50,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 15,
        borderRadius: 10,
        elevation: 5,
    },
    textLoginGoogle: {
        color: '#222',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 10,
    },
    googleIcon: {
        marginRight: 10,
        color: 'red',
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
export default styles;