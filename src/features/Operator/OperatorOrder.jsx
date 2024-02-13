import React from 'react'
import {StyleSheet, Text,Image, View,Pressable} from 'react-native';

const OperatorOrder = ({props, navigation}) => {
    const {
        AreaOfField,
        ChemicalOrderId,
        placed_at,
        ChemicalsOrdered,
        DeliverAddress,
        Drone_Admin_id,
        Drone_id,
        id,
        user_id,
        NameMaintainer,
        NearbyLandMark,
        OrderAmount,
        Quantity_Chemical,
        SprayEndTime,
        StartSprayTime,
        TimeofSpray,
        UnitofArea,
        isChemicalsOrdered,
        isMaintainerAssigned,
        isRecieved,
        isSprayDone,
        start_date,
        time_slots,
      } = props;
  return (
    <>
    <Pressable>

      <View style={styles.container}>
        <View style={{height: 110, width: '40%', alignItems: 'center'}}>
          <Image
            style={{height: '100%', width: '90%'}}
            source={require('../../app/assets/Add.png')}
          />
        </View>
        <Text
          style={{
            // width: '60%',
            textAlign: 'left',
            paddingLeft: '10%',
            display:'flex',
            flexDirection:'column',
            height: 130,
          }}>
          <Text style={{fontSize: 15, color: '#2E2E2E', fontWeight: 700}}>
            {NearbyLandMark.charAt(0).toUpperCase()}
            {NearbyLandMark.slice(1)}
          </Text>     <Text style={{fontSize: 15, color: '#2E2E2E', fontWeight: 700}}>
           {id*129}
          </Text>
          <Text
            style={{
              color: '#979999',
              fontFamily: 'Quicksand',
              fontSize: 11,
              fontWeight: 500,
            }}>
            {placed_at}
          </Text>
          {/* <Text
          style={{
            color: '#979999',
            fontFamily: 'Quicksand',
            fontSize: 12.5,
            fontWeight: 600,
            marginTop: 2,
          }}>
          {DeliverAddress}
        </Text> */}

          <Text
            style={{
              color: '#979999',
              fontFamily: 'Quicksand',
              fontSize: 12.5,
              fontWeight: 700,
              marginTop: 2,
            }}>
            {start_date}
          </Text>
          <Text
            style={{
              color: '#2E2E2E',
              fontFamily: 'Quicksand',
              fontSize: 13.5,
              fontWeight: 700,
            }}>
            Price: {OrderAmount}
          </Text>
      
          
        </Text>
      </View>
    </Pressable>
  </>
  )
}

export default OperatorOrder


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 140,
    paddingTop: 15,
    marginTop: 16,
    backgroundColor: '#F9FCFE',
    borderColor: '#F9FCFE',
  },
});