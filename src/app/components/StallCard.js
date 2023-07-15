import {StyleSheet, Image, Text, View, Pressable} from 'react-native';
import React from 'react';
import {useDeleteRentMachineMutation} from '../api/apiSlice';
import strings from '../../helpers/LocalisedStrings';
import {useSelector} from 'react-redux';
const StallCard = ({props, navigation}) => {
  const {Name, Price, date, rentimage, id, KVK} = props;
  return (
    <>
      <Pressable
        onPress={() => navigation.navigate('uniqueMachine', {itemId: id})}>
        <View style={styles.container}>
          <View style={{height: 110, width: 120}}>
            <Image
              style={{borderRadius: 8, height: '100%', width: '100%'}}
              source={{uri: `${rentimage}`}}
            />
          </View>
          <View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                paddingHorizontal: 20,
              }}>
              <Text style={{fontSize: 16, fontWeight: 800}}>{Name}</Text>
            </View>
            <Text style={{paddingHorizontal: 17}}>{KVK.Name_KVK}</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 3,
                paddingHorizontal: 15,
                paddingTop: 0,
              }}>
              <Image
                style={{marginTop: 5, tintColor: 'black'}}
                source={require('../assets/location.png')}
              />

              <Text style={{fontSize: 15}}>{KVK.Address}</Text>
            </View>
            <Text style={{paddingHorizontal: 17}}>{date}</Text>
            <Text style={{paddingHorizontal: 17}}>Price:{Price}/day</Text>
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
