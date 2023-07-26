import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {
  useGetAllOrdersQuery,
  useGetAdminKvkQuery,
} from '../../app/api/apiSlice';
import ScreenWrapper from '../../app/components/ScreenWrapper';
import Loading from './Loading';
import Header from '../../app/components/Header';
import {getCredentials} from '../../helpers/credentials';
import OrderView from '../../app/components/OrderView';
const ViewRentedMachines = ({navigation}) => {
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
  const {data: KVK, isSuccess: adminKvk} = useGetAdminKvkQuery(
    loggedInUser?.id,
    {
      enabled: !!loggedInUser,
    },
  );
  if (adminKvk) {
    console.log(KVK[0]?.id);
    kvk = KVK;
  }

  const {
    data: machines,
    isSuccess,
    error,
    isLoading,
  } = useGetAllOrdersQuery(kvk[0]?.id, {
    enabled: !!kvk,
  });
  let dataArray;

  if (isSuccess) {
    console.log(isLoading);
    dataArray = machines; // Convert data to array
    // if (dataArray.length == 0) {
    //   dataArray = <Text>No Machines to display</Text>;
    // }
    console.log(dataArray);
  } else if (error) {
    console.log('object');
    console.log(error);
  }

  return !isLoading ? (
    <>
      <Header text="All Orders" />
      <ScreenWrapper>
        <ScrollView>
          {dataArray?.length > 0 ? (
            dataArray?.map(e => {
              return <OrderView props={e} navigation={navigation} key={e.id} />;
            })
          ) : (
            <Text>No orders Recieved Till now</Text>
          )}
        </ScrollView>
        {/* {
        allrentmachinedata.map((e)=>{
          // if(allrentmachinedata.BookedStatus==true)
         return(
          <>
          {content}
          </>
          )
        })
      } */}
      </ScreenWrapper>
    </>
  ) : (
    <Loading />
  );
};

export default ViewRentedMachines;

const styles = StyleSheet.create({
  commonheader: {
    backgroundColor: '#0F623D',
    width: '100%',
    height: 48,
    width: 500,
    paddingLeft: 10,
  },
  headertext: {
    color: '#FFFFFF',
    fontSize: 20,
    margin: 8,
  },
});
