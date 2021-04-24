import React,{useState,useEffect} from 'react';
import { ActivityIndicator,FlatList, StyleSheet, Text,View,Modal,Alert,Image} from 'react-native';
import { TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import Loader from 'react-loader-spinner'
import { ImageBrowser } from 'expo-image-picker-multiple';
import { cloneElement } from 'react';
import SyncStorage from 'sync-storage';




export default function AddReceipt({ navigation }) {
    const [isLoading, setLoading] = useState(false)
    const [imageData, setImageData] = useState([])
    const [email, setEmail] = useState('');
    const [URI,setURI] = useState('')
    var filename = 0;
    const date = new Date()

    var currentuser = SyncStorage.get('currentUser');

    const pickImage = async () => {
      setLoading(false)
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
          filename:filename
        });
    
        //console.log(result);
    
        if (!result.cancelled) {
          setImageData(old => [...old,result]);
          setURI(result.uri)
          filename = filename+1
          //console.log("result ",imageData)
        }
      };

      const uploadImage = async() => {
        //setLoading(true)
        setImageData([])
        createThreeButtonAlert()
        for(var i=0;i<imageData.length;i++){
        try{
          var r = await fetch( 'http://localhost:3000/receipt/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            body: addImageData(imageData[i],{customeremail:currentuser,date:date.toISOString()},i)
            
          });

        }catch(e){
          console.log(e)
        }
      }
      try{
        var r = await fetch( 'http://localhost:3000/receipt/analyse', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            'Accept':'application/json' },
          body: JSON.stringify(
            {customeremail:currentuser,date:date.toISOString()})
      })
      /*let response = await r.json()
      if(response){
        //setLoading(false)
        //createThreeButtonAlert(respose.shopname)
      }
      console.log("shop name ",response)*/
      
      
      }catch(e){
        console.log(e)
      }
      }

    const addImageData = (imageData,body,i) => {
      //console.log("body ",body)
        const data = new FormData();
        data.append('receipt', {
          name: body.customeremail+'_'+body.date,
          type: imageData.type,
          destination:'./receipts/'+body.customeremail+body.date,
          uri: Platform.OS === 'ios' ? imageData.uri.replace('file://', '') : imageData.uri,
        });
      
        data.append('customeremail',body.customeremail)
        data.append('date',body.date)
    
   // data.append()
        //console.log("data ",data)
          return data;
    }

    const createThreeButtonAlert = () =>
    Alert.alert(
      "Receipts Uploaded",
      "You have uploaded your receipts",
      [
        { text: "OK", onPress: () => navigation.navigate('Home', {
          uploaded: true,
        })}
      ]
    );


    return (
      <View style={styles.container}>
        <Text style={{fontSize:20,marginTop:-20,marginLeft:20}}>Add Receipts</Text>
      <FlatList style={styles.flatlist}
  data={imageData}
  renderItem={({ item }) => (
      <Image style={styles.modalImage} source={{uri:item.uri}}/>

  )}
  //Setting the number of column
  numColumns={3}
  keyExtractor={(item, index) => index.toString()}
/>
<ActivityIndicator style={{marginTop:-400}} size="large" animating={isLoading} />
            <View style={{flexDirection:'row',justifyContent:'center'}}>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={{fontSize:15,textAlign:'center'}}>Choose</Text></TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={uploadImage}>
            <Text style={{fontSize:15, textAlign:'center'}}>Upload All</Text></TouchableOpacity>
            </View>
            
      </View>
    );
    }

  const styles = StyleSheet.create({
    container: {
      height:'100%',
      backgroundColor: '#fff',
      paddingTop:50
    },
    
    flatlist:{
        alignContent:'center',
        marginLeft:20
    },
      modalImage:{
        height:100,
        width:100,
        margin:10,
        marginBottom:10
      },
    button:{
      paddingHorizontal:10,
      paddingVertical:10,
      margin:10,
      width:120,
      borderRadius:35,
      backgroundColor:'#b0e0e0'
    }
  });