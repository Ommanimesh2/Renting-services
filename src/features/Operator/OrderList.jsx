import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../app/components/Header';
import { useGetMaintainerQuery,useGetDroneOrderByIdQuery } from '../../app/api/apiSlice';

const OrderList = () => {
const id=2;
// const response=[];
// const array = response.OrderIdsAssigned;
let maincontent;
const {
  data: Maintainer,
  isSuccess,
  isLoading,
} = useGetMaintainerQuery(id);
if(isSuccess){
  console.log(Maintainer)
maincontent=Maintainer;

}

let ordersOperator;
let mainArr = [];

useEffect(() => {
  const fetchData = async () => {
    if (maincontent && maincontent.OrderIdsAssigned) {
      for (let i = 0; i < maincontent.OrderIdsAssigned.length; i++) {
        try {
          const { data: Orders, isSuccess } = await useGetDroneOrderByIdQuery(maincontent.OrderIdsAssigned[i]);

          if (isSuccess) {
            console.log(Orders);
            mainArr.push(Orders);
            // Update state or do further processing as needed
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }
  };

  fetchData();
}, [maincontent]); 
return (
    <View>
      <Header text='Your Orders'/>
      <Text>OrderList</Text>
    </View>
  );
};

export default OrderList;

const styles = StyleSheet.create({});
