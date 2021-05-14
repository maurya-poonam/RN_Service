import React, { Component } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, ImageBackground, FlatList, BackHandler, Alert, ScrollView, StyleSheet, Dimensions, Image, AsyncStorage, ActivityIndicator } from 'react-native';
import Toast from 'react-native-root-toast';
import Carousel, { Pagination } from "react-native-snap-carousel";
import SearchBar from "react-native-dynamic-search-bar";
import Icon from 'react-native-vector-icons/Ionicons';
import ServiceDetailScreen from '../tab/ServiceDetailScreen';
import LoginModel from './LoginModel';
import LoadingModel from './LoadingModal';
import { CommonActions } from '@react-navigation/native';
import { makeRequest } from '../api/apiCall';
import APIConstant from '../api/apiConstant';
var extipAppCount = 0;
const maxWidth = Dimensions.get("window").width;
const imageHeight = (maxWidth / 16) * 9;
// const { width } = Dimensions.get("window");
const numColumns = 5;
const size = Dimensions.get('window').width / numColumns;
import axios from 'axios';

export class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: 3,
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
            loginModalCheck: false,
            appLoading: true,
            activeSlide: 0,
            country: 'uk',
            data: [
                { id: 'a', value: 'Salon for Women', image: require("../../res/salonwomen.png") },
                { id: 'b', value: 'Massage for Women', image: require("../../res/massagewomen.png") },
                { id: 'c', value: 'Salon for Men', image: require("../../res/salonmen.png") },
                { id: 'd', value: 'Massage for Men', image: require("../../res/massagemen.png") },
                { id: 'e', value: 'Ac Service & Repair', image: require("../../res/acIcon.png") },
                { id: 'f', value: 'Appliance Repair', image: require("../../res/reapir2.png") },
                { id: 'g', value: 'Cleaning & Disinfection', image: require("../../res/cleaning.png") },
                { id: 'h', value: 'Plumbers', image: require("../../res/plumber.png") },
                { id: 'i', value: 'Carpenters', image: require("../../res/carpenter.png") },
            ],
            ServicesData: [],

        };
        this.handleClick = this.handleClick.bind(this)
    }

    _CallGetServicesData = () => {
        makeRequest(
            `${APIConstant.BASE_URL}${APIConstant.SERVICES}`,
            'get',
        )
            .then(response => {
                console.log(JSON.stringify(response));
                // this.setState({ isLoading: false });
                if (response.statusCode == 0) {
                    Alert.alert('Oppss...', response.statusMessage);
                } else {
                    // debugger;
                    this.setState({
                        ServicesData: response.responsedata,
                    })
                    //debugger;
                    //console.log('ServicesData', + JSON.stringify(this.state.ServicesData))
                    //debugger
                    console.log('service', this.state.ServicesData.list);
                }
            })
            .catch(error => console.log('error : ' + error));
    }

    componentDidMount() {
        this.interval = setInterval(
            () => this.setState((prevState) => ({ timer: prevState.timer - 1 })),
            1000
        );
        AsyncStorage.getItem("accessToken").then((accessToken) => {
            console.log("accessToken get " + accessToken)
            if (accessToken == null) {
                this.setState({
                    loginModalCheck: true,
                    // appLoading: false,
                })
                this.setState({
                    appLoading: false,
                })
            } else {
                this.setState({
                    appLoading: false,
                })
                console.log('No user yet Created');
            }
            if (this.state.timer == 1) {
                this.setState({
                    appLoading: false,
                })
            }
        })
        this._CallGetServicesData();
    }

    componentDidUpdate() {
        if (this.state.timer === 1) {
            clearInterval(this.interval);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    // componentWillMount() {
    //     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    // }
    handleClick() {
        //this.state.loginModalCheck
        this.setState({ loginModalCheck: !this.state.loginModalCheck })
    }

    // handleBackButtonClick() {
    //     if (extipAppCount == 0) {
    //         Toast.show('Press Back again to Exit.', {
    //             duration: Toast.durations.LONG,
    //             position: Toast.positions.CENTER,
    //             shadow: true,
    //             animation: true,
    //             hideOnPress: true,
    //             delay: 0,
    //         });
    //         extipAppCount = extipAppCount + 1;
    //         setTimeout(() => {
    //             extipAppCount = 0;
    //         }, Toast.durations.LONG);
    //     } else {
    //         BackHandler.exitApp();
    //     }
    //     return true;
    // }
    _renderItem({ item, index }) {
        return (
            <View
                style={{
                    // backgroundColor: 'floralwhite',
                    borderRadius: 5,
                    height: '100%',
                }}>
                <Image source={item.image} style={{ height: '100%', width: "96%", position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, borderRadius: 5, }} />
            </View>

        );
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor:'#f0f2f0'}}>
                <View>
                    {this.state.loginModalCheck && <LoginModel
                        handleClickfunction={this.handleClick}
                    />}
                </View>
                {!this.state.appLoading && this.state.timer < 2 ?
                    <View>
                        <View style={{ height: 60, width: '100%', backgroundColor: '#04046c' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <SearchBar
                                        style={{ marginTop: 10, width: '93%', alignSelf: 'flex-start', justifyContent: 'flex-start', marginLeft: 20 }}
                                        placeholder="Search here"
                                        onPress={() => alert("onPress")}
                                        onChangeText={(text) => console.log(text)}
                                    />
                                </View>
                                <View style={{ marginRight: 10, marginTop: 12 }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Best Offer')}>
                                        <Icon name="gift-sharp" size={30} style={{ justifyContent: 'flex-end', alignSelf: 'flex-end', color: 'white', }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <ScrollView>
                            <View style={{ justifyContent: 'center', height: imageHeight, margin: 10, }}>
                                <Carousel
                                    autoplay
                                    loop
                                    layout={"stack"}
                                    ref={(c) => {
                                        this._carousel = c;
                                    }}
                                    data={this.state.thumbnail}
                                    renderItem={this._renderItem}
                                    sliderWidth={maxWidth}
                                    itemWidth={maxWidth}
                                    onSnapToItem={(index) =>
                                        this.setState({ activeSlide: index })
                                    }
                                />
                                <Pagination
                                    dotsLength={this.state.thumbnail.length} // also based on number of sildes you want
                                    activeDotIndex={this.state.activeSlide}
                                    containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.01)', position: 'absolute', bottom: 0, left: 0, right: 0 }}
                                    dotStyle={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: 5,
                                        marginHorizontal: 8,
                                        backgroundColor: 'rgba(255, 255, 255, 0.92)'
                                    }}
                                    inactiveDotStyle={{
                                        // Define styles for inactive dots here
                                    }}
                                    inactiveDotOpacity={0.4}
                                    inactiveDotScale={0.6}
                                />

                            </View>

                            <View style={{ margin: 10,  }}>
                                <FlatList
                                    data={this.state.ServicesData.list}
                                    renderItem={({ item }) => (
                                        <View style={{ height: '100%', width: '20%', padding: 5, }}>
                                            <View style={{
                                                flex: 1 / 5,
                                                width: '100%',
                                                height: '100%',
                                                paddingVertical: '18%',
                                                borderRadius: 500 / 2,
                                                backgroundColor: 'white',
                                                justifyContent: 'center',
                                                alignSelf: 'center',
                                                elevation: 15,
                                                shadowColor: 'lightgrey',
                                            }}>
                                                <TouchableOpacity onPress={() => {
                                                    if (item.typeId == 1) {
                                                        this.props.navigation.navigate('Shops Package Data', { Id: item.id, Iservice: 'service', Name: item.name })
                                                    } else {
                                                        this.props.navigation.navigate('Service Detail Screen', { ServiceId: item.id, Location: 'Surat', Name: item.name })
                                                    }
                                                }}>
                                                    <Image source={{ uri: item.avatar }} style={{
                                                        height: 50, width: 50, resizeMode: 'center', justifyContent: 'center', alignSelf: 'center'
                                                    }} />
                                                    {/* <Text style={{
                                                        fontSize: 12,
                                                        alignSelf: 'center',
                                                        justifyContent: 'center',
                                                        // marginTop: 0,
                                                        textAlign: 'center',
                                                        bottom: '12%'
                                                    }}>{item.name}</Text> */}
                                                </TouchableOpacity>
                                            </View>
                                            <Text style={{
                                                fontSize: 12,
                                                alignSelf: 'center',
                                                justifyContent: 'center',
                                                marginTop: '3%',
                                                textAlign: 'center',
                                                justifyContent: 'center',
                                                alignSelf: 'center'
                                            }}>{item.name}</Text>
                                        </View>
                                    )}
                                    keyExtractor={item => item.id}
                                    numColumns={numColumns}
                                />
                            </View>
                            {/* <View style={{ flex: 1, height: '100%', backgroundColor: 'white', margin: 10 }}>
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
                            */}
                            <View style={{ flex: 1, marginTop: 15, height: '100%', backgroundColor: 'white', marginLeft: 10, marginRight: 10 }}>
                                <View style={{ backgroundColor: 'white', width: '100%', height: '100%', }}>
                                    <Image source={{ uri: 'https://cdn.airhawkac.com/wp-content/uploads/2016/07/3-tips-ductless-air-conditioning-maintenance.jpg' }} resizeMode={'cover'}
                                        style={{ width: '100%', height: 150, }} />
                                </View>
                            </View>
                            <View style={{ width: '100%', height: 70 }}>
                            </View>
                        </ScrollView>
                    </View>
                    :
                    <LoadingModel />
                }
            </View>
        );
    }
}

export default HomeScreen

