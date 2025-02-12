import React, { useState } from 'react';
import { useWindowDimensions, StyleSheet, Text, LogBox } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import LoginRouter from './LoginRouter';
import SignUpRouter from './SignUpRouter';
const renderScene = SceneMap({
    login: LoginRouter,
    signup: SignUpRouter,
});

const LoginSignUpScreen = () => {
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'login', title: 'Đăng nhập' },
        { key: 'signup', title: 'Đăng ký' },
    ]);

    const renderTabBar = props => {
        const { key, ...restProps } = props;
        return (
            <TabBar
                {...restProps}
                indicatorStyle={styles.indicator}
                style={styles.tabBar}
                renderLabel={({ route, focused }) => (
                    <Text style={[styles.label, { color: focused ? '#FF0000' : 'black' }]}>
                        {route.title}
                    </Text>
                )}
            />
        )
    };

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
        />
    );
};


export default LoginSignUpScreen;

const styles = StyleSheet.create({
    indicator: {
        backgroundColor: "#F00",
        width: '30%',
        marginHorizontal: '10%'
    },
    tabBar: {
        backgroundColor: "#FFF",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
    },
    loginContainer: {
        flex: 1,
    },
});