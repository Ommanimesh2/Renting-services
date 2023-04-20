import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

const MachineCard = ({Name

  ,Price}) => {
  return (
    <View style={styles.container}>
      <View style={styles.space}>
        <Text style={{fontSize:17}}>{Name}</Text>
        <Image source={require('../assets/delete.png')}/>
      </View>
      <Image style={{width:'100%',marginTop:15,marginBottom:7}} source={require('../assets/tractor.jpeg')}/>
      <View style={styles.space}>
        <Text style={{fontSize:17}}>{Price}</Text>
        <Image source={require('../assets/Expand.png')}/>
      </View>
    </View>
  )
}

export default MachineCard

const styles = StyleSheet.create({
    container:{
        marginTop:16,
        marginRight:32,
        height:230,
        width:157,
        borderRadius: 10,
        borderColor:'#E0E6EF',
        backgroundColor:'white',
        borderWidth:2,
        padding:14
    },
    space:{
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row'
        

    }
})