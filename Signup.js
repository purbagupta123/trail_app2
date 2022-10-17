import React from "react";
import { SafeAreaView, Button, StyleSheet, TextInput } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator } from "react-native";
import validator from 'validator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';

const UselessTextInput = ({navigation}) => {
   const [text, onChangeText] = React.useState("");
   const [number, onChangeNumber] = React.useState();
     const [fullName, setfullName] = React.useState('');
     const [PhNo, setPhNo] = React.useState('');
     const [email, setemail] = React.useState('');
     const [password, setpassword] = React.useState('');
     const [confirmpassword, setconfirmpassword] = React.useState('');
     const [signupprocess, setsignupprocess] = React.useState(false);

    const signup = async() =>{
      
  
  // console.log(password);
   //console.log(confirmpassword);


      if (validator.isEmpty(fullName)) {
        alert('Please Enter Your Name')
      }

      else if  (validator.isEmpty(PhNo)) {
        alert('Please Enter Your Phone Number')
      }
      else if  (validator.isMobilePhone(PhNo)===false){
        alert('Please Enter Your Valid Phone Number')
      }
      else if  (PhNo.length < 10) {
        alert('Please Enter Your Valid Phone Number')
      }


      else if  (validator.isEmpty(email)) {
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


      else if  (validator.isEmpty(confirmpassword)) {
        alert('Please Confirm Your Password')
      }
      else if  (confirmpassword!=password) {
        alert('Password is not Matched')
      }
     else
        
        {

         try{
          setsignupprocess(true);
           let headers=new Headers();
           headers.append('Content-type','application/json');
           const response=await fetch('https://demotestingapi.herokuapp.com/signup',
           {
             method:'POST',
             headers:headers,
             body:JSON.stringify({
              name:fullName,
              phone:PhNo,
              email:email,
              password:password,
             })
           }
           );
           const api=await response.json();
          console.log(api);
          
          if(api.success===true)
          {
            //console.log(api.data.uid)
 
            await AsyncStorage.setItem('user',api.data.uid);
            setsignupprocess(false)
            navigation.navigate('Home');
           

          }
          else 
          {
            setsignupprocess(false)
            alert( api.message);
          }

          

         }catch(e){
          setsignupprocess(false)
           console.log(e);
         }
        }
      }
    




  return (
    <SafeAreaView>
     

       <TextInput
        style={styles.input}
        onChange={(e)=>setfullName(e.target.value)}
        //title={text}
        placeholder="Full Name"
      />

       <TextInput
        style={styles.input}
        onChangeText={setPhNo}
        value={number}
        placeholder="Phone No"
      />
      <TextInput
        style={styles.input}
        onChangeText={setemail}
        //value={text}
        placeholder="Email ID"
       
      />
      <TextInput
        style={styles.input}
        onChangeText={setpassword}
        //value={text}
        placeholder="Password"
       
      />
       <TextInput
        style={styles.input}
        onChangeText={setconfirmpassword}
       // value={text}
        placeholder=" Confirm Password"
      
      />

      {
        signupprocess ?
        <Button
        title="Loading.."
         />
         :
      <Button
        title="Sign Up"
        onPress={() =>signup()} />
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