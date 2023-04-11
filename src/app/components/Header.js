import React from 'react'
import { StyleSheet, Text, View, Pressable ,TextInput,Alert} from 'react-native';
import ScreenWrapper from './ScreenWrapper';

const Header = (props) => {
  return (
    <ScreenWrapper>
          <View style={styles.commonheader}>
        <Text style={styles.headertext}> {props.text} </Text>
      </View>
        </ScreenWrapper>
  )
}


export default Header

const styles = StyleSheet.create({
    commonheader:{
        backgroundColor:'#00AC00',
      width:'100%',
      height:48,
      width:400,
      },
      headertext:{
        color: '#FFFFFF',
      fontSize:20,
      margin:8,
      
      },
})