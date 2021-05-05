import React, { Component } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import HomePage from './auth/HomePage';

export class CustomHeader extends Component {

    // _logout = async () => {
    //     await AsyncStorage.removeItem('token')
    //     this.props.navigation.navigate('HomePage')
    // }

    render() {
        let { navigation, isHome, title } = this.props;
        return (
            <View style={{ flexDirection: 'row', height: 50, }}>

                <View style={{ flex: 1, }}>

                    {
                        isHome ?
                            // <Icon name="md-menu" size={35} color="black" />
                            <View>
                            </View>
                            :
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => navigation.goBack()}
                            >
                                <Icon name="chevron-back" size={35} color="black" />
                                <Text>Back</Text>
                            </TouchableOpacity>
                    }
                </View>
                <View style={{ flexDirection: 'row', borderColor: 'red', backgroundColor: 'green', width: '100%', height: 40 }}>
                    <Text style={{ textAlign: 'center', marginTop: 15,width:'90%' }}>{title}</Text>
                    {/* <TouchableOpacity
                        onPress={() =>
                            Alert.alert(
                                'Logout',
                                'Are you sure? You want to logout?',
                                [
                                    {
                                        text: 'Cancel',
                                        onPress: () => {
                                            return null;
                                        },
                                    },
                                    {
                                        text: 'Confirm',
                                        onPress: () => {
                                            AsyncStorage.clear();
                                            //props.navigation.replace('Auth');
                                            this._logout()
                                        },
                                    },
                                ],
                                { cancelable: false },
                            )
                        }
                    >
                        <MaterialIcons name='logout' size={25} style={{ marginTop: 5, color:'white' }} />
                    </TouchableOpacity> */}
                </View>
                {/* <View style={{ flex: 1, }}></View> */}
            </View >
        )
    }
}

export default CustomHeader;
