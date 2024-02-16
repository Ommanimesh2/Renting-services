import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import OrderDetail from './components/OrderDetail';
import Header from '../../app/components/Header';
const ServiceStart = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Header text="Start Service" />
      <OrderDetail />
    </ScrollView>
  );
};

export default ServiceStart;

const styles = StyleSheet.create({});
