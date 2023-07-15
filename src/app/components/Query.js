import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import strings from '../../helpers/LocalisedStrings';
const Query = ({props, navigation}) => {
  const {name, id, email, subject, message, user_id} = props;

  return (
    <View
      style={{
        backgroundColor: 'white',
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 5,
      }}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: 5,
        }}>
        <View>
          <Text style={styles.text}>{strings.QUERY_NO}</Text>
          <Text>{id}</Text>
        </View>
        <View>
          <Text style={styles.text}>{strings.USER_NAME}</Text>
          <Text>{name}</Text>
        </View>
      </View>
      <Button
        onPress={() => {
          navigation.navigate('uniqueQuery', {
            user_id: user_id,
            id: id,
            name: name,
            email: email,
            subject: subject,
            message: message,
          });
        }}
        title="Details"
        color="#0F623D"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
};

export default Query;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: 'black',
    fontWeight: 800,
  },
});
