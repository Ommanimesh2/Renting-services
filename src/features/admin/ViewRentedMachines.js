import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useGetAllRentMachinesQuery } from '../../app/api/apiSlice'
import ScreenWrapper from '../../app/components/ScreenWrapper'
const ViewRentedMachines = () => {

  const [allrentmachinedata, setAllRentMachineData]=useState([])
  
  const { data: machines, isSuccess, error } = useGetAllRentMachinesQuery()
  let dataArray;
  useEffect(()=>{
    if(isSuccess){
//     content= JSON.stringify(machines)
// console.log(content[3])
 dataArray = Array.from(machines); // Convert data to array
 console.log(dataArray);
//  setAllRentMachineData(dataArray)
//  setAllRentMachineData([...allrentmachinedata, dataArray[0]]);
// console.log(allrentmachinedata)
// setAllRentMachineData(dataArray)
    // console.log(allrentmachinedata)
    }else if(error){
     console.log(error)
    }
  } , [])

  return (
    
    <ScreenWrapper>
      <Text>ViewRentedMachines </Text>
   <Text>content/</Text> 
      {/* {
        allrentmachinedata.map((e)=>{
          // if(allrentmachinedata.BookedStatus==true)
         return(
          <>
          {content}
          </>
         )
        })
      } */}
    </ScreenWrapper>
  )
}

export default ViewRentedMachines

const styles = StyleSheet.create({
  
})