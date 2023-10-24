import React from 'react'
import {StyleSheet, Text, View, ScrollView,Image,Pressable} from 'react-native';
import {useEffect} from 'react';
import Header from '../../app/components/Header';

const Maintainers = ({navigation}) => {
  return (
    <View>
        <Header text='Maintainers'/>
        <View style={styles.HomeDronesContainer}>
        <Image source={require('./assets/bxs_user-x.png')} />
        <Text style={styles.hometxt}>No Maintainers to show</Text>
        <Pressable style={styles.AddButton} onPress={()=>{navigation.navigate('AddMaintainer')}}>
            <Text style={styles.buttontxt}>Add Maintainers</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Maintainers

const styles = StyleSheet.create({
    HomeDronesContainer: {
      height: '95%',
      width: '100%',
      textAlign: 'center',
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  
    },
    AddButton:{
      marginTop:15,
      width: '40%',
      textAlign: 'center',
      borderRadius: 1,
      borderWidth:1,
      borderStyle: 'solid',
      borderColor: '#0F623D',
      backgroundColor: 'rgba(15, 98, 61, 0.04)',
      color:'#0F623D',
      padding:12,
    },
    buttontxt:{
      color:'#0F623D',
      textAlign:'center',
      background: 'rgba(15, 98, 61, 0.04)',
     fontSize:17,
     fontWeight:600
    },
    hometxt:{
      marginTop:10,
      color: '#2E2E2E',
  fontFamily: 'Quicksand',
  fontSize: 20,
  // fontStyle: normal,
  fontWeight: 700,
  lineHeight: 19, /* 95% */
  // letterSpacing: 0.1,
  // textTransform: capitalize,
    }
  });
  