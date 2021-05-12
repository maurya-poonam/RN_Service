import React, { Component } from 'react'
import { Text, View, SafeAreaView, ToastAndroid, TouchableOpacity, ScrollView, Image, AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import APIConstant from '../api/apiConstant';
import { makeRequest } from '../api/apiCall';
import { CommonActions } from '@react-navigation/native';
import LoginModel from './LoginModel';

export class SettingScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            checktoken: '',
            isLoginShow: false,
            mobileNo: '',
            name: '',
            email: '',
            ImageSource: '',
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState({
            isLoginShow: !this.state.isLoginShow
        })
        this.componentDidMount()
        //this.props.navigation.dispatch(
        //  CommonActions.reset({
        //    index: 1,
        //  routes: [
        //    { name: 'HomeApp' },
        //],
        //})
        // );
    }

    componentDidMount() {
        AsyncStorage.getItem('accessToken').then((accessToken) => {
            this.setState({
                checktoken: accessToken,
            })
            console.log('check token', this.state.checktoken);
        })
        AsyncStorage.getItem('mobileNo').then((mobileNo) => {
            this.setState({
                checkmobileNo: mobileNo,
            })
            if (mobileNo != null) {
                this._GetProfileData(mobileNo);
            }
            console.log('check mobile no', this.state.checkmobileNo);
        })
    }


    _GetProfileData = (mobileNo) => {
        let data = {
            MobileNo: mobileNo,
        }
        console.log('Mob' + JSON.stringify(data));
        makeRequest(
            `${APIConstant.BASE_URL}${APIConstant.PROFILE}?mobileNo=${mobileNo}`,
            'get'
        )
            .then(response => {
                console.log(JSON.stringify(response));
                if (response.statusCode == 0) {
                    Alert.alert('Oppss...', response.statusMessage);
                } else {
                    this.setState({
                        ImageSource: response.responsedata.avatar,
                        name: response.responsedata.name,
                        mobileNo: response.responsedata.mobileNo,
                        email: response.responsedata.email,
                    })
                    console.log('profile data get setting :' + JSON.stringify(mobileNo));
                   // console.log('get image name :' + JSON.stringify(response.responsedata.avatar));
                }
            })
            .catch(error => console.log('error : ' + error));
    }


    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f2f0' }}>
                { this.state.isLoginShow && <LoginModel handleClickfunction={this.handleClick} />}
                <View style={{ height: '100%', }}>
                    <View style={{ flexDirection: 'row', height: 60, width: '100%', backgroundColor: 'black', }} >
                        <TouchableOpacity style={{ margin: 5, padding: 5, alignSelf: 'center' }}
                            onPress={() => this.props.navigation.goBack()}>
                            <Icon name="chevron-back" size={35} color="white" />
                        </TouchableOpacity>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 5, padding: 5, justifyContent: 'center', alignSelf: 'center' }}>Setting</Text>
                    </View>
                    <ScrollView>
                        <View style={{ margin: 5, padding: 5 }}>
                            {this.state.checktoken != null ?
                                <View>
                                    <View style={{ height: 95, width: '100%', backgroundColor: 'white', borderRadius: 5, borderBottomColor: 'lightgrey', borderBottomWidth: 1 }}>
                                        <View style={{ flexDirection: 'row', width: '100%', }}>
                                            <View style={{ justifyContent: 'flex-start', alignSelf: 'flex-start', flex: 1, margin: 5, padding: 5 }}>
                                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', }}>{this.state.name}</Text>
                                                <Text style={{ fontSize: 14, color: 'grey', marginTop: 3 }}>{this.state.mobileNo}</Text>
                                                <Text style={{ fontSize: 16, color: 'grey' }}>{this.state.email}</Text>
                                            </View>
                                            <View>
                                                <Image
                                                    source={{ uri: this.state.ImageSource }}
                                                    style={{
                                                        width: 80,
                                                        height: 80,
                                                        borderRadius: 80 / 2,
                                                        overflow: "hidden",
                                                        borderWidth: 0.3,
                                                        justifyContent: 'center',
                                                        alignSelf: 'center',
                                                        borderColor: 'grey',
                                                        margin: 5,
                                                        marginRight: 20
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ height: 50, width: '100%', borderBottomWidth: 1, borderBottomColor: 'lightgrey', justifyContent: 'flex-start', alignSelf: 'flex-start' }}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
                                            <View style={{ flexDirection: 'row', margin: 5, padding: 5, top: 5, }}>
                                                <AntDesign name='edit' size={20} />
                                                <Text style={{ marginLeft: 15, fontSize: 16, }}>Edit Profile</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                :
                                <View style={{ width: '100%', borderBottomColor: 'lightgrey', borderBottomWidth: 1 }}>
                                    <View style={{ flexDirection: 'row', width: '100%' }}>
                                        <View style={{ justifyContent: 'flex-start', alignSelf: 'flex-start', flex: 1, margin: 5, padding: 5 }}>
                                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', }}>Your Profile</Text>
                                            <Text style={{ fontSize: 14, color: 'grey', marginTop: 3 }}>Log in sign up to view your complete profile</Text>
                                            <TouchableOpacity style={{ flex: 1, width: '100%', height: 50, borderColor: 'blue', borderRadius: 15, borderWidth: 1, justifyContent: 'center', alignSelf: 'center', marginTop: 10 }}
                                                onPress={() => {
                                                    this.handleClick()
                                                }}
                                            >
                                                <Text style={{ textAlign: 'center', color: 'blue', fontSize: 18, fontWeight: 'bold' }}>Login</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    {/* <TouchableOpacity style={{ flex: 1, width: '50%', height: 50, backgroundColor: 'green', justifyContent: 'center', alignSelf: 'center' }}
                                        onPress={() => {
                                            this.handleClick()
                                        }}
                                    >
                                        <Text style={{ textAlign: 'center', color: 'white', }}>Login</Text>
                                    </TouchableOpacity> */}

                                </View>

                            }
                            <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: 'lightgrey', justifyContent: 'flex-start', alignSelf: 'flex-start', }} >
                                <Text style={{ padding: 5, margin: 5, color: '#999999' }} >ORDERS</Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Order')} ><View style={{ flexDirection: 'row', padding: 5, margin: 5 }}><View style={{ width: 20 }}><SimpleLineIcons name='notebook' size={20} /></View><View><Text style={{ marginTop: 3, marginLeft: 14 }}>Your Orders</Text></View></View></TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Favorite Order')} ><View style={{ flexDirection: 'row', padding: 4, margin: 4 }}><View style={{ width: 20 }}><MaterialIcons name='favorite-outline' size={22} /></View><View><Text style={{ marginTop: 3, marginLeft: 15 }}>Favorite Orders</Text></View></View></TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Address Book')} ><View style={{ flexDirection: 'row', padding: 5, margin: 5 }}><View style={{ width: 20 }}><FontAwesome5 name='address-book' size={20} /></View><View><Text style={{ marginTop: 3, marginLeft: 13 }}>Address Book</Text></View></View></TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Help Center')} ><View style={{ flexDirection: 'row', padding: 4, margin: 4 }}><View style={{ width: 20 }}><Icon name='help-circle-outline' size={22} /></View><View><Text style={{ marginTop: 3, marginLeft: 15 }}>Help Center</Text></View></View></TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('About')} ><View style={{ flexDirection: 'row', padding: 4, margin: 4 }}><View style={{ width: 20 }}><Icon name='information-circle-outline' size={22} /></View><View><Text style={{ marginTop: 3, marginLeft: 15 }}>About Us</Text></View></View></TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Send Feedback')} ><View style={{ flexDirection: 'row', padding: 5, margin: 5 }}><View style={{ width: 20 }}><MaterialIcons name='feedback' size={22} /></View><View><Text style={{ marginTop: 3, marginLeft: 13 }}>Send Feedback</Text></View></View></TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Rate')} ><View style={{ flexDirection: 'row', padding: 5, margin: 5 }}><View style={{ width: 20 }}><Icon name='md-star-outline' size={20} /></View><View><Text style={{ marginTop: 3, marginLeft: 13 }}>Rate BlueTimo</Text></View></View></TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Terms and Conditions')} ><View style={{ flexDirection: 'row', padding: 3, margin: 3 }}><View style={{ width: 20 }}><Text style={{ marginTop: 3, marginLeft: 7 }}> • </Text></View><View><Text style={{ marginTop: 3, marginLeft: 15 }}>Terms and Conditions</Text></View></View></TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('FAQs')} ><View style={{ flexDirection: 'row', padding: 3, margin: 3 }}><View style={{ width: 20 }}><Text style={{ marginTop: 3, marginLeft: 7 }}> • </Text></View><View><Text style={{ marginTop: 3, marginLeft: 15 }}>FAQs</Text></View></View></TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Privacy Policy')} ><View style={{ flexDirection: 'row', padding: 3, margin: 3 }}><View style={{ width: 20 }}><Text style={{ marginTop: 3, marginLeft: 7 }}> • </Text></View><View><Text style={{ marginTop: 3, marginLeft: 15 }}>Privacy Policy</Text></View></View></TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Refund Policy')} ><View style={{ flexDirection: 'row', padding: 3, margin: 3 }}><View style={{ width: 20 }}><Text style={{ marginTop: 3, marginLeft: 7 }}> • </Text></View><View><Text style={{ marginTop: 3, marginLeft: 15 }}>Refund Policy</Text></View></View></TouchableOpacity>
                                {this.state.checktoken != null ?
                                    <TouchableOpacity
                                        onPress={async () => {
                                            const keys = ['accessToken', 'refreshToken', 'mobileNo']
                                            await AsyncStorage.multiRemove(keys).then(() => {
                                                console.log("Logout...");
                                                ToastAndroid.show('Logout Successfully', ToastAndroid.SHORT)
                                                this.setState({
                                                    checktoken: null
                                                })

                                                this.props.navigation.dispatch(
                                                    CommonActions.reset({
                                                        index: 1,
                                                        routes: [
                                                            { name: 'HomeApp' },
                                                        ],
                                                    })
                                                );
                                            })
                                        }}>
                                        {/* <Text style={{ justifyContent:'flex-end', alignSelf:'flex-end', color: 'white',marginTop:10, margin:10 }}>Logout</Text> */}
                                        <Text style={{ padding: 5, margin: 5, color: 'grey' }} >Logout</Text>
                                    </TouchableOpacity>
                                    : null}
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

export default SettingScreen
