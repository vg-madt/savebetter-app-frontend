import React, { useState,useEffect } from 'react';
import {StyleSheet, Text, View,Image} from 'react-native';
import {SearchBar} from 'react-native-elements';
import ProductList from '../components/ProductList'
import Constants from "expo-constants";

export default function Home({navigation}) {
  const [searchVal, setSearchVal] = useState('');
  const [products,setProducts] = useState([]);
  const [count,setCount] = useState(0);


  const getProducts = async () => {
    try {
      let response = await fetch(
        Constants.manifest.extra.URL+'/product/search/'+searchVal
      );
      let data = await response.json();
      setProducts(data);
      console.log("products searched ",data)
    } catch (error) {
       console.error(error);
    }
  };

  const handleSearch = () => {
    console.log('product searched ',searchVal);

    if(searchVal.length>2){  
        getProducts();
    }
}

function handleSelectProduct(product){
    console.log("category clicked ",product)
    //navigateToProducts(category.name)
    navigation.navigate('Product Detail', {
      product: product,
    });

  }

  /*useEffect(() => {
    getProducts();
  }, [searchVal]);*/

  return(
  <View style={styles.container}>
        <View style={styles.search}>
        <SearchBar
        placeholder="Search Product"
        darkTheme={true}
        value={searchVal}
        onChangeText={(value) => {setSearchVal(value); handleSearch(value);}}/>
        </View>

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
        backgroundColor:'white'
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

