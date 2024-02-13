import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Header from '../../../app/components/Header';
import {
  useAddOperatorMutation,
  useOperatorSignUpMutation,
} from '../../../app/api/apiSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
const AddMaintainer = ({navigation, route}) => {
  const {currUser, loading} = useSelector(state => state.user);
  // Name_Maintainer = models.CharField(max_length=300)
  // Email_Maintainer = models.EmailField(max_length=300)
  // Contact_Maintainer = models.BigIntegerField()
  const initialState = {
    Name_Maintainer: '',
    Email_Maintainer: '',
    Contact_Maintainer: '',
    Drone_Admin: currUser?.id,
  };
  const [addOperator, {isLoading, isError}] = useAddOperatorMutation();
  const [operatorSignUp] = useOperatorSignUpMutation();
  const [payload, setPayload] = useState(initialState);
  const handleInputChange = (field, value) => {
    setPayload({...payload, [field]: value});
  };
  const handleSubmit = async () => {
    console.log(payload);
    const response = await addOperator(payload);
    const makeAccount = await operatorSignUp({
      phone_no: payload.Contact_Maintainer,
    });
    navigation.goBack();
  };
  return (
    <View>
      <Header text="Add Maintainer" />
      <View
        style={{
          display: 'flex',
          width: '90%',
          height: 40,
          marginTop: 20,
          marginLeft: '5%',
          borderBottomWidth: 1,
          borderBottomColor: '#CFD8DC',
          // border solid ;
          padding: 8,
        }}>
        <Text
          style={{
            color: '#424242',
            paddingLeft: '0%',
            fontFamily: 'Roboto',
            fontSize: 17,
            fontWeight: 700,
          }}>
          Maintainer’s Details
        </Text>
      </View>
      <View style={styles.DetailsContainer}>
        <Image
          source={require('../assets/bxs_user.png')}
          style={{height: 35, width: 35, margin: 10}}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '2%',
          }}>
          <Text
            style={{
              color: '#424242',
              paddingLeft: '0%',
              fontFamily: 'Roboto',
              fontSize: 14,
              fontWeight: 600,
            }}>
            Maintainer's Name
          </Text>
          <TextInput
            style={styles.newjobinput}
            underlineColorAndroid="transparent"
            placeholder="Enter Maintainer's Name"
            placeholderTextColor="#B9B9B9"
            placeholderFontSize="20"
            autoCapitalize="none"
            value={payload.Name_Maintainer}
            onChangeText={text => handleInputChange('Name_Maintainer', text)}
          />
        </View>
      </View>

      <View style={styles.DetailsContainer}>
        <Image
          source={require('../assets/email.png')}
          style={{height: 35, width: 35, margin: 10}}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '2%',
          }}>
          <Text
            style={{
              color: '#424242',
              paddingLeft: '0%',
              fontFamily: 'Roboto',
              fontSize: 14,
              fontWeight: 600,
            }}>
            Email
          </Text>
          <TextInput
            style={styles.newjobinput}
            underlineColorAndroid="transparent"
            placeholder="Email Address"
            placeholderTextColor="#B9B9B9"
            placeholderFontSize="20"
            autoCapitalize="none"
            value={payload.Email_Maintainer}
            onChangeText={text => handleInputChange('Email_Maintainer', text)}
          />
        </View>
      </View>

      <View style={styles.DetailsContainer}>
        <Image
          source={require('../assets/phone.png')}
          style={{height: 35, width: 35, margin: 10}}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '2%',
          }}>
          <Text
            style={{
              color: '#424242',
              paddingLeft: '0%',
              fontFamily: 'Roboto',
              fontSize: 14,
              fontWeight: 600,
            }}>
            Contact No.
          </Text>
          <TextInput
            style={styles.newjobinput}
            underlineColorAndroid="transparent"
            placeholder="Contact Number"
            placeholderTextColor="#B9B9B9"
            placeholderFontSize="20"
            autoCapitalize="none"
            value={payload.Contact_Maintainer}
            onChangeText={text => handleInputChange('Contact_Maintainer', text)}
          />
        </View>
      </View>
      <TouchableOpacity onPress={handleSubmit} style={styles.addjobbutton}>
        <Text style={styles.addjobtext}>Add Maintainer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddMaintainer;

const styles = StyleSheet.create({
  DetailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    width: '90%',
    marginLeft: '5%',
  },
  addjobbutton: {
    width: '90%',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F623D',
    marginLeft: '5%',
    marginTop: 65,
  },
  addjobtext: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 600,
  },
});
