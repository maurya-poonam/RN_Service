import React, { Component } from 'react'
import { Text, View, SafeAreaView, Dimensions, Alert, FlatList, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
const numColumns = 4;
const size = Dimensions.get('window').width / numColumns;
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Rating } from 'react-native-elements';
import ShopsPackageData from '../tab/ShopsPackageData'
import { makeRequest } from '../api/apiCall';
import APIConstant from '../api/apiConstant';
const maxWidth = Dimensions.get("window").width;
const imageHeight = (maxWidth / 16) * 9;

export class ServiceDetailScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                { id: 'a', value: 'Store 1', image: require("../../res/store1.jpg") },
                { id: 'b', value: 'Store 2', image: require("../../res/store2.jpg") },
                { id: 'c', value: 'Store 3', image: require("../../res/store3.jpg") },
                { id: 'd', value: 'Store 4', image: require("../../res/store4.jpg") },
                { id: 'e', value: 'Store 5', image: require("../../res/store5.jpg") },
                { id: 'f', value: 'Store 6', image: require("../../res/store6.jpg") },
                { id: 'g', value: 'Store 7', image: require("../../res/store7.jpg") },
                { id: 'h', value: 'Store 8', image: require("../../res/store8.jpg") },
                { id: 'h', value: 'Store 9', image: require("../../res/store9.jpg") },
                { id: 'h', value: 'Store 10', image: require("../../res/store10.jpg") },
            ],
            datalist: [
                { id: 'a', value: 'Service 1', rate: 'Rating 1', Rs: '200', image: require("../../res/stor1.jpg") },
                { id: 'b', value: 'Service 2', rate: 'Rating 1', Rs: '300', image: require("../../res/stor2.jpg") },
                { id: 'c', value: 'Service 3', rate: 'Rating 1', Rs: '400', image: require("../../res/stor3.jpg") },
                { id: 'd', value: 'Service 4', rate: 'Rating 1', Rs: '500', image: require("../../res/stor4.jpg") },
                { id: 'e', value: 'Service 5', rate: 'Rating 1', Rs: '600', image: require("../../res/stor5.jpg") },
            ],
            ServiceId: this.props.route.params.ServiceId,
            Location: this.props.route.params.Location,
            Name:this.props.route.params.Name,
            ShopsDetail: '',
        }
    }

    componentDidMount() {
        this._CallGetServicesDetail();
    }

    _CallGetServicesDetail = () => {
        const Data = {
            ServiceId: this.state.ServiceId,
            Location: this.state.Location,
        }
        makeRequest(
            APIConstant.BASE_URL + APIConstant.SHOPS,
            'post',
            Data
        ).then(response => {
            if (response.statusCode == 0) {
                Alert.alert('Oppss...', response.statusMessage);
            } else {
                this.setState({ ShopsDetail: response.responsedata })
                console.log('shopsdetail', this.state.ShopsDetail.list);
            }
        }).catch(error => {
            console.log('error: ' + error)
            Alert.alert('Oppss...', 'Something went wrong.');

        });
    }

    render() {
        const { ServiceId, Location, Name } = this.props.route.params;
        console.log('ServiceId', ServiceId);
        console.log('Location', Location);

        return (
            <SafeAreaView style={{ flex: 1 }}>
                {/* <CustomHeader title="Profile" isHome={true} navigation={this.props.navigation} /> */}
                <View style={{ height: '100%', backgroundColor: '#f0f2f0', }}>
                    <View style={{ flexDirection: 'row', height: 60, width: '100%', backgroundColor: 'black', }} >
                        <TouchableOpacity style={{ margin: 5, padding: 5, alignSelf: 'center' }}
                            onPress={() => this.props.navigation.goBack()}>
                            <Icon name="chevron-back" size={35} color="white" />
                        </TouchableOpacity>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 5, padding: 5, justifyContent: 'center', alignSelf: 'center' }}>{this.state.Name}</Text>
                    </View>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{flex: 1, height: '100%', borderRadius: 10, backgroundColor: 'white', margin: 10 }}>
                            <FlatList
                                data={this.state.ShopsDetail.list}
                                ListEmptyComponent={<Text style={{ justifyContent: 'center', alignSelf: 'center' }}>No Data</Text>}
                                renderItem={({ item }) => (
                                    <View style={{ flex: 1 }}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Shops Package Data', { Id: item.id, Name:item.name })}>
                                            <View style={{ flexDirection: 'row', margin: 10, borderRadius: 10 }}>
                                                <Image source={{ uri: item.avatar }} style={{ width: 100, height: 70, borderRadius: 10 }} />
                                                <View style={{ justifyContent: 'flex-start', alignSelf: 'flex-start', marginLeft: 10}}>
                                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'grey', marginLeft:3 }}>{item.name}</Text>
                                                    <Rating type={'star'} imageSize={10} style={{ color: 'black', marginRight: 100, marginLeft:3  }} />
                                                    <View style={{flexDirection:'row'}}><MaterialIcons name='location-pin' size={16} color={'grey'} style={{marginTop:3}} /><Text style={{ fontSize: 14, fontWeight: 'bold', color: 'grey', }}> {item.location}</Text></View>
                                                    <View style={{flexDirection:'row'}}><MaterialIcons name='call' size={16} color={'grey'} style={{marginTop:3}} /><Text style={{ fontSize: 14, fontWeight: 'bold', color: 'grey', }}> {item.mobileNo}</Text></View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                keyExtractor={item => item.id}
                            />
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

export default ServiceDetailScreen;
const styles = StyleSheet.create({
    itemContainer: {
        flex: 1 / 4,
        margin: 5,
        padding: 5,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    item: {
        fontSize: 12,
        alignSelf: 'center',
        justifyContent: 'center',
        margin: 5,
        textAlign: 'center',
    },
})