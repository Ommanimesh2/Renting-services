import {
    StyleSheet,
    Text,
    View,
    Image,
    ActivityIndicator,
    Alert,
    ScrollView,
  } from 'react-native';
  import strings from '../../helpers/LocalisedStrings';
  import React from 'react';
  import {

    useGetRentDroneQuery,
  } from '../../app/api/apiSlice';
  import ScreenWrapper from '../../app/components/ScreenWrapper';
import Loading from '../admin/Loading';
  import {Button} from '@react-native-material/core';
  import Header from '../../app/components/Header';
  const DroneScreen = ({route, navigation}) => {
    const {itemId} = route.params;

    const {
      data: machines,
      isSuccess,
      error,
      isLoading,
    } = useGetRentDroneQuery(itemId);
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
          <ScrollView showsVerticalScrollIndicator={false}>
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
  <Text style={styles.title}>MACHINE_DETAILS</Text>
  <Text style={styles.input}>{content?.DroneDetails}</Text>
  <Text style={styles.title}>PHONE_NUMBER</Text>
  <Text style={styles.input}>{content?.Contact}</Text>
  <Text style={styles.title}>PRICE</Text>
  <Text style={styles.input}>{content?.Price}</Text>

  {content?.isProvidingChemicals && content?.ChemicalsOffered && (
    <>
      <Text style={styles.title}>Pesticides Offered</Text>
      {content?.ChemicalsOffered.map((chemical, index) => (
        <Text key={`chemical_${index}`} style={styles.input}>
          {Object.keys(chemical)[0]}: {Object.values(chemical)[0]} litres
        </Text>
      ))}
    </>
  )}

  <Text style={styles.title}>Available Time Slots</Text>
  {content?.time_slots && content?.time_slots.map((timeSlot, index) => (
    <Text key={`time_slot_${index}`} style={styles.input}>{timeSlot.slot}</Text>
  ))}
</View>

                <Button
                  onPress={() => {
                    navigation.navigate('ViewRentDrones');
                  }}
                  title="Edit Details"
                  color="green"
                  accessibilityLabel="Learn more about this purple button"
                />
              </View>
            </ScreenWrapper>
          </ScrollView>
        ) : (
          <Loading />
        )}
      </>
    );
  };
  
  export default DroneScreen;
  
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
  