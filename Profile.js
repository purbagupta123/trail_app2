import React, { useEffect, useState } from "react";
import { SafeAreaView, Button, StyleSheet, TextInput,Alert,} from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



//const UselessTextInput = () => {
  const UselessTextInput = ({navigation}) => {
    const [text, onChangeText] = React.useState("");
    const [number, onChangeNumber] = React.useState();
      const [fullName, setfullName] = React.useState('');
      const [PhNo, setPhNo] = React.useState('');
      // const [email, setemail] = React.useState('');
      // const [password, setpassword] = React.useState('');
      const [count, setCount] = React.useState(0);
      const [data,setData]=useState([])
      const [userid,setuserid]= React.useState(null);setupdateScreen
      const [updateScreen, setupdateScreen] = React.useState(false);
      
      function HomeScreen({ navigation }) {
        const [count, setCount] = React.useState(0);
      
        React.useLayoutEffect(() => {
          navigation.setOptions({
            headerRight: () => (
              <Button onPress={() => setCount((c) => c + 1)} title="Update count" />
            ),
          });
        }, [navigation, setCount]);
      
        return <Text>Count: {count}</Text>;
      }
      
    
     
     useEffect(()=>{
       Call();
     },[])


      const Call = async()=>{
        try{
          const userid = await AsyncStorage.getItem('user');
          if (userid !== null) {
        
          const api = await fetch('https://demotestingapi.herokuapp.com/getprofiledetails?id='+userid,
          {
            method:'GET',
          })
          const convert =await api.json();
          console.log(convert);
          if(convert.success===true)
          {
           
            setfullName(convert.data.name)
            setPhNo(convert.data.phone)
            // setemail(convert.data.email)
            // setpassword(convert.data.password)



            await AsyncStorage.getItem('user',api.data);
            // setsignupprocess(false)
          }
        }
          }catch(e){
         console.log(e)
        }
      

      }


  console.warn(data)



  
  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('user')
      navigation.navigate('WelcomeScreen');
    } catch(e) {
      
      console.log(e)
    }
    
  }

  const update = async() =>{

    try{
      setupdateScreen(true);
       let headers=new Headers();
       headers.append('Content-type','application/json');
       const response=await fetch('https://demotestingapi.herokuapp.com/updateuser',
       {
         method:'POST',
         headers:headers,
         body:JSON.stringify({
           id:await AsyncStorage.getItem('user'),
          name:fullName,
              phone:PhNo,
              // email:email,
              // password:password,
         })
       }
       );
       const updateapi=await response.json();
      console.log(updateapi);

      if(updateapi.success===true)
      {alert(
        "Your Profile Updated Successfully",)}
      // {
      //   await AsyncStorage.setItem('user',api.data.user.uid);
      //   // localStorage.setItem("user",api.data.user.uid);
      //   setloginprocess(false)
      //   navigation.navigate('Welcome_Screen');
      // }
      // else 
      // {
      //   setloginprocess(false)
      //   alert( api.message);
      // }
//setupdateScreen
      

     }catch(e){
      setupdateScreen(false)
       console.log(e);

     }
    }
  




      return (
        <SafeAreaView>
           <TextInput
            style={styles.input}
            onChangeText={(setfullName)}
            //title={text}
            value={fullName}
            onChange={(e)=>setfullName(e.target.value)}
            placeholder="Full Name"
          />
           <TextInput
            style={styles.input}
            onChangeText={setPhNo}
            value={PhNo}
            onChange={(e)=>setPhNo(e.target.value)}
            placeholder="Phone No"
          />
          {/* <TextInput
            style={styles.input}
            onChangeText={setemail}
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            placeholder="Email ID"
           
          />
          <TextInput
            style={styles.input}
            onChangeText={setpassword}
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            placeholder="Password"
           
          /> */}





        <Button
        title="Update"
        onPress={() =>update()} />
    

<Button
        title="Logout"
        onPress={() =>removeValue()} />
    </SafeAreaView>
    
  );
      } 
     
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});





  
export default UselessTextInput;