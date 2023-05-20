import {StyleSheet, Image, Text, View, Pressable} from 'react-native';
import React from 'react';
import {useDeleteRentMachineMutation} from '../api/apiSlice';
import strings from '../../helpers/LocalisedStrings';
import {useSelector} from 'react-redux';
const StallCard = ({props, navigation}) => {
  const {Name, Price, date, rentimage, id} = props;
  const [deleteRentMachine] = useDeleteRentMachineMutation();
  return (
    <>
      <Pressable
        onPress={() => navigation.navigate('uniqueMachine', {itemId: id})}>
        <View style={styles.container}>
          <View>
            <Image
              style={{borderRadius: 8, height: 110, width: 110}}
              source={{uri: `${rentimage}`}}
            />
          </View>
          <View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '80%',
                paddingHorizontal: 20,
              }}>
              <Text style={{fontSize: 20, fontWeight: 800}}>{Name}</Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 3,
                paddingHorizontal: 15,
                paddingTop: 6,
              }}>
              <Image
                style={{padding: 10, tintColor: 'black'}}
                source={require('../assets/location.png')}
              />

              <Text style={{fontSize: 15}}>{Price}</Text>
            </View>
            <Text style={{paddingHorizontal: 17}}>{date}</Text>
          </View>
          <View></View>
        </View>
      </Pressable>
    </>
  );
};

export default StallCard;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 150,
    paddingTop: 16,
    marginTop: 16,
    borderWidth: 1,
    backgroundColor: '#F9FCFE',
    borderColor: '#F9FCFE',
    borderRadius: 8,
  },
});
