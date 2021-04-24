import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, StyleSheet, Text, View,SafeAreaView, TouchableOpacity,Image } from 'react-native';
import Constants from "expo-constants";
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function DealList(props) {
    const products = props.products;
    var v;

  return (
    <SafeAreaView styles={styles.container}>
        <Text style={styles.heading}>Hot Deals!</Text>
        <View style={styles.shadow}>
      <FlatList 
      style={styles.flatlist}
      keyExtractor={(item,index) => item._id}
      data = {products}
      renderItem = {itemData =>
        
        <View style={styles.single}>
         <Image style={styles.image} source={{uri:Constants.manifest.extra.URL+'/image/'+itemData.item.available[itemData.item.available.length-1].deal.dealtype}}/>
        <View>
        <Text style={styles.text}> {itemData.item.productname}</Text>
        <Text style={styles.shop}> {itemData.item.available[itemData.item.available.length-1].shopname}</Text>
        <Text style={styles.deal}> {itemData.item.available[itemData.item.available.length-1].deal.description}</Text>
        </View>
        </View>  
        }
      />
      </View>
    </SafeAreaView>
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
      fontSize:20,
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
  image:{
    height:60,
    width:60,
    borderRadius:10,
    marginLeft:10,
  },
  flatlist:{
      alignContent:'center',
  },
  single:{flexDirection:'row',
        marginVertical:10,
        marginHorizontal:10,
        backgroundColor:'#ffe0b8',
      paddingVertical:20,
      paddingHorizontal:10,
      borderRadius:20
    },
    shop:{
        fontSize:14,
        paddingLeft:14,
    },
    deal:{
        fontSize:14,
        paddingLeft:14,
        fontWeight:'bold'
    },
    heading:{
        fontSize:30,
        fontWeight:'bold',
        marginLeft:10,
        marginTop:20
    }

});
