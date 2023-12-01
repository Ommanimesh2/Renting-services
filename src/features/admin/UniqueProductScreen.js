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
import {
  useGetRentMachineQuery,
  useDeleteRentMachineMutation,
} from '../../app/api/apiSlice';
import ScreenWrapper from '../../app/components/ScreenWrapper';
import Loading from './Loading';
import {Button} from '@react-native-material/core';
import Header from '../../app/components/Header';
const UniqueProductScreen = ({route, navigation}) => {
  const {itemId} = route.params;
  const [deleteRentMachine] = useDeleteRentMachineMutation();
  const {
    data: machines,
    isSuccess,
    error,
    isLoading,
  } = useGetRentMachineQuery(itemId);
  let content, db;
  if (isSuccess) {
    content = machines;
    console.log(machines);
  } else if (error) {
    console.log(itemId);
    console.log(error);
    Alert.alert('check your network connection');
  } else if (isLoading) {
    content = <Loading />;
  }
  return (
    <>
      {!isLoading ? (
        <>
          <Header text={content?.Name} />
          <ScreenWrapper>
            <View>
              <Image
                style={{
                  borderRadius: 8,
                  height: 190,
                  width: '100%',
                  marginTop: 20,
                }}
                source={{uri: `${content?.rentimage}`}}
              />
              <View style={styles.container}>
                <Text style={styles.head}>{content?.Name}</Text>
                <Text style={styles.title}>{strings.MACHINE_DETAILS}</Text>
                <Text style={styles.input}>{content?.MachineDetails}</Text>
                <Text style={styles.title}>{strings.PHONE_NUMBER}</Text>
                <Text style={styles.input}>{content?.Contact}</Text>
                <Text style={styles.title}>{strings.PRICE}</Text>
                <Text style={styles.input}>{content?.Price}</Text>
                <Text style={styles.title}>{strings.DATE}</Text>
                <Text style={styles.input}>{content?.date}</Text>
              </View>
              <Button
                onPress={() => {
                  deleteRentMachine({id: itemId});
                  Alert.alert('Machine deleted successfully');
                  navigation.navigate('ViewRentMachines');
                }}
                title="Delete"
                color="red"
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
          </ScreenWrapper>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default UniqueProductScreen;

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
