import React, {useState, useEffect} from 'react';

import {StyleSheet, Text, View, Image} from 'react-native';
import { getCredentials } from '../../helpers/credentials';
import { useGetDroneOrderByAdminIdQuery,useGetDroneByAdminIdQuery } from '../../app/api/apiSlice';
import Header from '../../app/components/Header';
import DroneOrderView from '../../app/components/Drones/DroneOrder';

const Vieworders = () => {
  const [loggedInUser, setLoggedInUser] = useState([]);
  useEffect(() => {
    const giveUser = async () => {
      try {
        const use = await getCredentials();
        setLoggedInUser(use);
        console.log(use,"hello");
      } catch (error) {}
    };
    giveUser();
  }, []);
console.log(loggedInUser?.id)

let content,
db,
admin,
mainloading,
DroneComp = [];

const {
  data: DroneCenter,
  isSuccess: adminDrone,
  error,
} = useGetDroneByAdminIdQuery(loggedInUser?.id, {
  enabled: !!loggedInUser,
});
if (adminDrone) {
  console.log(DroneCenter[0]?.id);
  console.log(DroneCenter, 'drone lele');
  DroneComp = DroneCenter;
}

const {
  data: droneOrders,
  isSuccess,
  isLoading,
} = useGetDroneOrderByAdminIdQuery(loggedInUser?.id, {
  enabled: !!DroneComp,
});

if (isSuccess) {
  console.log(droneOrders);

  if (droneOrders?.length > 0) {
    content = droneOrders?.map(item => {
      return <DroneOrderView props={item} key={item.id}/>;
    });
  } else {
    content = <View style={styles.HomeDronesContainer}>
    <Image source={require('./assets/drone.png')} />
    <Text style={styles.hometxt}>Oops! No Orders to show</Text>
    {/* <Pressable
      style={styles.AddButton}
      onPress={() => {
        navigation.navigate('AddDrones');
      }}>
      <Text style={styles.buttontxt}>Add Drones</Text>
    </Pressable> */}
  </View>;
  }
} else if (error) {
  console.log(error);
} else if (isLoading) {
  mainloading = isLoading;
}

  return (
    <>
    <Header text='Orders'/>
      <Text>View Orders</Text>
      <View style={{}}>{content}</View>
    </>
  )
}

export default Vieworders
