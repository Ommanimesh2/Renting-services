import {StyleSheet, Image, Text, View, Pressable} from 'react-native';
import React from 'react';

const DroneCard = ({props, navigation}) => {
  const {Name, Price, date, rentimage, id, Drone} = props;
  return (
    <>
      <Pressable
        onPress={() => navigation.navigate('uniqueDrone', {itemId: id})}>
        <View style={styles.container}>
          <View style={{height: 110, width: '40%', alignItems: 'center'}}>
            <Image
              style={{height: '100%', width: '90%'}}
              source={{uri: `${rentimage}`}}
            />
          </View>
          <View
            style={{
              width: '60%',
              textAlign: 'left',
              paddingLeft: '10%',
              height: 130,
            }}>
            <Text style={{fontSize: 15, color: '#2E2E2E', fontWeight: 700}}>
              {Name.charAt(0).toUpperCase()}
              {Name.slice(1)}
            </Text>
            <Text
              style={{
                color: '#979999',
                fontFamily: 'Quicksand',
                fontSize: 11,
                fontWeight: 500,
              }}>
              {Drone.Name_Drone}
            </Text>
            <Text
              style={{
                color: '#979999',
                fontFamily: 'Quicksand',
                fontSize: 12.5,
                fontWeight: 600,
                marginTop: 2,
              }}>
              {Drone.Address}
            </Text>

            <Text
              style={{
                color: '#979999',
                fontFamily: 'Quicksand',
                fontSize: 12.5,
                fontWeight: 700,
                marginTop: 2,
              }}>
              {date}
            </Text>
            <Text
              style={{
                color: '#2E2E2E',
                fontFamily: 'Quicksand',
                fontSize: 13.5,
                fontWeight: 700,
              }}>
              Price: {Price}/day
            </Text>
          </View>
          <View></View>
        </View>
      </Pressable>
    </>
  );
};

export default DroneCard;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 140,
    paddingTop: 15,
    marginTop: 16,
    backgroundColor: '#F9FCFE',
    borderColor: '#F9FCFE',
  },
});
