import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, StyleSheet, Text, View,SafeAreaView, TouchableOpacity,Image } from 'react-native';
import Constants from "expo-constants";
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Recommendation(props) {
    const recommendations = props.recommendations;
    var v;
    
  return (
    <SafeAreaView styles={styles.container}>
        <View style={styles.shadow}>
      <FlatList 
      style={styles.flatlist}
      keyExtractor={(item,index) => index.toString()}
      data = {recommendations}
      renderItem = {itemData =>
        <View style={styles.single}>
        <Text style={styles.text}>You Got {itemData.item.productname.replace("RJ","")}</Text>
        <Text style={styles.text}>from {itemData.item.userGot.shopname}</Text>
        <View style={{flexDirection:'row'}}>
        <Text style={styles.text}>on {itemData.item.userGot.date.substring(0,13)}</Text> 
        <Text style={[styles.text,{fontWeight:'bold',color:'red'}]}>for  ${itemData.item.userGot.cost}</Text>
        </View>
        <View>
        <Text style={styles.text}>We Recommend to buy from: </Text>
        <View style={{flexDirection:'row'}}>
        <Text style={[styles.text,{fontWeight:'bold'}]}>{itemData.item.minimumfound.shopname}</Text>
        <Text style={[{fontWeight:'bold',color:'blue',fontSize:16}]}>  for ${itemData.item.minimumfound.cost}</Text>
       </View>
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
      fontSize:16,
      height:40,
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
  single:{
        marginVertical:10,
        marginHorizontal:10,
        backgroundColor:'#FFF9C4',
      paddingVertical:20,
      paddingHorizontal:10,
      borderRadius:20
    }
});
