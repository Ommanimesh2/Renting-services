import {StyleSheet, Text, View, Button, ScrollView} from 'react-native';
import React from 'react';
import strings from '../../helpers/LocalisedStrings';
const OrderView = ({props, navigation}) => {
  const {payement_status, placed_at, date, payement_mode, machine_id, user_id} =
    props;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View
      style={{
        backgroundColor: 'white',
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 8,
      }}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: 5,
        }}>
        <View>
          <Text style={styles.text}>{strings.MACHINE_NO}</Text>
          <Text>{machine_id}</Text>
        </View>
        <View>
          <Text style={styles.text}>{strings.PLACED_AT}</Text>
          <Text>{placed_at}</Text>
        </View>
      </View>
      <Button
        onPress={() => {
          navigation.navigate('uniqueOrder', {
            orderId: user_id,
            payement_status: payement_status,
            placed_at: placed_at,
            payement_mode: payement_mode,
          });
        }}
        title="Details"
        color="#0F623D"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
    </ScrollView>
  );
};

export default OrderView;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: 'black',
    fontWeight: 800,
  },
});
