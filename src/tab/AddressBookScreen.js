import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, FlatList, ToastAndroid, AsyncStorage, Image, ScrollView, Dimensions } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import TextInput from 'react-native-textinput-with-icons';
import SelectPicker from 'react-native-form-select-picker'
import Icon from 'react-native-vector-icons/Ionicons';
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
        AsyncStorage.setItem('any_key_here', this.state.pincode)
        AsyncStorage.setItem('any_key_here', this.state.selectstate)
        AsyncStorage.setItem('any_key_here', this.state.selectcity)
        AsyncStorage.setItem('any_key_here', this.state.Addaddress)
        AsyncStorage.setItem('any_key_here', this.state.AddroadName)
        // setTextInputValue('');
        this.setState({
            pincode:'',
            selectstate:'',
            selectcity:'',
            Addaddress: '',
            AddroadName:''
        })
        ToastAndroid.show('Save Data', ToastAndroid.SHORT);
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
                <View style={{ flexDirection: 'row', height: 60, width: '100%', backgroundColor: 'black', }} >
                    <TouchableOpacity style={{ margin: 5, padding: 5, alignSelf: 'center' }}
                        onPress={() => this.props.navigation.goBack()}>
                        <Icon name="chevron-back" size={35} color="white" />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 5, padding: 5, justifyContent: 'center', alignSelf: 'center' }}>Address</Text>
                </View>
                <ScrollView>
                    <View style={{ height: 60, borderRadius: 10, backgroundColor: 'white', margin: 10 }}>
                        <TouchableOpacity
                            onPress={() => this.setModalVisible(true)}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'flex-start', marginLeft: 10, marginTop: 15, }}>
                                <AntDesign name='plus' size={20} color={'#4169E1'} style={{marginTop: 3}} />
                                <Text style={{ fontSize: 18, color: '#4169E1', marginTop: 3, marginHorizontal: 5 }}>Add a new address</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, borderRadius: 10, margin: 10 }}>
                        <FlatList
                            data={this.state.data}
                            renderItem={({ item }) => (
                                <View style={{ backgroundColor: 'white', margin: 3, borderRadius: 10, elevation: 1 }}>
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
                    </View>
                    <View style={styles.centeredView}>
                        <Modal
                            animationType="slide"
                            swipeDirection="down"
                            transparent={false}
                            visible={modalVisible}
                           // backdropColor={'green'}
                           // backdropOpacity= {1}
                           
                            onRequestClose={() => {
                                this.setModalVisible(!modalVisible);
                            }}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={{ justifyContent: 'flex-start', alignSelf: 'flex-start', fontSize:18, fontWeight:'bold' }}>Address Detail</Text>
                                    <View style={{ justifyContent: 'flex-start', alignSelf: 'flex-start', borderWidth: 1, borderColor: 'black', marginTop: 10, width: '49%', height: 60, borderRadius: 5 }} >
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
                                    {/* <View style={{ justifyContent: 'flex-start', alignSelf: 'flex-start', borderWidth: 1, borderColor: 'lightgrey', marginTop: 10, width: 160, height: 60 }}> */}
                                    <View style={{ flexDirection: 'row',}}>
                                        <View style={{ justifyContent: 'flex-start', alignSelf: 'flex-start', borderWidth: 1, borderColor: 'black', marginTop: 10, width: '49%', height: 60, borderRadius: 5 }}>
                                            <SelectPicker
                                                //  style={{marginRight:10}}
                                                onValueChange={(state) => {
                                                    this.setState({ selectstate: state })
                                                }}
                                                placeholder={'State'}
                                                placeholderStyle={{ color: 'black', right: 10, marginTop: 12 }}
                                            // selected={this.state.state}
                                            >
                                                {Object.values(this.state.allState).map(({ label, index }) => (
                                                    <SelectPicker.Item label={label} value={label} key={index} />
                                                ))}
                                            </SelectPicker>
                                        </View>
                                        <View style={{width:'2%'}}></View>
                                        <View style={{ justifyContent: 'space-around', alignSelf: 'flex-end', borderWidth: 1, borderColor: 'black', marginTop: 10, width: '49%', height: 60, borderRadius: 5 }} >
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
                                    {/* </View> */}
                                    <View style={{ justifyContent: 'flex-start', alignSelf: 'flex-start', borderWidth: 1, borderColor: 'black', marginTop: 10, width: '100%', height: 60, borderRadius: 5 }}>
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
                                    <View style={{ justifyContent: 'flex-start', alignSelf: 'flex-start', borderWidth: 1, borderColor: 'black', marginTop: 10, width: '100%', height: 60, borderRadius: 5 }}>
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
                                    <TouchableOpacity onPress={() => this.saveValueFunction()} style={{height: 40, width: '100%', justifyContent: 'center', alignSelf: 'center', backgroundColor: 'black', marginTop: 20, borderRadius: 5}}>
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
        marginTop: 22,
        // backgroundColor:'white'
    },
    modalView: {
        marginTop: 20,
        backgroundColor: '#dfe6f0',
        width: '100%',
        height: '96%',
        //  borderRadius: 10,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 1
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },

});

export default AddressBookScreen
