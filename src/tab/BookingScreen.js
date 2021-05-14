import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import { CustomHeader } from '../index';
import Icon from 'react-native-vector-icons/Ionicons';
import { makeRequest } from '../api/apiCall';
import APIConstant from '../api/apiConstant';
export class BookingScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                { id: 'a', title: 'Booking this salon', text: 'This text value 1', image: require("../../res/s1.jpg") },
                { id: 'b', title: 'Booking this plumbers', text: 'This text value 2', image: require("../../res/s2.jpg") },
                { id: 'c', title: 'Booking this ac repair', text: 'This text value 3', image: require("../../res/s3.jpg") },
                { id: 'd', title: 'Booking this cleaning & disinfection', text: 'This text value 4', image: require("../../res/s4.jpg") },
                { id: 'e', title: 'Booking this carpenters', text: 'This text value 5', image: require("../../res/s5.jpg") },
            ]
        };
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f2f0' }}>
                {/* <CustomHeader title="Booking" isHome={true} navigation={this.props.navigation} /> */}
                <View style={{ height: '100%' }}>
                    <View style={{ flexDirection: 'row', height: 60, width: '100%', backgroundColor: '#04046c', }} >
                        <TouchableOpacity style={{ margin: 5, padding: 5, alignSelf: 'center' }}
                            onPress={() => this.props.navigation.goBack()}>
                            <Icon name="chevron-back" size={35} color="white" />
                        </TouchableOpacity>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 5, padding: 5, justifyContent: 'center', alignSelf: 'center' }}>Booking</Text>
                    </View>
                    {/* <Image source={{ uri: 'https://play-lh.googleusercontent.com/vtF2gcADW6O7qnzipftCyGOyaB4pb12bjl4sMBcZp3KOOdf8DdHUJDVx0JeNeuT7nh3A' }} style={{ height: '40%', width: "100%", }} /> */}
                    <ScrollView>
                        <View style={{ marginTop: 10 }}></View>
                        <FlatList
                            data={this.state.data}
                            renderItem={({ item }) => (
                                <View style={{ backgroundColor: 'white', margin: 20, borderRadius: 10, elevation: 15 }}>
                                    <View style={{ flexDirection: 'row', height: 100, margin: 5, padding: 5, borderRadius: 10 }}>
                                        <Image source={item.image} style={{ height: 100, width: "20%", marginTop: -25, borderRadius: 10, }} />
                                        <View style={{ marginHorizontal: 10 }} >
                                            <Text style={styles.item}>{item.title}</Text>
                                            <Text style={styles.item2}>{item.text}</Text>
                                        </View>
                                    </View>
                                </View>
                            )}
                            keyExtractor={item => item.id}
                        />
                    </ScrollView>
                </View>
                {/* <Text>Booking!</Text>
                    <TouchableOpacity
                        style={{ marginTop: 20 }} onPress={() => this.props.navigation.navigate('BookingDetail')}
                    >
                        <Text>Go booking Detail</Text>
                    </TouchableOpacity> */}

            </SafeAreaView>
        );
    }
}

export default BookingScreen
const styles = StyleSheet.create({
    itemContainer: {
        width: '100%',
        height: '40%',
        margin: 5,
        backgroundColor: 'red',
        flexDirection: 'row',
    },
    item: {
        fontSize: 20,
        alignSelf: 'flex-start',
        // marginLeft: 10,
        bottom: 5,
    },
    item2: {
        fontSize: 16,
        alignSelf: 'flex-start',
        // marginLeft: 10,

    },
})