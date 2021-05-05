import React, { Component } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import TextInput from 'react-native-textinput-with-icons';
const { width } = Dimensions.get('window')
var fixWidth = width / 1.1

export class SendFeedbackScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            feedback: ''
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, height: '100%', backgroundColor: '#f0f2f0', }}>
                <View style={{ flexDirection: 'row', height: 60, width: '100%', backgroundColor: 'black', }} >
                    <TouchableOpacity style={{ margin: 5, padding: 5, alignSelf: 'center' }}
                        onPress={() => this.props.navigation.goBack()}>
                        <Icon name="chevron-back" size={35} color="white" />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 5, padding: 5, justifyContent: 'center', alignSelf: 'center' }}>Feedback</Text>
                </View>
                <ScrollView>
                    <Image source={{ uri: 'https://i.pinimg.com/originals/e0/1e/31/e01e31e2286048b663203dd67e908a83.png' }} style={{ height: 250, width: "100%", }} />
                    <View style={{ margin: 10, marginLeft: 10, padding: 10, marginTop: 10 }}>
                        <View>
                            <Text style={{ fontSize: 20, color: 'black' }}>Send us your feedback!</Text>
                            <Text style={{ fontSize: 16, color: '#727372', marginTop: 10 }}>Do you have a suggestion for services?</Text>
                            <Text style={{ fontSize: 16, color: '#727372' }}>let us know in the field bellow.</Text>
                        </View>
                        <View>
                            <TextInput
                                //  noUnderline={true}
                                containerWidth={fixWidth}
                                numberOfLines={5}
                                height={120}
                                multiline={true}
                                labelColor={'black'}
                                label="Enter feedback"
                                underlineColor={'grey'}
                                underlineActiveColor={'grey'}
                                labelActiveColor={'black'}
                                value={this.state.feedback}
                                refrance={(refrance) => {
                                    this.input = refrance;
                                }}
                                onChangeText={(feedback) => this.setState({ feedback })}
                            />
                        </View>
                        <View style={{ height: 55, width: '100%', marginTop: 20, justifyContent: 'center', alignSelf: 'center', }}>
                            <View style={{ flexDirection: 'row', }}>
                                <TouchableOpacity onPress={() => console.log('feedback')}
                                    style={{ flex: 1, width: '100%', height: 50, borderRadius: 5, backgroundColor: '#1d84f2', marginTop: 10, justifyContent: 'center', alignSelf: 'center' }}>
                                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, fontWeight: 'bold', }}>Submit feedback</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default SendFeedbackScreen
