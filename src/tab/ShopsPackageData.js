import React, { Component } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, AsyncStorage, Alert, Dimensions, FlatList, Image, ScrollView, Button, StyleSheet, NativeModules, NativeEventEmitter } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RazorpayCheckout from 'react-native-razorpay';
import LoginModel from './LoginModel';
import { makeRequest } from '../api/apiCall';
import APIConstant from '../api/apiConstant';
const maxWidth = Dimensions.get("window").width;
const imageHeight = (maxWidth / 16) * 9;

export class ShopsPackageData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datalist: [
                { id: 'a', value: 'Package 1', time: '100', Rs: '200', image: require("../../res/stor1.jpg"), description: 'hello this is hhasd bhfd jahsdjbna hjshadjnanasj jashjdasj hashdjanmhuhsadndm  huahdnsm hhjdnms huhasjdn bdhjs' },
                { id: 'b', value: 'Package 2', time: '30 ', Rs: '300', image: require("../../res/stor2.jpg"), description: 'hello this text' },
                { id: 'c', value: 'Package 3', time: '50', Rs: '400', image: require("../../res/stor3.jpg"), description: 'hello this value' },
                { id: 'd', value: 'Package 4', time: '40', Rs: '500', image: require("../../res/stor4.jpg"), description: 'hello this text' },
                { id: 'e', value: 'Package 5', time: '60', Rs: '600', image: require("../../res/stor5.jpg"), description: 'hello this is text' },
            ],
            Id: this.props.route.params.Id,
            Name: this.props.route.params.Name,
            // ServiceName: this.props.route.params.ServiceName,
            ShopsPackageDetail: '',
            ServicePackageDetail: this.props.route.params.Iservice,
            checktoken: '',
            isLoginShow: false,
            mobileNo: '',

        }
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        if (this.state.ServicePackageDetail == 'service') {
            this._CallGetServicePackageDetail();
        } else {
            this._CallGetShopsPackageDetail();
        }

        AsyncStorage.getItem('accessToken').then((accessToken) => {
            this.setState({
                checktoken: accessToken,
            })
            console.log('check token', this.state.checktoken);
        })
        // AsyncStorage.getItem('mobileNo').then((mobileNo) => {
        //     this.setState({
        //         checkmobileNo: mobileNo,
        //     })
        //     // if (mobileNo != null) {
        //     //     this._GetProfileData(mobileNo);
        //     // }
        //     console.log('check mobile no', this.state.checkmobileNo);
        // })
    }

    componentWillUnmount() {
        this.setState({
            Id: null,
            ServicePackageDetail: null
        })
    }

    _CallGetShopsPackageDetail = () => {
        const Data = {
            Id: this.state.Id,
        }
        makeRequest(
            APIConstant.BASE_URL + APIConstant.PACKAGEBYSHOPID,
            'post',
            Data
        ).then(response => {
            if (response.statusCode == 0) {
                Alert.alert('Oppss...', response.statusMessage);
            } else {
                this.setState({ ShopsPackageDetail: response.responsedata })
                console.log('shopsPackagedetail', this.state.ShopsPackageDetail);
            }
        }).catch(error => {
            console.log('error: ' + error)
            Alert.alert('Oppss...', 'Something went wrong.');
        });
    }

    _CallGetServicePackageDetail = () => {
        const Data = {
            Id: this.state.Id,
        }

        console.log('servcie id', this.state.Id);
        makeRequest(
            APIConstant.BASE_URL + APIConstant.PACKAGEBYSERVICEID,
            'post',
            Data
        ).then(response => {
            if (response.statusCode == 0) {
                Alert.alert('Oppss...', response.statusMessage);
            } else {
                this.setState({ ShopsPackageDetail: response.responsedata })
                console.log('ServicePackagedetail', this.state.ShopsPackageDetail);
            }
        }).catch(error => {
            console.log('error: ' + error)
            Alert.alert('Oppss...', 'Something went wrong.');
        });
    }

    handleClick() {
        //this.state.loginModalCheck
        this.setState({ isLoginShow: !this.state.isLoginShow }, () => { this.componentDidMount() })
        this.componentDidMount()
    }
    // payment
    _onPressButton(item) {
        // console.log('item', item);
        var options = {
            description: item.description,
            image: item.avatar,
            currency: 'INR',
            key: 'rzp_test_mQXICSOiiBtN6i',
            amount: item.price * 100,
            name: item.name,
            prefill: {
                email: 'void@gmail.com',
                contact: '9191917680',
                name: 'Razorpay Software'
            },
            theme: { color: '#FFA500' }
        }
        RazorpayCheckout.open(options).then((data) => {
            // handle success
            debugger;
            // alert(`Success: ${data.razorpay_payment_id}`);
            console.log(`Success: ${data.razorpay_payment_id}`);

        }).catch((error) => {
            debugger;
            // handle failure
            // alert(`Error: ${error.code} | ${error.description}`);
            console.log(`Error: ${error.code} | ${error.description}`);

        });
    }

    render() {
        const { Name } = this.props.route.params;
        // console.log('Id', Id);
        console.log('Name', Name);

        return (
            <View style={{ height: '100%', backgroundColor: '#f0f2f0', }}>
                {this.state.isLoginShow && <LoginModel handleClickfunction={this.handleClick} />}
                <ScrollView>
                    <View style={{ flexDirection: 'row', height: 60, width: '100%', backgroundColor: '#04046c', }} >
                        <TouchableOpacity style={{ margin: 5, padding: 5, alignSelf: 'center' }}
                            onPress={() => this.props.navigation.goBack()}>
                            <Icon name="chevron-back" size={35} color="white" />
                        </TouchableOpacity>

                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 5, padding: 5, justifyContent: 'center', alignSelf: 'center' }}>{this.state.Name}</Text>
                    </View>
                    <View style={{ height: 50, backgroundColor: 'orange', marginLeft: 10, marginRight: 10, margin: 10 }}>
                        <Text style={{ justifyContent: 'center', alignSelf: 'center', fontWeight: 'bold', fontSize: 22, marginTop: 10 }}> Services</Text>
                    </View>
                    <View style={{ backgroundColor: 'white', height: '100%', margin: 10, marginRight: 10, marginLeft: 10, }}>
                        <FlatList
                            data={this.state.ShopsPackageDetail}
                            ListEmptyComponent={
                                <View style={{ justifyContent: 'center', flex: 1, alignSelf: 'center', alignItems: 'center', alignContent: 'center', marginTop: '50%' }}>
                                    <Image source={require('../../res/nodata.png')} resizeMode={'center'} style={{ width: 150, height: 150, justifyContent: 'center', alignSelf: 'center', }} />
                                </View>}
                            renderItem={({ item }) => (
                                <View style={{
                                    flex: 1,
                                }}>
                                    <Image
                                        style={{ width: '100%', height: 250, }}
                                        source={{ uri: item.avatar }}
                                        resizeMode={'cover'}
                                    />
                                    <View style={{ margin: 10, justifyContent: 'flex-start' }}>
                                        <Text style={{ color: 'black', fontSize: 18, }}>{item.name}</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
                                            <Text style={{ color: 'black', fontSize: 12, }}> ₹ {item.price}</Text>
                                            <MaterialCommunityIcons name='clock-outline' size={12} color={'grey'} style={{ marginLeft: 8 }} /><Text style={{ color: 'grey', fontSize: 12, }}> {item.duration} min</Text>

                                            {/*<View style={{ flex: 1 }}>
                                                {this.state.checktoken != null ?
                                                    <TouchableOpacity
                                                        //   onPress={() => this._onPressButton(item)
                                                        onPress={() => 
                                                            this.props.navigation.navigate('OrderService')}
                                                    >
                                                        <View style={{ flex: 1, justifyContent: 'flex-end', alignSelf: 'flex-end', backgroundColor: '#6495ED', width: 90, height: 40, borderRadius: 10, marginTop: -15 }}>
                                                            <Text style={{ flex: 1, alignSelf: 'center', marginTop: 8, color: 'white', fontSize: 16, fontWeight: 'bold' }}>Order</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                    :
                                                    <View>
                                                        {this.state.isLoginShow && <LoginModel />}
                                                    </View>
                                                }
                                            </View>*/}
                                            <View style={{ flex: 1 }}>
                                                <TouchableOpacity
                                                    //   onPress={() => this._onPressButton(item)
                                                    onPress={() =>
                                                        this.state.checktoken ?
                                                            this.props.navigation.navigate('OrderService', { Id: item.id, Name: item.name, Price: item.price, Duration: item.duration, Avatar: item.avatar, Description: item.description }) :
                                                            this.setState({ isLoginShow: true })
                                                    }
                                                >
                                                    <View style={{ flex: 1, justifyContent: 'flex-end', alignSelf: 'flex-end', backgroundColor: '#6495ED', width: 90, height: 40, borderRadius: 10, marginTop: -15 }}>
                                                        <Text style={{ flex: 1, alignSelf: 'center', marginTop: 8, color: 'white', fontSize: 16, fontWeight: 'bold' }}>Order</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View>
                                                </View>
                                            </View>
                                        </View>

                                        <View style={{ borderTopWidth: 0.8, borderTopColor: 'grey', marginTop: 10, width: '100%' }}>
                                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                <View style={{ marginHorizontal: 3 }}><Text style={{ color: 'grey', fontSize: 16, }}> ⦿ </Text></View><Text style={{
                                                    marginHorizontal: 0,
                                                    textAlign: 'justify',
                                                    // marginTop: 20,
                                                    width: '93%',
                                                    minHeight: 10,
                                                    fontSize: 16,
                                                    color: '#848482',
                                                    lineHeight: 16 * 1.5,
                                                }}>{item.description}</Text>
                                            </View>
                                        </View>
                                        {/* <View style={{backgroundColor:'red', width:'50%', height:'50%'}}> 
                                        </View> */}
                                    </View>
                                </View>
                            )}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default ShopsPackageData;
