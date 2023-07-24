import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import ScreenWrapper from './ScreenWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

const Header = props => {
  return (
    <>
      <View style={styles.commonheader}>
        <Text style={styles.headertext}>{props.text}</Text>
        <Pressable
          style={{backgroundColor: 'white'}}
          onPress={() => {
            AsyncStorage.removeItem('user');
            RNRestart.restart();
          }}>
          <Image source={require('../assets/logout.png')} />
        </Pressable>
      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  commonheader: {
    backgroundColor: '#0F623D',
    width: '100%',
    height: 48,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headertext: {
    color: '#FFFFFF',
    fontSize: 20,
    margin: 8,
  },
  Btn: {
    color: 'white',
    backgroundColor: 'blue',
  },
});
