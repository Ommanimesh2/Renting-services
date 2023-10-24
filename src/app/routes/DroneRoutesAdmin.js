import React from 'react'
import {StyleSheet, Text, View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RentDrones from '../../features/DroneAdmin/RentDrones';
import AddRentDrone from '../../features/DroneAdmin/AddRentDrone';
import Vieworders from '../../features/DroneAdmin/Vieworders';
import ViewQueries from '../../features/DroneAdmin/ViewQueries';

const DroneRoutesAdmin = () => {
    const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ViewRentDrones"
        component={RentDrones}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              // style={styles.bottomTabIcon}
              source={require('../assets/Machines.png')}
            />
          ),

          tabBarActiveTintColor: '#0F623D',
          tabBarInactiveTintColor: 'gray',
          tabBarLabel: 'Rent',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="AddDrones"
        component={AddRentDrone}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              // style={styles.bottomTabIcon}
              source={require('../assets/Add.png')}
            />
          ),
          tabBarLabel: 'Add',
          tabBarActiveTintColor: '#0F623D',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="OrdersDrone"
        component={Vieworders}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              // style={styles.bottomTabIcon}
              source={require('../assets/category.png')}
            />
          ),
          tabBarLabel: 'Orders',
          tabBarActiveTintColor: '#0F623D',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="QuerysDrone"
        component={ViewQueries}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              style={{height: 30, width: 30}}
              source={require('../assets/query.png')}
            />
          ),
          tabBarLabel: 'Query',
          tabBarActiveTintColor: '#0F623D',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  )
}

export default DroneRoutesAdmin
