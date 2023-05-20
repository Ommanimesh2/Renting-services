import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import strings from '../../helpers/LocalisedStrings';
import React from 'react';
import useEffect from 'react';
import {
  useGetRentMachineQuery,
  useDeleteRentMachineMutation,
  useGetOrderUserQuery,
} from '../../app/api/apiSlice';
import ScreenWrapper from '../../app/components/ScreenWrapper';
import Loading from './Loading';
import {Button} from '@react-native-material/core';
const UniqueOrder = ({route, navigation}) => {
  const {orderId, placed_at, payement_status, payement_mode} = route.params;
  console.log(orderId);
  const {
    data: user,
    isLoading,
    isSuccess,
    error,
  } = useGetOrderUserQuery(orderId);
  let content, db;
  if (isSuccess) {
    content = user;
    console.log(user);
  } else if (error) {
    console.log(error);
    Alert.alert('check your network connection');
  } else if (isLoading) {
    content = <Loading />;
  }
  return (
    <ScreenWrapper>
      {!isLoading ? (
        <View>
          <View style={styles.container}>
            <Text style={styles.head}>
              {' '}
              {strings.ORDER_ID} : {orderId}
            </Text>
            <Text style={styles.title}>{strings.ORDERED_BY}</Text>
            <Text style={styles.input}>{content?.username}</Text>
            <Text style={styles.title}>{strings.PHONE_NUMBER}</Text>
            <Text style={styles.input}>{content?.phone_no}</Text>
            <Text style={styles.title}>{strings.EMAIL}</Text>
            <Text style={styles.input}>{content?.email}</Text>
            <Text style={styles.title}>{strings.ADDRESS}</Text>
            <Text style={styles.input}>{content?.address}</Text>
            <Text style={styles.title}>{strings.PLACED_AT}</Text>
            <Text style={styles.input}>{placed_at}</Text>
            <Text style={styles.title}>{strings.PAYMENT_STATUS}</Text>
            <Text style={styles.input}>{payement_status}</Text>
            <Text style={styles.title}>{strings.PAYMENT_MODE}</Text>
            <Text style={styles.input}>{payement_mode}</Text>
          </View>
        </View>
      ) : (
        <Loading />
      )}
    </ScreenWrapper>
  );
};

export default UniqueOrder;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  head: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 800,
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    marginTop: 15,
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    marginVertical: 10,
    textAlignVertical: 'center',
    paddingHorizontal: 10,
  },
});
