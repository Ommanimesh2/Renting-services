import React,{useState} from 'react'
import {StyleSheet, Text, View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RentDrones from '../../features/DroneAdmin/RentDrones';
import AddRentDrone from '../../features/DroneAdmin/components/AddRentDrone';
import Vieworders from '../../features/DroneAdmin/Vieworders';
import ViewQueries from '../../features/DroneAdmin/ViewQueries';
import HomeDrone from '../../features/DroneAdmin/HomeDrone';

const DroneRoutesAdmin = () => {
    const Tab = createBottomTabNavigator();
    const [selectedTab, setSelectedTab] = useState('OrdersDrone');

    const handleTabPress = (tabName) => {
      setSelectedTab(tabName);
    };

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ViewRentDrones"
        component={HomeDrone}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            handleTabPress('Home');
          },
        })}
        options={{
          tabBarIcon: ({color}) => (
            <Image
            source={
              selectedTab === 'Home'
                ? require('../../features/DroneAdmin/assets/login.png')
                : require('../../features/DroneAdmin/assets/home.png')
            }
          
          />
          ),

          tabBarActiveTintColor: '#0F623D',
          tabBarInactiveTintColor: 'gray',
          tabBarLabel: 'Rent',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="RentDrones"
        component={RentDrones}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              // style={styles.bottomTabIcon}
              source={require('../../features/DroneAdmin/assets/login.png')}

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
              source={require('../../features/DroneAdmin/assets/category.png')}

            />
          ),
          tabBarLabel: 'Orders',
          tabBarActiveTintColor: '#0F623D',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  )
}

export default DroneRoutesAdmin
