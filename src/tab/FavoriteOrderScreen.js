import React, { Component } from 'react'
import { Text, View, SafeAreaView, ScrollView, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export class FavoriteOrderScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            changeBTN: 1,
            thumbnail: [
                {
                    id: 1,
                    image: require("../../res/stor1.jpg"),
                    title: 'shop 1',
                    text: 'text 1',
                },
                {
                    id: 2,
                    image: require("../../res/store10.jpg"),
                    title: 'shop 2',
                    text: 'text 2',
                },
                {
                    id: 3,
                    image: require("../../res/store9.jpg"),
                    title: 'shop 3',
                    text: 'text 3',
                },
                {
                    id: 4,
                    image: require("../../res/stor4.jpg"),
                    title: 'shop 4',
                    text: 'text 4',
                },
                {
                    id: 5,
                    image: require("../../res/stor3.jpg"),
                    title: 'shop 5',
                    text: 'text 5',
                },
                {
                    id: 6,
                    image: require("../../res/stor5.jpg"),
                    title: 'shop 6',
                    text: 'text 6',
                },
                {
                    id: 7,
                    image: require("../../res/store6.jpg"),
                    title: 'shop 7',
                    text: 'text 7',
                },
                {
                    id: 8,
                    image: require("../../res/stor5.jpg"),
                    title: 'shop 8',
                    text: 'text 8',
                },
            ],
            data: [
                { id: 'a', value: 'Service 1', text: 'text 1', image: require("../../res/s5.jpg") },
                { id: 'b', value: 'Service 2', text: 'text 2', image: require("../../res/s4.jpg") },
                { id: 'c', value: 'Service 3', text: 'text 3', image: require("../../res/s2.jpg") },
                { id: 'd', value: 'Service 4', text: 'text 4', image: require("../../res/houseclean.jpg") },
                { id: 'e', value: 'Service 5', text: 'text 5', image: require("../../res/Fridge.jpg") },
                { id: 'f', value: 'Service 6', text: 'text 6', image: require("../../res/cooking.jpg") },

            ],
        }
    }

    renderShop() {
        return (
            <View style={{ flex: 1, marginTop: 10 }}>
                {/* <FlatList/> */}
                <FlatList
                    data={this.state.thumbnail}
                    ListEmptyComponent={<Text style={{ justifyContent: 'center', alignSelf: 'center', }}>No Data</Text>}
                    renderItem={({ item }) => (
                        <View style={{ height: 80, width: '100%', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: 5, borderBottomColor: 'lightgrey', borderBottomWidth: 1, }}>
                            <TouchableOpacity onPress={() => console.log('call')}>
                                <View style={{ flexDirection: 'row', }}>
                                    <View>
                                        <Image
                                            source={item.image}
                                            style={{
                                                width: 50,
                                                height: 50,
                                                borderRadius: 50 / 2,
                                                overflow: "hidden",
                                                borderWidth: 0.3,
                                                justifyContent: 'center',
                                                alignSelf: 'center',
                                                // borderColor: 'grey',
                                                margin: 10,
                                                padding: 10,
                                                marginRight: 30,
                                                marginLeft: 30,
                                                marginTop: 10,

                                            }}
                                        />
                                    </View>
                                    <View style={{ justifyContent: 'flex-start', alignSelf: 'flex-start', flex: 1, margin: 5, padding: 5 }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', }}>{item.title}</Text>
                                        <Text style={{ fontSize: 14, color: 'grey', marginTop: 3 }}>{item.text}</Text>
                                    </View>
                                    <View style={{ justifyContent: 'flex-end', alignSelf: 'flex-end', marginRight: 25, bottom: 30 }}>
                                        <MaterialIcons name="keyboard-arrow-right" size={30} color="grey" />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        )
    }
    renderService() {
        return (
            <View style={{ flex: 1, marginTop: 10 }}>
                {/* <FlatList/> */}
                <FlatList
                    data={this.state.data}
                    ListEmptyComponent={<Text style={{ justifyContent: 'center', alignSelf: 'center', }}>No Data</Text>}
                    renderItem={({ item }) => (
                        <View style={{ height: 80, width: '100%', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: 5, borderBottomColor: 'lightgrey', borderBottomWidth: 1, }}>
                            <TouchableOpacity onPress={() => alert('call')}>
                                <View style={{ flexDirection: 'row', }}>
                                    <View>
                                        <Image
                                            source={item.image}
                                            style={{
                                                width: 50,
                                                height: 50,
                                                borderRadius: 50 / 2,
                                                overflow: "hidden",
                                                //borderWidth: 0.6,
                                                justifyContent: 'center',
                                                alignSelf: 'center',
                                                //borderColor: 'grey',
                                                margin: 10,
                                                padding: 10,
                                                marginRight: 30,
                                                marginLeft: 30,
                                                marginTop: 10,

                                            }}
                                        />
                                    </View>
                                    <View style={{ justifyContent: 'flex-start', alignSelf: 'flex-start', flex: 1, margin: 5, padding: 5 }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', }}>{item.value}</Text>
                                        <Text style={{ fontSize: 14, color: 'grey', marginTop: 3 }}>{item.text}</Text>
                                    </View>
                                    <View style={{ justifyContent: 'flex-end', alignSelf: 'flex-end', marginRight: 25, bottom: 30 }}>
                                        <MaterialIcons name="keyboard-arrow-right" size={30} color="grey" />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        )
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f2f0', }}>
                <View style={{ flexDirection: 'row', height: 60, width: '100%', backgroundColor: 'black', }} >
                    <TouchableOpacity style={{ margin: 5, padding: 5, alignSelf: 'center' }}
                        onPress={() => this.props.navigation.goBack()}>
                        <Icon name="chevron-back" size={35} color="white" />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 5, padding: 5, justifyContent: 'center', alignSelf: 'center' }}>Favorite orders</Text>
                </View>
                <ScrollView>
                    <View style={{ flex: 1, margin: 10, elevation: 1 }}>
                        <View style={{ marginBottom: 15 }}>
                            <Image source={require('../../res/banner.jpg')} style={{ height: 150, width: '100%',}} />
                        </View>
                        <View style={{ flexDirection: 'row', height: 50, backgroundColor: 'white', }}>
                            <TouchableOpacity onPress={() => { this.setState({ changeBTN: 1 }) }} style={{ flex: 1, borderBottomColor: this.state.changeBTN === 1 ? 'orange' : 'white', borderBottomWidth: 2 }} ><Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginTop: 10, color: this.state.changeBTN === 1 ? 'orange' : 'black' }} >Favorite Shops </Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.setState({ changeBTN: 2 }) }} style={{ flex: 1, borderBottomColor: this.state.changeBTN === 1 ? 'white' : 'orange', borderBottomWidth: 2 }}><Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginTop: 10, color: this.state.changeBTN === 1 ? 'black' : 'orange' }}>Favorite Service</Text></TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', height: 5, backgroundColor: '#f2f2f2', }}>
                        </View>
                        <View style={{ flex: 1, backgroundColor: 'white', }}>
                            {this.state.changeBTN == 1 && this.renderShop()}
                            {this.state.changeBTN == 2 && this.renderService()}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default FavoriteOrderScreen

