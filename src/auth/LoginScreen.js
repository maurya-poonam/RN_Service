import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, ScrollView, SafeAreaView, Image } from 'react-native';
import CountryPicker from 'rn-country-picker';
import TextInput from 'react-native-textinput-with-icons';

export class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mCountryCode: '91',
            phonenumber: '',
        };
    }

    _selectedValue = (index, value) => {
        this.setState({ mCountryCode: index });
        console.log('mCountryCode :' + index);
    };

    _valueput = (value) => {
        this.setState({ phonenumber: value });
        console.log('phonenumber :' + value);
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'black'
                }}>
                    <Image source={require('../../res/service2.png')} style={{ width: 150, height: 150, resizeMode: 'cover', marginTop: '50%', bottom: 15 }} />
                    <View style={{ height: '100%', width: '100%', backgroundColor: 'white', top: '0%', borderTopLeftRadius: 70, }}>
                            <Text style={styles.titleText}>Login</Text>
                            <View style={{ marginTop: '25%', }}>
                                <CountryPicker
                                    disable={false}
                                    animationType={'slide'}
                                    containerStyle={styles.pickerStyle}
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
                            </View>
                            <View style={{ marginTop: 10, alignSelf: 'center', width: '60%', }}>
                                <TextInput
                                    keyboardType="numeric"
                                    labelColor="black"
                                    label="Enter mobile number"
                                    underlineColor="grey"
                                    underlineActiveColor="black"
                                    labelActiveColor="black"
                                    value={this.state.phonenumber}
                                    refrance={(refrance) => {
                                        this.input = refrance;
                                    }}
                                    onChangeText={this._valueput}
                                    maxLength={10}
                                />
                            </View>

                            <View style={{ backgroundColor: 'black', margin: 10, padding: 10, width: '60%', alignSelf: 'center', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, top: 5 }}>
                                <TouchableOpacity>
                                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', alignSelf: 'center', margin: 5 }}>Login</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ top: '10%' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('HomeApp')}>
                                    <Text style={{ color: 'black', fontSize: 20, fontWeight: 'normal', alignSelf: 'center', margin: 5 }}>Skip</Text>
                                </TouchableOpacity>
                            </View>
                        
                    </View >
                </View>
            </SafeAreaView>
        );
    }
}

export default LoginScreen;
const styles = StyleSheet.create({
    titleText: {
        fontSize: 28,
        fontWeight: 'bold',
        alignSelf: 'center',
        top: '8%',
    },
    pickerTitleStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        fontWeight: 'bold',
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#000',
    },
    pickerStyle: {
        // top: 1,
        padding: 10,
        margin: 10,
        //borderWidth: 1,
        borderColor: 'grey',
        justifyContent: 'space-between',
        alignSelf: 'center',
        width: '60%',
        // backgroundColor:'lime'
        borderBottomWidth: 1.3,


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