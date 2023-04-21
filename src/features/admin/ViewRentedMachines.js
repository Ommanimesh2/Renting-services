import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {useGetAllOrdersQuery} from '../../app/api/apiSlice';
import ScreenWrapper from '../../app/components/ScreenWrapper';
const ViewRentedMachines = () => {
  const [allrentmachinedata, setAllRentMachineData] = useState([]);

  const {data: machines, isSuccess, error, isLoading} = useGetAllOrdersQuery();
  let dataArray;

  if (isSuccess) {
    console.log(isLoading);
    dataArray = machines; // Convert data to array
    console.log(dataArray);
  } else if (error) {
    console.log('object');
    console.log(error);
  }

  return !isLoading ? (
    <ScreenWrapper>
      <Text>ViewRentedMachines </Text>
      {dataArray.map(e => {
        return (
          <View>
            <Text>{e.date}</Text>
            <Text>{e.placed_at}</Text>
            <Text>{e.user_id}</Text>
            <Text>{e.date}</Text>
          </View>
        );
      })}
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
  ) : (
    <View>
      <Text>Loading</Text>
    </View>
  );
};

export default ViewRentedMachines;

const styles = StyleSheet.create({});
