import React, { Component } from 'react'
import { Text, View, SafeAreaView, Image, ToastAndroid, Picker, TouchableOpacity, Alert, AsyncStorage, StyleSheet, Dimensions, ScrollView, } from 'react-native';
import { CustomHeader } from '../index';
import LoginModel from './LoginModel';
import { CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TextInput from 'react-native-textinput-with-icons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-datepicker'
import ImagePicker from 'react-native-image-picker';
import { RadioButton } from 'react-native-paper';
import { makeRequest } from '../api/apiCall';
import APIConstant from '../api/apiConstant';
import SelectPicker from 'react-native-form-select-picker'

import AllState from '../tab/AllState';
const window = Dimensions.get('window');
const { width, height } = window;
import axios from 'react-native-axios'
import Toast from 'react-native-root-toast';
import { colors } from 'react-native-elements';
export class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checktoken: '',
            isLoginShow: false,
            mobileNo: '',
            name: '',
            dateOfBirth: '',
            gender: '',
            city: '',
            state: '',
            email: '',
            ImageSource: '',
            checkmobileNo: '',
            ImagePath: '',
            Imagedata: '',
            ImageCheck: '',
            ImageType: '',
            ImageName: '',
            tempImage: '',
            textDisable: true,
            AllStateCheck: AllState.cities,
            allState: [
                {
                    value: 1,
                    label: 'Andhra Pradesh',
                },
                {
                    value: 2,
                    label: 'Arunachal Pradesh',
                },
                {
                    value: 3,
                    label: 'Assam',
                },
                {
                    value: 4,
                    label: 'Bihar',
                },
                {
                    value: 5,
                    label: 'Chhattisgarh',
                },
                {
                    value: 6,
                    label: 'Goa',
                },
                {
                    value: 7,
                    label: 'Gujarat',
                },
                {
                    value: 8,
                    label: 'Haryana',
                },
                {
                    value: 9,
                    label: 'Himachal Pradesh',
                },
                {
                    value: 10,
                    label: 'Jammu and Kashmir',
                },
                {
                    value: 11,
                    label: 'Jharkhand',
                },
                {
                    value: 12,
                    label: 'Karnataka',
                },
                {
                    value: 13,
                    label: 'Kerala',
                },
                {
                    value: 14,
                    label: 'Madhya Pradesh',
                },
                {
                    value: 15,
                    label: 'Maharashtra',
                },
                {
                    value: 16,
                    label: 'Manipur',
                },
                {
                    value: 17,
                    label: 'Meghalaya',
                },
                {
                    value: 18,
                    label: 'Mizoram',
                },
                {
                    value: 19,
                    label: 'Nagaland',
                },
                {
                    value: 20,
                    label: 'Odisha',
                },
                {
                    value: 21,
                    label: 'Punjab',
                },
                {
                    value: 22,
                    label: 'Rajasthan',
                },
                {
                    value: 23,
                    label: 'Sikkim',
                },
                {
                    value: 24,
                    label: 'Tamil Nadu',
                },
                {
                    value: 25,
                    label: 'Telangana',
                },
                {
                    value: 26,
                    label: 'Tripura',
                },
                {
                    value: 27,
                    label: 'Uttar Pradesh',
                },
                {
                    value: 28,
                    label: 'Uttarakhand',
                },
                {
                    value: 29,
                    label: 'West Bengal',
                }
            ]
        }
        this.handleClick = this.handleClick.bind(this);
        this._UpdateProfileDatavalidation = this._UpdateProfileDatavalidation.bind(this);
    }
    handleClick() {
        this.setState({
            isLoginShow: !this.state.isLoginShow
        })
        this.props.navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: 'HomeApp' },
                ],
            })
        );
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
                        mobileNo: response.responsedata.mobileNo,
                        name: response.responsedata.name,
                        dateOfBirth: response.responsedata.dateOfBirth,
                        gender: response.responsedata.gender,
                        city: response.responsedata.city,
                        state: response.responsedata.state,
                        email: response.responsedata.email,
                        tempImage: response.responsedata.avatar,
                    })
                    console.log('profile data get :' + JSON.stringify(mobileNo));
                    console.log('get image name :' + JSON.stringify(response.responsedata.avatar));
                    console.log('selected state: ' + response.responsedata.state)
                    console.log('selected  city: ' + response.responsedata.city)
                }
            })
            .catch(error => console.log('error : ' + error));
    }

    _UpdateProfileDatavalidation = async () => {
        let reg1 = /^[a-zA-z]+([\s][a-zA-Z]+)*$/;
        let reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (reg1.test(this.state.name) === false) {
            this.setState({
                nameError: 'Please enter valid name',
            })
        }
        else {
            this.setState({
                nameError: ''
            })
            if (reg.test(this.state.email) === false) {
                this.setState({
                    emailError: 'Please enter valid email'
                })
            } else {
                this.setState({
                    emailError: ''
                });

                // if (this.state.gender == 'Male') {
                //     this.setState({
                //         genderError: 'Please select an option'
                //     })
                // } else if (this.state.gender == 'Female') {
                //     this.setState({
                //         genderError: 'Please select an option'
                //     })
                // }
                // else {
                //     this.setState({
                //         genderError: ''
                //     })
                // }
                this._CallUpdateProfileData();
            }
        }
    }

    _CallUpdateProfileData = async () => {
        const data = new FormData();
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data;'
        }
        if (this.state.ImageSource != this.state.tempImage)
            data.append('avatar', {
                uri: this.state.ImageSource.replace('file://', ''),
                type: this.state.ImageType,
                name: this.state.ImageName
            });
        console.log('form data' + JSON.stringify(data));
        data.append('mobileNo', this.state.mobileNo);
        data.append('Name', this.state.name);
        if (this.state.dateOfBirth == null) { null } else { data.append('DateOfBirth', this.state.dateOfBirth); }
        data.append('Gender', this.state.gender);
        data.append('City', this.state.city);
        data.append('State', this.state.state);
        // if (this.state.email == null) { null } else { data.append('Email', this.state.email); }
        data.append('email', this.state.email);

        console.log('Request :' + JSON.stringify(data));
        makeRequest(
            APIConstant.BASE_URL + APIConstant.PROFILE,
            'post',
            data
        ).then(response => {
            console.log(JSON.stringify(response));
            if (response.statusCode == 0) {
                Alert.alert('Oppss...', response.statusMessage);
            } else {
                console.log('Profile update success', response);
                //this._UpdateProfileDatavalidation();
                ToastAndroid.show('Profile Update Successfully', ToastAndroid.SHORT);
                this.props.navigation.goBack();
            }
            this.setState({
                loadingSignIn: false
            })
        })
            .catch(error => console.log('error : ' + error));
    }

    _ProfileImagePicker = () => {
        let options = {
            title: 'Select Profile Image',
            storageOptions: {
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                //const source = { uri: response.uri };
                this.setState({
                    ImageSource: response.uri,
                    ImagePath: response.path,
                    Imagedata: response.data,
                    ImageType: response.type,
                    ImageName: response.fileName
                });
                console.log('uri :', response.uri);
                console.log('Path :', response.path);
                console.log('type image :', response.type);
                console.log('name image :', response.fileName);
            }
        });
    }

    render() {
        var tampvalue = []
        if (this.state.state != '')
            if (this.state.state) {
                this.state.AllStateCheck.map((a) => {
                    if (a.state == this.state.state)
                        tampvalue.push(a)
                })
                //  console.log("temp " + tampvalue)
            }
        const { width } = Dimensions.get('window')
        var fixWidth = width / 1.5

        //console.log("city "+this.state.AllStateCheck[0].name)
        return (
            <View style={{ flex: 1, }}>
                { this.state.isLoginShow && <LoginModel />}
                {this.state.checktoken != null ?
                    <View style={{ flex: 1 }}>
                        <View style={{
                            position: 'absolute',
                            right: - width * 0.5,
                            top: - width * 1.4,
                            height: width * 2,
                            width: width * 2,
                            borderBottomLeftRadius: width,
                            borderBottomRightRadius: width,
                            backgroundColor: 'black',
                            // elevation: 20,
                        }}>
                        </View>
                        {/* {this.state.checktoken != null ? */}

                        {/* :
                            <TouchableOpacity style={{ flex: 1, width: '50%', height: 50, backgroundColor: 'green', justifyContent: 'center', alignSelf: 'center' }}
                                onPress={() => {
                                    this.handleClick()
                                }}
                            >
                                <Text style={{ textAlign: 'center', color: 'white', }}>Login</Text>
                            </TouchableOpacity>
                        } */}
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 28, justifyContent: 'flex-start', alignSelf: 'flex-start', marginVertical: 25, paddingVertical: 25, margin: 10 }}>Edit Profile</Text>
                        <View style={{ margin: 10, backgroundColor: 'white', height: '65%', width: '90%', borderRadius: 20, alignSelf: 'center', bottom: '3%', elevation: 15 }}>

                            <Image source={{ uri: this.state.ImageSource }} style={{
                                width: 150,
                                height: 150,
                                borderRadius: 150 / 2,
                                overflow: "hidden",
                                borderWidth: 0.8,
                                justifyContent: 'center',
                                alignSelf: 'center',
                                borderColor: 'grey',
                                marginTop: -75
                            }} />

                            <TouchableOpacity onPress={() => this._ProfileImagePicker()} style={{ justifyContent: 'center', alignSelf: 'center', bottom: 25, left: 30 }}>
                                <Icon name="camera" size={40} color={'darkgrey'} />
                            </TouchableOpacity>
                            {/* <View style={{ borderWidth: 0.6, borderColor: 'grey', width: '90%', margin: 10, justifyContent: 'center', alignSelf: 'center' }}></View> */}
                            <ScrollView>
                                <View style={{ alignSelf: 'center', justifyContent: 'center', width: fixWidth }}>
                                    <TextInput
                                        containerWidth={fixWidth}
                                        editable={false}
                                        leftIcon="mobile-phone"
                                        leftIconType="awesome"
                                        leftIconSize={20}
                                        leftIconColor='black'
                                        keyboardType="numeric"
                                        labelColor="black"
                                        label="Enter mobile number"
                                        underlineColor="grey"
                                        underlineActiveColor="black"
                                        labelActiveColor="black"
                                        value={this.state.mobileNo}
                                        refrance={(refrance) => {
                                            this.input = refrance;
                                        }}
                                        onChangeText={(mobileNo) => this.setState({ mobileNo: mobileNo })}
                                        onEndEditing={() => this.setState({ textDisable: false })}

                                    />
                                    <TextInput
                                        containerWidth={fixWidth}
                                        leftIcon="person-circle"
                                        leftIconType="ion"
                                        leftIconSize={20}
                                        leftIconColor='black'
                                        labelColor="black"
                                        label="Enter your name"
                                        underlineColor="grey"
                                        underlineActiveColor="black"
                                        labelActiveColor="black"
                                        value={this.state.name}
                                        refrance={(refrance) => {
                                            this.input = refrance;
                                        }}
                                        onChangeText={(name) => this.setState({ name: name })}
                                        error={this.state.nameError}
                                    />
                                    <TextInput
                                        containerWidth={fixWidth}
                                        leftIcon="mail"
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
                                        error={this.state.emailError}
                                    />
                                    <View style={{ flexDirection: 'row', marginTop: 5, width: fixWidth, borderBottomColor: 'grey', borderBottomWidth: 1 }}>
                                        <MaterialCommunityIcons name="city-variant" size={20} style={{ marginTop: 10, justifyContent: 'flex-start', alignSelf: 'flex-start', }} />
                                        <SelectPicker
                                            onValueChange={(state) => {
                                                this.setState({ state: state })
                                            }}
                                            placeholder={this.state.state || 'Select your State'}
                                            placeholderStyle={{ color: 'black' }}
                                        // selected={this.state.state}
                                        // selected={this.state.state!=null?this.state.state.toString():""}
                                        >
                                            {Object.values(this.state.allState).map(({ label, index }) => (
                                                <SelectPicker.Item selected={this.state.state == index} label={label} value={label} key={index}
                                                // error={this.state.stateError}
                                                />
                                            ))}
                                        </SelectPicker>
                                    </View>

                                    {tampvalue && <View style={{ flexDirection: 'row', marginTop: 5, borderBottomColor: 'grey', borderBottomWidth: 1, width: fixWidth }}>
                                        <MaterialCommunityIcons name="city" size={20} style={{ marginTop: 10, justifyContent: 'flex-start', alignSelf: 'flex-start', }} />
                                        <SelectPicker
                                            onValueChange={(city) => {
                                                this.setState({ city: city })
                                            }}
                                            placeholder={this.state.city || 'Select your city'}
                                            placeholderStyle={{ color: 'black' }}
                                        // selected={this.state.city}
                                        >
                                            {Object.values(tampvalue).map(({ name, index }) => (
                                                <SelectPicker.Item selected={this.state.city == index} label={name} value={name} key={index} />
                                            ))}
                                        </SelectPicker>
                                    </View>}
                                    <View style={{ marginTop: 10, borderBottomWidth: 1, borderBottomColor: 'grey', width: fixWidth, }}>
                                        <RadioButton.Group onValueChange={(gender) => this.setState({ gender: gender })} value={this.state.gender}
                                        >
                                            {/* <Text>{this.state.genderError}</Text> */}
                                            <View style={{ flexDirection: 'row' }}>
                                                <MaterialCommunityIcons name='face' size={20} style={{ marginTop: 8 }} />
                                                {/* <Text style={{ marginTop: 8, margin: 5 }}>Gender</Text> */}
                                                <RadioButton value="male" />
                                                <Text style={{ marginTop: 8 }}>Male</Text>
                                                <RadioButton value="female" />
                                                <Text style={{ marginTop: 8 }}>Female</Text>
                                            </View>
                                        </RadioButton.Group>
                                    </View>
                                    <View style={{ flexDirection: 'row', borderBottomColor: 'grey', borderBottomWidth: 1, width: fixWidth, height: 62 }}>
                                        <View style={{ width: '20%', marginTop: 20, marginLeft: 4, }}>
                                            <Text style={{ fontSize: 18, }}>D.O.B</Text>
                                        </View>
                                        <View style={{ width: '80%', }}>
                                            <DatePicker
                                                date={this.state.dateOfBirth}
                                                mode="date"
                                                placeholder={"Select Birth Date"}
                                                format="YYYY-MM-DD"
                                                maxDate={new Date()}
                                                // minDate={new Date()}
                                                confirmBtnText="Confirm"
                                                cancelBtnText="Cancel"
                                                showIcon={true}
                                                iconComponent={<MaterialIcons name={'date-range'} style={{ fontSize: 22, color: 'grey', marginRight: 10 }} />}
                                                customStyles={{
                                                    placeholderText: {
                                                        fontSize: 15,
                                                        color: 'black'
                                                    },
                                                    dateText: {
                                                        fontSize: 17,
                                                        color: 'black'
                                                    },
                                                    // dateIcon: {
                                                    //     position: 'absolute',
                                                    //     left: 0,
                                                    //     top: 4,
                                                    //     marginLeft: 0
                                                    // },
                                                    // dateInput: {
                                                    //     marginLeft: 36
                                                    // },
                                                }}
                                                onDateChange={(dateOfBirth) => this.setState({ dateOfBirth: dateOfBirth })}
                                                style={{ width: '70%', marginTop: 15 }}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={{ width: '100%', height: 50 }}></View>
                            </ScrollView>
                        </View>
                        <View style={{ flexDirection: 'row', bottom: 5, width: '100%', paddingHorizontal: 15 }}>
                            <View style={{
                                backgroundColor: 'white',
                                borderColor: 'lightgrey',
                                borderWidth: 1,
                                alignSelf: 'flex-start',
                                justifyContent: 'flex-start',
                                height: 50,
                                width: '20%',
                                // marginHorizontal:35,
                                margin: 10,
                                padding: 5,
                                borderRadius: 10,

                            }}>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.goBack()}>
                                    <Icon name='arrow-back' size={22} style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 7 }} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={this._UpdateProfileDatavalidation}
                                style={{
                                    backgroundColor: '#4287f5',
                                    alignSelf: 'flex-end',
                                    justifyContent: 'flex-end',
                                    height: 50,
                                    width: '70%',
                                    margin: 10,
                                    padding: 5,
                                    borderRadius: 10,
                                }}>
                                <Text style={{ justifyContent: 'center', alignSelf: 'center', fontSize: 22, color: 'white', bottom: 5 }}>SAVE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View style={{ flex: 1, backgroundColor: '#f0f2f0', height: '100%', width: '100%' }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.handleClick()
                            }}>
                            <Text style={{ textAlign: 'center', color: 'black', marginTop: 10 }}>Login</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        );
    }
}

export default ProfileScreen
