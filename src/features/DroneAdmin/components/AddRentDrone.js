import React from 'react';
import {StyleSheet, TextInput, Text, View, Image} from 'react-native';
import Header from '../../../app/components/Header';

const AddRentDrone = () => {
  return (
    <>
      <View>
        <Header text="Add Drone" />
        <View
          style={{
            display: 'flex',
            width: '90%',
            height: 40,
            marginTop: 20,
            marginLeft: '5%',
            borderBottomWidth: 1,
            borderBottomColor: '#CFD8DC',
            // border solid ;
            padding: 8,
          }}>
          <Text
            style={{
              color: '#424242',
              paddingLeft: '0%',
              fontFamily: 'Roboto',
              fontSize: 17,
              fontWeight: 700,
            }}>
            Drone's Details
          </Text>
        </View>
        <View style={styles.DetailsContainer}>
          <Image
            source={require('../assets/carbon_drone.png')}
            style={{height: 35, width: 35, margin: 10}}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '2%',
            }}>
            <Text
              style={{
                color: '#424242',
                paddingLeft: '0%',
                fontFamily: 'Roboto',
                fontSize: 14,
                fontWeight: 600,
              }}>
              Drone Name - Model
            </Text>
            <TextInput
              style={styles.newjobinput}
              underlineColorAndroid="transparent"
              placeholder="Enter Drone's Name"
              placeholderTextColor="#B9B9B9"
              placeholderFontSize="20"
              autoCapitalize="none"
            />
          </View>
        </View>
        <View style={styles.DetailsContainer}>
          <Image
            source={require('../assets/tabler_file-description.png')}
            style={{height: 35, width: 35, margin: 10}}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '2%',
            }}>
            <Text
              style={{
                color: '#424242',
                paddingLeft: '0%',
                fontFamily: 'Roboto',
                fontSize: 14,
                fontWeight: 600,
              }}>
              Drone Description
            </Text>
            <TextInput
              style={styles.newjobinput}
              underlineColorAndroid="transparent"
              placeholder="Enter Drone's Description"
              placeholderTextColor="#B9B9B9"
              placeholderFontSize="20"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.DetailsContainer}>
        <Image source={require('../assets/carbon_drone.png')} style={{height:35,width:35,margin:10}}/>
        <View style={{display:'flex',flexDirection:'column',marginLeft:'5%'}}>
          <Text style={{color:'#424242',paddingLeft:'0%',fontFamily: 'Roboto',
fontSize: 14,
fontWeight: 600,}}>Time Slot</Text>
          <TextInput
                  style={styles.newjobinput}
                  underlineColorAndroid="transparent"
                  placeholder="Time Slots"
                  placeholderTextColor="#B9B9B9"
                  placeholderFontSize="20"
                  autoCapitalize="none"
                />
        </View>
       </View>

       <View style={styles.DetailsContainer}>
        <Image source={require('../assets/carbon_drone.png')} style={{height:35,width:35,margin:10}}/>
        <View style={{display:'flex',flexDirection:'column',marginLeft:'5%'}}>
          <Text style={{color:'#424242',paddingLeft:'0%',fontFamily: 'Roboto',
fontSize: 14,
fontWeight: 600,}}>Shop Address</Text>
          <TextInput
                  style={styles.newjobinput}
                  underlineColorAndroid="transparent"
                  placeholder="Enter your official address"
                  placeholderTextColor="#B9B9B9"
                  placeholderFontSize="20"
                  autoCapitalize="none"
                />
        </View>
       </View>

       <View style={styles.DetailsContainer}>
        <Image source={require('../assets/carbon_drone.png')} style={{height:35,width:35,margin:10}}/>
        <View style={{display:'flex',flexDirection:'row',marginLeft:'5%'}}>
          <Text style={{color:'#424242',paddingLeft:'0%',fontFamily: 'Roboto',
fontSize: 14,
fontWeight: 600,}}>Choose if providing chemicals</Text>
          <TextInput
                  style={styles.newjobinput}
                  underlineColorAndroid="transparent"
                  placeholder="Enter Drone's Name"
                  placeholderTextColor="#B9B9B9"
                  placeholderFontSize="20"
                  autoCapitalize="none"
                />
        </View>
       </View>

       <View style={styles.DetailsContainer}>
        <Image source={require('../assets/carbon_drone.png')} style={{height:35,width:35,margin:10}}/>
        <View style={{display:'flex',flexDirection:'column',marginLeft:'5%'}}>
          <Text style={{color:'#424242',paddingLeft:'0%',fontFamily: 'Roboto',
fontSize: 14,
fontWeight: 600,}}>Chemical Name</Text>
          <TextInput
                  style={styles.newjobinput}
                  underlineColorAndroid="transparent"
                  placeholder="Enter chemica Name"
                  placeholderTextColor="#B9B9B9"
                  placeholderFontSize="20"
                  autoCapitalize="none"
                />
        </View>
       </View>


      </View>
    </>
  );
};

export default AddRentDrone;

const styles = StyleSheet.create({
  DetailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    width: '90%',
    marginLeft: '5%',
  },
});
