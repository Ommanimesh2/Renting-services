import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import OrderDetail from './components/OrderDetail';
import Header from '../../app/components/Header';
const ServiceStart = () => {
  return (
    <View>
      <Header text="jlaskjfd" />
      <OrderDetail />
      <Text>ServiceStart</Text>
    </View>
  );
};

export default ServiceStart;

const styles = StyleSheet.create({});
