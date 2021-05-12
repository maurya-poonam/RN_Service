import React, { Component } from 'react'
import { Text, View, SafeAreaView, AsyncStorage, TouchableOpacity, ScrollView, Dimensions, Image, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { RadioButton } from 'react-native-paper';
import { makeRequest } from '../api/apiCall';
import APIConstant from '../api/apiConstant';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const maxWidth = Dimensions.get("window").width;
const imageHeight = (maxWidth / 16) * 9;
import TextInput from 'react-native-textinput-with-icons';
import RazorpayCheckout from 'react-native-razorpay';
import Toast from 'react-native-root-toast';

export class OrderServiceScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            CustName: '',
            CustEmail: '',
            mobileNo: '',
            addpayment: '',
            ShpName: '',
            ShpMobileNo: '',
            ShpEmail: '',
            ShpAddress: '',
            BillName: '',
            BillMobileNo: '',
            BillEmail: '',
            BillAddress: '',
            PaymentMethod: '',
            Id: this.props.route.params.Id,
            Name: this.props.route.params.Name,
            Price: this.props.route.params.Price,
            Duration: this.props.route.params.Duration,
            Avatar: this.props.route.params.Avatar,
            Description: this.props.route.params.description,
            ShopsPackageDetail: '',
            ServicePackageDetail: this.props.route.params.Iservice,
        }
    }

    _showToast = message => {
        Toast.show(message, {
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
            //backgroundColor: "orange",
            //textColor:'black'
        });
    }

    componentDidMount() {
        if (this.state.ServicePackageDetail == 'service') {
            this._CallGetServicePackageDetail();
        } else {
            this._CallGetShopsPackageDetail();
        }
        AsyncStorage.getItem('mobileNo').then((mobileNo) => {
            if (mobileNo != null) {
                 this._GetCustomerDeatil(mobileNo);
            }
            console.log('check mobile no', this.state.checkmobileNo);
        })
    }

    _GetCustomerDeatil = (mobileNo) => {
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
                        name: response.responsedata.name,
                        mobileNo: response.responsedata.mobileNo,
                        email: response.responsedata.email,
                    })
                    console.log('Customer data get :' + JSON.stringify(this.state.name));
                }
            })
            .catch(error => console.log('error : ' + error));
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
    _onPressButton(item) {
        // console.log('item', item);
        var options = {
            description: this.state.Description,
            image: this.state.Avatar,
            currency: 'INR',
            key: 'rzp_test_mQXICSOiiBtN6i',
            amount: this.state.Price * 100,
            name: this.state.Name,
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

    paymentCheck() {
        console.log("PM " + this.state.PaymentMethod)
        if (this.state.PaymentMethod == 'Online Payment') {
            //alert("you select online payment") //open razor pay here
            this._onPressButton();
        }
        else if (this.state.PaymentMethod == 'Cash On Delivery')
        this._showToast("you selected Cash On Delivery") //send data to server
        else
        this._showToast("please select any payment method") //display msg to user
    }

    render() {
        return (
            <View style={{ height: '100%', backgroundColor: '#f0f2f0', }}>
                <View style={{ flexDirection: 'row', height: 60, width: '100%', backgroundColor: 'black', }} >
                    <TouchableOpacity style={{ margin: 5, padding: 5, alignSelf: 'center' }}
                        onPress={() => this.props.navigation.goBack()}>
                        <Icon name="chevron-back" size={35} color="white" />
                    </TouchableOpacity>

                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 5, padding: 5, justifyContent: 'center', alignSelf: 'center' }}></Text>
                </View>
                <View style={{ flex: 1, height: '100%', borderRadius: 10, backgroundColor: 'white', margin: 10 }}>
                    <ScrollView>
                        <View style={{ margin: 10, padding: 10, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                            <RadioButton.Group
                                onValueChange={(addpayment) => this.setState({ addpayment: addpayment, PaymentMethod: addpayment })}
                                value={this.state.addpayment}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 10 }}>
                                    <View style={{ flexDirection: 'row' }} >
                                        <RadioButton value="Online Payment" />
                                        <Text style={{ marginTop: 8 }}>Online Payment</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }} >
                                        <RadioButton value="Cash On Delivery" />
                                        <Text style={{ marginTop: 8 }}>Cash On Delivery</Text>
                                    </View>
                                </View>
                            </RadioButton.Group>
                        </View>
                        <View style={{ margin: 5, padding: 5, }}>
                            <Text style={{ marginBottom: 10, fontSize: 20, fontWeight: 'bold' }}>Service Details</Text>
                            {/* <FlatList
                                data={this.state.ShopsPackageDetail}
                                ListEmptyComponent={<Text style={{ justifyContent: 'center', alignSelf: 'center' }}>No Data</Text>}
                                renderItem={({ item }) => (
                                    <View style={{ flex: 1 }}>
                                       <View style={{ flexDirection: 'row', width: '100%', borderBottomColor: 'lightgrey', borderBottomWidth: 1, }}>
                                <View style={{ width: '40%', height: 120, }}>
                                    <Image source={{ uri: 'https://www.callcentrehelper.com/images/stories/2019/01/feedback-art-sign-760.jpg' }} style={{ width: 150, height: 100, }} />
                                </View>
                                <View style={{ width: '60%', height: 100, marginTop: 5, }}>
                                    <View>
                                        <Text style={{ fontSize: 18 }}>Service name</Text>
                                        <Text style={{ color: 'grey', fontSize: 14, }}>₹ 100</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <MaterialCommunityIcons name='clock-outline' size={12} color={'grey'} style={{ marginTop: 3, justifyContent: 'flex-start' }} /><Text style={{ color: 'grey', fontSize: 14, }}> 60 min</Text>
                                    </View>
                                </View>
                            </View>
                                    </View>
                                )}
                                keyExtractor={item => item.id}
                                />*/}
                            <View style={{ flexDirection: 'row', width: '100%', borderBottomColor: 'lightgrey', borderBottomWidth: 1, }}>
                                <View style={{ width: '60%', height: 100, marginTop: 5, }}>
                                    <View>
                                        <Text style={{ fontSize: 18 }}>{this.state.Name}</Text>
                                        <Text style={{ color: 'grey', fontSize: 14, }}>₹ {this.state.Price}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <MaterialCommunityIcons name='clock-outline' size={12} color={'grey'} style={{ marginTop: 3, justifyContent: 'flex-start' }} /><Text style={{ color: 'grey', fontSize: 14, }}> {this.state.Duration} min</Text>
                                    </View>
                                </View>
                                <View style={{ width: '40%', height: 120, }}>
                                    <Image source={{ uri: this.state.Avatar }} style={{ width: 150, height: 100, }} />
                                </View>
                            </View>
                        </View>
                        <View style={{ margin: 5, padding: 5, }}>
                            <Text style={{ marginBottom: 10, fontSize: 20, fontWeight: 'bold' }}>Customer Details</Text>
                            <View style={{ flexDirection: 'row', width: '100%', borderBottomColor: 'lightgrey', borderBottomWidth: 1, }}>
                                <View style={{ height: 75, marginTop: 5, }}>
                                    <View>
                                        <Text style={{ color: 'grey', fontSize: 16 }}>Name : {this.state.name}</Text>
                                        <Text style={{ color: 'grey', fontSize: 16, }}>Mobile No. : {this.state.mobileNo}</Text>
                                        <Text style={{ color: 'grey', fontSize: 16, }}>Email :{this.state.email} </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ margin: 5, padding: 5, }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Shipping Details</Text>
                            <View style={{ width: '100%', borderBottomColor: 'lightgrey', borderBottomWidth: 1, }}>
                                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                                    <TextInput
                                        //containerWidth={500 / 2}
                                        noUnderline={true}
                                        labelColor={'black'}
                                        label="Enter name"
                                        underlineColor={'grey'}
                                        underlineActiveColor={'black'}
                                        labelActiveColor={'black'}
                                        value={this.state.ShpName}
                                        refrance={(refrance) => {
                                            this.input = refrance;
                                        }}
                                        onChangeText={(text) => this.setState({ ShpName: text })}
                                    />
                                </View>
                                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                                    <TextInput
                                        containerWidth={500 / 2}
                                        noUnderline={true}
                                        keyboardType="numeric"
                                        labelColor={'black'}
                                        label="Enter mobile number"
                                        underlineColor={'grey'}
                                        underlineActiveColor={'black'}
                                        labelActiveColor={'black'}
                                        value={this.state.ShpMobileNo}
                                        refrance={(refrance) => {
                                            this.input = refrance;
                                        }}
                                        onChangeText={(text) => this.setState({ ShpMobileNo: text })}
                                    />
                                </View>
                                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                                    <TextInput
                                        containerWidth={500 / 2}
                                        noUnderline={true}
                                        labelColor={'black'}
                                        label="Enter email"
                                        underlineColor={'grey'}
                                        underlineActiveColor={'black'}
                                        labelActiveColor={'black'}
                                        value={this.state.ShpEmail}
                                        refrance={(refrance) => {
                                            this.input = refrance;
                                        }}
                                        onChangeText={(text) => this.setState({ ShpEmail: text })}
                                    />
                                </View>
                                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                                    <TextInput
                                        containerWidth={500 / 2}
                                        noUnderline={true}
                                        labelColor={'black'}
                                        label="Enter address"
                                        underlineColor={'grey'}
                                        multiline={true}
                                        underlineActiveColor={'black'}
                                        labelActiveColor={'black'}
                                        value={this.state.ShpAddress}
                                        refrance={(refrance) => {
                                            this.input = refrance;
                                        }}
                                        onChangeText={(text) => this.setState({ ShpAddress: text })}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ margin: 5, padding: 5, }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Billing Details</Text>
                            <View style={{ width: '100%', borderBottomColor: 'lightgrey', borderBottomWidth: 1, }}>
                                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                                    <TextInput
                                        //containerWidth={500 / 2}
                                        noUnderline={true}
                                        labelColor={'black'}
                                        label="Enter name"
                                        underlineColor={'grey'}
                                        underlineActiveColor={'black'}
                                        labelActiveColor={'black'}
                                        value={this.state.BillName}
                                        refrance={(refrance) => {
                                            this.input = refrance;
                                        }}
                                        onChangeText={(text) => this.setState({ BillName: text })}
                                    />
                                </View>
                                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                                    <TextInput
                                        containerWidth={500 / 2}
                                        noUnderline={true}
                                        keyboardType="numeric"
                                        labelColor={'black'}
                                        label="Enter mobile number"
                                        underlineColor={'grey'}
                                        underlineActiveColor={'black'}
                                        labelActiveColor={'black'}
                                        value={this.state.BillMobileNo}
                                        refrance={(refrance) => {
                                            this.input = refrance;
                                        }}
                                        onChangeText={(text) => this.setState({ BillMobileNo: text })}
                                    />
                                </View>
                                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                                    <TextInput
                                        containerWidth={500 / 2}
                                        noUnderline={true}
                                        labelColor={'black'}
                                        label="Enter email"
                                        underlineColor={'grey'}
                                        underlineActiveColor={'black'}
                                        labelActiveColor={'black'}
                                        value={this.state.BillEmail}
                                        refrance={(refrance) => {
                                            this.input = refrance;
                                        }}
                                        onChangeText={(text) => this.setState({ BillEmail: text })}
                                    />
                                </View>
                                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                                    <TextInput
                                        containerWidth={500 / 2}
                                        noUnderline={true}
                                        labelColor={'black'}
                                        label="Enter address"
                                        underlineColor={'grey'}
                                        multiline={true}
                                        underlineActiveColor={'black'}
                                        labelActiveColor={'black'}
                                        value={this.state.BillAddress}
                                        refrance={(refrance) => {
                                            this.input = refrance;
                                        }}
                                        onChangeText={(text) => this.setState({ BillAddress: text })}
                                    />
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => { this.paymentCheck() }}>
                            <View style={{ margin: 10, padding: 10, justifyContent: 'center', alignSelf: 'center', height: 50, width: 150, backgroundColor: 'black', borderRadius: 10 }}>
                                <Text style={{ justifyContent: 'center', alignSelf: 'center', textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 18 }}>Continue</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ width: '100%', height: 50 }}>
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

export default OrderServiceScreen
