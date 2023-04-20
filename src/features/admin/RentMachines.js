import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import ScreenWrapper from '../../app/components/ScreenWrapper'
import { useGetAllRentMachinesQuery } from '../../app/api/apiSlice'
import MachineCard from '../../app/components/MachineCard'


const RentMachines = () => {
  const [allrentmachinedata, setAllRentMachineData]=useState([])
  
    const { data: machines, isSuccess, error } = useGetAllRentMachinesQuery()
    let content;
    useEffect(()=>{
      if(isSuccess){
      content= JSON.stringify(machines)
  console.log(content)
      setAllRentMachineData(content)
      }else if(error){
       console.log(error)
      }
    } , [])
  return (
    <ScreenWrapper>
      <Text>RentMachines gf {allrentmachinedata} </Text>

      {/* {
        allrentmachinedata.map((e)=>{
         return(
          <>
        <ScrollView showsVerticalScrollIndicator={false} >
              <View style={styles.rentmachines}>

            <MachineCard  style={styles.item}
                  name={e["Name"]}
                  Price={e["Price"]}
 
            />
              </View>
               </ScrollView>
          </>
         )
        })
      } */}
    </ScreenWrapper>
  )
}

export default RentMachines

const styles = StyleSheet.create({})