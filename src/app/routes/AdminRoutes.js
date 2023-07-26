import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AddRentMachines from '../../features/admin/AddRentMachines';
import RentMachines from '../../features/admin/RentMachines';
import ViewRentedMachines from '../../features/admin/ViewRentedMachines';
import {useSelector} from 'react-redux';
import ViewAllQuerys from '../../features/admin/ViewAllQuerys';
import {isLoggedIn} from '../../features/admin/Slices/authSlice';
import {getCredentials} from '../../helpers/credentials';
import {useEffect, useState} from 'react';
const Tab = createBottomTabNavigator();

const AdminRoutes = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ViewRentMachines"
        component={RentMachines}
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
        name="AddMachine"
        component={AddRentMachines}
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
        name="Orders"
        component={ViewRentedMachines}
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
        name="Querys"
        component={ViewAllQuerys}
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
  );
};

export default AdminRoutes;

const styles = StyleSheet.create({});
