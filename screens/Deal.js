import React, { useState,useEffect } from 'react';
import {StyleSheet, Text, View,Image} from 'react-native';
import DealList from '../components/DealList'
import {SearchBar} from 'react-native-elements';
import Constants from "expo-constants";

export default function Deal({navigation}) {
  const [products,setProducts] = useState([]);

  const getDeals = async () => {
    try {
      let response = await fetch(
        Constants.manifest.extra.URL+'/product/get/deal'
      );
      let data = await response.json();
      
      getAllDeals(data);
    } catch (error) {
       console.error(error);
    }
  };

  useEffect(() => {
    getDeals();
  }, []);

  function getAllDeals(data){

      data.forEach(product => {
          product.productname = product.productname.replace(" RJ","")
          if(product.available.length>1){
              product.available.sort((a,b) => a.date > b.date)
          }
      });
      setProducts(data)

  }
  return(
  <View style={styles.container}>

        <View style={styles.categoryList}>
        <DealList products={products}/>
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
        marginTop:20,
        backgroundColor:'white',
        height:'80%'
    },

});

