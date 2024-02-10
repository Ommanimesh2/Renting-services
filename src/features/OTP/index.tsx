import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {generateOTP, setCredentials} from '../../helpers/credentials';
import {
  useSendOTPMutation,
  useValidateOTPMutation,
} from '../../app/api/apiSlice';
import {setCurrUser} from '../admin/Slices/userSlice';
import strings from '../../helpers/LocalisedStrings';
import {getLng} from '../../helpers/lang';

const OTPInputPage = ({navigation, route}) => {
  const [otp, setOTP] = useState('');
  const {currUser, loading} = useSelector(state => state.user);
  const [newOTP, setNewOTP] = useState(route.params.otp);
  const {phone} = useSelector(state => state.phone);
  const [validateOTP] = useValidateOTPMutation();
  const [sendOTP] = useSendOTPMutation();
  const dispatch = useDispatch();
  const [countdown, setCountdown] = useState(100);
  const [resendButtonDisabled, setResendButtonDisabled] = useState(false);

  const inputRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];

  const handleValidateOTP = async () => {
    console.log(otp);
    if (otp == newOTP) {
      const res = await sendOTP({
        phone_no: phone,
      });
      console.log(res);
      setCredentials(res?.data?.user);
      dispatch(setCurrUser(res?.data.user));
      // navigation.navigate('droneUserRoutes');
    } else {
      Alert.alert(
        '',
        `${strings.INVALID_CODE}`,
        [
          {
            text: `${strings.BACK}`,
            onPress: () => {
              navigation.navigate('phone');
            },
          },
          {
            text: `${strings.CANCEL}`,
            onPress: () => {},
          },
        ],
        {cancelable: true},
      );
    }
  };
  useEffect(() => {
    setResendButtonDisabled(true);
    let seconds = 100;
    const intervalId = setInterval(() => {
      setCountdown(seconds);
      seconds -= 1;

      if (seconds < 0) {
        // Reset the countdown and enable the button when the countdown reaches 0
        clearInterval(intervalId);
        setCountdown(0);
        setResendButtonDisabled(false);
      }
    }, 1000);
  }, [newOTP]);
  const handleResendOTP = async () => {
    const otp = generateOTP();
    setNewOTP(otp);
    setResendButtonDisabled(true);
    const url = `http://1.nationsms.com/V2/http-api.php?apikey=VyJ15ONFtg7e86Ug&senderid=BHOCAM&number=${phone}&message=Dear user, The OTP is ${otp} to login in Bhoomicam tool.&format=json`;
    try {
      const response = await fetch(url);
    } catch (error) {}
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
      <Text style={styles.header}>{strings.ENTER_OTP}</Text>
      <TextInput
        style={styles.input}
        value={otp}
        onChangeText={text => setOTP(text)}
        maxLength={6}
      />
      <TouchableOpacity style={styles.mainBtn} onPress={handleValidateOTP}>
        <View>
          <Text style={{color: 'white'}}>{strings.VALIDATE_OTP}</Text>
        </View>
      </TouchableOpacity>
      <View>
        {countdown > 0 ? (
          <Text style={{fontSize: 14, marginTop: 10, fontWeight: 500}}>
            {strings.RESEND_OTP} {countdown} s
          </Text>
        ) : (
          <TouchableOpacity
            style={styles.resendBtn}
            disabled={resendButtonDisabled}
            onPress={handleResendOTP}>
            <View>
              <Text style={{color: 'white'}}>{strings.RESEND_OTP}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
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
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    textAlign: 'center',
    fontSize: 18,
    margin: 10,
  },
  hyphen: {
    fontSize: 18,
    marginHorizontal: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
  // input: {
  //   height: 40,
  //   borderColor: 'gray',
  //   borderWidth: 1,
  //   marginBottom: 10,
  //   paddingHorizontal: 10,
  // },
  // mainBtn: {
  //   backgroundColor: 'blue',
  //   padding: 10,
  //   borderRadius: 5,
  //   alignItems: 'center',
  //   marginBottom: 10,
  // },
  resendBtn: {
    backgroundColor: '#0F623D',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
});

export default OTPInputPage;
