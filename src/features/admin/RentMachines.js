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
import {
  useGetAllRentMachinesQuery,
  useGetAdminKvkQuery,
} from '../../app/api/apiSlice';
import {getCredentials} from '../../helpers/credentials';
import MachineCard from '../../app/components/MachineCard';
import StallCard from '../../app/components/StallCard';
import Loading from './Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import Header from '../../app/components/Header';
const RentMachines = ({navigation}) => {
  const [loggedInUser, setLoggedInUser] = useState([]);

  let content,
    db,
    admin,
    loading,
    kvk = [];
  useEffect(() => {
    const giveUser = async () => {
      try {
        const use = await getCredentials();
        setLoggedInUser(use);
        console.log(use);
      } catch (error) {}
    };
    giveUser();
  }, []);
  const {
    data: KVK,
    isSuccess: adminKvk,
    error,
  } = useGetAdminKvkQuery(loggedInUser?.id, {
    enabled: !!loggedInUser,
  });
  if (adminKvk) {
    console.log(KVK[0]?.id);
    kvk = KVK;
  }
  const {
    data: machines,
    isSuccess,
    isLoading,
  } = useGetAllRentMachinesQuery(kvk[0]?.id, {
    enabled: !!kvk,
  });

  if (isSuccess) {
    console.log(machines);

    if (machines?.length > 0) {
      content = machines?.map(item => {
        return <StallCard key={item.id} props={item} navigation={navigation} />;
      });
    } else {
      content = <Text>No Machines to display</Text>;
    }
  } else if (error) {
    console.log(error);
  } else if (isLoading) {
    loading = isLoading;
  }

  return (
    <>
      <Header text="All Machines" />
      <ScreenWrapper>
        {!loading ? <ScrollView>{content}</ScrollView> : <Loading />}
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
