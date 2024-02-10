import React from 'react';

import {useEffect} from 'react';
import {StyleSheet, Pressable, Image, Text, View} from 'react-native';
import Header from '../../app/components/Header';
import {getCredentials} from '../../helpers/credentials';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrUser} from '../admin/Slices/userSlice';
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
  return (
    <>
      <Header text="Your Drones" />
      <View style={styles.HomeDronesContainer}>
        <Image source={require('./assets/drone.png')} />
        <Text style={styles.hometxt}>Oops! No Drones to show</Text>
        <Pressable
          style={styles.AddButton}
          onPress={() => {
            navigation.navigate('AddDrones');
          }}>
          <Text style={styles.buttontxt}>Add Drones</Text>
        </Pressable>
      </View>
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
    background: 'rgba(15, 98, 61, 0.04)',
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
