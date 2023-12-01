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
              source={require('../assets/Machines.png')}
            />
          ),

          tabBarActiveTintColor: '#0F623D',
          tabBarInactiveTintColor: 'gray',
          tabBarLabel: 'Rent',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default OperatorRoutes;

const styles = StyleSheet.create({});
