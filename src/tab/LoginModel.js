import React, { Component } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    Dimensions,
    View, SafeAreaView, ImageBackground, ToastAndroid, TouchableOpacity, BackHandler, Image, ScrollView, AsyncStorage, ActivityIndicator
} from "react-native";
import CountryPicker from 'rn-country-picker';
import TextInput from 'react-native-textinput-with-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import PhoneInput from "react-native-phone-number-input";
import { makeRequest } from '../api/apiCall';
import APIConstant from '../api/apiConstant';
const { width } = Dimensions.get('window')
var fixWidth = width / 1.7

export class LoginModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: true,
            mCountryCode: '91',
            phonenumber: '',
            loginPassword: '',
            isShowLoginPassword: true,
            name: '',
            mobilenumber: '',
            email: '',
            password: '',
            RegLogcheck: true,
            confirmPassword: '',
            isShowPassword: true,
            isConfirmPassword: true,
            loadingLogin: false,
            loadingSignIn: false,
        };
        this.validates = this.validates.bind(this);
    }
    handleClickfunction2() {
         this.props.handleClickfunction()
        // BackHandler.exitApp();
    }
    //async storage
    _storeAppData = async (data) => {
        try {
            await AsyncStorage.setItem(
                'accessToken',
                data.accessToken
            );
            await AsyncStorage.setItem(
                'refreshToken',
                data.refreshToken
            );

            await AsyncStorage.setItem(
                'mobileNo',
                JSON.stringify(data.responsedata.mobileNo)
            );
            // await AsyncStorage.setItem(
            //     'avatar',
            //     data.responsedata.avatar
            // );
            // await AsyncStorage.setItem(
            //     'mobileNo',
            //     data.responsedata.MobileNo
            // );
            // await AsyncStorage.setItem(
            //     'name',
            //     data.responsedata.name
            // );
            // await AsyncStorage.setItem(
            //     'age',
            //     data.responsedata.age
            // );
            // await AsyncStorage.setItem(
            //     'gender',
            //     data.responsedata.gender
            // );
            // await AsyncStorage.setItem(
            //     'city',
            //     data.responsedata.city
            // );
            // await AsyncStorage.setItem(
            //     'state',
            //     data.responsedata.state
            // );
            // await AsyncStorage.setItem(
            //     'email',
            //     data.responsedata.email
            // );
            // await AsyncStorage.setItem(
            //     'password',
            //     data.responsedata.password
            // );
        } catch (error) {
            console.log('error while store data : ' + error)
        } finally {
            this.setState({ modalVisible: false })
        }
    }

    // calling login API
    _callLogin = () => {
        let req = {
            MobileNo: this.state.phonenumber,
            Password: this.state.loginPassword,
        };
        console.log('Request :' + JSON.stringify(req))
        this.setState({
            loadingLogin: true
        })
        makeRequest(
            APIConstant.BASE_URL + APIConstant.LOGIN,
            'post',
            req
        )
            .then(response => {
                console.log(JSON.stringify(response));
                // this.setState({ isLoadingLogin: false });
                if (response.statusCode == 0) {
                    Alert.alert('Oppss...', response.statusMessage);
                } else {
                    debugger;
                    console.log('login success');
                    ToastAndroid.show('Login Successfully', ToastAndroid.SHORT);
                    // alert(response.statusMessage);
                    this._storeAppData(response);
                    console.log('login' + JSON.stringify(response));
                    this.setState({
                        modalVisible: false
                    })
                    this.handleClickfunction2()
                    // this._storeLoginData(response.responsedata);
                    // this.props.navigation.push('HomeApp');
                    debugger;
                }
                this.setState({ loadingLogin: false, })
            })
            .catch(error => console.log('error : ' + error));
    };

    // calling sign up api
    _callSignUp = () => {
        let req = {
            MobileNo: this.state.mobilenumber,
            Name: this.state.name,
            Password: this.state.password,
        };
        console.log('Request :' + JSON.stringify(req))

        this.setState({
            loadingSignIn: true
        })
        makeRequest(
            APIConstant.BASE_URL + APIConstant.SIGNUP,
            'post',
            req
        )
            .then(response => {
                console.log(JSON.stringify(response));
                // this.setState({ isLoadingLogin: false });
                if (response.statusCode == 0) {
                    Alert.alert('Oppss...', response.statusMessage);
                } else {
                    console.log('register success');
                    // alert(response.statusMessage);
                    // this.props.navigation.push('HomeApp');
                    this._storeAppData(response);
                    ToastAndroid.show('Register Successfully', ToastAndroid.SHORT);
                    this.setState({
                        mobilenumber: null,
                        name: null,
                        password: null,
                        confirmPassword: null,
                        modalVisible:false
                    })
                    // this._storeAppData(response);
                    // this._storeLoginData(response.responsedata);
                }
                this.setState({
                    loadingSignIn: false,
                    // modalVisible: false
                })
            })
            .catch(error => console.log('error : ' + error));
    };

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
        console.log(this.state.modalVisible)
    }

    _selectedValue = (index, value) => {
        this.setState({ mCountryCode: index });
        console.log('mCountryCode :' + index);
    };

    validates = () => {
        let reg = /^[6789]\d{9}$/;
        if (reg.test(this.state.phonenumber) === false) {
            this.setState({
                phoneError: 'Please enter valid Mobile Number',
            })
        }
        else {
            this.setState({
                phoneError: ''
            })
            if (this.state.loginPassword) {
                this.setState({
                    LoginpasswordError: ''
                })
                this._callLogin();
            } else {
                this.setState({
                    LoginpasswordError: 'Please enter valid password'
                });
            }
        }
    }

    // Sign up calling 
    _SignUpValidates = () => {
        let reg1 = /^[a-zA-z]+([\s][a-zA-Z]+)*$/;
        let reg = /^[6789]\d{9}$/;

        if (reg1.test(this.state.name) === false) {
            this.setState(() => ({ nameError: "Please enter valid Name" }));
        }
        else {
            this.setState(() => ({ nameError: '' }));
            if (reg.test(this.state.mobilenumber) === false) {
                this.setState({
                    mobileError: 'Please enter valid Mobile Number'
                })
                return false;
            }
            else {
                this.setState({
                    mobileError: ''
                })
                if (this.state.password) {
                    this.setState({
                        passwordError: ''
                    })
                    if (this.state.confirmPassword) {
                        this.setState({
                            c_passwordError: ''
                        })
                        if (this.state.confirmPassword) {
                            if (this.state.password === this.state.confirmPassword) {
                                this.setState(() => ({
                                    c_passwordError: ''
                                }));
                                this._callSignUp();
                            }
                            else {
                                this.setState(() => ({
                                    c_passwordError: 'Passwords did not match'
                                }));
                            }
                        }

                    } else {
                        this.setState({
                            c_passwordError: 'Please enter confirm password'
                        });
                    }
                } else {
                    this.setState({
                        passwordError: 'Please enter valid password'
                    });
                }
            }
        }
    }
    render() {
        const { modalVisible } = this.state;
        return (
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                         this.handleClickfunction2()
                        //BackHandler.exitApp();
                    }}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <View style={{
                            flex: 1,
                            backgroundColor: 'orange',

                        }}>
                            <Image source={require('../../res/logo.png')} resizeMode='contain' style={{ width: '30%', height: '20%', alignSelf: 'center', justifyContent: 'center', margin: 10 }} />
                            {
                                this.state.RegLogcheck
                                    ?
                                    <View style={{ flex: 1, width: '100%', backgroundColor: 'white', borderTopLeftRadius: 70, alignSelf: 'center', justifyContent: 'center', }}>
                                        <ScrollView>
                                            <View style={{ marginTop: '10%', justifyContent: 'center', alignSelf: 'center' }}>
                                                <Text style={styles.titleText}>Login</Text>
                                                <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'grey', width: fixWidth }}>
                                                    <View>
                                                        <CountryPicker
                                                            disable={false}
                                                            animationType={'slide'}
                                                            containerStyle={{
                                                               justifyContent: 'center',
                                                                marginTop: 20,
                                                            }}
                                                            pickerTitleStyle={styles.pickerTitleStyle}
                                                            dropDownImage={require('../../res/down.png')}
                                                            selectedCountryTextStyle={styles.selectedCountryTextStyle}
                                                            countryNameTextStyle={styles.countryNameTextStyle}
                                                            pickerTitle={'Country Picker'}
                                                            searchBarPlaceHolder={'Search......'}
                                                            hideCountryFlag={false}
                                                            hideCountryCode={false}
                                                            searchBarStyle={styles.searchBarStyle}
                                                            backButtonImage={require('../../res/back.png')}
                                                            searchButtonImage={require('../../res/search.png')}
                                                            countryCode={this.state.mCountryCode}
                                                            selectedValue={this._selectedValue}
                                                        />
                                                        {/* <PhoneInput
                                                            //  ref={phoneInput}
                                                            defaultValue={this.state.phonenumber}
                                                            defaultCode="IN"
                                                            layout="first"
                                                            onChangeText={(phonenumber) => this.setState({ phonenumber })
                                                            }
                                                            
                                                        //placeholder='Enter Mobile Number'
                                                        onChangeFormattedText={(phonenumber) => {
                                                          this.setState({ phonenumber})
                                                        }}
                                                        error={this.state.phoneError}
                                                        // withDarkTheme
                                                        // withShadow
                                                        // autoFocus
                                                        // containerStyle={{
                                                        // //  backgroundColor:'red',
                                                        //   height:50
                                                        // }}
                                                        // textContainerStyle={{
                                                        //  // backgroundColor:'green'
                                                        // }}

                                                        /> */}
                                                    </View>
                                                    <View style={{ marginLeft: 15 }}>
                                                        <TextInput
                                                            // leftIcon="call"
                                                            // leftIconType="MaterialIcons"
                                                            // leftIconSize={20}
                                                            // leftIconColor={'black'}
                                                            containerWidth={fixWidth / 2}
                                                            // containerWidth={100}
                                                            noUnderline={true}
                                                            keyboardType="numeric"
                                                            labelColor={'black'}
                                                            label="Enter mobile number"
                                                            underlineColor={'grey'}
                                                            underlineActiveColor={'black'}
                                                            labelActiveColor={'black'}
                                                            value={this.state.phonenumber}
                                                            refrance={(refrance) => {
                                                                this.input = refrance;
                                                            }}
                                                            onChangeText={(text) => this.setState({ phonenumber: text })}
                                                            error={this.state.phoneError}
                                                        />
                                                    </View>
                                                </View>
                                                {/* <TextInput
                                                    leftIcon="call"
                                                    leftIconType="MaterialIcons"
                                                    leftIconSize={20}
                                                    leftIconColor={'black'}
                                                    containerWidth={fixWidth}
                                                    // containerWidth={100}
                                                    //noUnderline={true}
                                                    keyboardType="numeric"
                                                    labelColor={'black'}
                                                    label="Enter mobile number"
                                                    underlineColor={'grey'}
                                                    underlineActiveColor={'black'}
                                                    labelActiveColor={'black'}
                                                    value={this.state.phonenumber}
                                                    refrance={(refrance) => {
                                                        this.input = refrance;
                                                    }}
                                                    onChangeText={(text) => this.setState({ phonenumber: text })}
                                                    error={this.state.phoneError}
                                                /> */}

                                            </View>
                                            <View style={{ marginTop: 10, alignSelf: 'center', width: fixWidth, }}>
                                                <TextInput
                                                    leftIcon="key"
                                                    leftIconType="material"
                                                    leftIconSize={20}
                                                    leftIconColor='black'
                                                    labelColor="black"
                                                    label="Enter your password"
                                                    underlineColor="grey"
                                                    underlineActiveColor="black"
                                                    labelActiveColor="black"
                                                    containerWidth={fixWidth}
                                                    // noUnderline={true}
                                                    secureTextEntry={this.state.isShowLoginPassword}
                                                    value={this.state.loginPassword}
                                                    refrance={(refrance) => {
                                                        this.input = refrance;
                                                    }}
                                                    onChangeText={(loginPassword) => this.setState({ loginPassword })}
                                                    rightIcon={
                                                        !this.state.isShowLoginPassword ? 'eye-off-outline' : 'eye-outline'
                                                    }
                                                    onPressRightIcon={() => this.setState({ isShowLoginPassword: !this.state.isShowLoginPassword })}
                                                    error={this.state.LoginpasswordError}
                                                    rightIconSize={20}
                                                    rightIconColor={'black'}
                                                />
                                            </View>
                                            <View style={{ backgroundColor: 'black', margin: 10, padding: 10, width: '60%', alignSelf: 'center', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, top: 5 }}>
                                                <TouchableOpacity onPress={this.validates}>
                                                    {this.state.loadingLogin ?
                                                        <ActivityIndicator size="small" color="#ffffff" />
                                                        :
                                                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', alignSelf: 'center', margin: 5 }}>Login</Text>

                                                    }
                                                </TouchableOpacity>
                                            </View>

                                            <View style={{ flexDirection: 'row', alignSelf: 'center', bottom: 10, marginTop: 15 }}>
                                                <Text style={{ fontSize: 16, fontWeight: 'normal' }}>Don't have an account ? </Text>
                                                <TouchableOpacity onPress={() => this.setState({
                                                    RegLogcheck: false
                                                })}>
                                                    <Text style={{ fontSize: 18, fontWeight: 'bold', bottom: 3 }}> Sign Up</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View>
                                                <TouchableOpacity onPress={() =>
                                                    this.setState({ modalVisible: false },()=>{this.handleClickfunction2()})
                                                    //  this.props.navigation.navigate('HomeApp')
                                                }>
                                                    <View style={{ marginTop: 10, backgroundColor: 'lightgrey', borderColor: 'white', borderWidth: 1, width: 70, height: 40, borderRadius: 20, justifyContent: 'center', alignSelf: 'center' }}>
                                                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'normal', alignSelf: 'center', margin: 5 }}>Skip</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </ScrollView>
                                    </View >
                                    :
                                    <View style={{ flex: 1, height: '100%', width: '100%', backgroundColor: 'white', borderTopLeftRadius: 70, }}>
                                        <ScrollView>
                                            <View style={{ marginTop: '10%', justifyContent: 'center', alignSelf: 'center', width: '60%', }}>
                                                <Text style={styles.titleText}>Sign Up</Text>
                                                <TextInput
                                                    leftIcon="person-circle"
                                                    leftIconType="ion"
                                                    leftIconSize={20}
                                                    leftIconColor='black'
                                                    labelColor="black"
                                                    label="Enter your name"
                                                    underlineColor="grey"
                                                    underlineActiveColor="black"
                                                    labelActiveColor="black"
                                                    containerWidth={fixWidth}
                                                    value={this.state.name}
                                                    refrance={(refrance) => {
                                                        this.input = refrance;
                                                    }}
                                                    onChangeText={(name) => this.setState({ name: name })}
                                                    error={this.state.nameError}
                                                />
                                                <TextInput
                                                    leftIcon="call"
                                                    leftIconType="MaterialIcons"
                                                    leftIconSize={20}
                                                    leftIconColor='black'
                                                    keyboardType="numeric"
                                                    labelColor="black"
                                                    label="Enter mobile number"
                                                    underlineColor="grey"
                                                    underlineActiveColor="black"
                                                    labelActiveColor="black"
                                                    containerWidth={fixWidth}
                                                    value={this.state.mobilenumber}
                                                    refrance={(refrance) => {
                                                        this.input = refrance;
                                                    }}
                                                    onChangeText={(mobilenumber) => this.setState({ mobilenumber })}
                                                    error={this.state.mobileError}
                                                />
                                                {/* <TextInput
                                                    leftIcon="device-mobile"
                                                    leftIconType="oct"
                                                    leftIconSize={20}
                                                    leftIconColor='black'
                                                    labelColor="black"
                                                    label="Enter your email"
                                                    underlineColor="grey"
                                                    underlineActiveColor="black"
                                                    labelActiveColor="black"
                                                    value={this.state.email}
                                                    refrance={(refrance) => {
                                                        this.input = refrance;
                                                    }}
                                                    onChangeText={(email) => this.setState({ email })}

                                                /> */}
                                                <TextInput
                                                    leftIcon="key"
                                                    leftIconType="material"
                                                    leftIconSize={20}
                                                    leftIconColor='black'
                                                    labelColor="black"
                                                    label="Enter your password"
                                                    underlineColor="grey"
                                                    underlineActiveColor="black"
                                                    labelActiveColor="black"
                                                    containerWidth={fixWidth}
                                                    secureTextEntry={this.state.isShowPassword}
                                                    value={this.state.password}
                                                    refrance={(refrance) => {
                                                        this.input = refrance;
                                                    }}
                                                    onChangeText={(password) => this.setState({ password })}
                                                    rightIcon={
                                                        !this.state.isShowPassword ? 'eye-off-outline' : 'eye-outline'
                                                    }
                                                    onPressRightIcon={() => this.setState({ isShowPassword: !this.state.isShowPassword })}
                                                    error={this.state.passwordError}
                                                    rightIconSize={20}
                                                    rightIconColor={'black'}
                                                />
                                                <TextInput
                                                    leftIcon="key"
                                                    leftIconType="material"
                                                    leftIconSize={20}
                                                    leftIconColor='black'
                                                    labelColor="black"
                                                    label="Enter your confirm password"
                                                    underlineColor="grey"
                                                    underlineActiveColor="black"
                                                    labelActiveColor="black"
                                                    containerWidth={fixWidth}
                                                    secureTextEntry={this.state.isConfirmPassword}
                                                    value={this.state.confirmPassword}
                                                    refrance={(refrance) => {
                                                        this.input = refrance;
                                                    }}
                                                    onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                                                    rightIcon={
                                                        !this.state.isConfirmPassword ? 'eye-off-outline' : 'eye-outline'
                                                    }
                                                    onPressRightIcon={() => this.setState({ isConfirmPassword: !this.state.isConfirmPassword })}
                                                    error={this.state.c_passwordError}
                                                    rightIconSize={20}
                                                    rightIconColor={'black'}
                                                />
                                            </View>
                                            <View style={{ backgroundColor: 'black', margin: 10, padding: 10, width: '60%', alignSelf: 'center', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, top: 5 }}>
                                                <TouchableOpacity onPress={this._SignUpValidates}>
                                                    {this.state.loadingSignIn ?
                                                        <ActivityIndicator size="small" color="#ffffff" />
                                                        :
                                                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', alignSelf: 'center', margin: 5 }}>Sign In</Text>
                                                    }
                                                </TouchableOpacity>
                                            </View>

                                            <View style={{ flexDirection: 'row', alignSelf: 'center', bottom: 10, marginTop: 15 }}>
                                                <Text style={{ fontSize: 16, fontWeight: 'normal' }}>Already have an account ? </Text>
                                                <TouchableOpacity onPress={() => this.setState({
                                                    RegLogcheck: true
                                                })}>
                                                    <Text style={{ fontSize: 18, fontWeight: 'bold', bottom: 3 }}> Sign In</Text>
                                                </TouchableOpacity>
                                            </View>
                                            {/* <View>
                                                <TouchableOpacity onPress={() =>
                                                    this.setState({ modalVisible: false })
                                                    //  this.props.navigation.navigate('HomeApp')
                                                }>
                                                    <Text style={{ color: 'black', fontSize: 20, fontWeight: 'normal', alignSelf: 'center', margin: 5 }}>Skip</Text>
                                                </TouchableOpacity>
                                            </View> */}
                                        </ScrollView>
                                    </View >
                            }
                        </View>
                    </SafeAreaView>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    centeredView: {
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    container: {
       flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    titleText: {
        fontSize: 28,
        fontWeight: 'bold',
        alignSelf: 'center',
        margin: 25
    },
    pickerTitleStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        fontWeight: 'bold',
        // flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#000',
    },
    pickerStyle: {
        padding: 10,
        margin: 10,
        borderColor: 'grey',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '40%',
        // marginLeft: '20%',
        //borderBottomWidth: 1.4,
    },
    selectedCountryTextStyle: {
        paddingLeft: 5,
        paddingRight: 5,
        color: '#000',
        textAlign: 'right',
    },
    countryNameTextStyle: {
        paddingLeft: 10,
        color: '#000',
        textAlign: 'right',
    },
    searchBarStyle: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        marginLeft: 8,
        marginRight: 10,
    },

});

export default LoginModel;
