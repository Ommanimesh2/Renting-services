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
      <View style={{}}>{content}</View>
    </>
  )
}

export default Vieworders

const styles = StyleSheet.create({
  HomeDronesContainer: {
    height: '95%',
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  AddButton: {
    marginTop: 15,
    width: '40%',
    textAlign: 'center',
    borderRadius: 1,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#0F623D',
    backgroundColor: 'rgba(15, 98, 61, 0.04)',
    color: '#0F623D',
    padding: 12,
  },
  buttontxt: {
    color: '#0F623D',
    textAlign: 'center',
    // background: 'rgba(15, 98, 61, 0.04)',
    fontSize: 17,
    fontWeight: 600,
  },
  hometxt: {
    marginTop: 10,
    color: '#2E2E2E',
    fontFamily: 'Quicksand',
    fontSize: 20,
    // fontStyle: normal,
    fontWeight: 700,
    lineHeight: 19 /* 95% */,
    // letterSpacing: 0.1,
    // textTransform: capitalize,
  },
});
