import React from 'react';
import {View, Text,StyleSheet,TouchableHighlight} from 'react-native';
import OrderDetail from './components/OrderDetail';
import Service from './components/Service';
import Header from '../../app/components/Header';
import {Picker} from '@react-native-picker/picker';

const ServiceComplete = ({navigation}) => {
  return (
    <View>
      <Header text="Complete Order" />
      <OrderDetail navigation={navigation} />
      <Service />
      <View style={styles.container}>
        <Picker style={styles.picker}>
          <Picker.Item label="Select Crop Type" value="" />
          <Picker.Item label="Crop 1" value="crop1" />
          <Picker.Item label="Crop 2" value="crop2" />
        </Picker>
      </View>
      <TouchableHighlight
        style={styles.mainBtnn}
        onPress={() => {
            // navigation.navigate('serviceComplete')
        }}>
        <View>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: 600,
            }}>
           Submit
          </Text>
        </View>
      </TouchableHighlight>

    </View>

  );
};

export default ServiceComplete;


const styles = StyleSheet.create({
    container: {
width:'80%',
margin:'10%',
      borderWidth: 1, // Border width
      borderColor: 'black', // Border color
      borderRadius: 5, // Border radius
      overflow: 'hidden', // Clip content that overflows border radius
    },
    picker: {
    //   height: 40, // Adjust the height as needed
      width: '100%', // Take up full width of container
    },  
    mainBtnn: {
        width: '40%',
        marginLeft:'30%',
        height: 50,
        display: 'flex',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0F623D',
      },
  });