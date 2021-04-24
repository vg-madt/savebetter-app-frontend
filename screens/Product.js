import React, { useState,useEffect } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Constants from "expo-constants";
import ProductList from '../components/ProductList'


export default function Product({route,navigation}) {
    console.log("navigation params ",route.params.category)
    const [products,setProducts] = useState([]);

    function handleSelectProduct(product){
        console.log("category clicked ",product)
        //navigateToProducts(category.name)
        navigation.navigate('Product Detail', {
          product: product,
        });
    
      }

    const navigateToProducts = async () =>{
        try {
          let response = await fetch(
            Constants.manifest.extra.URL+'/product/getfrom/'+route.params.category
          );
          let data = await response.json();
          setProducts(data);
        } catch (error) {
           console.error(error);
        }
      }
     
      useEffect(() => {
        navigateToProducts();
      }, []);

      return(
        <View style={styles.container}>
      
              <View style={styles.categoryList}>
              <ProductList products={products} 
              onPress={handleSelectProduct}/>
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
              backgroundColor:'white',
              marginTop:50
          },
          categoryList:{
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