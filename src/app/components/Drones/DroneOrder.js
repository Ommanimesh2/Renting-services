import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import strings from '../../../helpers/LocalisedStrings';
import {Picker} from '@react-native-picker/picker';
import {
  useGetMaintainerbyAdminIdQuery,
  useUpdateDroneMaintainerMutation,
  useUpdateDroneOrderMutation,
} from '../../api/apiSlice';
const DroneOrderView = ({props, navigation}) => {
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
  const [selectedOperator, setSelectedOperator] = useState({
    id: '',
    OrderIdsAssigned: [],
  });

  let Operator = [];

  const {
    data: Maintainers,
    isSuccess: adminDrone,
    error,
  } = useGetMaintainerbyAdminIdQuery(Drone_Admin_id, {
    enabled: !!Drone_Admin_id,
  });
  if (adminDrone) {
    console.log(Maintainers[0]?.id);
    console.log(Maintainers, 'maintainer lele');
    Operator = Maintainers;
  }
  console.log(selectedOperator);
  const handleOperatorChange = (itemValue, itemIndex) => {
    console.log(itemIndex);
    const res = Operator[itemIndex - 1];

    setSelectedOperator({
      id: res?.id,
      OrderIdsAssigned: res?.OrderIdsAssigned || [],
    });
  };
  const [updateDroneOrder] = useUpdateDroneOrderMutation();
  const [updateOperator] = useUpdateDroneMaintainerMutation();
  const handleAssignOperator = async () => {
    try {
      const response = await updateDroneOrder({
        id: id,
        isMaintainerAssigned: true,
        NameMaintainer: selectedOperator?.id,
      });

      console.log(response);

      if (response?.data) {
        console.log('Success');
      } else {
        console.error(response?.error);
        Alert.alert('Error');
      }
      const updatedOrderIdsAssigned = [
        ...selectedOperator?.OrderIdsAssigned,
        id,
      ];
      const opertorres = await updateOperator({
        id: selectedOperator?.id,
        OrderIdsAssigned: updatedOrderIdsAssigned,
      });
      console.log(opertorres);

      if (opertorres?.data) {
        Alert.alert('Success');
      } else {
        console.error(opertorres?.error);
        Alert.alert('Error');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error');
    }
  };

  return (
    <>
      <Pressable>
        <View style={styles.container}>
          <View style={{height: 110, width: '40%', alignItems: 'center'}}>
            <Image
              style={{height: '100%', width: '90%'}}
              source={require('../../assets/AvatarBoy.png')}
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
              {NearbyLandMark.charAt(0).toUpperCase()}
              {NearbyLandMark.slice(1)}
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
            {isMaintainerAssigned === true ? (
              <>
            <Text>Assigned Operator </Text>
              <Text>{NameMaintainer}</Text>
              </>
            ) : (
              <>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <Picker
                    selectedValue={selectedOperator?.id}
                    style={{height: 50, width: 150}}
                    onValueChange={(itemValue, itemIndex) =>
                      handleOperatorChange(itemValue, itemIndex)
                    }>
                    <Picker.Item label="Choose Operator to Assign" value="" />
                    {Operator.map(item => {
                      return (
                        <Picker.Item
                          key={item?.id} 
                          label={item?.Name_Maintainer}
                          value={item?.id}
                        />
                      );
                    })}
                  </Picker>
                  <Button
                    title="Assign"
                    onPress={() => {
                      if (selectedOperator?.id) {
                        handleAssignOperator();
                      } else {
                        Alert.alert('Select Operator!!');
                      }
                    }}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </Pressable>
    </>
  );
};

export default DroneOrderView;

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
