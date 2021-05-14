import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, FlatList, ToastAndroid, AsyncStorage, Image, ScrollView, Dimensions, Modal } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
//import Modal from 'react-native-modal';
import TextInput from 'react-native-textinput-with-icons';
import SelectPicker from 'react-native-form-select-picker'
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
const { width } = Dimensions.get('window')
var fixWidth = width / 1.7

export class AddressBookScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalVisible: false,
            pincode: '',
            selectstate: '',
            selectcity: '',
            Addaddress: '',
            AddroadName: '',
            Addtype: 1,
            data: [
                { id: 'a', text: 'This text value 1' },
            ],
            getValue: '',
            allState: [
                {
                    value: 1,
                    label: 'Andhra Pradesh',
                },
                {
                    value: 2,
                    label: 'Arunachal Pradesh',
                },
                {
                    value: 3,
                    label: 'Assam',
                },
                {
                    value: 4,
                    label: 'Bihar',
                },
                {
                    value: 5,
                    label: 'Chhattisgarh',
                },
                {
                    value: 6,
                    label: 'Goa',
                },
                {
                    value: 7,
                    label: 'Gujarat',
                },
                {
                    value: 8,
                    label: 'Haryana',
                },
                {
                    value: 9,
                    label: 'Himachal Pradesh',
                },
                {
                    value: 10,
                    label: 'Jammu and Kashmir',
                },
                {
                    value: 11,
                    label: 'Jharkhand',
                },
                {
                    value: 12,
                    label: 'Karnataka',
                },
                {
                    value: 13,
                    label: 'Kerala',
                },
                {
                    value: 14,
                    label: 'Madhya Pradesh',
                },
                {
                    value: 15,
                    label: 'Maharashtra',
                },
                {
                    value: 16,
                    label: 'Manipur',
                },
                {
                    value: 17,
                    label: 'Meghalaya',
                },
                {
                    value: 18,
                    label: 'Mizoram',
                },
                {
                    value: 19,
                    label: 'Nagaland',
                },
                {
                    value: 20,
                    label: 'Odisha',
                },
                {
                    value: 21,
                    label: 'Punjab',
                },
                {
                    value: 22,
                    label: 'Rajasthan',
                },
                {
                    value: 23,
                    label: 'Sikkim',
                },
                {
                    value: 24,
                    label: 'Tamil Nadu',
                },
                {
                    value: 25,
                    label: 'Telangana',
                },
                {
                    value: 26,
                    label: 'Tripura',
                },
                {
                    value: 27,
                    label: 'Uttar Pradesh',
                },
                {
                    value: 28,
                    label: 'Uttarakhand',
                },
                {
                    value: 29,
                    label: 'West Bengal',
                }
            ]
        }
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    saveValueFunction = () => {
        AsyncStorage.setItem('any_key_here', this.state.Addtype)
        AsyncStorage.setItem('any_key_here', this.state.pincode)
        AsyncStorage.setItem('any_key_here', this.state.selectstate)
        AsyncStorage.setItem('any_key_here', this.state.selectcity)
        AsyncStorage.setItem('any_key_here', this.state.Addaddress)
        AsyncStorage.setItem('any_key_here', this.state.AddroadName)
        // setTextInputValue('');
        this.setState({
            pincode: '',
            selectstate: '',
            selectcity: '',
            Addaddress: '',
            AddroadName: ''
        })
        ToastAndroid.show('Save Data', ToastAndroid.SHORT);
        console.log(JSON.stringify(this.state.Addtype))
        console.log(JSON.stringify(this.state.pincode))
        console.log(JSON.stringify(this.state.selectstate))
        console.log(JSON.stringify(this.state.selectcity))
        console.log(JSON.stringify(this.state.Addaddress))
        console.log(JSON.stringify(this.state.AddroadName))
    };

    componentDidMount() {
        AsyncStorage.getItem('any_key_here').then(value =>
            this.setState({ getValue: value })
        );
    }

    render() {
        const { modalVisible } = this.state;

        return (
            <View style={{ backgroundColor: '#f0f2f0', }}>
                <View style={{ flexDirection: 'row', height: 60, width: '100%', backgroundColor: '#04046c', }} >
                    <TouchableOpacity style={{ margin: 5, padding: 5, alignSelf: 'center' }}
                        onPress={() => this.props.navigation.goBack()}>
                        <Icon name="chevron-back" size={35} color="white" />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 5, padding: 5, justifyContent: 'center', alignSelf: 'center' }}>Address</Text>
                </View>
                <ScrollView>
                    <View style={{ height: 60, backgroundColor: 'white', }}>
                        <TouchableOpacity
                            onPress={() => this.setModalVisible(true)}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'flex-start', marginLeft: 10, marginTop: 15, }}>
                                <AntDesign name='plus' size={20} color={'#4169E1'} style={{ marginTop: 3 }} />
                                <Text style={{ fontSize: 18, color: '#4169E1', marginTop: 3, marginHorizontal: 5 }}>Add a new address</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={{ flex: 1, marginTop:25 }}>
                        <FlatList
                            data={this.state.data}
                            ListEmptyComponent={<Text style={{ justifyContent: 'center', alignSelf: 'center', }}>No Data</Text>}
                            renderItem={({ item }) => (
                                <View style={{ backgroundColor: 'white', margin: 3,  elevation: 1 }}>
                                    <View style={{ flexDirection: 'row', height: 90, margin: 5, padding: 5, borderRadius: 10 }}>
                                        <View style={{ marginTop: 5 }}>
                                            <Text style={{
                                                fontSize: 16,
                                                alignSelf: 'flex-start',
                                            }}>{this.state.getValue}</Text>
                                           
                                        </View>
                                    </View>
                                </View>
                            )}
                            keyExtractor={item => item.id}
                        />
                    </View> */}
                    <View style={styles.centeredView}>
                        <Modal
                            // animationType='fade'
                            swipeDirection="down"
                            transparent={false}
                            visible={modalVisible}
                            onRequestClose={() => {
                                this.setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={() => { this.setModalVisible(false) }} style={{ alignSelf: 'flex-end', justifyContent: 'flex-end', marginTop: '8%', marginRight: 20 }}>
                                    <Entypo name='circle-with-cross' size={25} color={'rgb(255, 136, 0)'} />
                                </TouchableOpacity>
                                <Text style={{ justifyContent: 'center', alignSelf: 'center', fontSize: 24, fontWeight: 'bold', }}>Address Details</Text>
                                <View style={styles.modalView}>
                                    <Text style={{ justifyContent: 'flex-start', alignSelf: 'flex-start', fontSize: 16, marginTop: 10, left: 3, marginBottom: 5 }} >Type of address</Text>
                                    <View style={{ flexDirection: 'row', right: 5 }}>
                                        <TouchableOpacity onPress={() => this.setState({ Addtype: 1 })} style={{ flexDirection: 'row', margin: 5, padding: 5, width: 100, height: 30, borderColor: this.state.Addtype == 1 ? 'rgb(255, 136, 0)' : 'black', borderWidth: 1, borderRadius: 50, justifyContent: 'center', alignSelf: 'center' }}><Icon name='home' size={16} style={{ color: this.state.Addtype == 1 ? 'rgb(255, 136, 0)' : 'black', }} /><Text style={{ marginLeft: 8, marginTop: 0 }}>Home</Text></TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.setState({ Addtype: 2 })} style={{ flexDirection: 'row', margin: 5, padding: 5, width: 100, height: 30, borderColor: this.state.Addtype == 1 ? 'black' : 'rgb(255, 136, 0)', borderWidth: 1, borderRadius: 50, justifyContent: 'center', alignSelf: 'center' }}><FontAwesome5 name='building' size={16} style={{ color: this.state.Addtype == 1 ? 'black' : 'rgb(255, 136, 0)', }} /><Text style={{ marginLeft: 8, marginTop: 0 }}>Work</Text></TouchableOpacity>
                                    </View>
                                    <View style={{ justifyContent: 'flex-start', alignSelf: 'flex-start', borderWidth: 1, borderColor: 'black', marginTop: 10, width: '49%', height: 60, borderRadius: 5 }} >
                                        <View style={{ padding: 10, bottom: 10 }}>
                                            <TextInput
                                                //  containerWidth={300 / 2}
                                                noUnderline={true}
                                                labelColor={'black'}
                                                keyboardType="numeric"
                                                label="Pincode"
                                                underlineColor={'grey'}
                                                multiline={true}
                                                underlineActiveColor={'grey'}
                                                labelActiveColor={'grey'}
                                                value={this.state.pincode}
                                                refrance={(refrance) => {
                                                    this.input = refrance;
                                                }}
                                                onChangeText={(text) => this.setState({ pincode: text })}
                                            />
                                        </View>
                                    </View>
                                    {/* <View style={{ justifyContent: 'flex-start', alignSelf: 'flex-start', borderWidth: 1, borderColor: 'lightgrey', marginTop: 10, width: 160, height: 60 }}> */}
                                    <View style={{ flexDirection: 'row', }}>
                                        <View style={{ justifyContent: 'flex-start', alignSelf: 'flex-start', borderWidth: 1, borderColor: 'black', marginTop: 10, width: '49%', height: 60, borderRadius: 5 }}>
                                            <View>
                                                <SelectPicker
                                                    style={{ marginLeft: 10, bottom: 3 }}
                                                    onValueChange={(state) => {
                                                        this.setState({ selectstate: state })
                                                    }}
                                                    placeholder={'State'}
                                                    placeholderStyle={{ color: 'black', right: 10, marginTop: 12 }}
                                                // selected={this.state.state}
                                                >
                                                    {Object.values(this.state.allState).map(({ label, index, value }) => (
                                                        <SelectPicker.Item label={label} value={label} key={value} />
                                                    ))}
                                                </SelectPicker>
                                            </View>
                                        </View>
                                        <View style={{ width: '2%' }}></View>
                                        <View style={{ justifyContent: 'space-around', alignSelf: 'flex-end', borderWidth: 1, borderColor: 'black', marginTop: 10, width: '49%', height: 60, borderRadius: 5 }} >
                                            <View style={{ padding: 10, }}>
                                                <TextInput
                                                    //  containerWidth={300 / 2}
                                                    noUnderline={true}
                                                    labelColor={'black'}
                                                    label="City"
                                                    underlineColor={'grey'}
                                                    multiline={true}
                                                    underlineActiveColor={'grey'}
                                                    labelActiveColor={'grey'}
                                                    value={this.state.selectcity}
                                                    refrance={(refrance) => {
                                                        this.input = refrance;
                                                    }}
                                                    onChangeText={(text) => this.setState({ selectcity: text })}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                    {/* </View> */}
                                    <View style={{ justifyContent: 'flex-start', alignSelf: 'flex-start', borderWidth: 1, borderColor: 'black', marginTop: 10, width: '100%', height: 60, borderRadius: 5 }}>
                                        <View style={{ padding: 10, bottom: 10 }}>
                                            <TextInput
                                                //  containerWidth={680 / 2}
                                                noUnderline={true}
                                                labelColor={'black'}
                                                label="House No., Building Name"
                                                // placeholder={'House No, Building Name'}
                                                // placeholderTextColor="black"
                                                underlineColor={'grey'}
                                                multiline={true}
                                                underlineActiveColor={'grey'}
                                                labelActiveColor={'grey'}
                                                value={this.state.Addaddress}
                                                refrance={(refrance) => {
                                                    this.input = refrance;
                                                }}
                                                onChangeText={(text) => this.setState({ Addaddress: text })}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ justifyContent: 'flex-start', alignSelf: 'flex-start', borderWidth: 1, borderColor: 'black', marginTop: 10, width: '100%', height: 60, borderRadius: 5 }}>
                                        <View style={{ padding: 10, bottom: 10 }}>
                                            <TextInput
                                                //   containerWidth={680 / 2}
                                                noUnderline={true}
                                                labelColor={'black'}
                                                label="Road name, Area, Colony"
                                                underlineColor={'grey'}
                                                multiline={true}
                                                underlineActiveColor={'grey'}
                                                labelActiveColor={'grey'}
                                                value={this.state.AddroadName}
                                                refrance={(refrance) => {
                                                    this.input = refrance;
                                                }}
                                                onChangeText={(text) => this.setState({ AddroadName: text })}
                                            />
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={() => this.saveValueFunction()} style={{ height: 50, width: '100%', justifyContent: 'center', alignSelf: 'center', backgroundColor: 'black', marginTop: 15, borderRadius: 5 }}>
                                        <Text style={{ justifyContent: 'center', alignSelf: 'center', fontSize: 18, fontWeight: 'bold', color: 'white' }}>Save Address</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    centeredView: {
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        //marginTop: 22,
        // backgroundColor:'white'
    },
    modalView: {
        // marginTop: 20,
        //  backgroundColor: '#dfe6f0',
        width: '100%',
        height: '100%',
        //  borderRadius: 10,
        padding: 35,
        // alignItems: "center",
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        // elevation: 1
    },


});

export default AddressBookScreen
