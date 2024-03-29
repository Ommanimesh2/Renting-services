import React, {useEffect} from 'react';
import {StyleSheet, Text, Image, View, Pressable,TouchableOpacity} from 'react-native';
import {useGetDroneByIdQuery, useGetDroneRentingByAdminIdQuery, useGetRentDroneQuery} from '../../app/api/apiSlice';

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

  const {
    data: droneInfo,
    isSuccess,
    isLoading,
    isError,
  } = useGetRentDroneQuery(Drone_id);
  if (isSuccess) {
    console.log(droneInfo, 'ye h sahi');
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('serviceStart');
        }}>
        <View style={styles.container}>
          <View style={{height: 110, width: '40%', alignItems: 'center'}}>
            <Image
              style={{height: '100%', width: '90%'}}
              source={{ uri: droneInfo?.rentimage }}
            />
          </View>
          <View
            style={{
              width: '60%',
              textAlign: 'left',
              paddingLeft: '10%',
              height: 130,
            }}>
            <Text style={{fontSize: 15, color: '#2E2E2E', fontWeight: 700}}>
           Order Id : {id*129}
            </Text>
            <Text
              style={{
                color: '#979999',
                fontFamily: 'Quicksand',
                fontSize: 12.5,
                fontWeight: 700,
              }}>
              Area: {AreaOfField}
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
            Spray Date: {start_date}
            </Text>
            <Text
              style={{
                color: '#2E2E2E',
                fontFamily: 'Quicksand',
                fontSize: 13.5,
                fontWeight: 700,
              }}>
              Amount:₹ {OrderAmount}
            </Text>
            <Text>Address: {DeliverAddress}, {NearbyLandMark}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default OperatorOrder;

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
