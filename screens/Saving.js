import React, { useState,useEffect } from 'react';
import {StyleSheet, Text, View,FlatList} from 'react-native';
import SyncStorage from 'sync-storage';
import Constants from "expo-constants";



export default function Saving({navigation}) {
    const [receipts,setReceipts] = useState([]);
    var user = SyncStorage.get('currentUser');

    const getUserReceipts = async () =>{
        try {
          let response = await fetch(
            Constants.manifest.extra.URL+'/receipt/getreceipts/'+user
          );
          let data = await response.json();
          setReceipts(data);
        } catch (error) {
           console.error(error);
        }
      }
     
      useEffect(() => {
        getUserReceipts();
      }, []);



  return (
    <View style={styles.container}>
      <View style={styles.shadow}>
        <FlatList 
        keyExtractor={(item,index) => index.toString()}
        data = {receipts}
        renderItem = {itemData =>
      
                <View style = {styles.flatlist}>
                
                <View>
                <Text style={styles.textbold}> You have saved ${itemData.item.saved.toFixed(2)}</Text>
                <Text style={styles.text}> On {itemData.item.date.replace("§","TOTAL: $")}</Text>
             
                <Text style={styles.text}> @ {itemData.item.shopname}</Text> 
                <Text style={styles.text}>On Slip Number {itemData.item.slipnumber}</Text> 
                </View>
            </View>
          
            }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    text:{
        paddingHorizontal:2,
        marginLeft:10,
        textAlign:'left',
        fontSize:14,
        marginTop:10,
        width:300
    },
    textbold:{
        paddingHorizontal:2,
        marginLeft:10,
        textAlign:'left',
        fontSize:14,
        marginTop:10,
        fontWeight:'bold',
        width:300
    },
    shadow:{
  
      shadowColor: "#000",
      shadowOffset: {
          width: 2,
          height: 3,
      },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 1,
      //backgroundColor:'#000'
    },
    flatlist:{
        alignContent:'center',
        marginVertical:10,
          marginHorizontal:10,
          backgroundColor:'#BBDEFB',
        paddingVertical:20,
        paddingHorizontal:10,
        borderRadius:20
    }
  });
  