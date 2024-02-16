import React, {useState, useEffect} from 'react';
import {StyleSheet, Pressable, Image, Text, View,TouchableHighlight,TouchableOpacity} from 'react-native';
import Header from '../../app/components/Header';
import {getCredentials} from '../../helpers/credentials';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrUser} from '../admin/Slices/userSlice';
import {
  useGetDroneByAdminIdQuery,
  useGetDroneRentingByAdminIdQuery,
} from '../../app/api/apiSlice';
import DroneCard from '../../app/components/Drones/DroneCard';
import Loading from '../admin/Loading';

const HomeDrone = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const giveUser = async () => {
      try {
        const user = await getCredentials();
        dispatch(setCurrUser(user));
      } catch (error) {}
    };
    giveUser();
  }, []);
  const {currUser, loading} = useSelector(state => state.user);
  const userid = currUser?.id;
  // console.log("current:",currUser);
  const [loggedInUser, setLoggedInUser] = useState([]);

  let content,
    db,
    admin,
    mainloading,
    DroneComp = [];
  useEffect(() => {
    const giveUser = async () => {
      try {
        const use = await getCredentials();
        setLoggedInUser(use);
        // console.log(use,"hello");
      } catch (error) {}
    };
    giveUser();
  }, []);

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
    data: dronerRentings,
    isSuccess,
    isLoading,
  } = useGetDroneRentingByAdminIdQuery(DroneComp[0]?.id, {
    enabled: !!DroneComp,
  });

  if (isSuccess) {
    console.log(dronerRentings);

    if (dronerRentings?.length > 0) {
      content = dronerRentings?.map(item => {
        return <DroneCard props={item}/>
      });
    } else {
      content = <View style={styles.HomeDronesContainer}>
      <Image source={require('./assets/drone.png')} />
      <Text style={styles.hometxt}>Oops! No Drones to show</Text>
      <Pressable
        style={styles.AddButton}
        onPress={() => {
          navigation.navigate('AddDrones');
        }}>
        <Text style={styles.buttontxt}>Add Drones</Text>
      </Pressable>
    </View>;
    }
  } else if (error) {
    console.log(error);
  } else if (isLoading) {
    mainloading = isLoading;
  }

  return (
    <>
      <Header text="Your Drones" />
      {
        isLoading ? <Loading/>
        :
        <>
        {content}
        <TouchableHighlight onPress={() => {
          navigation.navigate('AddDrones');
        }}  style={{backgroundColor:'#0F623D',borderRadius:4,width:'40%',paddingVertical:8,paddingHorizontal:12,position:'absolute',bottom:'5%',right:'5%'}}>
        <View>        
<Text style={{color: '#FFF',

textAlign: 'center',
fontFamily: 'Sora',
fontSize: 16,
fontWeight: 400 }}>+ Add Drone</Text>        
</View>
        </TouchableHighlight>
        </>
      }
    </>
  );
};

export default HomeDrone;

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
