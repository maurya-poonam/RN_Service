import React, { Component } from 'react'
import { Text, View, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import ScrollableTabView from 'react-native-scrollable-tab-view';
var MaskTabBar = require('react-native-scrollable-tab-view-mask-bar');

export class FavoriteOrderScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    _ShopDetailData = () => {

    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, height: '100%', backgroundColor: '#f0f2f0', }}>
                <View style={{ flexDirection: 'row', height: 60, width: '100%', backgroundColor: 'black', }} >
                    <TouchableOpacity style={{ margin: 5, padding: 5, alignSelf: 'center' }}
                        onPress={() => this.props.navigation.goBack()}>
                        <Icon name="chevron-back" size={35} color="white" />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 5, padding: 5, justifyContent: 'center', alignSelf: 'center' }}></Text>
                </View>
                <ScrollView>
                    <View style={{ height: 50, marginLeft: 10, marginRight: 10, margin: 10 }}>
                        <Text style={{ justifyContent: 'center', alignSelf: 'center', fontWeight: 'bold', fontSize: 22, marginTop: 10 }}> Shops/Services</Text>
                    </View>
                    <View style={{ height: '100%', flexDirection: 'row', margin: 10, backgroundColor: 'white', borderRadius: 10 }}>
                        <View style={{ width: '50%', height: 50, backgroundColor: 'red' }}>
                            <Text style={{ color: 'white', marginTop: 10, textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Favorite Shops</Text>
                        </View>
                        <View style={{ width: '50%', height: 50, backgroundColor: 'yellow' }}>
                            <Text style={{ marginTop: 10, textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Favorite Service</Text>
                        </View>
                    </View>

                   

                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default FavoriteOrderScreen

const styles = StyleSheet.create({
    tabStyle: {},
    scrollStyle: {
        backgroundColor: 'white',
        paddingLeft: 65,
        paddingRight: 65,
        // justifyContent: 'center',
    },
    tabBarTextStyle: {
        fontSize: 14,
        fontWeight: 'normal',
    },
    underlineStyle: {
        height: 3,
        backgroundColor: 'red',
        borderRadius: 3,
        width: 15,
    },
});