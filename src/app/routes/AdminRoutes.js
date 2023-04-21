import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AddRentMachines from '../../features/admin/AddRentMachines';
import RentMachines from '../../features/admin/RentMachines';
import ViewRentedMachines from '../../features/admin/ViewRentedMachines';
import {useSelector} from 'react-redux';
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

          tabBarActiveTintColor: 'green',
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
          tabBarActiveTintColor: 'green',
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
              source={require('../assets/Home.png')}
            />
          ),
          tabBarLabel: 'Orders',
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default AdminRoutes;

const styles = StyleSheet.create({});
