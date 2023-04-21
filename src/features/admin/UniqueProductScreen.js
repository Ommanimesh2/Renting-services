import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {useGetRentMachineQuery} from '../../app/api/apiSlice';
import ScreenWrapper from '../../app/components/ScreenWrapper';
const UniqueProductScreen = ({route, navigation}) => {
  const {itemId} = route.params;

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
    console.log(error);
  } else if (isLoading) {
    content = <Text>Loading</Text>;
  }
  return (
    <ScreenWrapper>
      <View>
        <Image
          style={{
            borderRadius: 8,
            height: 190,
            width: '100%',
            marginTop: 20,
          }}
          source={{uri: `${content.rentimage}`}}
        />
        <View style={styles.container}>
          <Text style={styles.head}>{content.Name}</Text>
          <Text style={styles.title}>Description</Text>
          <Text style={styles.input}>{content.MachineDetails}</Text>
          <Text style={styles.title}>Contact Number</Text>

          <Text style={styles.input}>{content.Contact}</Text>
          <Text style={styles.title}>Price</Text>
          <Text style={styles.input}>{content.Price}</Text>
          <Text style={styles.title}>Date</Text>
          <Text style={styles.input}>{content.date}</Text>
        </View>
      </View>
    </ScreenWrapper>
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
