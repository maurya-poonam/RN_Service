import * as React from 'react';
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

function CustomHeader({ title, isHome, navigation }) {
  return (
    <View style={{ flexDirection: 'row', height: 50, }}>

      <View style={{ flex: 1, borderColor: 'red', marginLeft: 5 }}>
        {
          isHome ?
            <TouchableOpacity onPress={()=>navigation.openDrawer()}>
              <Icon name="md-menu" size={35} color="black" />
            </TouchableOpacity>
            :
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() => navigation.goBack()}
            >
              <Icon name="chevron-back" size={35} color="black" />
              <Text>Back</Text>
            </TouchableOpacity>
        }
      </View>
      <View style={{ flex: 1.5, borderColor: 'red', }}>
        <Text style={{ textAlign: 'center' }}>{title}</Text>
      </View>
      <View style={{ flex: 1, }}></View>
    </View>
  )
}

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, }}>
      <CustomHeader title="Home" isHome={true} navigation={navigation} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
        <TouchableOpacity
          style={{ marginTop: 20 }} onPress={() => navigation.navigate('HomeDetail')}
        >
          <Text>Go Home Detail</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function HomeScreenDetail({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, }}>
      <CustomHeader title="Home Detail" navigation={navigation} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home Detail!</Text>
      </View>
    </SafeAreaView>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, }}>
      <CustomHeader title="Setting" isHome={true} navigation={navigation} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Setting!</Text>
        <TouchableOpacity
          style={{ marginTop: 20 }} onPress={() => navigation.navigate('SettingDetail')}
        >
          <Text>Go Setting Detail</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


function SettingsScreenDetail({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, }}>
      <CustomHeader title="Setting Detail" navigation={navigation} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Setting Deatil!</Text>
      </View>
    </SafeAreaView>
  );
}


function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Tab = createBottomTabNavigator();

const navOptionHandler = () => ({
  headerShown: false
})

const StackHome = createStackNavigator();

function HomeStack() {
  return (
    <StackHome.Navigator initialRouteName="Home">
      <StackHome.Screen name="Home" component={HomeScreen} options={navOptionHandler} />
      <StackHome.Screen name="HomeDetail" component={HomeScreenDetail} options={navOptionHandler} />
    </StackHome.Navigator>
  )
}

const StackSetting = createStackNavigator();

function SettingStack() {
  return (
    <StackSetting.Navigator initialRouteName="Setting">
      <StackSetting.Screen name="Setting" component={SettingsScreen} options={navOptionHandler} />
      <StackSetting.Screen name="SettingDetail" component={SettingsScreenDetail} options={navOptionHandler} />
    </StackSetting.Navigator>
  )
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused
              ? 'md-home'
              : 'md-home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'md-settings' : 'md-settings-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Settings" component={SettingStack} />
    </Tab.Navigator>
  )
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="MenuTab">
        <Drawer.Screen name="MenuTab" component={TabNavigator} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}