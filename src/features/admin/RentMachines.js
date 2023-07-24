import {
  Alert,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import React from 'react';
import {useState, useEffect} from 'react';
import ScreenWrapper from '../../app/components/ScreenWrapper';
import {useGetAllRentMachinesQuery} from '../../app/api/apiSlice';
import MachineCard from '../../app/components/MachineCard';
import StallCard from '../../app/components/StallCard';
import Loading from './Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import Header from '../../app/components/Header';
const RentMachines = ({navigation}) => {
  const [allrentmachinedata, setAllRentMachineData] = useState([]);

  const {
    data: machines,
    isSuccess,
    error,
    isFetching,
    isLoading,
  } = useGetAllRentMachinesQuery();
  let content, db;
  if (isSuccess) {
    db = Array.from(machines.results);
    if (db.length > 0) {
      content = db.map(item => {
        return <StallCard key={item.id} props={item} navigation={navigation} />;
      });
    } else {
      content = <Text>No Machines to display</Text>;
    }
  } else if (error) {
    console.log(error);
  } else if (isLoading) {
  }

  return (
    <>
      <Header text="All Machines" />
      <ScreenWrapper>
        {!isLoading ? <ScrollView>{content}</ScrollView> : <Loading />}
      </ScreenWrapper>
    </>
  );
};

export default RentMachines;

const styles = StyleSheet.create({
  commonheader: {
    backgroundColor: '#0F623D',
    width: '100%',
    height: 48,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headertext: {
    color: '#FFFFFF',
    fontSize: 20,
    margin: 8,
  },
  Btn: {
    color: 'white',
    backgroundColor: 'blue',
  },
});
