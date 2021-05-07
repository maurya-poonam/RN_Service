import React, { Component } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, ToastAndroid, Clipboard , Image, ScrollView,Linking} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export class ReferEarnScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    shareWhatsApp(){
        const url = `https://wa.me/?text='Share with whatsapp'`;
        Linking.openURL(url);
    }

    shareMessengerApp(){
        const url = `https://www.messenger.com/?text='Share with messenger'`;
        Linking.openURL(url);
    }

   shareCopyApp = async () => {
        await Clipboard.setString('https://wa.me/?text');
        ToastAndroid.show('copy link', ToastAndroid.SHORT);
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, height: '100%', backgroundColor: '#f0f2f0', }}>
                <View style={{ flexDirection: 'row', height: 60, width: '100%', backgroundColor: 'black', }} >
                    <TouchableOpacity style={{ margin: 5, padding: 5, alignSelf: 'center' }}
                        onPress={() => this.props.navigation.goBack()}>
                        <Icon name="chevron-back" size={35} color="white" />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 5, padding: 5, justifyContent: 'center', alignSelf: 'center' }}>Refer & Earn</Text>
                </View>
                <ScrollView>
                    <View>
                        <Image source={{ uri: 'https://mentorship.optimizeias.com/images/refer_earn.png' }} style={{ height: 250, width: "100%", }} />
                        <View style={{ backgroundColor: 'white', marginTop: 5, width: '100%', }}>
                            <View style={{ margin: 5, padding: 5, marginTop: 10, }}>
                                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                    <View style={{
                                        borderColor: 'lightgrey', borderWidth: 1, justifyContent: 'center', alignSelf: 'center', width: '40%'
                                    }} />
                                    <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                                        <Text style={{ fontSize: 16, marginHorizontal: 10, }}>Refer via</Text>
                                    </View>
                                    <View style={{
                                        borderColor: 'lightgrey', borderWidth: 1, justifyContent: 'center', alignSelf: 'center', width: '40%'
                                    }} />
                                </View>
                            </View>
                            <View style={{ height: 100, width: '100%', flexDirection: 'row' }}>
                                <View style={{ flex: 1, }}>
                                    <TouchableOpacity onPress={() => {this.shareWhatsApp()}}>
                                        <Icon name='md-logo-whatsapp' size={35} color={'green'} style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 15 }} />
                                        <Text style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 3, }}>Whatsapp</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity onPress={() => {this.shareMessengerApp()}}>
                                        <MaterialCommunityIcons name='facebook-messenger' size={35} color={'#03b6fc'} style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 15 }} />
                                        <Text style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 3, }}>Messenger</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1, }}>
                                    <TouchableOpacity onPress={() => {this.shareCopyApp()}}>
                                        <FontAwesome5 name='link' size={35} color={'#067ed4'} style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 15 }} />
                                        <Text style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 3, }}>Copy Link</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ margin: 5, width: '100%' }}>
                                <Text style={{ marginLeft: 10, margin: 5, padding: 5, marginTop: 15, fontSize: 25, fontWeight: 'bold' }}>How it works?</Text>
                                <View style={{ flexDirection: 'row', margin: 5, padding: 5 }}>
                                    <View style={{ width: 60, height: 60, backgroundColor: 'lightgrey', borderRadius: 60 }}><MaterialCommunityIcons name='email-newsletter' size={30} color={'#00BFFF'} style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 15 }} /></View>
                                    <View><Text style={{ fontSize: 20, margin: 8, padding: 8 }}>Invite your friends to blueTimo</Text></View>
                                </View>
                                <View style={{ flexDirection: 'row', margin: 5, padding: 5 }}>
                                    <View style={{ width: 60, height: 60, backgroundColor: 'lightgrey', borderRadius: 60 }}><FontAwesome5 name='hand-point-up' size={30} color={'orange'} style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 15 }} /></View>
                                    <View><Text style={{ fontSize: 20, margin: 8, padding: 8 }}>They will receive a reward of ₹200 on sigup</Text></View>
                                </View>
                                <View style={{ flexDirection: 'row', margin: 5, padding: 5 }}>
                                    <View style={{ width: 60, height: 60, backgroundColor: 'lightgrey', borderRadius: 60 }}><FontAwesome5 name='rupee-sign' size={30} color={'#1E90FF'} style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 15 }} /></View>
                                    <View style={{ width: '80%' }}><Text style={{ fontSize: 20, margin: 8, paddingHorizontal: 6 }}>You receive a reward of upto ₹2000, once they book a service</Text></View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default ReferEarnScreen
