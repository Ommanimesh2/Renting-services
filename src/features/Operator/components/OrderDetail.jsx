import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import phone from '../../../app/assets/phone.png';
import strings from '../../../helpers/LocalisedStrings';

const OrderDetail = ({navigation}) => {
  const [countdown, setCountdown] = useState(100);
  const [isShow, setIsShow] = useState(false);
  const [resendButtonDisabled, setResendButtonDisabled] = useState(false);
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
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <Text style={styles.textOrder}>Order id: BHC12345</Text>
      </View>
      <Text style={styles.head}>Spray Drone</Text>
      <Text style={styles.normal}>Bhoomicam Drone Services</Text>
      <Text style={styles.normal}>Bhagwanpur, Haridwar</Text>
      <Text style={styles.price}>Price : Rs.52/ acre</Text>
      <View style={styles.btnContainer}>
        <Pressable style={styles.call}>
          <View style={styles.flex}>
            <Image source={phone} />
            <Text style={{color: '#0F623D'}}>Call Support</Text>
          </View>
        </Pressable>
        <Pressable style={styles.call}>
          <View style={styles.flex}>
            <Image source={phone} />
            <Text style={{color: '#0F623D'}}>Call Support</Text>
          </View>
        </Pressable>
      </View>
      <Pressable
        style={styles.mainBtn}
        onPress={() => {
          setIsShow(true);
        }}>
        <View>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: 600,
            }}>
            Start Flying Drone
          </Text>
        </View>
      </Pressable>
      <View
        style={{
          borderWidth: 0.5,
          marginTop: 15,
          borderColor: 'gray',
          width: '85%',
        }}></View>
      {isShow ? (
        <>
          <View style={styles.container}>
            <Text style={styles.header}>Enter OTP to start the service</Text>
            <TextInput
              style={styles.input}
              // value={otp}
              // onChangeText={text => setOTP(text)}
              maxLength={6}
            />
            <TouchableOpacity style={styles.mainBtn} onPress={()=>{navigation.navigate('timeCount')}}>
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
                  >
                  <View>
                    <Text style={{color: 'white'}}>{strings.RESEND_OTP}</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </>
      ) : (
        <></>
      )}
    </View>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 30,
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
  mainBtn: {
    width: '85%',
    height: 50,
    display: 'flex',
    borderRadius: 5,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F623D',
  },
  btnContainer: {
    display: 'flex',
    alignItems: 'center',
    rowGap: 18,
    justifyContent: 'center',
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 4,
  },
  textOrder: {
    color: '#0F623D',
    textAlign: 'center',

    fontFamily: 'Quicksand',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
  controls: {
    backgroundColor: '#D2F1C7',
    borderColor: '#0F623D',
    width: '40%',
    borderWidth: 3,
    borderRadius: 31,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  head: {
    marginVertical: 6,
    fontSize: 20,
    color: 'black',
    fontWeight: '800',
  },
  normal: {
    marginVertical: 3,
    fontSize: 18,
  },
  price: {
    color: 'black',
    fontWeight: '600',
    marginVertical: 6,
    fontSize: 18,
  },
  call: {
    borderColor: '#0F623D',
    width: '35%',
    height: 40,
    borderWidth: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F5E0',
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    columnGap: 10,
    marginVertical: 10,
  },
});
