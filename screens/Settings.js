import React,{useState,useEffect} from 'react';
import { FlatList, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import SyncStorage from 'sync-storage';
import Constants from "expo-constants";
import Icon from 'react-native-vector-icons/FontAwesome5';


export default function Settings({navigation}) {

    var user = SyncStorage.get('currentUser');
    var isLoggedIn = SyncStorage.get('isLoggedIn');
    //console.log('user is logged in ',user,isLoggedIn);
    if(user === '' || user === undefined){
        user = 'Guest';
        isLoggedIn = false;
        //console.log("curent user in settings ",user);
    }else{
        user=user;
        isLoggedIn=true;
    }

    const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => count + 1);
    }, 10);

    const unsubscribe = navigation.addListener('focus', () => {
      setCount(0);
    });

    return () => {
      clearTimeout(interval);
      unsubscribe;
    };
  }, [navigation]);
    
    function toLogin(){
        navigation.navigate('Login');
    }
    function toRegister(){
        navigation.navigate('Register');
    }
    function toAddReceipt(){
        navigation.navigate('Add Receipt');
    }
    function toSaving(){
        navigation.navigate('Saving');
    }
    function toRecommendation(){
        navigation.navigate('Recommendations');
    }
    function toLogout(){
        SyncStorage.set('isLoggedIn',false);
        console.log('is logged in ',isLoggedIn);
        SyncStorage.set('currentUser','');
        //navigation.navigate('Home');
        
    }
    
  return (
    <View style={styles.container}>
        
        <Text style={styles.heading}>Welcome {user},</Text>
        {isLoggedIn == false ? <View>
            <TouchableOpacity onPress={toLogin} style={{flexDirection:'row'}}>
            <Icon style={styles.icon} name="sign-in-alt" size={20}/>
            <Text style={styles.text}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.line}></View>
        <TouchableOpacity onPress={toRegister} style={{flexDirection:'row'}}>
        <Icon style={styles.icon} name="user-edit" size={20}/>
            <Text style={styles.text}>Register</Text>
        </TouchableOpacity>
        <View style={styles.line}></View>
        </View> : <View>
        <View><TouchableOpacity onPress={toLogout} style={{flexDirection:'row'}}>
            <Icon style={styles.icon} name="sign-out-alt" size={20}/>
        <Text style={styles.text}>Sign Out</Text>
    </TouchableOpacity>
    <View style={styles.line}></View></View>
   
        <TouchableOpacity onPress={toAddReceipt} style={{flexDirection:'row'}}>
        <Icon style={styles.icon} name="receipt" size={20}/>
            <Text style={styles.text}>Add Receipt</Text>
        </TouchableOpacity>
        <View style={styles.line}></View>

        <TouchableOpacity onPress={toSaving} style={{flexDirection:'row'}}>
        <Icon style={styles.icon} name="piggy-bank" size={20}/>
            <Text style={styles.text}>Your Savings</Text>
        </TouchableOpacity>
        <View style={styles.line}></View>

        <TouchableOpacity onPress={toRecommendation} style={{flexDirection:'row'}}>
        <Icon style={styles.icon} name="exclamation-circle" size={20}/>
            <Text style={styles.text}>Recommendations</Text>
        </TouchableOpacity>
        <View style={styles.line}></View>
        </View>}
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        backgroundColor:'white'

    },
    heading:{
        fontSize:30,
        marginTop:30,
        marginBottom:10
        
    },
    line:{
        borderBottomColor:'#e0e0e0',
        borderBottomWidth:1
    },
    text:{
        fontSize:20,
        padding:15,
        marginLeft:0
      },
      icon:{
          marginTop:18,
          color:'#c0c0c0',
          height:40,
          paddingLeft:5,
          width:40
      }
});

