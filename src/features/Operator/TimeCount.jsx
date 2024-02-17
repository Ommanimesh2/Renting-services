import React from 'react'
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Header from '../../app/components/Header';
import Time from './components/Time';
import OrderDetail from './components/OrderDetail';

const TimeCount = ({navigation}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <Header text="Start Service"/>
    <OrderDetail navigation={navigation}/>
<Time navigation={navigation}/>
  </ScrollView>
  )
}

export default TimeCount


