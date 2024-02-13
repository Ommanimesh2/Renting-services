import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import React from 'react';
import phone from '../../../app/assets/phone.png';
const OrderDetail = () => {
  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <Text style={styles.textOrder}>Order id: BHC12345</Text>
      </View>
      <Text style={styles.head}>Spray Drone</Text>
      <Text style={styles.normal}>Bhoomicam Drone Services</Text>
      <Text style={styles.normal}>Bhagwanpur, Haridwar</Text>
      <Text style={styles.price}>Price : Rs.52/ acre</Text>
      <View style={styles.btnContainer}>
        <Pressable style={styles.call}>
          <View style={styles.flex}>
            <Image source={phone} />
            <Text style={{color: '#0F623D'}}>Call Support</Text>
          </View>
        </Pressable>
        <Pressable style={styles.call}>
          <View style={styles.flex}>
            <Image source={phone} />
            <Text style={{color: '#0F623D'}}>Call Support</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 30,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 4,
  },
  textOrder: {
    color: '#0F623D',
    textAlign: 'center',

    fontFamily: 'Quicksand',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
  controls: {
    backgroundColor: '#D2F1C7',
    borderColor: '#0F623D',
    width: '40%',
    borderWidth: 3,
    borderRadius: 31,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  head: {
    marginVertical: 6,
    fontSize: 20,
    color: 'black',
    fontWeight: '800',
  },
  normal: {
    marginVertical: 3,
    fontSize: 18,
  },
  price: {
    color: 'black',
    fontWeight: '600',
    marginVertical: 6,
    fontSize: 18,
  },
  call: {
    borderColor: '#0F623D',
    width: '35%',
    height: 40,
    borderWidth: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F5E0',
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    columnGap: 10,
    marginVertical: 10,
  },
});
