import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, StyleSheet, Text, View,SafeAreaView, TouchableOpacity,Image } from 'react-native';
import Constants from "expo-constants";
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function CategoryList(props) {
    const categories = props.categories;
    var v;
    function handleSelectCategory(event) {
      props.onPress(event);
      console.log("even pressed ",event.name)
    }
  return (
    <SafeAreaView styles={styles.container}>
        <View style={styles.shadow}>
      <FlatList 
      style={styles.flatlist}
      keyExtractor={(item,index) => item._id}
      data = {categories}
      renderItem = {itemData =>
        
        <TouchableOpacity onPress={() => handleSelectCategory(itemData.item)}> 
        <View style={styles.single}>
        <Image style={styles.image} source={{uri:Constants.manifest.extra.URL+'/image/'+itemData.item.name}}/>
        <Text style={styles.text}> {itemData.item.name}</Text>
        <Icon style={styles.icon} name="chevron-right" size={20}/>
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
      marginTop:20,
      height:40,
      width:220
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
        backgroundColor:'#cef2cb',
      paddingVertical:20,
      paddingHorizontal:10,
      borderRadius:20
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
