import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import ScreenWrapper from '../../app/components/ScreenWrapper';
import {useContext, useState} from 'react';
import {useSignUpMutation} from '../../app/api/apiSlice';
import {Pressable} from '@react-native-material/core';

const Signup = ({navigation}) => {
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [email, setEmail] = useState('');
  const [emailMsg, setemailMsg] = useState('');
  const [pwdMsg, setpwdMsg] = useState('');
  const [signUp, {isLoading}] = useSignUpMutation();
  const handleClick = async (user, email, password) => {
    try {
      const resp = await signUp({
        username: user.trim(),
        email: email.trim(),
        password: password,
      });
      console.log(resp);
      navigation.navigate('login');
      setEmail('');
      setPwd('');
      setEmail('');
    } catch (error) {
      console.log(error);
    }
  };
  const CheckValidation = () => {
    // <= Added this function
    const strongRegex = new RegExp(
      '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
    );

    if (!strongRegex.test(email) && email != '') {
      setemailMsg('invalid email');
      return false;
    } else if (pwd.length < 8 && pwd != '') {
      setpwdMsg('Password too short');
      return false;
    }
  };

  return (
    <ScreenWrapper>
      <View>
        <Text style={styles.signheading}>Create your Account</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="username"
          placeholderTextColor="rgba(0, 0, 0, 0.7)"
          autoCapitalize="none"
          onChangeText={text => setUser(text)}
          value={user}
        />

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Email"
          placeholderTextColor="rgba(0, 0, 0, 0.7)"
          autoCapitalize="none"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        {emailMsg ? (
          <Text style={styles.error}>{emailMsg}</Text>
        ) : (
          <View></View>
        )}
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="password"
          placeholderTextColor="rgba(0, 0, 0, 0.7)"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={text => setPwd(text)}
          value={pwd}
        />
        {pwdMsg ? <Text style={styles.error}>{pwdMsg}</Text> : <Text></Text>}
        <View>
          {/* <Pressable
          style={styles.signbutton}
          onPress={() => {
           
          }}>
          <Text>Sign Up</Text>
        </Pressable> */}
          <Pressable
            onPress={() => {
              if (CheckValidation()) {
                handleClick(user, email, pwd);
              } else {
                Alert.alert('Please check credentials again');
              }
            }}
            style={styles.mainBtn}>
            <View>
              <Text
                style={{
                  color: 'white',
                }}>
                Login
              </Text>
            </View>
          </Pressable>
        </View>
        <Text style={styles.last}>
          Already have an account?
          <Text
            style={{
              color: 'blue',
              textDecorationLine: 'underline',
            }}
            onPress={() => navigation.navigate('login')}>
            Log in
          </Text>
        </Text>
      </View>
    </ScreenWrapper>
  );
};

export default Signup;

const styles = StyleSheet.create({
  signheading: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 32,
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 127,
    marginBottom: 40,
  },
  input: {
    marginTop: 15,
    // marginTop:40,
    height: 50,
    borderColor: '#7a42f4',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    padding: 15,
  },

  signbutton: {
    height: 56,
    margin: 15,
    backgroundColor: '#0F623D',
    borderRadius: 10,
    borderStyle: 'solid',
    //   borderWidth:2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  last: {
    marginTop: '4%',
    textAlign: 'center',
  },
  that: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  mainBtn: {
    width: 328,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F623D',
    marginHorizontal: 16,
    marginTop: 65,
  },
  error: {
    color: 'red',
  },
});
