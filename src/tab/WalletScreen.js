import React, { Component } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, Image, FlatList, ScrollView, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TextInput from 'react-native-textinput-with-icons';
import Carousel, { Pagination } from "react-native-snap-carousel";
import RazorpayCheckout from 'react-native-razorpay';
import Toast from 'react-native-root-toast';
const maxWidth = Dimensions.get("window").width;
const imageHeight = (maxWidth / 16) * 9;
var fixWidth = maxWidth / 1
const numColumns = 4;

export class WalletScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeSlide: 0,
            Money: [
                {
                    amount: '100'
                },
                {
                    amount: '500'
                },
                {
                    amount: '1000'
                },
            ],
            thumbnail: [
                {
                    id: 1,
                    image: require("../../res/wall4.jpg"),
                },
                {
                    id: 2,
                    image: require("../../res/wall1.jpg"),
                },
                {
                    id: 3,
                    image: require("../../res/wall3.jpg"),
                },
            ],
            Addamount: 0
        }
    }
    _showToast = message => {
        Toast.show(message, {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
        });
    }

    _onPressButton() {
        // console.log('item', item);
        if(!this.state.Addamount == 0){
        var options = {
            // description: item.description,
            //  image: item.avatar,
            currency: 'INR',
            key: 'rzp_test_mQXICSOiiBtN6i',
            amount: this.state.Addamount * 100,
            // name: item.name,
            prefill: {
                email: 'void@gmail.com',
                contact: '9191917680',
                name: 'Razorpay Software'
            },
            theme: { color: '#FFA500' }
        }
        RazorpayCheckout.open(options).then((data) => {
            // handle success
            debugger;
            //alert(`Success: ${data.razorpay_payment_id}`);
            console.log(`Success: ${data.razorpay_payment_id}`);
        }).catch((error) => {
            debugger;
            // handle failure
            // alert(`Error: ${error.code} | ${error.description}`);
            console.log(`Error: ${error.code} | ${error.description}`);
        });
        } else {
            this._showToast(`Please enter amount`);
        }
    }

    _renderItem({ item, index }) {
        return (
            <View
                style={{
                    // backgroundColor: 'floralwhite',
                    borderRadius: 5,
                    // height: '90%',
                    //width:'100%'
                }}>
                <Image source={item.image} resizeMode={'stretch'} style={{ height: 200, width: "96%", position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, borderRadius: 5, }} />
            </View>
        );
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: '#f0f2f0', }}>
                    <View style={{ flexDirection: 'row', height: 60, width: '100%', backgroundColor: 'black', }} >
                        <TouchableOpacity style={{ margin: 5, padding: 5, alignSelf: 'center' }}
                            onPress={() => this.props.navigation.goBack()}>
                            <Icon name="chevron-back" size={35} color="white" />
                        </TouchableOpacity>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 5, padding: 5, justifyContent: 'center', alignSelf: 'center' }}>Wallet</Text>
                    </View>
                    <ScrollView>
                        <View style={{ justifyContent: 'center', height: 200, margin: 10, }}>
                            <Carousel
                                autoplay
                                loop
                                layout={'default'}
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
                                inactiveDotOpacity={0.9}
                                inactiveDotScale={0.6}
                            />
                        </View>
                        <View style={{ margin: 10, padding: 10, backgroundColor: 'white', borderRadius: 10, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderBottomColor: 'lightgrey', borderBottomWidth: 1.2, paddingBottom: 10, marginTop: 15, }}>
                                <View style={{ height: 55, width: 120, backgroundColor: 'white', justifyContent: 'flex-start', alignSelf: 'flex-start' }}>
                                    <Icon name='md-wallet' size={25} color={'#58a9f5'} style={{ margin: 5, justifyContent: 'center', alignSelf: 'center' }} />
                                    <Text style={{ bottom: 6, justifyContent: 'center', alignSelf: 'center', fontSize: 14 }}>Balance ₹ 0</Text>
                                </View>
                                <View style={{ height: 55, width: 120, backgroundColor: 'white', justifyContent: 'flex-end', alignSelf: 'flex-end' }}>
                                    <Icon name='md-gift' size={25} color={'grey'} style={{ margin: 5, justifyContent: 'center', alignSelf: 'center' }} />
                                    <Text style={{ bottom: 6, justifyContent: 'center', alignSelf: 'center', fontSize: 14 }}>Gift Card</Text>
                                </View>
                            </View>
                            <View style={{ height: 55, width: '100%', backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: 'lightgrey', marginTop: 20, justifyContent: 'center', alignSelf: 'center' }}>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={{ fontSize: 16, marginTop: 20, marginHorizontal: 25 }}>₹</Text>
                                   <TextInput
                                        //containerWidth={fixWidth / 2}
                                        noUnderline={true}
                                        keyboardType="numeric"
                                        labelColor={'black'}
                                        label="Enter amount"
                                        underlineColor={'grey'}
                                        underlineActiveColor={'black'}
                                        labelActiveColor={'black'}
                                        value={this.state.Addamount}
                                        refrance={(refrance) => {
                                            this.input = refrance;
                                        }}
                                        onChangeText={(Addamount) => this.setState({ Addamount:Addamount })}
                                    />
                                </View>
                            </View>
                            <View style={{ height: 55, width: '90%', backgroundColor: 'white', marginTop: 20, justifyContent: 'center', alignSelf: 'center' }}>
                                <View style={{ flexDirection: 'row', }}>
                                    <TouchableOpacity onPress={() => this._onPressButton()}
                                        style={{ flex: 1, width: '100%', height: 50, borderRadius: 5, borderColor: 'orange', borderWidth: 1, marginTop: 10, justifyContent: 'center', alignSelf: 'center' }}>
                                        <Text style={{ textAlign: 'center', color: 'black', fontSize: 18, fontWeight: 'bold', }}>Add Money</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text style={{ marginTop: 10, marginLeft: 20, justifyContent: 'flex-start', alignSelf: 'flex-start', color: 'grey', fontSize: 16 }}> Recommended</Text>
                            <FlatList
                                data={this.state.Money}
                                renderItem={({ item }) => (
                                    <View style={{ width: '30%', marginTop: 10, flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 22, }}>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({
                                                Addamount: item.amount
                                            })
                                        }}>
                                            <View style={{ height: 40, width: 90, borderRadius: 5, backgroundColor: 'white', borderWidth: 1, borderColor: 'orange' }}>
                                                <Text style={{ fontSize: 16, marginTop: 10, justifyContent: 'center', alignSelf: 'center' }}>₹ {item.amount}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                keyExtractor={item => item.id}
                                numColumns={numColumns}
                            />
                            <View style={{margin:0, padding:0, marginTop: 20, width: '100%' }}>
                                <View style={{ flexDirection: 'row',width:'100%',justifyContent:'space-between' }}>
                                    <View style={{borderColor:'lightgrey',borderWidth:1.2,justifyContent:'center',alignSelf:'center',width:'30%'}} />
                                    <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Refer')} >
                                            <View style={{ flexDirection: 'row', }}>
                                                <FontAwesome name='money' size={20} />
                                                <Text style={{ fontSize: 16, color: '#4169E1', marginHorizontal: 10, fontWeight: 'bold' }}>Refer and get</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{borderColor:'lightgrey',borderWidth:1.2,justifyContent:'center',alignSelf:'center',width:'30%'}} />                          
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

export default WalletScreen
