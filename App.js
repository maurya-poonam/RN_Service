import * as React from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
//import { CustomHeader } from './src'
import {
  HomeScreen, SettingScreen, BookingScreen, ProfileScreen,
  ServiceDetailScreen, ShopsPackageData, BestOfferScreen,
  YourOrderScreen, FavoriteOrderScreen, WalletScreen,
  AddressBookScreen,
  HelpCenterScreen,
  AboutScreen,
  SendFeedbackScreen,
  RateScreen,
  TCScreen,
  FAQsScreen,
  PrivacyPolicyScreen, 
  RefundPolicyScreen,
  OrderServiceScreen

} from './src/tab';
import { LoginScreen, } from './src/auth';
import SplashScreen from './src/SplashScreen';
import LoadingScreen from './src/LoadingScreen';
import { abs } from 'react-native-reanimated';

const navOptionHandler = () => ({
  headerShown: false
})

const StackHome = createStackNavigator();

function getTabBarVisible(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'Home';
  console.log(route);

  if (routeName === 'Service Detail Screen') {
    return false;
  }
  if (routeName === 'Shops Package Data') {
    return false
  }
  if (routeName === 'Profile') {
    return false
  }
  if (routeName === 'OrderService') {
    return false
  }
  return true;

}

function getTabBarVisibleSetting(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'Setting';
  console.log(route);

  if (routeName === 'Profile') {
    return false;
  }
  if (routeName === 'Order') {
    return false;
  }
  if (routeName === 'Favorite Order') {
    return false;
  }
  if (routeName === 'Address Book') {
    return false;
  }
  if (routeName === 'Help Center') {
    return false;
  }
  if (routeName === 'About') {
    return false;
  }
  if (routeName === 'Send Feedback') {
    return false;
  }
  if (routeName === 'Rate') {
    return false;
  }
  if (routeName === 'Terms and Conditions') {
    return false;
  }
  if (routeName === 'FAQs') {
    return false;
  }
  if (routeName === 'Privacy Policy') {
    return false;
  }
  if (routeName === 'Refund Policy') {
    return false;
  }

  return true;

}

function getTabBarVisibleWallet(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'Wallet';
  console.log(route);

  

}

function HomeStack() {
  return (
    <StackHome.Navigator initialRouteName="Home">
      <StackHome.Screen name="Home" component={HomeScreen} options={navOptionHandler} />
      <StackHome.Screen name="Service Detail Screen" component={ServiceDetailScreen} options={navOptionHandler} />
      <StackHome.Screen name="Shops Package Data" component={ShopsPackageData} options={navOptionHandler} />
      <StackHome.Screen name="OrderService" component={OrderServiceScreen} options={navOptionHandler} />
      <StackHome.Screen name="Best Offer" component={BestOfferScreen} options={navOptionHandler} />
    </StackHome.Navigator>
  )
}

const StackBooking = createStackNavigator();

function BookingStack() {
  return (
    <StackBooking.Navigator initialRouteName="Booking">
      <StackBooking.Screen name="Booking" component={BookingScreen} options={navOptionHandler} />
    </StackBooking.Navigator>
  )
}

const StackSetting = createStackNavigator();

function SettingStack() {
  return (
    <StackSetting.Navigator initialRouteName="Setting">
      <StackSetting.Screen name="Setting" component={SettingScreen} options={navOptionHandler} />
      <StackHome.Screen name="Profile" component={ProfileScreen} options={navOptionHandler} />
      <StackHome.Screen name="Order" component={YourOrderScreen} options={navOptionHandler} />
      <StackHome.Screen name="Favorite Order" component={FavoriteOrderScreen} options={navOptionHandler} />
      <StackHome.Screen name="Address Book" component={AddressBookScreen} options={navOptionHandler} />
      <StackHome.Screen name="Help Center" component={HelpCenterScreen} options={navOptionHandler} />
      <StackHome.Screen name="About" component={AboutScreen} options={navOptionHandler} />
      <StackHome.Screen name="Send Feedback" component={SendFeedbackScreen} options={navOptionHandler} />
      <StackHome.Screen name="Rate" component={RateScreen} options={navOptionHandler} />
      <StackHome.Screen name="Terms and Conditions" component={TCScreen} options={navOptionHandler} />
      <StackHome.Screen name="FAQs" component={FAQsScreen} options={navOptionHandler} />
      <StackHome.Screen name="Privacy Policy" component={PrivacyPolicyScreen} options={navOptionHandler} />
      <StackHome.Screen name="Refund Policy" component={RefundPolicyScreen} options={navOptionHandler} />

    </StackSetting.Navigator>
  )
}

const StackWallet = createStackNavigator();

function WalletStack() {
  return (
    <StackWallet.Navigator initialRouteName="Profile">
      <StackWallet.Screen name="Wallet" component={WalletScreen} options={navOptionHandler} />
    </StackWallet.Navigator>
  )
}

const Tab = createBottomTabNavigator();

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
          } else if (route.name === 'Bookings') {
            iconName = focused ? 'md-book' : 'md-book-outline';
          } else if (route.name === 'Wallet') {
            iconName = focused ? 'md-wallet' : 'md-wallet-outline';
          }
          else if (route.name === 'Setting') {
            iconName = focused ? 'md-settings' : 'md-settings-outline';
          }
          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color}  />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'black',
        style: { backgroundColor: 'rgb(255, 136, 0)' }
      }}
    >
      <Tab.Screen name="Home" component={HomeStack}
        options={({ route }) => ({ tabBarVisible: getTabBarVisible(route) })}
      />
      <Tab.Screen name="Bookings" component={BookingStack} />
      <Tab.Screen name="Wallet" component={WalletStack}
        options={({ route }) => ({ tabBarVisible: getTabBarVisibleWallet(route) })}

      />
      <Tab.Screen name="Setting" component={SettingStack}
        options={({ route }) => ({ tabBarVisible: getTabBarVisibleSetting(route) })}
      />
    </Tab.Navigator>
  )
}

const StackApp = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StackApp.Navigator
      // initialRouteName="HomeApp" 
      >
        {/* <StackApp.Screen name="HomePage" component={HomePage} options={navOptionHandler} />*/}
        <StackApp.Screen name="HomeApp" component={TabNavigator} options={navOptionHandler} />
        {/* <StackApp.Screen name="LoginScreen" component={LoginScreen} options={navOptionHandler} />  */}
        {/* <StackApp.Screen name="SplashScreen" component={SplashScreen} options={navOptionHandler} />  */}
        <StackApp.Screen name="HomeStack" component={HomeStack} options={navOptionHandler} />
      </StackApp.Navigator>
    </NavigationContainer>
  );
}


