import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TextInput,
    Alert,
  } from 'react-native';
  import React, {useEffect} from 'react';
  import axios from 'axios';
  import {useContext, useState} from 'react';
  import {useSignUpMutation} from '../../app/api/apiSlice';
  
  const Signup = ({navigation}: any) => {
    const [username, setUser] = useState('');
    const [password, setPwd] = useState('');
    const [email, setEmail] = useState('');
  
    const [signUp, {isLoading}] = useSignUpMutation();
  
    const handleClick = async (username: String,email: String, password: String) => {
      try {
        axios
        .post(`http://localhost:8000/signup/`, {
          username,
          email,
          password,
        })
        .then(res => {
          let userInfo = res.data;
          console.log(userInfo);
          setUser(userInfo.data)
       
          navigation.navigate("login");
      
        })
        .catch(e => {
          console.log(`register error ${e}`);
       
        });
      } catch (error) {
          console.log(error)
      }
    };
  
    return (
      <View>
        <Text style={styles.signheading}>Create your account</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="username"
          placeholderTextColor="rgba(0, 0, 0, 0.7)"
          autoCapitalize="none"
          onChangeText={text => setUser(text)}
          value={username}
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
  
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="password"
          placeholderTextColor="rgba(0, 0, 0, 0.7)"
          autoCapitalize="none"
          onChangeText={text => setPwd(text)}
          value={password}
        />
        <View>
          <Pressable
            style={styles.signbutton}
            onPress={() => {
              handleClick(username, password, email);
            }}>
            <Text>Sign Up</Text>
          </Pressable>
        </View>
        <Text style={styles.last}>
          Already have an account?
          <Text onPress={() => navigation.navigate('login')}>Log in</Text>
        </Text>
      </View>
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
      marginTop: 167,
      marginBottom: 40,
    },
    input: {
      margin: 15,
      // marginTop:40,
      height: 66,
      borderColor: '#7a42f4',
      borderWidth: 1,
      backgroundColor: '#FFFFFF',
  
      borderRadius: 10,
      padding: 15,
    },
  
    signbutton: {
      height: 56,
      margin: 15,
      backgroundColor: '#00AC00',
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
  });
  