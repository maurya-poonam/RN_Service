import React, { Component } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, Card, ImageBackground, FlatList, BackHandler, Alert, ScrollView, StyleSheet, Dimensions, Image, AsyncStorage, ActivityIndicator } from 'react-native';
import Toast from 'react-native-root-toast';
import Carousel, { Pagination } from "react-native-snap-carousel";
import SearchBar from "react-native-dynamic-search-bar";
import Icon from 'react-native-vector-icons/Ionicons';
//import ServiceDetailScreen from '../tab/ServiceDetailScreen';
import LoginModel from './tab/LoginModel';
import { BookingScreen, ProfileScreen, ProfileScreenDetail } from './tab'
var extipAppCount = 0;
const maxWidth = Dimensions.get("window").width;
const maxHeight = Dimensions.get("window").height;
const imageHeight = (maxWidth / 16) * 9;
// const { width } = Dimensions.get("window");
const numColumns = 4;
const size = Dimensions.get('window').width / numColumns;


export class LoadingScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timer: 2,
            page: 1,
            thumbnail: [
                {
                    id: 1,
                    image: require("../res/acImage.jpg"),
                    title: 'Salon for Men',
                    text: 'Flat ₹100 off',
                    imagesrc: require("../res/salonmenimage.jpg")
                },
                {
                    id: 2,
                    image: require("../res/cooking.jpg"),
                    title: 'Salon at home for Women',
                    text: 'Up to 50% off',
                    imagesrc: require("../res/salonwomenimage.jpg"),
                },
                {
                    id: 3,
                    image: require("../res/Fridge.jpg"),
                    title: 'House Cleaning',
                    text: 'Flat 50% Off',
                    imagesrc: require("../res/houseclean.jpg")
                },
                {
                    id: 4,
                    image: require("../res/abc.jpg"),
                    title: 'Bathroom Cleaning',
                    text: 'Up to 40% off',
                    imagesrc: require("../res/bathroom.jpg")
                },
                {
                    id: 5,
                    image: require("../res/xyz.jpg"),
                    title: 'Sofa Cleaning',
                    text: 'Up to 50% off',
                    imagesrc: require("../res/sofaclean.jpg")
                },
            ],
            loginModalCheck: false,
            appLoading: true,
            activeSlide: 0,
            country: 'uk',
            data: [
                { id: 'a', value: 'Salon for Women', image: require("../res/salonwomen.png") },
                { id: 'b', value: 'Massage for Women', image: require("../res/massagewomen.png") },
                { id: 'c', value: 'Salon for Men', image: require("../res/salonmen.png") },
                { id: 'd', value: 'Massage for Men', image: require("../res/massagemen.png") },
                { id: 'e', value: 'Ac Service & Repair', image: require("../res/acIcon.png") },
                { id: 'f', value: 'Appliance Repair', image: require("../res/reapir2.png") },
                { id: 'g', value: 'Cleaning & Disinfection', image: require("../res/cleaning.png") },
                { id: 'h', value: 'Plumbers', image: require("../res/plumber.png") },
                { id: 'i', value: 'Carpenters', image: require("../res/carpenter.png") },
            ],
            checktoken: '',
            isLoginShow: false
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState({
            isLoginShow: !this.state.isLoginShow
        })
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
                    appLoading: false,
                })
            } else {
                this.setState({
                    appLoading: false,
                })
                console.log('No user yet Created');
            }
        })

        AsyncStorage.getItem('accessToken').then((accessToken) => {
            this.setState({
                checktoken: accessToken
            })
        })
    }

    componentDidUpdate() {
        if (this.state.timer === 1) {
            clearInterval(this.interval);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    _renderItem({ item, index }) {
        return (
            <View
                style={{
                    // backgroundColor: 'floralwhite',
                    borderRadius: 5,
                    height: '100%',
                }}>
                <Image source={item.image} style={{ height: '100%', width: "96%", position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, }} />
            </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1, }}>
                {this.state.timer == 1 ?
                    <View style={{ flex: 1 }}>
                        {this.state.page == 1 && <View style={{ flex: 1, backgroundColor: 'aqua' }}>
                            <View style={{ flex: 1, backgroundColor: '#f0f2f0', }}>
                                <View>
                                    {this.state.loginModalCheck && <LoginModel />}
                                </View>
                                <View style={{ flex: 1 }}>
                                    <View style={{ height: 60, width: '100%', backgroundColor: 'black' }}>
                                        <SearchBar
                                            style={{ marginTop: 10 }}
                                            placeholder="Search here"
                                            onPress={() => alert("onPress")}
                                            onChangeText={(text) => console.log(text)}
                                        />
                                    </View>
                                    <ScrollView>
                                        <View style={{ justifyContent: 'center', height: imageHeight, margin: 10 }}>
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
                                        <View style={{ marginHorizontal: 5 }}>
                                            <FlatList
                                                data={this.state.data}
                                                renderItem={({ item }) => (
                                                    <View style={{ height: '100%', width: '25%' }}>
                                                        <View style={styles.itemContainer}>
                                                            <TouchableOpacity
                                                                onPress={() => this.props.navigation.navigate('Service Detail Screen')}
                                                            >
                                                                <Image source={item.image} style={{
                                                                    height: 80, width: 35, resizeMode: 'center', justifyContent: 'center', alignSelf: 'center'

                                                                }} />
                                                                <Text style={styles.item}>{item.value}</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                )}
                                                keyExtractor={item => item.id}
                                                numColumns={numColumns}
                                            />
                                        </View>
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
                                                                    style={{ width: 200, height: 150 }}
                                                                    source={item.imagesrc}
                                                                    resizeMode={'contain'}
                                                                />
                                                            </View>
                                                            <View style={{ flex: 1, bottom: '5%', alignSelf: 'flex-start', marginLeft: 10 }}>
                                                                <Text style={{ color: 'black', fontSize: 18, }}>{item.title}</Text>
                                                                <Text style={{ color: 'grey', }}>{item.text}</Text>
                                                            </View>
                                                        </View>
                                                    )}
                                                    keyExtractor={item => item.id}
                                                    numColumns={2}
                                                />
                                            </View>
                                        </View>
                                        <View>
                                            {this.state.isLoginShow && <LoginModel />}
                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                {this.state.checktoken != null ?
                                                    <TouchableOpacity style={{ width: '50%', height: 50, backgroundColor: 'green' }}
                                                        onPress={() => {
                                                            AsyncStorage.removeItem('accessToken').then(() => {
                                                                console.log("Logout...");
                                                                this.setState({
                                                                    checktoken: null
                                                                })
                                                                this.props.navigation.push('HomeApp');
                                                            })
                                                        }}
                                                    >
                                                        <Text style={{ textAlign: 'center', color: 'white', marginTop: 15 }}>Logout</Text>
                                                    </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity style={{ width: '50%', height: 50, backgroundColor: 'green' }}
                                                        onPress={() => {
                                                            this.handleClick()
                                                        }}
                                                    >
                                                        <Text style={{ textAlign: 'center', color: 'white', marginTop: 10 }}>Login</Text>
                                                    </TouchableOpacity>
                                                }
                                            </View>
                                        </View>
                                    </ScrollView>
                                </View>

                            </View>

                        </View>}
                        {this.state.page == 2 && <View style={{ flex: 1, backgroundColor: '' }}>
                            <BookingScreen />
                        </View>}
                        {this.state.page == 3 && <View style={{ flex: 1, backgroundColor: '' }}>
                            <ProfileScreen />
                        </View>}
                        <View style={{ backgroundColor: 'orange', flexDirection: 'row', position: 'absolute', bottom: 0, height: 50, justifyContent: 'space-evenly', width: '100%' }}>
                            <TouchableOpacity onPress={() => this.setState({ page: 1 })}>
                                <View style={{ backgroundColor: '', flex: 1 }}>
                                    <Text style={{ alignSelf: 'center', color: 'black', margin: 10 }}>Tab 1</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({ page: 2 })}>
                                <View style={{ backgroundColor: '', flex: 1 }}>
                                    <Text style={{ alignSelf: 'center', color: 'black', margin: 10 }}>Tab 2</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({ page: 3 })}>
                                <View style={{ backgroundColor: '', flex: 1 }}>
                                    <Text style={{ alignSelf: 'center', color: 'black', margin: 10 }}>Tab 3</Text>
                                </View>
                            </TouchableOpacity>
                            {/* <TouchableOpacity onPress={()=>this.setState({page:1})}>
                                <View style={{ backgroundColor: '', flex: 1 }}>
                                    <Text style={{ alignSelf: 'center', color: 'black', margin: 10 }}>Tab 4</Text>
                                </View>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                    // <View style={{ flex: 1, backgroundColor: '#f0f2f0', }}>
                    //     <View>
                    //         {this.state.loginModalCheck && <LoginModel />}
                    //     </View>
                    //     <View style={{ flex: 1 }}>
                    //         <View style={{ height: 60, width: '100%', backgroundColor: 'black' }}>
                    //             <SearchBar
                    //                 style={{ marginTop: 10 }}
                    //                 placeholder="Search here"
                    //                 onPress={() => alert("onPress")}
                    //                 onChangeText={(text) => console.log(text)}
                    //             />
                    //         </View>
                    //         <ScrollView>
                    //             <View style={{ justifyContent: 'center', height: imageHeight, margin: 10 }}>
                    //                 <Carousel
                    //                     autoplay
                    //                     loop
                    //                     layout={"stack"}
                    //                     ref={(c) => {
                    //                         this._carousel = c;
                    //                     }}
                    //                     data={this.state.thumbnail}
                    //                     renderItem={this._renderItem}
                    //                     sliderWidth={maxWidth}
                    //                     itemWidth={maxWidth}
                    //                     onSnapToItem={(index) =>
                    //                         this.setState({ activeSlide: index })
                    //                     }
                    //                 />
                    //                 <Pagination
                    //                     dotsLength={this.state.thumbnail.length} // also based on number of sildes you want
                    //                     activeDotIndex={this.state.activeSlide}
                    //                     containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.01)', position: 'absolute', bottom: 0, left: 0, right: 0 }}
                    //                     dotStyle={{
                    //                         width: 10,
                    //                         height: 10,
                    //                         borderRadius: 5,
                    //                         marginHorizontal: 8,
                    //                         backgroundColor: 'rgba(255, 255, 255, 0.92)'
                    //                     }}
                    //                     inactiveDotStyle={{
                    //                         // Define styles for inactive dots here
                    //                     }}
                    //                     inactiveDotOpacity={0.4}
                    //                     inactiveDotScale={0.6}
                    //                 />

                    //             </View>
                    //             <View style={{ marginHorizontal: 5 }}>
                    //                 <FlatList
                    //                     data={this.state.data}
                    //                     renderItem={({ item }) => (
                    //                         <View style={{ height: '100%', width: '25%' }}>
                    //                             <View style={styles.itemContainer}>
                    //                                 <TouchableOpacity
                    //                                     onPress={() => this.props.navigation.navigate('Service Detail Screen')}
                    //                                 >
                    //                                     <Image source={item.image} style={{
                    //                                         height: 80, width: 35, resizeMode: 'center', justifyContent: 'center', alignSelf: 'center'

                    //                                     }} />
                    //                                     <Text style={styles.item}>{item.value}</Text>
                    //                                 </TouchableOpacity>
                    //                             </View>
                    //                         </View>
                    //                     )}
                    //                     keyExtractor={item => item.id}
                    //                     numColumns={numColumns}
                    //                 />
                    //             </View>
                    //             <View style={{ flex: 1, height: '100%', backgroundColor: 'white', margin: 10 }}>
                    //                 <Text style={{ margin: 5, padding: 5, fontSize: 20, fontWeight: 'bold' }}>Best Offer</Text>
                    //                 <Text style={{ margin: 5, padding: 5, bottom: 10, color: 'grey' }}>Hygienic & single-use products | low-contact</Text>
                    //                 <View style={{ alignContent: 'center' }}>
                    //                     <FlatList
                    //                         data={this.state.thumbnail}
                    //                         renderItem={({ item }) => (
                    //                             <View style={{ width: '100%', flex: 1 / 2, alignItems: 'center' }}>
                    //                                 <View style={{ flex: 1 }}>
                    //                                     <Image
                    //                                         style={{ width: 200, height: 150 }}
                    //                                         source={item.imagesrc}
                    //                                         resizeMode={'contain'}
                    //                                     />
                    //                                 </View>
                    //                                 <View style={{ flex: 1, bottom: '5%', alignSelf: 'flex-start', marginLeft: 10 }}>
                    //                                     <Text style={{ color: 'black', fontSize: 18, }}>{item.title}</Text>
                    //                                     <Text style={{ color: 'grey', }}>{item.text}</Text>
                    //                                 </View>
                    //                             </View>
                    //                         )}
                    //                         keyExtractor={item => item.id}
                    //                         numColumns={2}
                    //                     />
                    //                 </View>
                    //             </View>
                    //             <View>
                    //                 {this.state.isLoginShow && <LoginModel />}
                    //                 <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    //                     {this.state.checktoken != null ?
                    //                         <TouchableOpacity style={{ width: '50%', height: 50, backgroundColor: 'green' }}
                    //                             onPress={() => {
                    //                                 AsyncStorage.removeItem('token').then(() => {
                    //                                     console.log("Logout...");
                    //                                     this.setState({
                    //                                         checktoken: null
                    //                                     })
                    //                                     this.props.navigation.push('HomeApp');
                    //                                 })
                    //                             }}
                    //                         >
                    //                             <Text style={{ textAlign: 'center', color: 'white', marginTop: 15 }}>Logout</Text>
                    //                         </TouchableOpacity>
                    //                         :
                    //                         <TouchableOpacity style={{ width: '50%', height: 50, backgroundColor: 'green' }}
                    //                             onPress={() => {
                    //                                 this.handleClick()
                    //                             }}
                    //                         >
                    //                             <Text style={{ textAlign: 'center', color: 'white', marginTop: 10 }}>Login</Text>
                    //                         </TouchableOpacity>
                    //                     }
                    //                 </View>
                    //             </View>
                    //         </ScrollView>
                    //     </View>

                    // </View>

                    :
                    <View style={{ backgroundColor: 'orange', width: '100%', height: '100%', top: 0, bottom: 0, left: 0, right: 0, position: 'absolute', }}>
                        {/* <Text> {this.state.timer} </Text> */}
                        <Image source={require('../res/logo.png')} resizeMode='center'
                            style={{ flex: 1, width: 200, height: 200, justifyContent: 'center', alignSelf: 'center', }}
                        />
                    </View>
                }
            </View>
        )
    }
}

export default LoadingScreen
const styles = StyleSheet.create({
    itemContainer: {
        flex: 1 / 4,
        margin: 5,
        // marginHorizontal:5,
        // marginVertical:5,
        // padding: 5,
        backgroundColor: 'white',
        borderRadius: 15,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        height: 110

    },
    item: {
        fontSize: 12,
        alignSelf: 'center',
        justifyContent: 'center',
        // marginTop: 0,
        textAlign: 'center',
        bottom: '10%'

    },

})