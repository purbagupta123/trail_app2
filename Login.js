import React from "react";
import { SafeAreaView, Button, StyleSheet, TextInput } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import validator from 'validator';

const UselessTextInput = ({navigation}) => {
  const [text, onChangeText] = React.useState("");
  const [number, onChangeNumber] = React.useState('');
  const [email, setemail] = React.useState('');
  const [password, setpassword] = React.useState('');
  const [loginprocess, setloginprocess] = React.useState(false);
  


  const login = async() =>{

    

     if  (validator.isEmpty(email)) {
      alert('Please Enter Your Email')
    }
    else if  (validator.isEmail(email)===false){
      alert('Please Enter Your Valid Email')
    }
    
    else if  (validator.isEmpty(password)) {
      alert('Please Confirm Your Password')
    }
    else if  (password.length < 6) {
      alert('Please Enter Valid Password')
    }
    else 
    
        {

         try{
          setloginprocess(true);
           let headers=new Headers();
           headers.append('Content-type','application/json');
           const response=await fetch('https://demotestingapi.herokuapp.com/signin',
           {
             method:'POST',
             headers:headers,
             body:JSON.stringify({
              email:email,
              password:password,
             })
           }
           );
           const api=await response.json();
          console.log(api);

          if(api.success===true)
          {
            await AsyncStorage.setItem('user',api.data.user.uid);
            // localStorage.setItem("user",api.data.user.uid);
            setloginprocess(false)
            navigation.navigate('Home');
          }
          else 
          {
            setloginprocess(false)
            alert( api.message);
          }


         }catch(e){
          setloginprocess(false)
           console.log(e);

         }
        }
      }

    


  return (
    <SafeAreaView>
     
       <TextInput
        style={styles.input}
        onChangeText={setemail}
        //value={text}
        placeholder="Email ID"
       
      />
      <TextInput
      secureTextEntry={true}
        style={styles.input}
        onChangeText={setpassword}
        //value={text}
        placeholder="Password"
       
      />
        {
        loginprocess ?
        <Button
        title="Loading.."
         />
         :
      <Button
        title="Login"
        onPress={() =>login()} />
      }
     
    </SafeAreaView>
    
  );
};






const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

const Stack = createNativeStackNavigator();

export default UselessTextInput;