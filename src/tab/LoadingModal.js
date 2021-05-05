import React, { Component } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    View, SafeAreaView, ImageBackground, TouchableOpacity, BackHandler, Image, ScrollView, AsyncStorage
} from "react-native";
import CountryPicker from 'rn-country-picker';
import TextInput from 'react-native-textinput-with-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import { makeRequest } from '../api/apiCall';
import APIConstant from '../api/apiConstant';

export class LoadingModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: true,
        };
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
                        // this.handleClickfunction2()
                        // BackHandler.exitApp();
                      }}>
                    <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ backgroundColor: 'orange', width: '100%', height: '100%', top: 0, bottom: 0, left: 0, right: 0, position: 'absolute', }}>
                   {/* <Text> {this.state.timer} </Text> */}
                   <Image source={require('../../res/logo.png')} resizeMode='center'
                       style={{ flex: 1, width: 200, height: 200, justifyContent: 'center', alignSelf: 'center', }}
                   />
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
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,

    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#F5FCFF',
    },
    titleText: {
        fontSize: 28,
        fontWeight: 'bold',
        alignSelf: 'center',
        top: '10%',
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

export default LoadingModel;
