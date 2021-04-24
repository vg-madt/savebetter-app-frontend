import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React,{useEffect,useState} from 'react';

import Home from '../screens/Home';
import AddReceipt from '../screens/AddReceipt';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Settings from '../screens/Settings';
import Saving from '../screens/Saving';
import Deal from '../screens/Deal';
import Product from '../screens/Product';
import ProductDetail from '../screens/ProductDetail';
import Recommendation from '../screens/Recommendation';
import Search from '../screens/Search';
import SyncStorage from 'sync-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';




const Stack = createStackNavigator();

function StackNav({navigation}) {

  return (
      <Stack.Navigator>
        <Stack.Screen name='Settings' component={Settings} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />

        <Stack.Screen name='Add Receipt' component={AddReceipt} />
        <Stack.Screen name='Saving' component={Saving} />
        <Stack.Screen name='Recommendations' component={Recommendation} />
      </Stack.Navigator>
  );
}

function CategoryStack({navigation}) {

  return (
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Product' component={Product} />
        <Stack.Screen name='Product Detail' component={ProductDetail} />
        
      </Stack.Navigator>
  );
}

function SearchStack({navigation}) {

  return (
      <Stack.Navigator>
        <Stack.Screen name='Search' component={Search} />
        <Stack.Screen name='Product Detail' component={ProductDetail} />
        
      </Stack.Navigator>
  );
}

const Tab = createMaterialBottomTabNavigator();

export default function MyTabs({navigation}) {
  var isLoggedIn = SyncStorage.get('isLoggedIn');
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("focused")
  }, [isLoggedIn]);
  return (
    <NavigationContainer independent={true}>
    <Tab.Navigator
    activeColor="white"
    inactiveColor="#a0e0e0"
    tabBarOptions={{ showIcon: true, showLabel: false }}
    barStyle={{ backgroundColor: '#152026', height: 80, paddingTop:10 }}>
      <Tab.Screen name="Home" 
      component={CategoryStack} options={{
              tabBarIcon: (tabInfo) => (
                <Icon name="home" size={18} color={tabInfo.color} />
              ),
            }}/>

      <Tab.Screen name="Deals" component={Deal} options={{
        tabBarIcon: (tabInfo) => (
          <Icon name="exclamation-circle" size={18} color={tabInfo.color} />
        ),
      }} />

         <Tab.Screen name="Search" component={SearchStack} options={{
        tabBarIcon: (tabInfo) => (
          <Icon name="search" size={18} color={tabInfo.color} />
        ),
      }} />    

      <Tab.Screen name="Settings" children={StackNav} options={{
              tabBarIcon: (tabInfo) => (
                <Icon name="cog" size={18} color={tabInfo.color} />
              ),
            }}/>
    </Tab.Navigator>
    </NavigationContainer>
  );
}
