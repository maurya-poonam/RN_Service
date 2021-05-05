import React, { Component } from 'react'
import { Text, View, AsyncStorage, TouchableOpacity, ActivityIndicator,BackHandler,Alert } from 'react-native'
import LoginModel from './tab/LoginModel'
// import { TouchableOpacity } from 'react-native-gesture-handler'

export class SplashScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    handleBackButton = () => {
        Alert.alert(
            'Exit App',
            'Exiting the application?', [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: () => BackHandler.exitApp()
            },], {
            cancelable: false
        }
        )
        return true;
    }

    componentDidMount() {
        this.Auth();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    async Auth() {
        // const a = await AsyncStorage.getItem('token')
        // if (a == null) this.props.navigation.navigate('HomePage');
        // else this.props.navigation.navigate('HomeApp');
        AsyncStorage.getItem('accessToken').then((accessToken)=>{
            if(accessToken==null)
            return <LoginModel />
            else this.props.navigation.navigate('HomeApp');

        })
    }
    render() {
        return (
            <View>
                {/* {this.Auth()} */}
                <ActivityIndicator size={'large'} />
            </View>
        )
    }
}

export default SplashScreen
