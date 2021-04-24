import React, { useState,useEffect } from 'react';
import {StyleSheet, Text, View,Image} from 'react-native';
import RecommendationList from '../components/Recommendation'
import Constants from "expo-constants";
import SyncStorage from 'sync-storage';

export default function Recommendation({navigation}) {
  const [recommendations,setRecommendations] = useState([]);
  var user = SyncStorage.get('currentUser');

  const getRecommendations = async () => {
    try {
      let response = await fetch(
        Constants.manifest.extra.URL+'/receipt/recommend/'+user
      );
      let data = await response.json();
        setRecommendations(data)
    } catch (error) {
       console.error(error);
    }
  };

  useEffect(() => {
    getRecommendations();
  }, []);

  return(
  <View style={styles.container}>

        <View style={styles.categoryList}>
        <RecommendationList recommendations={recommendations}/>
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
    },

});

