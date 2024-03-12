import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AddRentMachines from '../../features/admin/AddRentMachines';
import RentMachines from '../../features/admin/RentMachines';
import ViewRentedMachines from '../../features/admin/ViewRentedMachines';
import {useSelector} from 'react-redux';
import ViewAllQuerys from '../../features/admin/ViewAllQuerys';
import {useEffect, useState} from 'react';
import OrderList from '../../features/Operator/OrderList';
import ServiceStart from '../../features/Operator/ServiceStart';
const Tab = createBottomTabNavigator();

const OperatorRoutes = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="OrderView"
        component={OrderList}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              // style={styles.bottomTabIcon}
              source={require('../../features/DroneAdmin/assets/category.png')}
            />
          ),

          tabBarActiveTintColor: '#0F623D',
          tabBarInactiveTintColor: 'gray',
          tabBarLabel: 'Orders',
          headerShown: false,
        }}
      />
    <Tab.Screen
        name="Profile"
        component={OrderList}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              // style={styles.bottomTabIcon}
              source={require('../../features/DroneAdmin/assets/login.png')}

            />
          ),
          tabBarLabel: 'Profile',
          tabBarActiveTintColor: '#0F623D',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        }}
      />
    </Tab.Navigator>

    
  );
};

export default OperatorRoutes;

const styles = StyleSheet.create({});
