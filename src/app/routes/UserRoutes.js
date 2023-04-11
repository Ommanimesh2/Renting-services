import { StyleSheet, Text, View , Image} from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MyRentedMachines from '../../features/users/MyRentedMachines';
import AllAvalailableMachines from '../../features/users/AllAvalailableMachines';
const Tab=createBottomTabNavigator()

const UserRoutes = () => {
  return (
  <Tab.Navigator>
    <Tab.Screen 
    name="MyRentMachines" 
    component={MyRentedMachines} 
    options={{
        tabBarIcon: ({ color }) => (
          <Image
            // style={styles.bottomTabIcon}
            source={require('../assets/Home.png')                  
            }/>
       ), 
       tabBarLabel: 'Jobs' ,
       tabBarActiveTintColor: 'green',
       tabBarInactiveTintColor: 'gray',
       headerShown:false            
      }}
    />
    <Tab.Screen 
    name="ViewRentMachines" 
    component={AllAvalailableMachines} 
    options={{
        tabBarIcon: ({ color }) => (
          <Image
            // style={styles.bottomTabIcon}
            source={require('../assets/Machines.png')                  
            }/>
       ), 
       
       tabBarActiveTintColor: 'green',
       tabBarInactiveTintColor: 'gray',
       tabBarLabel: 'Rent'        ,
       headerShown:false     
      }}
    />
   
  </Tab.Navigator>
  )
}

export default UserRoutes

const styles = StyleSheet.create({})