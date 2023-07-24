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
import Header from '../../app/components/Header';
const UniqueQuery = ({route, navigation}) => {
  const {user_id, name, email, subject, message, id} = route.params;
  console.log(user_id, name, email, subject);
  const {
    data: user,
    isLoading,
    isSuccess,
    error,
  } = useGetOrderUserQuery(user_id);
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
    <>
      <Header text="Query" />
      <ScreenWrapper>
        {!isLoading ? (
          <View>
            <View style={styles.container}>
              <Text style={styles.head}>
                {' '}
                {strings.QUERY_NO} : {id}
              </Text>
              <Text style={styles.title}>{strings.USERNAME}</Text>
              <Text style={styles.input}>{content?.username}</Text>
              <Text style={styles.title}>{strings.PHONE_NUMBER}</Text>
              <Text style={styles.input}>{content?.phone_no}</Text>
              <Text style={styles.title}>{strings.EMAIL}</Text>
              <Text style={styles.input}>{content?.email}</Text>
              <Text style={styles.title}>{strings.ADDRESS}</Text>
              <Text style={styles.input}>{content?.address}</Text>
              <Text style={styles.title}>{strings.SUBJECT}</Text>
              <Text style={styles.input}>{subject}</Text>
              <Text style={styles.title}>{strings.MESSAGE}</Text>
              <Text style={styles.input}>{message}</Text>
            </View>
          </View>
        ) : (
          <Loading />
        )}
      </ScreenWrapper>
    </>
  );
};

export default UniqueQuery;

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
