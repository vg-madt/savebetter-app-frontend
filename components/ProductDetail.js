import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, StyleSheet, Text, View,SafeAreaView, TouchableOpacity,Image } from 'react-native';
import Constants from "expo-constants";
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function ProductDetail(props) {
    const product = props.product;
  return (
    <SafeAreaView styles={styles.container}>
        <View style={styles.shadow}>
        <FlatList 
        keyExtractor={(item,index) => index.toString()}
        data = {product.available}
        renderItem = {itemData =>
            <TouchableOpacity>
                <View style = {styles.flatlist}>
                {itemData.item.deal.description!==""?
                <Image style={styles.image} source={{uri:Constants.manifest.extra.URL+'/image/'+itemData.item.deal.dealtype}}/>:null}
                <View>
                <Text style={styles.productname}> {product.productname.replace("RJ","")}</Text> 
                <Text style={styles.text}> Available at {itemData.item.shopname}</Text>
                <Text style={styles.text}> For ${itemData.item.cost}</Text>
                {itemData.item.deal.description!==""?
                <Text style={styles.deal}> Coupon: {itemData.item.deal.description}</Text> 
        :null}
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
  productname:{
    paddingHorizontal:2,
      marginLeft:10,
      textAlign:'left',
      fontSize:20,
      marginTop:5,
      fontWeight:'bold'
  },
  text:{
      paddingHorizontal:2,
      marginLeft:10,
      textAlign:'left',
      fontSize:16,
      marginTop:5
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
    height:40,
    width:40,
    borderRadius:10,
    justifyContent:'center',
    marginTop:0
  },
  flatlist:{
      alignContent:'center',
      backgroundColor:'#ccf2ff',
      marginVertical:10,
    marginHorizontal:10,
    flexDirection:'row',
        
      paddingVertical:20,
      paddingLeft:5,
      borderRadius:20
  },
    deal:{
        fontSize:14,
        paddingLeft:14,
        fontWeight:'bold',
        marginTop:0,
        color:'red'
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
