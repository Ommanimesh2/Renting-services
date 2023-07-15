import {Alert, StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {useState, useEffect} from 'react';
import ScreenWrapper from '../../app/components/ScreenWrapper';
import {useGetAllRentMachinesQuery} from '../../app/api/apiSlice';
import MachineCard from '../../app/components/MachineCard';
import StallCard from '../../app/components/StallCard';
import Loading from './Loading';

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
    content = db.map(item => {
      return <StallCard key={item.id} props={item} navigation={navigation} />;
    });
  } else if (error) {
    console.log(error);
  } else if (isLoading) {
  }

  return (
    <ScreenWrapper>
      {!isLoading ? <ScrollView>{content}</ScrollView> : <Loading />}
    </ScreenWrapper>
  );
};

export default RentMachines;

const styles = StyleSheet.create({});
