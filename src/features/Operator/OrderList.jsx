import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../app/components/Header';
import {
  useGetMaintainerQuery,
  useGetDroneOrderByIdQuery,
} from '../../app/api/apiSlice';
import OperatorOrder from './OperatorOrder';
import Service from './components/Service';

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


  let ordersOperator;
  let mainArr = [];

  useEffect(() => {
    const fetchData = async () => {
      if (maincontent && maincontent.OrderIdsAssigned) {
        for (let i = 0; i < maincontent.OrderIdsAssigned.length; i++) {
          try {
            const response = await fetch(
              `https://backend.bhoomicam.com/api/drone/rentinfo/${maincontent.OrderIdsAssigned[i]}`,
            );
            if (response.ok) {
              const res = await response.json();
              mainArr.push(res);
            } else {
              console.log(response.error);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
        setDataArray(mainArr);
      }
    };

    fetchData();
  }, [maincontent]);

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
