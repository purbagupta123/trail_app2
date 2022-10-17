import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import Home from './Home';
import WelcomeScreen from './WelcomeScreen';



// function WelcomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Welcome</Text>
//       <Button
//         title="Sign Up"
//         onPress={() => navigation.navigate('Signup')}
//       />
//        <Button
//         title="Login"
//         onPress={() => navigation.navigate('Login')}
//       />
//     </View>
//   );
// }



function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>HomeScreen!</Text>
    </View>
  );
}


function SignInScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>SignInScreen!</Text>
    </View>
  );
}

function SignUpScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>SignUpScreen!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>SettingsScreen!</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>ProfileScreen!</Text>
    </View>
  );
}
const Stack = createNativeStackNavigator();

export default function App() {

  const [isSignedIn, setIsSignedIn] = useState(false)

  const [navKey, setNavKey] = useState(1)

  React.useEffect(() => {
    getUserData();
  }, [])

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('user')
    console.log(userData);

    if (userData !== null) {
      console.log('abc', userData);
      setIsSignedIn(true)
      setNavKey(navKey + 1)
    }

  }

  const defaultScreens = () => {
    return (
      <>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </>

    )
  }


  const authScreens = () => {
    return (
      <>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </>

    )
  }


  return (
    <NavigationContainer>
      <Stack.Navigator key={navKey} initialRouteName={isSignedIn ? 'Home' : 'WelcomeScreen'}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}