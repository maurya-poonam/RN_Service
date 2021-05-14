import React, { Component } from 'react'
import { Text, View, ImageBackground, SafeAreaView, ToastAndroid, TouchableOpacity, ScrollView, Image, AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import APIConstant from '../api/apiConstant';
import { makeRequest } from '../api/apiCall';
import { CommonActions } from '@react-navigation/native';
import LoginModel from './LoginModel';
import LoadingModal from './LoadingModal';
import GlobalAppModal from '../Modal/GlobalAppModal';
var Spinner = require('react-native-spinkit');


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
            isLoading: true,
            checkmobileNo:''
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState({
            isLoginShow: !this.state.isLoginShow,
        }, () => { null })
        debugger;
        //this.componentDidMount()
        //this.props.navigation.dispatch(
        //  CommonActions.reset({
        //    index: 1,
        //  routes: [
        //    { name: 'HomeApp' },
        //],
        //})
        // );
    }

    _GEtDataReload = async () => {
       await AsyncStorage.getItem('accessToken').then((accessToken) => {
            this.setState({
                checktoken: accessToken,
                //isLoading:false
            })
            console.log('check token', this.state.checktoken);
        })
      await AsyncStorage.getItem('mobileNo').then((mobileNo) => {
            this.setState({
                checkmobileNo: mobileNo,
                // isLoading:false
            })
            if (mobileNo != null) {
                this._GetProfileData(mobileNo);
            }
            this.setState({ isLoading: false });
            console.log('check mobile no', this.state.checkmobileNo);
        })
    // const AT = await AsyncStorage.getItem('accessToken')
    // if(AT){
    //             this.setState({
    //             checktoken: AT
    //             //isLoading:false
    //         })
    // }
    // const MN = await AsyncStorage.getItem('mobileNo')
    // if(MN){
    //             this.setState({
    //                 checkmobileNo:MN
    //         })
    // }
    }

    componentDidMount() {
        //this._GEtDataReload();
        AsyncStorage.getItem('accessToken').then((accessToken) => {
            this.setState({
                checktoken: accessToken,
                //isLoading:false
            })
            console.log('check token', this.state.checktoken);
        })
       AsyncStorage.getItem('mobileNo').then((mobileNo) => {
            this.setState({
                checkmobileNo: mobileNo,
                // isLoading:false
            })
            if (mobileNo != null) {
                this._GetProfileData(mobileNo);
            }
            this.setState({ isLoading: false });
            console.log('check mobile no', this.state.checkmobileNo);
        })
        //if(GlobalAppModal.mobileNo!='') this._GetProfileData(GlobalAppModal.mobileNo)
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
                    this.setState({
                        isLoading: false
                    })

                    console.log('profile data get setting :' + JSON.stringify(mobileNo));
                }
            })
            .catch(error => console.log('error : ' + error));
    }


    render() {
        if (this.state.isLoading) {
            return (
                <Spinner style={{ position: 'absolute', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', height: '100%', width: '20%', marginBottom: 30 }} isVisible={true} size={30} type={'Circle'} color={'#0c389f'} />
            )
        } else {
            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                    { this.state.isLoginShow && <LoginModel handleClickfunction={this.handleClick()} />}
                    <View style={{ height: '100%', }}>
                        <View style={{ flexDirection: 'row', height: 60, width: '100%', backgroundColor: '#04046c', }} >
                            <TouchableOpacity style={{ margin: 5, padding: 5, alignSelf: 'center' }}
                                onPress={() => this.props.navigation.goBack()}>
                                <Icon name="chevron-back" size={35} color="white" />
                            </TouchableOpacity>
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 5, padding: 5, justifyContent: 'center', alignSelf: 'center' }}>Setting</Text>
                        </View>
                        <ScrollView>
                            <View>
                                {this.state.checktoken != null ?
                                    <View>
                                        {this.state.isLoading ?
                                            <Spinner style={{ position: 'absolute', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', height: '100%', width: '20%', marginBottom: 30 }} isVisible={true} size={30} type={'Circle'} color={'#0c389f'} />
                                            :


                                            <View style={{ flex: 1, }}>
                                                <ImageBackground source={require('../../res/img1.png')} style={{ height: 180, width: '100%', borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }} >
                                                    <View style={{ justifyContent: 'center', alignSelf: 'center', elevation: 15, marginTop: 5 }}>
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
                                                                marginRight: 20,
                                                            }}
                                                        />
                                                    </View>
                                                    <View style={{
                                                        justifyContent: 'flex-end',
                                                        alignSelf: 'flex-end',
                                                        position: 'absolute',
                                                        bottom: -25,
                                                        paddingRight: 20
                                                    }}>
                                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
                                                            <View style={{
                                                                width: 50,
                                                                height: 50,
                                                                borderRadius: 50 / 2,
                                                                overflow: "hidden",
                                                                borderWidth: 0.3,
                                                                backgroundColor: 'white',
                                                                borderColor: 'grey',
                                                                margin: 10, padding: 10
                                                            }}>
                                                                <AntDesign name='edit' size={20} style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 5 }} />
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={{ justifyContent: 'center', alignSelf: 'center', }}>
                                                        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: 'white', justifyContent: 'space-between' }}>{this.state.name}</Text>
                                                        <Text style={{ textAlign: 'center', color: 'white', marginTop: 3 }}>{this.state.mobileNo}</Text>
                                                        <Text style={{ textAlign: 'center', color: 'white' }}>{this.state.email}</Text>
                                                    </View>
                                                </ImageBackground>
                                            </View>
                                            // :
                                            // <Spinner style={{ position: 'absolute', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', height: '100%', width: '20%', marginBottom: 30 }} isVisible={true} size={30} type={'Circle'} color={'#0c389f'} />

                                        }
                                    </View>
                                    :
                                    <View style={{ width: '100%', borderBottomColor: 'lightgrey', borderBottomWidth: 1 }}>
                                        <View style={{ flexDirection: 'row', width: '100%' }}>
                                            <View style={{ justifyContent: 'flex-start', alignSelf: 'flex-start', flex: 1, margin: 5, padding: 5 }}>
                                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', }}>Your Profile</Text>
                                                <Text style={{ fontSize: 14, color: 'grey', marginTop: 3 }}>Log in sign up to view your complete profile</Text>
                                                <TouchableOpacity style={{ flex: 1, width: '100%', height: 50, borderColor: '#04046c', borderRadius: 15, borderWidth: 1, justifyContent: 'center', alignSelf: 'center', marginTop: 10 }}
                                                    onPress={() => {
                                                        this.handleClick()
                                                    }}
                                                >
                                                    <Text style={{ textAlign: 'center', color: '#04046c', fontSize: 18, fontWeight: 'bold' }}>Login</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                }
                                <View style={{ margin: 8, padding: 8, width: '100%', justifyContent: 'flex-start', alignSelf: 'flex-start', }} >
                                    <Text style={{ padding: 8, margin: 8, color: '#04046c', fontSize: 16, fontWeight: 'bold' }} >ORDERS</Text>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Order')} ><View style={{ flexDirection: 'row', padding: 10, margin: 10 }}><View style={{ width: 25 }}><SimpleLineIcons name='notebook' size={20} color={'rgb(255, 136, 0)'} /></View><View><Text style={{ marginTop: 0, marginLeft: 12, fontSize: 16 }}>Your Orders</Text></View></View></TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Favorite Order')} ><View style={{ flexDirection: 'row', padding: 8, margin: 8 }}><View style={{ width: 25 }}><MaterialIcons name='favorite-outline' size={23} color={'rgb(255, 136, 0)'} /></View><View><Text style={{ marginTop: 0, marginLeft: 15, fontSize: 16 }}>Favorite Orders</Text></View></View></TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Address Book')} ><View style={{ flexDirection: 'row', padding: 10, margin: 10 }}><View style={{ width: 25, }}><FontAwesome5 name='address-book' size={22} color={'rgb(255, 136, 0)'} /></View><View><Text style={{ marginTop: 0, marginLeft: 11, fontSize: 16 }}>Address Book</Text></View></View></TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Help Center')} ><View style={{ flexDirection: 'row', padding: 8, margin: 8 }}><View style={{ width: 25 }}><Icon name='help-circle-outline' size={24} color={'rgb(255, 136, 0)'} /></View><View><Text style={{ marginTop: 0, marginLeft: 13, fontSize: 16 }}>Help Center</Text></View></View></TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('About')} ><View style={{ flexDirection: 'row', padding: 8, margin: 8 }}><View style={{ width: 25 }}><Icon name='information-circle-outline' size={24} color={'rgb(255, 136, 0)'} /></View><View><Text style={{ marginTop: 0, marginLeft: 13, fontSize: 16 }}>About Us</Text></View></View></TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Send Feedback')} ><View style={{ flexDirection: 'row', padding: 10, margin: 10 }}><View style={{ width: 25 }}><MaterialIcons name='feedback' size={22} color={'rgb(255, 136, 0)'} style={{ right: 4 }} /></View><View><Text style={{ marginTop: 0, marginLeft: 10, fontSize: 16 }}>Send Feedback</Text></View></View></TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Rate')} ><View style={{ flexDirection: 'row', padding: 10, margin: 10 }}><View style={{ width: 25 }}><Icon name='md-star-outline' size={20} color={'rgb(255, 136, 0)'} style={{ right: 4 }} /></View><View><Text style={{ marginTop: 0, marginLeft: 10, fontSize: 16 }}>Rate BlueTimo</Text></View></View></TouchableOpacity>
                                </View>
                                <View>
                                    {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('Terms and Conditions')} ><View style={{ flexDirection: 'row', padding: 3, margin: 3 }}><View style={{ width: 20 }}><Text style={{ marginTop: 3, marginLeft: 7 }}> • </Text></View><View><Text style={{ marginTop: 3, marginLeft: 15 }}>Terms and Conditions</Text></View></View></TouchableOpacity> */}
                                    {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('FAQs')} ><View style={{ flexDirection: 'row', padding: 3, margin: 3 }}><View style={{ width: 20 }}><Text style={{ marginTop: 3, marginLeft: 7 }}> • </Text></View><View><Text style={{ marginTop: 3, marginLeft: 15 }}>FAQs</Text></View></View></TouchableOpacity> */}
                                    {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('Privacy Policy')} ><View style={{ flexDirection: 'row', padding: 3, margin: 3 }}><View style={{ width: 20 }}><Text style={{ marginTop: 3, marginLeft: 7 }}> • </Text></View><View><Text style={{ marginTop: 3, marginLeft: 15 }}>Privacy Policy</Text></View></View></TouchableOpacity> */}
                                    {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('Refund Policy')} ><View style={{ flexDirection: 'row', padding: 3, margin: 3 }}><View style={{ width: 20 }}><Text style={{ marginTop: 3, marginLeft: 7 }}> • </Text></View><View><Text style={{ marginTop: 3, marginLeft: 15 }}>Refund Policy</Text></View></View></TouchableOpacity> */}
                                    {this.state.checktoken != null ?
                                        <TouchableOpacity
                                            onPress={async () => {
                                                const keys = ['accessToken', 'refreshToken', 'mobileNo']
                                                await AsyncStorage.multiRemove(keys).then(() => {
                                                    console.log("Logout...");
                                                    ToastAndroid.show('Logout Successfully', ToastAndroid.SHORT)
                                                    this.setState({
                                                        checktoken: null,
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
                                            }} style={{width:100, height:50, justifyContent:'center', alignSelf:'center'}}>
                                            {/* <Text style={{ justifyContent:'flex-end', alignSelf:'flex-end', color: 'white',marginTop:10, margin:10 }}>Logout</Text> */}
                                            
                                            <Text style={{ color: 'rgb(255, 136, 0)', textAlign: 'center', fontSize: 16, fontWeight: 'bold',  }} >Logout</Text>
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
}

export default SettingScreen
