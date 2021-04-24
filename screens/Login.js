import React,{useState} from 'react';
import { FlatList, StyleSheet, Text, SafeAreaView,View,Button,Image,AsyncStorage} from 'react-native';
import { TextInput, TouchableOpacity,TouchableHighlight } from 'react-native-gesture-handler';
import SyncStorage from 'sync-storage';
import Constants from "expo-constants";
import { Alert } from 'react-native';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user,setUser] = useState([]);

  const login = async () => {
    let data
    try{

      var r = await fetch(Constants.manifest.extra.URL+'/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                  'Accept':'application/json' },
        body: JSON.stringify({
          email:email,
          password:password
        })
        
      });
      data = await r.json();
      console.log('value ',data)
      if(data.message!=="Login Success"){
        Alert.alert(
          "Invalid User",
          "Your password or username is incorrect. Please try again",
          [
            { text: "OK", onPress: () => console.log("incorrect login")}
          ]
        );
        //SyncStorage.set('currentUser', "Guest");
      }else{
          SyncStorage.set('currentUser', data.email);
          SyncStorage.set('isLoggedIn',true);
          //AsyncStorage.setItem("isLoggedIn",true);
          console.log('cuser', SyncStorage.get('currentUser'));
      }
          
    } catch(e){
      console.log('post req error ',e);
      console.log('invalid user');
    }
    if(data.message){
    navigation.navigate('Settings');
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.signIn}>
        <View style={styles.imageContainer}>
      <Image style={styles.image} source={require('../assets/icon.png')} />
          
        </View>
     
        <TextInput style={styles.textInput}
        placeholder='Email' 
        value={email}
        autoCapitalize='none'
        onChangeText={(email) => setEmail(email)}/>
        <TextInput style={styles.textInput}
        placeholder='Password'
        value={password}
        autoCapitalize='none'
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
        />
        <TouchableOpacity
        style={styles.button} onPress={login}>
          <Text style={styles.text} >Login</Text>
        </TouchableOpacity>
        <View style={styles.view}>
          <Text>Not Registered? </Text><TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.click}>Register</Text>
          </TouchableOpacity>
        </View>
        </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:0,
        padding:90,
        alignItems:'center',
        backgroundColor:'#cef2cb'

    },
    signIn:{
      alignItems:'center',
      marginVertical:120
    },
    textInput:{
        borderColor:'#152026',
        height:60,
        width:340,
        borderRadius:30,
        backgroundColor:'white',
        marginVertical:10,
        paddingHorizontal:30,
        alignSelf:'center'
    },
    button:{
      borderColor:'#152026',
        height:60,
        width:340,
        borderRadius:30,
        backgroundColor:'#152026',
        marginVertical:10,
        paddingHorizontal:30,
        alignItems:'center',
        justifyContent:'center',
    },
    text:{
      fontSize:20,
      color:'#EBEFF2'
    },
    view:{
      width:400,
      padding:20,
      margin:10,
      flexDirection:'row',

      justifyContent:'center'
    },
    click:{
      color:'blue'
    },
    image:{
      height:160,
      width:160,
    },
    imageContainer:{
      backgroundColor:'white',
      borderRadius:35,
      borderWidth:1,
      borderColor:'#d0d0d0'
    }
});

