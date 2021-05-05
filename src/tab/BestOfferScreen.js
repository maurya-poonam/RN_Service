import React, { Component } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, AsyncStorage, Alert, Dimensions, FlatList, Image, ScrollView, Button, StyleSheet, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { makeRequest } from '../api/apiCall';
import APIConstant from '../api/apiConstant';
const maxWidth = Dimensions.get("window").width;
const imageHeight = (maxWidth / 16) * 9;

export class BestOfferScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thumbnail: [
                {
                    id: 1,
                    image: require("../../res/acImage.jpg"),
                    title: 'Salon for Men',
                    text: 'Flat ₹100 off',
                    imagesrc: require("../../res/salonmenimage.jpg")
                },
                {
                    id: 2,
                    image: require("../../res/cooking.jpg"),
                    title: 'Salon at home for Women',
                    text: 'Up to 50% off',
                    imagesrc: require("../../res/salonwomenimage.jpg"),
                },
                {
                    id: 3,
                    image: require("../../res/Fridge.jpg"),
                    title: 'House Cleaning',
                    text: 'Flat 50% Off',
                    imagesrc: require("../../res/houseclean.jpg")
                },
                {
                    id: 4,
                    image: require("../../res/abc.jpg"),
                    title: 'Bathroom Cleaning',
                    text: 'Up to 40% off',
                    imagesrc: require("../../res/bathroom.jpg")
                },
                {
                    id: 5,
                    image: require("../../res/xyz.jpg"),
                    title: 'Sofa Cleaning',
                    text: 'Up to 50% off',
                    imagesrc: require("../../res/sofaclean.jpg")
                },
            ],
        }
    }

    render() {
        return (
            <View style={{ height: '100%', backgroundColor: '#f0f2f0', }}>

                <View style={{ flexDirection: 'row', height: 60, width: '100%', backgroundColor: 'black', }} >
                    <TouchableOpacity style={{ margin: 5, padding: 5, alignSelf: 'center' }}
                        onPress={() => this.props.navigation.goBack()}>
                        <Icon name="chevron-back" size={35} color="white" />
                    </TouchableOpacity>

                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 5, padding: 5, justifyContent: 'center', alignSelf: 'center' }}>Best Offer</Text>
                </View>
                <ScrollView>
                    <View style={{ flex: 1, height: '100%', backgroundColor: 'white', margin: 10 }}>
                        <Text style={{ margin: 5, padding: 5, fontSize: 20, fontWeight: 'bold' }}>Best Offer</Text>
                        <Text style={{ margin: 5, padding: 5, bottom: 10, color: 'grey' }}>Hygienic & single-use products | low-contact</Text>
                        <View style={{ alignContent: 'center' }}>
                            <FlatList
                                data={this.state.thumbnail}
                                renderItem={({ item }) => (
                                    <View style={{ width: '100%', flex: 1 / 2, alignItems: 'center' }}>
                                        <View style={{ flex: 1 }}>
                                            <Image
                                                style={{ width: 200, height: 150, borderRadius: 10 }}
                                                source={item.imagesrc}
                                                resizeMode={'contain'}
                                            />
                                        </View>
                                        <View style={{ flex: 1, bottom: '5%', alignSelf: 'flex-start', marginLeft: 15 }}>
                                            <Text style={{ color: 'black', fontSize: 16, }}>{item.title}</Text>
                                            <Text style={{ color: 'grey', }}>{item.text}</Text>
                                        </View>
                                    </View>
                                )}
                                keyExtractor={item => item.id}
                                numColumns={2}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default BestOfferScreen
