import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../app/components/Header';
import {
  useGetMaintainerQuery,
  useGetDroneOrderByIdQuery,
} from '../../app/api/apiSlice';
import OperatorOrder from './OperatorOrder';
import Service from './components/Service';
import Loading from '../admin/Loading';

const OrderList = ({navigation}) => {
  const id = 2;
  // const response=[];
  // const array = response.OrderIdsAssigned;
  const [dataArray, setDataArray] = useState([]);
  let maincontent;
  const {data: Maintainer, isSuccess, isLoading} = useGetMaintainerQuery(id);
  if (isSuccess) {
    maincontent = Maintainer;
  }
  if (isLoading) {
    return <Loading />;
  }

  let ordersOperator;
  let mainArr = [];

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const orderIds = maincontent?.OrderIdsAssigned;
      const response = await fetch(
        'https://backend.bhoomicam.com/api/drone/drone_order_array/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({order_ids: orderIds}),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();
      console.log(result, 'dataArray is ');
      setDataArray(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View>
      <Header text="Your Orders" />
      {dataArray &&
        dataArray.map(item => {
          return (
            <OperatorOrder key={item.id} props={item} navigation={navigation} />
          );
        })}
    </View>
  );
};

export default OrderList;

const styles = StyleSheet.create({});
