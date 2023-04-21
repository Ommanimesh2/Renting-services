import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import ScreenWrapper from '../../app/components/ScreenWrapper'
import { useGetAllRentMachinesQuery } from '../../app/api/apiSlice'
import MachineCard from '../../app/components/MachineCard'
import StallCard from '../../app/components/StallCard'


const RentMachines = ({navigation}) => {
  const [allrentmachinedata, setAllRentMachineData]=useState([])
  
    const { data: machines, isSuccess, error, isLoading } = useGetAllRentMachinesQuery()
    let content,db;
      if(isSuccess){
      db= Array.from(machines)
      content= db.map((item) => {
        return <StallCard props={item} navigation={navigation} />
      })
      console.log(db, "Yeh real db hai abhi aagaya hai")
      }else if(error){
       console.log(error)
      }else if(isLoading){
        content=<Text>Loading</Text>
      }

  return (
    <ScreenWrapper>
      <View>
        {content}
      </View>

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