import React from 'react'
import { View,Text,StyleSheet,Image } from 'react-native'
import {useDispatch, useSelector} from 'react-redux';
import { Avatar } from 'react-native-elements';
import Header from '../../app/components/Header';
import { useGetDroneByAdminIdQuery } from '../../app/api/apiSlice';

const AdmionProfile = () => {
  const {currUser, loading} = useSelector(state => state.user);
     console.log(currUser?.id)
     let DroneComp=[];
     const {
        data: DroneCenter,
        isSuccess: adminDrone,
        isLoading,
        error,
      } = useGetDroneByAdminIdQuery(currUser?.id, {
        enabled: !!currUser,
      });
      if (adminDrone) {
        console.log(DroneCenter[0]?.id);
        console.log(DroneCenter, 'drone lele');
        DroneComp = DroneCenter;
      }

  return (
    <View>
<Header text='Profile'/>

<View style={styles.container} >
      <View style={styles.profileContainer}>
        <Image
          rounded
          source={require('./assets/bxs_user-x.png')} // Replace with your profile image source
          size="large"
          containerStyle={styles.avatar}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.title}>{DroneComp[0]?.Name_Drone}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Username</Text>
          <Text>{currUser?.username}</Text>
        </View>
        
        
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Name of Head</Text>
          <Text>{DroneComp[0]?.Name_of_Head}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Email</Text>
          <Text>{currUser?.email}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Contact</Text>
          <Text>{DroneComp[0]?.Contact_Drone}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Address</Text>
          <Text>{DroneComp[0]?.Address}</Text>
        </View>
      </View>
    </View>
      
      
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      color:'black',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      color: 'black', // Title color
    },
    profileContainer: {
      width:'80%',
      marginTop:30,
      marginBottom:30,
      height:450,
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      elevation: 5, // Change the value to adjust the shadow depth
      borderRadius: 10,
    },
    avatar: {
      marginBottom: 20,
    },
    profileInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      marginTop:15,
    },
    label: {
      fontWeight: 'bold',
      marginRight: 10,
      color: '#555', // Label color
    },
    text: {
      color: '#777', // Text color
    },
  });

export default AdmionProfile
