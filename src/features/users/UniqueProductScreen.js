import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useGetRentMachineQuery } from '../../app/api/apiSlice';

const UniqueProductScreen = ({route, navigation}) => {
    const { itemId } = route.params;

    const { data: machines, isSuccess, error, isLoading } = useGetRentMachineQuery(itemId)
    let content,db;
      if(isSuccess){
      content= machines
      console.log(machines)
      }else if(error){
       console.log(error)
      }else if(isLoading){
        content=<Text>Loading</Text>
      }
  return (
    <View>
      <Text>{content.id}</Text>
      <Image
          style={{ borderRadius: 8, height: 170, width: "100%" }}
          source={{uri:`${content.rentimage}`}}
        />
      <Text>{content.BookedStatus}</Text>
      <Text>{content.MachineDetails}</Text>
      <Text>{content.Contact}</Text>
      <Text>{content.id}</Text>
    </View>
  )
}

export default UniqueProductScreen

const styles = StyleSheet.create({})