import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {useGetQueriesQuery} from '../../app/api/apiSlice';
import ScreenWrapper from '../../app/components/ScreenWrapper';
import Loading from './Loading';
import Header from '../../app/components/Header';
import OrderView from '../../app/components/OrderView';
import Query from '../../app/components/Query';
const ViewAllQuerys = ({navigation}) => {
  const [allrentmachinedata, setAllRentMachineData] = useState([]);

  const {data: machines, isSuccess, error, isLoading} = useGetQueriesQuery();
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
    <>
      <View style={styles.commonheader}>
        <Text style={styles.headertext}>All Querys</Text>
      </View>
      <ScreenWrapper>
        <ScrollView>
          {dataArray.map(e => {
            return <Query props={e} navigation={navigation} key={e.id} />;
          })}
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

export default ViewAllQuerys;

const styles = StyleSheet.create({
  commonheader: {
    backgroundColor: '#00AC00',
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
