import React, { Component } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native';
//import { CustomHeader } from '../index';

export class HomePage extends Component {

    render() {
        return (
            <SafeAreaView style={{ flex: 1, }}>
                {/* <CustomHeader  isHome={true} /> */}
                <ImageBackground
                    source={{uri:'https://www.desktopbackground.org/download/o/2014/03/23/736070_wallpapers-iphone-7-1080-1920-full-hd-103-1080-x-1920-iphone-7_1080x1920_h.jpg'}}
                    style={{
                        width: '100%', 
                        height: '100%'
                    }}
                    imageStyle={{
                        resizeMode: 'cover' 
                    }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        {/* <Text>Login Screen!</Text> */}
                        <TouchableOpacity
                            style={{ marginTop: 20, backgroundColor: '#2B1B17', width: '40%', height: 50, borderRadius: 10 }}
                            onPress={() => this.props.navigation.navigate('LoginScreen')}
                        >
                            <Text style={{ justifyContent: 'center', alignSelf: 'center', fontSize: 18, color: 'white', marginTop: 15 }}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginTop: 20, backgroundColor: '#25383C', width: '40%', height: 50, borderRadius: 10 }}
                            onPress={() => this.props.navigation.navigate('Register')}
                        >
                            <Text style={{ justifyContent: 'center', alignSelf: 'center', fontSize: 18, color: 'white', marginTop: 15 }}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        );
    }
}

export default HomePage