import React, { useState,useEffect } from 'react';
import {StyleSheet, Text, View,Image,Alert,AlertIOS} from 'react-native';
import CategoryList from '../components/CategoryList'
import {SearchBar} from 'react-native-elements';
import SyncStorage from 'sync-storage';
import Constants from "expo-constants";
import { TouchableOpacity } from 'react-native';

export default function Home({route,navigation}) {
  const [searchVal, setSearchVal] = useState('');
  const [categories,setCategories] = useState([]);
  const [notification,setNotification] = useState(false);
  const [receipt,setReceipt] = useState({})
  var timer 

  if(navigation.params!=undefined){
    console.log("route.params ",route.params)
    setNotification(route.params.uploaded)
  }

  var user = SyncStorage.get('currentUser');
  var isLoggedIn = SyncStorage.get('isLoggedIn');
  
  function handleSelectCategory(category){
    console.log("category clicked ",category.name)
    //navigateToProducts(category.name)
    navigation.navigate('Product', {
      category: category.name,
    });

  }

  const saveShopname = async (shopname,id) => {
    console.log("shopname , id ",shopname,id)
    try {
        let response = await fetch(
        Constants.manifest.extra.URL+'/receipt/save',{
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
                    'Accept':'application/json' },
          body: JSON.stringify({
            shopname:shopname,
            id:id
          })
          
        });
      let data = await response.json();
    } catch (error) {
       console.error(error);
    }
  };

  const onYes = (id) => {
    clearInterval(timer)
    console.log("calling yes",id)
    setNotification(false)
    try {
        let response = fetch(
        Constants.manifest.extra.URL+'/receipt/saveyes/'+id
          
      );
    } catch (error) {
       console.error(error);
    }
  }


  const onNo = (id) => {
    clearInterval(timer)
    setNotification(false)
    console.log("calling alert")
    Alert.prompt(
      "Enter Shop Name",
      "Enter the shop name of your uploaded receipt",
      [
        {
          text: "OK",
          onPress: (shopname) => saveShopname(shopname,id)
        }
      ],
    );
  }

  const showNotification = () =>{
    Alert.alert(
      "SHOP NAME",
      "Is "+receipt.shopname +" the shop name?",
      [
        {
          text: "YES",
          onPress: () => onYes(receipt._id),
        },
        { text: "NO", 
          onPress: () => onNo(receipt._id)}
      ]
    );
  }

  const sendtimedreq = async() =>{
    user = SyncStorage.get('currentUser');
    console.log("timer called for ",user)

    try {
      let response = await fetch(
      Constants.manifest.extra.URL+'/receipt/getreview/'+user
    );
    let data = await response.json();
    if(data.shopname!=undefined){
    console.log("data.shop ",data.shopname)
    setNotification(true)
    setReceipt(data);
    }else{
      setNotification(false)
    }
    } catch (error) {
     console.error(error);
    }
  }



  useEffect(() => {
    timer = setInterval(sendtimedreq,60000)
  }, [navigation]);

  

  const getCategories = async () => {
    try {
        let response = await fetch(
        Constants.manifest.extra.URL+'/category/all'
      );
      let data = await response.json();
      setCategories(data);
    } catch (error) {
       console.error(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return(
  <View style={styles.container}>
        <View style={styles.bar}>
        <Image style={styles.image}
      source={require('../assets/icon.png')} />
      
      <Text style={styles.head}>Save Better</Text>
      
        </View>
        {notification?
        <TouchableOpacity
        onPress={showNotification} >
      <Image style={styles.notification}
      source={require('../assets/bell.png')}/>
      </TouchableOpacity>:null}
        <View style={styles.categoryList}>
        <CategoryList categories={categories}
        onPress={handleSelectCategory} />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'

    },
    search:{
        flex:1,
        backgroundColor:'white',
        marginTop:50
    },
    categoryList:{
      flex:1,
        marginTop:20,
        backgroundColor:'white'
    },
    heading:{
        fontSize:30,
        textAlign:'center',
        marginBottom:-20,
        marginTop:10,
    },
    bar:{
        flexDirection:'row',
        height:50,
        width:'100%',
        backgroundColor:'white',
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        marginTop:0,
        backgroundColor:'#e0e0e0'

    },
    image:{
        height:44,
        width:44
    },
    notification:{
      height:40,
      width:40,
      marginLeft:360,
      marginTop:5,
      marginBottom:-20
    },
    head:{
        fontSize:30,
        padding:5
    },
    sort:{
      marginLeft:300,
      marginTop:0
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    line:{
      borderBottomColor:'#a1a1a1',
      borderBottomWidth:1,
      marginHorizontal:10
  },
  text:{
    fontSize:20,
    padding:10
  }
});

