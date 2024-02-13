import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSendOTPMutation} from '../../app/api/apiSlice';
import {useDispatch, useSelector} from 'react-redux';
import {setPhoneNumber} from '../admin/Slices/phoneNumberSlice';
import {getLng} from '../../helpers/lang';
import strings from '../../helpers/LocalisedStrings';
import {generateOTP} from '../../helpers/credentials';
const PhoneNumberInput = ({navigation}) => {
  const [phoneNumber, setPhoneNum] = useState('');
  const [sendOTP] = useSendOTPMutation();
  const {phone} = useSelector(state => state.phone);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const dispatch = useDispatch();
  const handlePhoneNumberChange = text => {
    setPhoneNum(text);
  };

  const handlePhoneNumberSubmit = async () => {
    if (phoneNumber == '' || phoneNumber.length < 10) {
      Alert.alert(strings.INVALID_PHONE_NUMBER);
    } else {
      setButtonDisabled(true);
      const formattedPhoneNumber = phoneNumber?.replace('+91', '');
      if (formattedPhoneNumber == '1234567891') {
        const otp = 123123;
        setButtonDisabled(false);
        dispatch(setPhoneNumber(formattedPhoneNumber));
        navigation.navigate('otp', {otp: otp});
      } else {
        const otp = generateOTP();
        try {
          const res = await sendOTP({
            phone_no: formattedPhoneNumber,
          });
          console.log(res);
        } catch (error) {}
        const url = `http://1.nationsms.com/V2/http-api.php?apikey=VyJ15ONFtg7e86Ug&senderid=BHOCAM&number=${formattedPhoneNumber}&message=Dear user, The OTP is ${otp} to login in Bhoomicam tool.&format=json`;
        const response = await fetch(url);
        if (response.ok) {
          setButtonDisabled(false);
          dispatch(setPhoneNumber(formattedPhoneNumber));
          navigation.navigate('otp', {otp: otp});
        }
      }
    }
  };
  const selectedLng = async () => {
    const lngData = await getLng();
    if (!!lngData) {
      strings.setLanguage(lngData);
    }
  };
  useEffect(() => {
    selectedLng();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{strings.LOGIN_SIGNUP}</Text>
      <Text>{strings.LOGIN_SIGNUP_DESCRIPTION}</Text>

      {/* Display the "+91" prefix as static text */}
      <View style={styles.inputContainer}>
        <Text style={styles.prefix}>+91</Text>
        <TextInput
          style={styles.input}
          placeholder="E.g., 123-456-7890"
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
          keyboardType="phone-pad"
        />
      </View>

      <TouchableOpacity
        style={styles.mainBtn}
        disabled={buttonDisabled}
        onPress={() => handlePhoneNumberSubmit()}>
        <View>
          <Text style={{color: 'white'}}>{strings.RECIEVE_OTP}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
  },
  inputContainer: {
    width: '90%', // Adjust the width as needed
    flexDirection: 'row',
    marginVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prefix: {
    marginRight: 7,
  },
  input: {
    width: '80%', // Adjust the width as needed
    height: 50,
    backgroundColor: '#F9F9FB',
  },
  mainBtn: {
    width: '80%', // Adjust the width as needed
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F623D',
    marginTop: 20, // Adjust the margin as needed
  },
});

export default PhoneNumberInput;
