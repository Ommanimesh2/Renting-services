import React,{useState} from 'react'
import {StyleSheet, Text, View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RentDrones from '../../features/DroneAdmin/RentDrones';
import AddRentDrone from '../../features/DroneAdmin/components/AddRentDrone';
import Vieworders from '../../features/DroneAdmin/Vieworders';
import ViewQueries from '../../features/DroneAdmin/ViewQueries';
import HomeDrone from '../../features/DroneAdmin/HomeDrone';
import Maintainers from '../../features/DroneAdmin/Maintainers';
import AdmionProfile from '../../features/DroneAdmin/AdmionProfile';

const DroneRoutesAdmin = () => {
    const Tab = createBottomTabNavigator();
    const [selectedTab, setSelectedTab] = useState('OrdersDrone');

    const handleTabPress = (tabName) => {
      setSelectedTab(tabName);
    };

  return (
    <Tab.Navigator>
        <Tab.Screen
        name="OrdersDrone"
        component={Vieworders}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              // style={styles.bottomTabIcon}
              source={require('../../features/DroneAdmin/assets/home.png')}

            />
          ),
          tabBarLabel: 'Orders',
          tabBarActiveTintColor: '#0F623D',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        }}
      />
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
            source={ require('../../features/DroneAdmin/assets/category.png') }
          />
          ),

          tabBarActiveTintColor: '#0F623D',
          tabBarInactiveTintColor: 'gray',
          tabBarLabel: 'All Drones',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Maintainer"
        component={Maintainers}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              // style={styles.bottomTabIcon}
              source={require('../../features/DroneAdmin/assets/login.png')}

            />
          ),
          tabBarLabel: 'Maintainers',
          tabBarActiveTintColor: '#0F623D',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        }}
      />
    
      <Tab.Screen
        name="Profile"
        component={AdmionProfile}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              // style={styles.bottomTabIcon}
              source={require('../../features/DroneAdmin/assets/login.png')}

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
