import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, StyleSheet, Text, View,SafeAreaView, TouchableOpacity,Image } from 'react-native';
import Constants from "expo-constants";
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function CategoryList(props) {
    const products = props.products;

    function handleSelectProduct(event) {
        props.onPress(event);
        console.log("even pressed ",event.productname)
      }

  return (
    <SafeAreaView styles={styles.container}>
        <View style={styles.shadow}>
      <FlatList 
      style={styles.flatlist}
      keyExtractor={(item,index) => item._id}
      data = {products}
      renderItem = {itemData =>
        <TouchableOpacity onPress={() => handleSelectProduct(itemData.item)}>
        <View style={styles.single}>
        <Image style={styles.image} 
        source={{uri:Constants.manifest.extra.URL+'/image/'+itemData.item.category}}/>
        <View>
        <Text style={styles.text}> {itemData.item.productname.replace(" RJ","")}</Text>
        <Text style={styles.deal}>Available stores {'>'}</Text> 
        </View>
        </View>
        </TouchableOpacity>
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
      marginTop:10,
      width:200
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
        backgroundColor:'#ffe6f9',
      paddingVertical:20,
      paddingHorizontal:10,
      borderRadius:20
    },
    deal:{
        fontSize:14,
        paddingLeft:14,
        fontWeight:'bold',
        marginLeft:160,
        marginTop:0
    },
      icon:{
          marginTop:18,
          color:'#909090',
          height:40,
          paddingLeft:5,
          width:40,
          justifyContent:'flex-start',
          marginRight:10,
          marginLeft:30
      }
});
