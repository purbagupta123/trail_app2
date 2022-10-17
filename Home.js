import React from "react";
import { Button, View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { NavigationContainer } from '@react-navigation/native';


function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home</Text>
      <Button
        title="My Profile"
        onPress={() => navigation.navigate('Profile')}
      />

    </View>
  );

}

export default Home;