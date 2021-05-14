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
var Spinner = require('react-native-spinkit');

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
                            <Image source={require('../../res/logo6.png')} resizeMode='center'
                                style={{ width: '70%', height: '75%', justifyContent: 'center', alignSelf: 'center',}}
                            />
                            <Spinner style={{ position: 'absolute', justifyContent:'center',alignSelf:'center',alignItems: 'center', height: '100%', width: '20%', marginBottom: 30 }} isVisible={true} size={30} type={'Circle'} color={'#0c389f'} />
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
    }

});

export default LoadingModel;
